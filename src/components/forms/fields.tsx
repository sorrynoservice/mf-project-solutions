/**
 * Shared form inputs and the lead submission helper used by EnquiryForm and SnagBookingForm.
 * Styling follows the tone prop: "dark" sits on the green brand panels, "light" on white pages.
 */
import { useId, type ReactNode } from "react";
import { settings } from "@/lib/content";

export type Tone = "light" | "dark";

export const toneClasses = (tone: Tone) => {
  const dark = tone === "dark";
  return {
    dark,
    label: dark ? "block text-sm font-medium text-white mb-1" : "block text-sm font-medium text-[#0a3632] mb-1",
    input: dark
      ? "w-full h-11 rounded-md border border-white/25 bg-white/10 px-3 text-base sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#d5be9c] aria-[invalid=true]:border-red-300"
      : "w-full h-11 rounded-md border border-neutral-300 bg-white px-3 text-base sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0a3632] aria-[invalid=true]:border-red-600",
    option: dark ? "text-black" : "",
    muted: dark ? "text-white/75" : "text-neutral-600",
    text: dark ? "text-white" : "text-neutral-900",
    error: dark ? "text-red-200" : "text-red-700",
    link: dark ? "underline underline-offset-2 text-[#d5be9c]" : "underline underline-offset-2 text-[#0a3632]",
    button: dark
      ? "bg-[#d5be9c] text-[#0a3632] hover:bg-[#e3d2b8] focus-visible:ring-white"
      : "bg-[#0a3632] text-white hover:bg-[#0f4a44] focus-visible:ring-[#d5be9c]",
    secondaryButton: dark
      ? "border border-white/40 text-white hover:bg-white/10"
      : "border border-[#0a3632] text-[#0a3632] hover:bg-[#0a3632]/5",
    panel: dark ? "bg-white/5 border border-white/15" : "bg-[#d5be9c]/15 border border-[#d5be9c]/60",
  };
};

type FieldProps = {
  label: string;
  tone: Tone;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (a11y: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; required?: boolean }) => ReactNode;
};

/** Label, control, hint and error with the ids wired up for screen readers. */
export const Field = ({ label, tone, error, hint, required, className, children }: FieldProps) => {
  const id = useId();
  const t = toneClasses(tone);
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label className={t.label} htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className={`font-normal ${t.muted}`}> (optional)</span>}
      </label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": describedBy, required })}
      {hint && !error && (
        <p id={hintId} className={`mt-1 text-xs ${t.muted}`}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} className={`mt-1 text-xs font-medium ${t.error}`}>
          {error}
        </p>
      )}
    </div>
  );
};

type Common = { label: string; tone: Tone; value: string; onChange: (v: string) => void; error?: string; hint?: string; required?: boolean; className?: string; name: string };

export const TextField = ({
  type = "text",
  autoComplete,
  placeholder,
  inputMode,
  ...p
}: Common & { type?: string; autoComplete?: string; placeholder?: string; inputMode?: "text" | "tel" | "email" }) => {
  const t = toneClasses(p.tone);
  return (
    <Field label={p.label} tone={p.tone} error={p.error} hint={p.hint} required={p.required} className={p.className}>
      {(a) => (
        <input
          {...a}
          name={p.name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={t.input}
          value={p.value}
          onChange={(e) => p.onChange(e.target.value)}
        />
      )}
    </Field>
  );
};

export const SelectField = ({ options, placeholder = "Choose one", ...p }: Common & { options: string[]; placeholder?: string }) => {
  const t = toneClasses(p.tone);
  return (
    <Field label={p.label} tone={p.tone} error={p.error} hint={p.hint} required={p.required} className={p.className}>
      {(a) => (
        <select {...a} name={p.name} className={t.input} value={p.value} onChange={(e) => p.onChange(e.target.value)}>
          <option value="" className={t.option}>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className={t.option}>
              {o}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
};

export const TextAreaField = ({ rows = 4, placeholder, ...p }: Common & { rows?: number; placeholder?: string }) => {
  const t = toneClasses(p.tone);
  return (
    <Field label={p.label} tone={p.tone} error={p.error} hint={p.hint} required={p.required} className={p.className}>
      {(a) => (
        <textarea
          {...a}
          name={p.name}
          rows={rows}
          placeholder={placeholder}
          className={`${t.input} h-auto py-2`}
          value={p.value}
          onChange={(e) => p.onChange(e.target.value)}
        />
      )}
    </Field>
  );
};

/** Hidden from people and assistive tech; bots that fill every field reveal themselves. */
export const Honeypot = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
  <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
    <label>
      Leave this unticked
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" checked={value} onChange={(e) => onChange(e.target.checked)} />
    </label>
  </div>
);

export const PrivacyLine = ({ tone }: { tone: Tone }) => {
  const t = toneClasses(tone);
  return (
    <p className={`text-xs ${t.muted}`}>
      We use your details only to reply to this enquiry. See our{" "}
      <a href="/privacy" className={t.link}>
        privacy notice
      </a>
      .
    </p>
  );
};

/* ---------- validation ---------- */

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
/** Accepts Irish and international numbers with at least 9 digits. */
export const isPhone = (v: string) => {
  const d = v.replace(/\D/g, "");
  return d.length >= 9 && d.length <= 15;
};

/* ---------- submission ---------- */

export type LeadPayload = Record<string, string | number | boolean | undefined>;

const clean = (p: LeadPayload) => {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(p)) if (v !== undefined && v !== "") out[k] = v;
  return out;
};

/**
 * Sends the lead to Web3Forms (the email to the route inbox) and, in parallel, to the Google
 * Sheet logger if settings.leadSheetUrl is set. Only the Web3Forms result decides success:
 * the sheet request is fire-and-forget and can never fail the form.
 * `email` fields carry the subject, from name and reply-to for Web3Forms only.
 */
export const sendLead = async (
  data: LeadPayload,
  email: { subject: string; replyto?: string },
): Promise<void> => {
  const fields = clean(data);

  const sheetUrl = settings.leadSheetUrl;
  if (sheetUrl) {
    try {
      void fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...fields, subject: email.subject }),
        keepalive: true,
      }).catch(() => undefined);
    } catch {
      /* never affects the visitor */
    }
  }

  const key = settings.web3formsKey;
  if (!key || key === "REPLACE_WITH_KEY") throw new Error("Form key not set");

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      subject: email.subject,
      from_name: "MF Project Solutions website",
      ...(email.replyto ? { replyto: email.replyto } : {}),
      ...fields,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
  if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
};

/** Current path without query string; safe to call in handlers only. */
export const currentPage = () => (typeof window === "undefined" ? "" : window.location.pathname);
