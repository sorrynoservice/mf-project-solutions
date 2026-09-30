/**
 * Lead attribution: remembers where a visitor came from so every form submission carries it.
 *
 * On the first page of a session the ad click ids, UTM tags, landing page and referrer are
 * saved in sessionStorage (cleared when the tab closes). If the visitor has granted advertising
 * consent, a first-touch copy is also kept in localStorage for 90 days, so an enquiry sent a
 * week after an ad click can still be matched to that click. SSR-safe: call captureAttribution()
 * from an effect or client entry point, never at module scope.
 */
import { hasMarketingConsent, onConsentChange } from "@/lib/consent";

export const ATTR_PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type AttrParam = (typeof ATTR_PARAMS)[number];

export type Attribution = Partial<Record<AttrParam, string>> & {
  landing_page?: string;
  referrer?: string;
  /** ISO time the touch was recorded. */
  captured_at?: string;
};

/** What getAttribution() returns: this session's touch, gaps filled from the stored first touch. */
export type MergedAttribution = Attribution & {
  first_landing_page?: string;
  first_referrer?: string;
  first_captured_at?: string;
};

const SESSION_KEY = "mf_attr_session_v1";
const FIRST_KEY = "mf_attr_first_v1";
const FIRST_TTL_MS = 90 * 24 * 60 * 60 * 1000;

/** Pure: builds a touch from a URL search string, path and referrer. Exported for tests. */
export const parseAttribution = (
  search: string,
  pathname: string,
  referrer: string,
  ownHost = "",
  now = new Date(),
): Attribution => {
  const q = new URLSearchParams(search);
  const out: Attribution = {};
  for (const k of ATTR_PARAMS) {
    const v = q.get(k);
    if (v && v.trim()) out[k] = v.trim().slice(0, 300);
  }
  out.landing_page = (pathname || "/") + (search && search !== "?" ? (search.startsWith("?") ? search : `?${search}`) : "");
  out.landing_page = out.landing_page.slice(0, 500);
  let ref = referrer || "";
  if (ref && ownHost) {
    try {
      if (new URL(ref).host === ownHost) ref = "";
    } catch {
      /* keep as is */
    }
  }
  if (ref) out.referrer = ref.slice(0, 500);
  out.captured_at = now.toISOString();
  return out;
};

/** True when the touch carries a click id or UTM tag (a paid or tagged visit). */
export const hasCampaignData = (a: Attribution) => ATTR_PARAMS.some((k) => !!a[k]);

const readJson = <T,>(store: Storage | undefined, key: string): T | null => {
  try {
    const raw = store?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const writeJson = (store: Storage | undefined, key: string, v: unknown) => {
  try {
    store?.setItem(key, JSON.stringify(v));
  } catch {
    /* storage blocked: attribution is best effort */
  }
};

const safeSession = () => {
  try {
    return window.sessionStorage;
  } catch {
    return undefined;
  }
};
const safeLocal = () => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};

type FirstTouch = Attribution & { expires: number };

const persistFirstTouch = (touch: Attribution) => {
  const local = safeLocal();
  const existing = readJson<FirstTouch>(local, FIRST_KEY);
  if (existing && existing.expires > Date.now()) return;
  writeJson(local, FIRST_KEY, { ...touch, expires: Date.now() + FIRST_TTL_MS });
};

let captured = false;

/**
 * Call once on the client after the app mounts. Records the session touch the first time,
 * and replaces it later in the session only if a new tagged link (ad click, UTM) is opened.
 */
export const captureAttribution = () => {
  if (typeof window === "undefined" || captured) return;
  captured = true;
  const { search, pathname, host } = window.location;
  const touch = parseAttribution(search, pathname, document.referrer, host);
  const session = safeSession();
  const existing = readJson<Attribution>(session, SESSION_KEY);
  if (!existing || hasCampaignData(touch)) writeJson(session, SESSION_KEY, touch);

  const current = readJson<Attribution>(session, SESSION_KEY) ?? touch;
  if (hasMarketingConsent()) persistFirstTouch(current);

  // If advertising consent is granted later in the visit, keep the first touch from then on.
  onConsentChange((c) => {
    if (c.marketing) persistFirstTouch(readJson<Attribution>(safeSession(), SESSION_KEY) ?? current);
  });
};

/** Pure merge, exported for tests. */
export const mergeAttribution = (session: Attribution | null, first: FirstTouch | null): MergedAttribution => {
  const out: MergedAttribution = { ...(session ?? {}) };
  if (first && first.expires > Date.now()) {
    for (const k of ATTR_PARAMS) if (!out[k] && first[k]) out[k] = first[k];
    if (first.landing_page) out.first_landing_page = first.landing_page;
    if (first.referrer) out.first_referrer = first.referrer;
    if (first.captured_at) out.first_captured_at = first.captured_at;
  }
  return out;
};

/** Attribution fields for a form submission. Empty object on the server. */
export const getAttribution = (): MergedAttribution => {
  if (typeof window === "undefined") return {};
  const session = readJson<Attribution>(safeSession(), SESSION_KEY);
  const first = hasMarketingConsent() ? readJson<FirstTouch>(safeLocal(), FIRST_KEY) : null;
  return mergeAttribution(session, first);
};
