/**
 * Lead tracking for Google Tag Manager. Every event is a dataLayer push tagged with page_path;
 * GTM turns them into GA4 events and Google Ads / Meta conversions (see docs/TRACKING.md).
 * SSR-safe: nothing runs at import time and every function is a no-op on the server.
 */
import { hasMarketingConsent } from "@/lib/consent";
import { routeFromContact, toE164 } from "@/lib/whatsapp";
import type { LeadRoute } from "@/lib/types";

export type LeadEvent =
  | "enquiry_submit"
  | "snagging_booking_submit"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "calculator_result"
  /** Legacy: external Google Form link, kept while any page still links to one. */
  | "snagging_booking_click";

export type TrackParams = {
  lead_route?: LeadRoute;
  page_code?: string;
  [key: string]: string | number | boolean | undefined;
};

const push = (obj: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(obj);
};

/** Pushes a lead event to GTM with the current page path. Undefined params are dropped. */
export const track = (event: LeadEvent, params: TrackParams = {}) => {
  if (typeof window === "undefined") return;
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") clean[k] = v;
  push({ event, page_path: window.location.pathname, ...clean });
};

/**
 * Enhanced conversions: hands GTM the visitor's email and phone just before a conversion event,
 * so Google Ads can match the lead to an ad click (GTM hashes it before sending).
 * Only ever pushed when advertising consent is granted. Call right before track(conversion).
 */
export const pushUserData = (data: { email?: string; phone?: string }) => {
  if (!hasMarketingConsent()) return;
  const user_data: Record<string, string> = {};
  const email = (data.email || "").trim().toLowerCase();
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) user_data.email = email;
  const phone = toE164(data.phone || "");
  if (phone) user_data.phone_number = phone;
  if (!Object.keys(user_data).length) return;
  push({ event: "user_data_ready", user_data });
};

const isRoute = (v: string | null | undefined): v is LeadRoute => v === "property" || v === "small" || v === "major";

let installed = false;

/**
 * One document-level listener tracks every WhatsApp, tel: and mailto: link on the site, so new
 * links are covered without wiring each one up. Links can carry data-route="property|small|major"
 * and data-page="BTH" (or sit inside an element with data-page); if data-route is missing the route
 * is inferred from the number or email. Call once on the client.
 */
export const installLinkTracking = () => {
  if (typeof document === "undefined" || installed) return;
  installed = true;
  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";

      const routeAttr = link.getAttribute("data-route") ?? link.closest("[data-route]")?.getAttribute("data-route");
      const page_code =
        link.getAttribute("data-page") ?? link.closest("[data-page]")?.getAttribute("data-page") ?? undefined;
      const lead_route = isRoute(routeAttr) ? routeAttr : routeFromContact(href);

      if (/(^|\/\/)(api\.)?wa\.me\//i.test(href) || href.includes("api.whatsapp.com/")) {
        // `line` keeps the existing GTM triggers (construction / snagging) working.
        track("whatsapp_click", { lead_route, page_code, line: lead_route === "property" ? "snagging" : "construction" });
      } else if (href.startsWith("tel:")) {
        // `number` keeps the existing GTM phone triggers working.
        track("phone_click", { lead_route, page_code, number: toE164(href.slice(4)) });
      } else if (href.startsWith("mailto:")) {
        track("email_click", { lead_route, page_code });
      } else if (href.includes("forms.gle/") || href.includes("docs.google.com/forms")) {
        track("snagging_booking_click", { lead_route: "property", page_code });
      }
    },
    true,
  );
};
