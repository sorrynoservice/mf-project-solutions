/**
 * Cookie consent: read, save and apply the visitor's choice through Google Consent Mode v2.
 *
 * The defaults (everything denied except functionality and security) are set by an inline
 * script in index.html before Google Tag Manager loads, and a saved choice is re-applied there
 * too, so tags fire correctly on the very first event of every page view. This module handles
 * changes made through the banner. SSR-safe: nothing touches window at import time.
 */

export const CONSENT_KEY = "mf_consent_v1";
/** Fired on window when the visitor saves a choice. detail = ConsentChoice. */
export const CONSENT_CHANGED_EVENT = "mf:consent-changed";
/** Fired on window to ask the banner to open its settings view. */
export const CONSENT_OPEN_EVENT = "mf:consent-open";

export type ConsentChoice = {
  /** analytics_storage (GA4). */
  analytics: boolean;
  /** ad_storage, ad_user_data, ad_personalization (Google Ads, Meta Pixel, enhanced conversions). */
  marketing: boolean;
  /** When the choice was saved, ms since epoch. */
  ts: number;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const isBrowser = () => typeof window !== "undefined";

/** Consent Mode commands must be pushed as an `arguments` object, exactly like the gtag snippet. */
export function gtag(..._args: unknown[]): void {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export const readConsent = (): ConsentChoice | null => {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<ConsentChoice> | null;
    if (!v || typeof v.analytics !== "boolean" || typeof v.marketing !== "boolean") return null;
    return { analytics: v.analytics, marketing: v.marketing, ts: typeof v.ts === "number" ? v.ts : 0 };
  } catch {
    return null;
  }
};

export const hasMarketingConsent = (): boolean => readConsent()?.marketing === true;
export const hasAnalyticsConsent = (): boolean => readConsent()?.analytics === true;

const state = (on: boolean) => (on ? "granted" : "denied");

/** Sends the Consent Mode update and a dataLayer event for GTM triggers. Does not save. */
export const applyConsent = (c: Pick<ConsentChoice, "analytics" | "marketing">) => {
  if (!isBrowser()) return;
  gtag("consent", "update", {
    analytics_storage: state(c.analytics),
    ad_storage: state(c.marketing),
    ad_user_data: state(c.marketing),
    ad_personalization: state(c.marketing),
  });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "consent_update",
    consent_analytics: c.analytics,
    consent_marketing: c.marketing,
  });
};

/** Saves, applies and announces the choice. */
export const saveConsent = (c: Pick<ConsentChoice, "analytics" | "marketing">): ConsentChoice => {
  const choice: ConsentChoice = { analytics: c.analytics, marketing: c.marketing, ts: Date.now() };
  if (!isBrowser()) return choice;
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
  } catch {
    /* private mode or blocked storage: the choice still applies for this page view */
  }
  applyConsent(choice);
  if (!choice.marketing) {
    // Withdrawn advertising consent: drop the stored first-touch ad click ids.
    try {
      window.localStorage.removeItem("mf_attr_first_v1");
    } catch {
      /* ignore */
    }
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGED_EVENT, { detail: choice }));
  return choice;
};

/** Opens the cookie settings panel from anywhere (footer link, cookies page). */
export const openConsentSettings = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
};

/** Subscribe to saved choices. Returns an unsubscribe function. */
export const onConsentChange = (fn: (c: ConsentChoice) => void) => {
  if (!isBrowser()) return () => {};
  const h = (e: Event) => fn((e as CustomEvent<ConsentChoice>).detail);
  window.addEventListener(CONSENT_CHANGED_EVENT, h);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, h);
};
