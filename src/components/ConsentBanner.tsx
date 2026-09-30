import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { CONSENT_OPEN_EVENT, openConsentSettings, readConsent, saveConsent } from "@/lib/consent";

/**
 * Cookie banner. Renders nothing on the server and on first paint; after mount it shows as a
 * bottom panel if no choice is saved, or when openConsentSettings() is called (footer link).
 * It does not block the page. Accept all, Reject all and Choose carry equal size and weight.
 */
const ConsentBanner = () => {
  const [open, setOpen] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const openedByUserRef = useRef(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const onOpen = () => {
      const saved = readConsent();
      setAnalytics(saved?.analytics ?? false);
      setMarketing(saved?.marketing ?? false);
      returnFocusRef.current = (document.activeElement as HTMLElement | null) ?? null;
      openedByUserRef.current = true;
      setChoosing(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  // Move focus into the panel only when the visitor opened it; on first visit leave focus alone
  // so the banner does not interrupt keyboard and screen reader users reading the page.
  useEffect(() => {
    if (open && openedByUserRef.current) {
      panelRef.current?.querySelector<HTMLElement>("input, button")?.focus();
    }
  }, [open, choosing]);

  const close = useCallback(() => {
    setOpen(false);
    setChoosing(false);
    if (openedByUserRef.current) returnFocusRef.current?.focus?.();
    openedByUserRef.current = false;
  }, []);

  const decide = (a: boolean, m: boolean) => {
    saveConsent({ analytics: a, marketing: m });
    close();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Escape closes the panel only if a choice already exists; otherwise nothing has been decided.
    if (e.key === "Escape" && readConsent()) {
      e.stopPropagation();
      close();
    }
  };

  if (!open) return null;

  const btn =
    "flex-1 min-w-[8rem] h-11 rounded-lg px-4 text-sm font-semibold border-2 border-[#d5be9c] bg-[#d5be9c] text-[#0a3632] hover:bg-[#e3d2b8] hover:border-[#e3d2b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a3632] transition-colors";

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onKeyDown={onKeyDown}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-xl bg-[#0a3632] text-white shadow-2xl ring-1 ring-white/10 p-4 sm:p-5 max-h-[85vh] overflow-y-auto">
        <h2 id={titleId} className="text-base font-semibold mb-1">
          Cookies on this site
        </h2>
        <div id={descId} className="text-sm text-white/85 space-y-1">
          <p>
            With your permission we use analytics cookies to see which pages help people, and advertising cookies to
            measure which ads bring enquiries. Nothing is set until you choose, and you can change your mind at any
            time from the footer.{" "}
            <a href="/cookies" className="underline underline-offset-2 text-[#d5be9c]">
              Cookie details
            </a>
          </p>
        </div>

        {choosing && (
          <fieldset className="mt-4 space-y-3">
            <legend className="sr-only">Choose which cookies to allow</legend>
            <Toggle
              label="Analytics"
              text="Counts visits and shows which pages are useful (Google Analytics)."
              checked={analytics}
              onChange={setAnalytics}
            />
            <Toggle
              label="Advertising"
              text="Measures which Google and Meta ads lead to enquiries."
              checked={marketing}
              onChange={setMarketing}
            />
            <p className="text-xs text-white/65">Essential storage that keeps the site working is always on.</p>
          </fieldset>
        )}

        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          <button type="button" className={btn} onClick={() => decide(true, true)}>
            Accept all
          </button>
          <button type="button" className={btn} onClick={() => decide(false, false)}>
            Reject all
          </button>
          {choosing ? (
            <button type="button" className={btn} onClick={() => decide(analytics, marketing)}>
              Save choices
            </button>
          ) : (
            <button type="button" className={btn} onClick={() => setChoosing(true)}>
              Choose
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Toggle = ({
  label,
  text,
  checked,
  onChange,
}: {
  label: string;
  text: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg bg-white/5 p-3">
      <label htmlFor={id} className="text-sm cursor-pointer">
        <span className="block font-semibold">{label}</span>
        <span className="block text-white/75">{text}</span>
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
          checked ? "bg-[#d5be9c]" : "bg-white/25"
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
};

/** Footer link that reopens the cookie settings. */
export const CookieSettingsLink = ({ className = "underline underline-offset-2", label = "Cookie settings" }: { className?: string; label?: string }) => (
  <button type="button" className={className} onClick={openConsentSettings}>
    {label}
  </button>
);

export default ConsentBanner;
