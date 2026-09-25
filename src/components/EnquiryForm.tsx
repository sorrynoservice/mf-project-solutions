import { useState } from "react";
import { Send } from "lucide-react";
import { contacts } from "@/data/site";

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

/**
 * Project enquiry form. There is no server behind the site, so on submit it opens
 * the visitor's email app with a pre-filled message to the construction inbox.
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
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF({ ...f, [k]: e.target.value });

  const dark = tone === "dark";
  const label = dark ? "block text-sm font-medium text-white mb-1" : "block text-sm font-medium text-foreground mb-1";
  const input = dark
    ? "w-full h-11 rounded-md border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
    : "w-full h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent";
  const option = dark ? "text-black" : "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Project enquiry: ${f.type || "new project"}${f.location ? `, ${f.location}` : ""}`;
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
    window.location.href = `mailto:${contacts.construction.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 text-left">
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
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 h-12 rounded-lg px-8 font-semibold bg-[#d4af37] text-[#0a2e2a] hover:bg-[#d4af37]/90 transition-colors"
        >
          Send enquiry <Send className="w-4 h-4" />
        </button>
        <p className={dark ? "text-xs text-white/70" : "text-xs text-muted-foreground"}>
          Opens your email app with the details filled in. Have photos? Send them on WhatsApp to{" "}
          {contacts.construction.display}.
        </p>
      </div>
    </form>
  );
};

export default EnquiryForm;
