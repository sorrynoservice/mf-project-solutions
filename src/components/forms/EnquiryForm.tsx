import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleCheck, MessageCircle, Phone, Send } from "lucide-react";
import type { LeadRoute } from "@/lib/types";
import { getAttribution } from "@/lib/attribution";
import { pushUserData, track } from "@/lib/track";
import { mailLink, routeInfo, telLink, waLink } from "@/lib/whatsapp";
import {
  Honeypot,
  PrivacyLine,
  SelectField,
  TextAreaField,
  TextField,
  currentPage,
  isEmail,
  isPhone,
  sendLead,
  toneClasses,
  type Tone,
} from "./fields";

export type EnquiryFormProps = {
  /** Which person and inbox receives the lead. */
  route: LeadRoute;
  /** Short page code carried into the lead record and tracking, e.g. "BTH". */
  pageCode: string;
  /** Pre-selected service. */
  service?: string;
  /** Service choices. Defaults to a list for the route. */
  services?: string[];
  tone?: Tone;
  /** Single column layout for narrow sidebars. */
  compact?: boolean;
  heading?: string;
  /** Send the visitor to /thank-you?route=... after success instead of showing the panel. */
  redirectToThankYou?: boolean;
};

export const DEFAULT_SERVICES: Record<LeadRoute, string[]> = {
  property: ["Snagging inspection", "Re-snag inspection", "Pre-purchase inspection", "Room measurements", "Other"],
  small: [
    "Bathroom renovation",
    "Garden room",
    "Porcelain patio",
    "Landscaping",
    "Timber veranda or glass room",
    "Decking or pergola",
    "Kitchen",
    "Bespoke joinery",
    "Other",
  ],
  major: [
    "Extension",
    "House renovation",
    "Attic conversion",
    "Garden home or granny flat",
    "Commercial fit-out",
    "Design service",
    "Pricing from architect's drawings",
    "Other",
  ],
};

/** The service each page pre-selects in the form and names in WhatsApp messages. */
export const SERVICE_BY_CODE: Record<string, string> = {
  SNG: "Snagging inspection",
  PPS: "Pre-purchase inspection",
  PRS: "Snagging inspection",
  BER: "Other",
  BTH: "Bathroom renovation",
  GRM: "Garden room",
  PAT: "Porcelain patio",
  LND: "Landscaping",
  VER: "Timber veranda or glass room",
  DEK: "Decking or pergola",
  KIT: "Kitchen",
  JNY: "Bespoke joinery",
  EXT: "Extension",
  REN: "House renovation",
  ATT: "Attic conversion",
  GHM: "Garden home or granny flat",
  COM: "Commercial fit-out",
  DES: "Design service",
  ARC: "Pricing from architect's drawings",
};

export const TIMINGS = ["ASAP", "1 to 3 months", "3 to 6 months", "6 to 12 months", "Just planning"];
export const BUDGETS = ["Under €50k", "€50k to €100k", "€100k to €250k", "Over €250k", "Not sure yet"];
export const HEARD_ABOUT = [
  "Google search",
  "Google Ads",
  "Instagram",
  "Facebook",
  "Architect or designer",
  "Recommendation",
  "Returning client",
  "Other",
];

const replyTime = (route: LeadRoute) =>
  route === "major" ? "usually within one working day" : "usually the same working day";

type Values = {
  name: string;
  phone: string;
  email: string;
  service: string;
  area: string;
  timing: string;
  budget: string;
  message: string;
  heard: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const validate = (v: Values): Errors => {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.phone.trim()) e.phone = "Please enter a phone number so we can call or WhatsApp you.";
  else if (!isPhone(v.phone)) e.phone = "That number looks too short. Please include the full number, e.g. 083 123 4567.";
  if (v.email.trim() && !isEmail(v.email)) e.email = "Please check the email address, e.g. name@example.com.";
  if (!v.service) e.service = "Please choose the closest match.";
  return e;
};

/**
 * Project enquiry form. Sends to the route inbox through Web3Forms, logs to the lead sheet,
 * carries attribution, and fires the enquiry_submit conversion on success.
 */
