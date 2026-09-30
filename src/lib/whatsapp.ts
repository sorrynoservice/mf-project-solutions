/**
 * Contact links per lead route (WhatsApp, phone, email), built from content/settings.json.
 * Each route is one person and one inbox:
 *   property = snagging and property inspections, small = smaller construction, major = larger projects.
 */
import { settings } from "@/lib/content";
import type { LeadRoute } from "@/lib/types";

export type RouteInfo = {
  label: string;
  person: string;
  phone: string;
  tel: string;
  whatsapp: string;
  email: string;
};

export const LEAD_ROUTES: LeadRoute[] = ["property", "small", "major"];

/** Used only if content/settings.json is missing a route, so contact links never break. */
const FALLBACK_ROUTES: Record<LeadRoute, RouteInfo> = {
  property: {
    label: "Snagging and property inspections",
    person: "Wanessa",
    phone: "+353 83 801 4857",
    tel: "+353838014857",
    whatsapp: "353838014857",
    email: "wcorrea@mfeng.ie",
  },
  small: {
    label: "Smaller construction",
    person: "Rosana",
    phone: "+353 83 809 7035",
    tel: "+353838097035",
    whatsapp: "353838097035",
    email: "info@mfeng.ie",
  },
  major: {
    label: "Extensions, renovations and larger projects",
    person: "Alex",
    phone: "+353 87 603 9378",
    tel: "+353876039378",
    whatsapp: "353876039378",
    email: "aferreira@mfeng.ie",
  },
};

export const routeInfo = (route: LeadRoute): RouteInfo => {
  const fromSettings = settings?.routes?.[route];
  return fromSettings ? { ...FALLBACK_ROUTES[route], ...fromSettings } : FALLBACK_ROUTES[route] ?? FALLBACK_ROUTES.small;
};

const digits = (s: string) => (s || "").replace(/\D/g, "");

/**
 * Irish number to E.164 (+353...). Accepts "083 809 7035", "+353 83 809 7035", "00353...", "tel:...".
 * Returns "" when there are too few digits to be a phone number.
 */
export const toE164 = (raw: string): string => {
  const trimmed = (raw || "").replace(/^tel:/i, "").trim();
  let d = digits(trimmed);
  if (!d || d.length < 7) return "";
  if (trimmed.startsWith("+")) return `+${d}`;
  if (d.startsWith("00")) return `+${d.slice(2)}`;
  if (d.startsWith("353")) return `+${d}`;
  if (d.startsWith("0")) d = d.slice(1);
  return `+353${d}`;
};

/** International digits for wa.me, e.g. 353838097035. */
export const waNumber = (route: LeadRoute): string => {
  const r = routeInfo(route);
  const fromWa = digits(r.whatsapp.replace(/^https?:\/\/wa\.me\//i, "").split("?")[0]);
  return fromWa.length >= 9 ? fromWa : digits(toE164(r.phone));
};

/** The prefilled WhatsApp message. The ref code lets the team see which page the lead came from. */
export const waMessage = (service: string, pageCode: string) =>
  `Hi MF Project Solutions, I'd like to ask about ${service || "a project"} (ref ${(pageCode || "WEB").toUpperCase()}).`;

export const waLink = (route: LeadRoute, pageCode: string, service?: string) =>
  `https://wa.me/${waNumber(route)}?text=${encodeURIComponent(waMessage(service ?? routeInfo(route).label, pageCode))}`;

export const telLink = (route: LeadRoute) => `tel:${toE164(routeInfo(route).tel || routeInfo(route).phone)}`;

export const mailLink = (route: LeadRoute, subject?: string, body?: string) => {
  const q: string[] = [];
  if (subject) q.push(`subject=${encodeURIComponent(subject)}`);
  if (body) q.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${routeInfo(route).email}${q.length ? `?${q.join("&")}` : ""}`;
};

/** Which route a phone number, wa.me link or email belongs to, or undefined if none match. */
export const routeFromContact = (value: string): LeadRoute | undefined => {
  const v = (value || "").toLowerCase();
  if (v.includes("@")) {
    const email = v.replace(/^mailto:/, "").split("?")[0];
    return LEAD_ROUTES.find((r) => routeInfo(r).email.toLowerCase() === email);
  }
  const d = digits(toE164(v.replace(/^https?:\/\/(api\.)?wa\.me\//, "+").split("?")[0]));
  if (!d) return undefined;
  return LEAD_ROUTES.find((r) => waNumber(r) === d || digits(toE164(routeInfo(r).phone)) === d);
};
