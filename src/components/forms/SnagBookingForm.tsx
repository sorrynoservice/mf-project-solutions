import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarCheck, MessageCircle, Phone, Send } from "lucide-react";
import { getAttribution } from "@/lib/attribution";
import { pushUserData, track } from "@/lib/track";
import { mailLink, routeInfo, telLink, waLink } from "@/lib/whatsapp";
import {
  Field as FieldShell,
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

export type SnagBookingFormProps = {
  /** Page code for the lead record and tracking. Defaults to "SNG". */
  pageCode?: string;
  tone?: Tone;
  compact?: boolean;
  heading?: string;
};

export const PROPERTY_TYPES = ["House", "Duplex", "Apartment"];
export const BEDROOMS = ["2", "3", "4", "5", "Other"];
export const INSPECTION_TYPES = ["First snag", "Re-snag", "Snag plus room measurements"];
export const ATTEND = ["Yes", "No", "Not sure"];

type Values = {
  name: string;
  phone: string;
  email: string;
  area: string;
  propertyType: string;
  bedrooms: string;
  inspection: string;
  keyDate: string;
  date1: string;
  date2: string;
  attend: string;
  notes: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const validate = (v: Values): Errors => {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.phone.trim()) e.phone = "Please enter a phone number so Wanessa can confirm by WhatsApp.";
  else if (!isPhone(v.phone)) e.phone = "That number looks too short. Please include the full number, e.g. 083 123 4567.";
  if (v.email.trim() && !isEmail(v.email)) e.email = "Please check the email address, e.g. name@example.com.";
  if (!v.area.trim()) e.area = "Please enter the development, area or Eircode.";
  if (!v.propertyType) e.propertyType = "Please choose the property type.";
  if (!v.bedrooms) e.bedrooms = "Please choose the number of bedrooms.";
  if (!v.inspection) e.inspection = "Please choose the inspection type.";
  if (v.date1 && v.date2 && v.date1 === v.date2) e.date2 = "Please pick a different second date, or leave it blank.";
  return e;
};

/** Snagging inspection booking request. Always routed to the property inspections line (Wanessa). No prices. */
const SnagBookingForm = ({ pageCode = "SNG", tone = "light", compact = false, heading }: SnagBookingFormProps) => {
  const route = "property" as const;
  const r = routeInfo(route);
  const [v, setV] = useState<Values>({
    name: "",
    phone: "",
    email: "",
    area: "",
    propertyType: "",
    bedrooms: "",
    inspection: "",
    keyDate: "",
    date1: "",
    date2: "",
    attend: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [bot, setBot] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [today, setToday] = useState<string | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const focusErrorRef = useRef(false);
  const t = toneClasses(tone);

  // Set after mount so the prerendered HTML does not depend on the build date.
  useEffect(() => {
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }, []);

  useEffect(() => {
    if (focusErrorRef.current) {
      focusErrorRef.current = false;
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [errors]);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const set = (k: keyof Values) => (val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const subject = `[Snagging booking] ${v.bedrooms || "?"} bed: ${v.name.trim()}`;
  const mailtoFallback = () =>
    mailLink(
      route,
      subject,
      [
        `Name: ${v.name}`,
        `Phone: ${v.phone}`,
        `Email: ${v.email}`,
        `Property area or Eircode: ${v.area}`,
        `Property type: ${v.propertyType}`,
        `Bedrooms: ${v.bedrooms}`,
        `Inspection type: ${v.inspection}`,
        `Handover or key date: ${v.keyDate}`,
        `Preferred dates: ${[v.date1, v.date2].filter(Boolean).join(", ")}`,
        `Attending: ${v.attend}`,
        `Ref: ${pageCode}`,
        "",
        v.notes,
      ].join("\n"),
    );

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || bot) return;
    const errs = validate(v);
    if (Object.keys(errs).length) {
      focusErrorRef.current = true;
      setErrors(errs);
      const n = Object.keys(errs).length;
      setAnnounce(`Please fix ${n} ${n === 1 ? "field" : "fields"} before sending.`);
      return;
    }
    setStatus("sending");
    setAnnounce("Sending your booking request.");
    try {
      await sendLead(
        {
          form: "snag-booking",
          name: v.name.trim(),
          phone: v.phone.trim(),
          email: v.email.trim(),
          service: `Snagging: ${v.inspection}`,
          area: v.area.trim(),
          property_type: v.propertyType,
          bedrooms: v.bedrooms,
          inspection_type: v.inspection,
          key_date: v.keyDate,
          preferred_date_1: v.date1,
          preferred_date_2: v.date2,
          attending: v.attend,
          timing: v.date1 ? `Preferred ${v.date1}` : v.keyDate ? `Keys ${v.keyDate}` : "",
          message: v.notes.trim(),
          route,
          route_owner: r.person,
          page: currentPage(),
          page_code: pageCode,
          ...getAttribution(),
        },
        { subject, replyto: v.email.trim() || undefined },
      );
      pushUserData({ email: v.email, phone: v.phone });
      track("snagging_booking_submit", { lead_route: route, page_code: pageCode, bedrooms: v.bedrooms });
      setStatus("sent");
      setAnnounce("");
    } catch {
      setStatus("error");
      setAnnounce("Sorry, your booking request did not send.");
    }
  };

  if (status === "sent") {
    return (
      <div className={`rounded-xl p-6 text-left ${t.panel}`}>
        <CalendarCheck className={`w-10 h-10 mb-3 ${t.dark ? "text-[#d5be9c]" : "text-[#0a3632]"}`} aria-hidden="true" />
        <h3 ref={doneRef} tabIndex={-1} className={`text-xl font-semibold mb-2 focus:outline-none ${t.text}`}>
          Thanks, we have your booking request
        </h3>
        <p className={`mb-5 ${t.text}`}>{r.person} will confirm your date by WhatsApp or email.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={waLink(route, pageCode, "a snagging inspection")}
            target="_blank"
            rel="noreferrer"
            data-route={route}
            data-page={pageCode}
            className={`inline-flex items-center justify-center gap-2 h-11 rounded-lg px-5 font-semibold ${t.button}`}
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
      <TextField name="phone" label="Phone" type="tel" inputMode="tel" tone={tone} required autoComplete="tel" value={v.phone} onChange={set("phone")} error={errors.phone} />
      <TextField name="email" label="Email" type="email" inputMode="email" tone={tone} autoComplete="email" value={v.email} onChange={set("email")} error={errors.email} />
      <TextField
        name="area"
        label="Property area or Eircode"
        tone={tone}
        required
        placeholder="e.g. Hansfield, Dublin 15"
        value={v.area}
        onChange={set("area")}
        error={errors.area}
      />
      <SelectField name="propertyType" label="Property type" tone={tone} required options={PROPERTY_TYPES} value={v.propertyType} onChange={set("propertyType")} error={errors.propertyType} />
      <SelectField name="bedrooms" label="Bedrooms" tone={tone} required options={BEDROOMS} value={v.bedrooms} onChange={set("bedrooms")} error={errors.bedrooms} />
      <SelectField name="inspection" label="Inspection type" tone={tone} required options={INSPECTION_TYPES} value={v.inspection} onChange={set("inspection")} error={errors.inspection} />
      <DateField label="Handover or key date" name="keyDate" tone={tone} value={v.keyDate} onChange={set("keyDate")} hint="If you know it" />
      <DateField label="Preferred inspection date" name="date1" tone={tone} value={v.date1} onChange={set("date1")} min={today} />
      <DateField label="Second choice date" name="date2" tone={tone} value={v.date2} onChange={set("date2")} min={today} error={errors.date2} />
      <SelectField name="attend" label="Will you attend the inspection?" tone={tone} options={ATTEND} value={v.attend} onChange={set("attend")} />
      <TextAreaField
        name="notes"
        label="Notes"
        tone={tone}
        className={full}
        rows={3}
        placeholder="Anything we should know, e.g. builder name or access details"
        value={v.notes}
        onChange={set("notes")}
      />

      {status === "error" && (
        <div className={`${full} rounded-md border border-red-400/70 bg-red-500/10 p-4 text-sm`} role="alert">
          <p className={`font-semibold mb-1 ${t.text}`}>Sorry, your booking request did not send.</p>
          <p className={t.text}>
            You can{" "}
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
          {status === "sending" ? "Sending..." : "Request booking"} <Send className="w-4 h-4" aria-hidden="true" />
        </button>
        <PrivacyLine tone={tone} />
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>
    </form>
  );
};

type DateFieldProps = {
  label: string;
  name: string;
  tone: Tone;
  value: string;
  onChange: (v: string) => void;
  min?: string;
  hint?: string;
  error?: string;
};

const DateField = ({ label, name, tone, value, onChange, min, hint, error }: DateFieldProps) => {
  const t = toneClasses(tone);
  return (
    <FieldShell label={label} tone={tone} hint={hint} error={error}>
      {(a) => (
        <input {...a} type="date" name={name} min={min} className={`${t.input} ${t.dark ? "[color-scheme:dark]" : ""}`} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </FieldShell>
  );
};

export default SnagBookingForm;
