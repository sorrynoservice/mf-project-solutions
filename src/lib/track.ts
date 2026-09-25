import { contacts } from "@/data/site";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type LeadEvent =
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "enquiry_submit"
  | "snagging_booking_click";

/** Pushes a lead event to Google Tag Manager, tagged with the current page path. */
export const track = (event: LeadEvent, params: Record<string, string> = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params });
};

/**
 * One document-level listener tracks every WhatsApp, tel:, mailto: and booking-form link on the site,
 * so new links are covered without wiring each one up. Call once at startup.
 */
export const installLinkTracking = () => {
  document.addEventListener(
    "click",
    (e) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";

      if (href.includes("wa.me/")) {
        track("whatsapp_click", {
          line: href.startsWith(contacts.snagging.whatsapp) ? "snagging" : "construction",
        });
      } else if (href.startsWith("tel:")) {
        track("phone_click", { number: href.slice(4) });
      } else if (href.startsWith("mailto:")) {
        track("email_click", { email: href.slice(7).split("?")[0] });
      } else if (href.includes("forms.gle/") || href.includes("docs.google.com/forms")) {
        // Snagging bookings go to an external Google Form, so the click is the last step we can see.
        track("snagging_booking_click");
      }
    },
    true,
  );
};
