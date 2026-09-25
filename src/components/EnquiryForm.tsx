import { useState } from "react";
import { CircleCheck, Send } from "lucide-react";
import { contacts, WEB3FORMS_KEY } from "@/data/site";
import { track } from "@/lib/track";

const projectTypes = [
  "Garden room",
  "Granny flat",
  "Extension",
  "Kitchen",
  "Bathroom",
  "Landscaping",
  "Full renovation",
  "Other",
];
const budgets = ["Under €20k", "€20k to €50k", "€50k to €100k", "Over €100k", "Not sure yet"];
const sources = [
  "Google",
  "Instagram",
  "Facebook",
  "LinkedIn",
  "Architect",
  "Recommendation",
  "Other",
];

type Props = {
  /** Pre-selects the project type, e.g. on the garden rooms page. */
  defaultType?: string;
  /** Dark (homepage) or light (inner pages) styling. */
  tone?: "dark" | "light";
};

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Project enquiry form. Sends straight to the construction inbox through Web3Forms,
 * so it works on phones with no email app. If Web3Forms fails, or no key is set yet,
 * it falls back to opening the visitor's email app with the details filled in.
 * Photos are best sent by WhatsApp, which the form says.
 */
const EnquiryForm = ({ defaultType = "", tone = "light" }: Props) => {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    type: defaultType,
    location: "",
    budget: "",
    start: "",
    source: "",
    details: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF({ ...f, [k]: e.target.value });

  const dark = tone === "dark";
  const label = dark ? "block text-sm font-medium text-white mb-1" : "block text-sm font-medium text-foreground mb-1";
  const input = dark
    ? "w-full h-11 rounded-md border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
    : "w-full h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";
  const option = dark ? "text-black" : "";
  const muted = dark ? "text-white/70" : "text-muted-foreground";
  const linkClass = dark ? "underline text-[#d4af37]" : "underline text-foreground";

  const subject = `New website enquiry: ${f.type || "new project"}${f.location ? `, ${f.location}` : ""}`;
  const mailtoHref = () => {
    const body = [
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Email: ${f.email}`,
      `Project type: ${f.type}`,
      `Location or Eircode: ${f.location}`,
      `Rough budget: ${f.budget}`,
      `Preferred start: ${f.start}`,
      `How did you hear about us: ${f.source}`,
      "",
      f.details,
    ].join("\n");
    return `mailto:${contacts.construction.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Honeypot: real visitors never see or tick this box.
    if ((e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked) return;

    if (WEB3FORMS_KEY === "REPLACE_WITH_KEY") {
      window.location.href = mailtoHref();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: "mfprojectsolutions.ie",
          name: f.name,
          phone: f.phone,
          email: f.email,
          project_type: f.type,
          location: f.location,
          budget: f.budget,
          preferred_start: f.start,
          heard_about_us: f.source,
          message: f.details,
          page: window.location.pathname,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
      track("enquiry_submit", { project_type: f.type, source: f.source });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="text-left py-6" role="status">
        <CircleCheck className={`w-10 h-10 mb-4 ${dark ? "text-[#d4af37]" : "text-accent"}`} />
        <p className={dark ? "text-lg text-white" : "text-lg text-foreground"}>
          Thanks, we have your enquiry. We usually reply within one working day. For a faster answer,
          WhatsApp us on{" "}
          <a href={contacts.construction.whatsapp} target="_blank" rel="noreferrer" className={linkClass}>
            083 809 7035
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 text-left">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div>
        <label className={label} htmlFor="eq-name">Name</label>
        <input id="eq-name" required className={input} value={f.name} onChange={set("name")} />
      </div>
      <div>
        <label className={label} htmlFor="eq-phone">Phone</label>
        <input id="eq-phone" type="tel" required className={input} value={f.phone} onChange={set("phone")} />
      </div>
      <div>
        <label className={label} htmlFor="eq-email">Email</label>
        <input id="eq-email" type="email" className={input} value={f.email} onChange={set("email")} />
      </div>
      <div>
        <label className={label} htmlFor="eq-type">Project type</label>
        <select id="eq-type" required className={input} value={f.type} onChange={set("type")}>
          <option value="" className={option}>Choose one</option>
          {projectTypes.map((t) => (
            <option key={t} className={option}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={label} htmlFor="eq-location">Location or Eircode</label>
        <input id="eq-location" required className={input} value={f.location} onChange={set("location")} />
      </div>
      <div>
        <label className={label} htmlFor="eq-budget">Rough budget</label>
        <select id="eq-budget" className={input} value={f.budget} onChange={set("budget")}>
          <option value="" className={option}>Choose one</option>
          {budgets.map((b) => (
            <option key={b} className={option}>{b}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={label} htmlFor="eq-start">Preferred start</label>
        <input id="eq-start" placeholder="e.g. Spring 2027" className={input} value={f.start} onChange={set("start")} />
      </div>
      <div>
        <label className={label} htmlFor="eq-source">How did you hear about us?</label>
        <select id="eq-source" className={input} value={f.source} onChange={set("source")}>
          <option value="" className={option}>Choose one</option>
          {sources.map((s) => (
            <option key={s} className={option}>{s}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="eq-details">About your project</label>
        <textarea
          id="eq-details"
          rows={4}
          className={`${input} h-auto py-2`}
          value={f.details}
          onChange={set("details")}
        />
      </div>

      {status === "error" && (
        <div className="sm:col-span-2 rounded-md border border-red-400/60 bg-red-500/10 p-3 text-sm" role="alert">
          <p className={dark ? "text-white" : "text-foreground"}>
            Sorry, your enquiry did not send. Please{" "}
            <a href={contacts.construction.whatsapp} target="_blank" rel="noreferrer" className={linkClass}>
              WhatsApp us on 083 809 7035
            </a>{" "}
            or{" "}
            <a href={mailtoHref()} className={linkClass}>
              send it by email instead
            </a>
            .
          </p>
        </div>
      )}

      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 h-12 rounded-lg px-8 font-semibold bg-[#d4af37] text-[#0a2e2a] hover:bg-[#d4af37]/90 transition-colors disabled:opacity-70 disabled:cursor-wait"
        >
          {status === "sending" ? "Sending..." : "Send enquiry"} <Send className="w-4 h-4" />
        </button>
        <p className={`text-xs ${muted}`}>
          Have photos? Send them on WhatsApp to {contacts.construction.display}.
        </p>
      </div>
    </form>
  );
};

export default EnquiryForm;