const EnquiryForm = ({
  route,
  pageCode,
  service = "",
  services,
  tone = "light",
  compact = false,
  heading,
  redirectToThankYou = false,
}: EnquiryFormProps) => {
  const r = routeInfo(route);
  const baseList = services && services.length ? services : DEFAULT_SERVICES[route];
  const serviceList = service && !baseList.includes(service) ? [service, ...baseList] : baseList;

  const [v, setV] = useState<Values>({
    name: "",
    phone: "",
    email: "",
    service,
    area: "",
    timing: "",
    budget: "",
    message: "",
    heard: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [bot, setBot] = useState(false);
  const [announce, setAnnounce] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const focusErrorRef = useRef(false);

  const t = toneClasses(tone);
  const set = (k: keyof Values) => (val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  useEffect(() => {
    if (focusErrorRef.current) {
      focusErrorRef.current = false;
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [errors]);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const serviceName = v.service || "a project";
  const subject = `[${r.label}] ${serviceName}: ${v.name.trim()}`;

  const mailtoFallback = () =>
    mailLink(
      route,
      subject,
      [
        `Name: ${v.name}`,
        `Phone: ${v.phone}`,
        `Email: ${v.email}`,
        `Service: ${v.service}`,
        `Area or Eircode: ${v.area}`,
        `Timing: ${v.timing}`,
        route === "major" ? `Budget: ${v.budget}` : "",
        `How did you hear about us: ${v.heard}`,
        `Ref: ${pageCode}`,
        "",
        v.message,
      ]
        .filter((l) => l !== "")
        .join("\n"),
    );

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    if (bot) return;
    const errs = validate(v);
    if (Object.keys(errs).length) {
      focusErrorRef.current = true;
      setErrors(errs);
      const n = Object.keys(errs).length;
      setAnnounce(`Please fix ${n} ${n === 1 ? "field" : "fields"} before sending.`);
      return;
    }

    setStatus("sending");
    setAnnounce("Sending your enquiry.");
    const attr = getAttribution();
    try {
      await sendLead(
        {
          form: "enquiry",
          name: v.name.trim(),
          phone: v.phone.trim(),
          email: v.email.trim(),
          service: v.service,
          area: v.area.trim(),
          timing: v.timing,
          budget: route === "major" ? v.budget : undefined,
          message: v.message.trim(),
          heard_about: v.heard,
          route,
          route_owner: r.person,
          page: currentPage(),
          page_code: pageCode,
          ...attr,
        },
        { subject, replyto: v.email.trim() || undefined },
      );
      pushUserData({ email: v.email, phone: v.phone });
      track("enquiry_submit", { lead_route: route, service: v.service, page_code: pageCode, form: "enquiry" });
      if (redirectToThankYou) {
        setAnnounce("Enquiry sent.");
        window.setTimeout(() => {
          window.location.assign(`/thank-you?route=${route}&ref=${encodeURIComponent(pageCode)}`);
        }, 300);
        return;
      }
      setStatus("sent");
      setAnnounce("");
    } catch {
      setStatus("error");
      setAnnounce("Sorry, your enquiry did not send.");
    }
  };

  if (status === "sent") {
    return (
      <div className={`rounded-xl p-6 text-left ${t.panel}`}>
        <CircleCheck className={`w-10 h-10 mb-3 ${t.dark ? "text-[#d5be9c]" : "text-[#0a3632]"}`} aria-hidden="true" />
        <h3 ref={doneRef} tabIndex={-1} className={`text-xl font-semibold mb-2 focus:outline-none ${t.text}`}>
          Thanks, we have your enquiry
        </h3>
        <p className={`mb-5 ${t.text}`}>
          {r.person} will be in touch, {replyTime(route)}. If you have photos or drawings, send them on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={waLink(route, pageCode, v.service || undefined)}
            target="_blank"
            rel="noreferrer"
            data-route={route}
            data-page={pageCode}
            className={`inline-flex items-center justify-center gap-2 h-11 rounded-lg px-5 font-semibold focus-visible:outline-none focus-visible:ring-2 ${t.button}`}
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp {r.person}
          </a>
          <a
            href={telLink(route)}
            data-route={route}
            data-page={pageCode}
            className={`inline-flex items-center justify-center gap-2 h-11 rounded-lg px-5 font-semibold ${t.secondaryButton}`}
          >
            <Phone className="w-4 h-4" aria-hidden="true" /> Call {r.phone}
          </a>
        </div>
      </div>
    );
  }

  const grid = compact ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4";
  const full = compact ? "" : "sm:col-span-2";

  return (
    <form ref={formRef} onSubmit={submit} noValidate className={`relative text-left ${grid}`} aria-busy={status === "sending"}>
      {heading && <h3 className={`text-xl font-semibold ${full} ${t.text}`}>{heading}</h3>}
      <Honeypot value={bot} onChange={setBot} />

      <TextField name="name" label="Name" tone={tone} required autoComplete="name" value={v.name} onChange={set("name")} error={errors.name} />
      <TextField
        name="phone"
        label="Phone"
        type="tel"
        inputMode="tel"
        tone={tone}
        required
        autoComplete="tel"
        value={v.phone}
        onChange={set("phone")}
        error={errors.phone}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        inputMode="email"
        tone={tone}
        autoComplete="email"
        value={v.email}
        onChange={set("email")}
        error={errors.email}
      />
      <SelectField name="service" label="Service" tone={tone} required options={serviceList} value={v.service} onChange={set("service")} error={errors.service} />
      <TextField
        name="area"
        label="Area or Eircode"
        tone={tone}
        autoComplete="postal-code"
        placeholder="e.g. Ratoath or A85 EC84"
        value={v.area}
        onChange={set("area")}
      />
      <SelectField name="timing" label="When would you like to start?" tone={tone} options={TIMINGS} value={v.timing} onChange={set("timing")} />
      {route === "major" && (
        <SelectField name="budget" label="Rough budget" tone={tone} options={BUDGETS} value={v.budget} onChange={set("budget")} />
      )}
      <SelectField name="heard" label="How did you hear about us?" tone={tone} options={HEARD_ABOUT} value={v.heard} onChange={set("heard")} />
      <TextAreaField
        name="message"
        label="About your project"
        tone={tone}
        className={full}
        placeholder="A few lines on what you have in mind"
        value={v.message}
        onChange={set("message")}
      />

      {status === "error" && (
        <div className={`${full} rounded-md border border-red-400/70 bg-red-500/10 p-4 text-sm`} role="alert">
          <p className={`font-semibold mb-1 ${t.text}`}>Sorry, your enquiry did not send.</p>
          <p className={t.text}>
            Nothing is lost: you can{" "}
            <a href={mailtoFallback()} data-route={route} data-page={pageCode} className={t.link}>
              send the same details by email to {r.email}
            </a>{" "}
            or call {r.person} on{" "}
            <a href={telLink(route)} data-route={route} data-page={pageCode} className={t.link}>
              {r.phone}
            </a>
            . You can also try the button again.
          </p>
        </div>
      )}

      <div className={`${full} flex flex-col gap-3`}>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 h-12 rounded-lg px-8 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-70 disabled:cursor-wait ${t.button}`}
        >
          {status === "sending" ? "Sending..." : "Send enquiry"} <Send className="w-4 h-4" aria-hidden="true" />
        </button>
        <PrivacyLine tone={tone} />
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>
    </form>
  );
};

export default EnquiryForm;
