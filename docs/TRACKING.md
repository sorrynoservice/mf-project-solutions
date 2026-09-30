# Tracking, consent and lead capture

Container: **GTM-M82TT2JB** (loaded in `index.html`). The site only pushes to `window.dataLayer`;
every tag (GA4, Google Ads, Meta Pixel) lives in GTM.

Code: `src/lib/consent.ts`, `src/lib/track.ts`, `src/lib/attribution.ts`, `src/lib/whatsapp.ts`,
`src/components/ConsentBanner.tsx`, `src/components/forms/*`.

## 1. Consent

`index.html` sets Consent Mode v2 defaults **before** GTM loads:

| Signal | Default |
|---|---|
| ad_storage, ad_user_data, ad_personalization | denied |
| analytics_storage | denied |
| functionality_storage, security_storage | granted |

plus `wait_for_update: 500`, `ads_data_redaction: true`, `url_passthrough: true`. A saved choice in
`localStorage.mf_consent_v1` (`{analytics, marketing, ts}`) is re-applied immediately in the same script.

The banner (Accept all, Reject all, Choose) calls `saveConsent()`, which sends
`gtag('consent','update', …)` (Analytics maps to analytics_storage; Advertising maps to ad_storage,
ad_user_data, ad_personalization) and pushes:

```js
{ event: 'consent_update', consent_analytics: true|false, consent_marketing: true|false }
```

Withdrawing advertising consent also deletes the stored 90 day first-touch attribution.

## 2. dataLayer events

All events include `page_path`. `lead_route` is `property` (Wanessa), `small` (Rosana) or `major` (Alex).
`page_code` is the page's short code (e.g. `BTH`).

| Event | Parameters | Fired when |
|---|---|---|
| `enquiry_submit` | lead_route, service, page_code, form: `enquiry` | Enquiry form accepted by Web3Forms |
| `snagging_booking_submit` | lead_route: `property`, page_code, bedrooms | Snag booking form accepted |
| `whatsapp_click` | lead_route, page_code | Any `wa.me` link clicked |
| `phone_click` | lead_route, page_code | Any `tel:` link clicked |
| `email_click` | lead_route, page_code | Any `mailto:` link clicked |
| `calculator_result` | value | Garden calculator shows a result (call `track('calculator_result', { value })`) |
| `user_data_ready` | user_data: { email, phone_number (E.164) } | Just before a form conversion, **only** with advertising consent |
| `consent_update` | consent_analytics, consent_marketing | Visitor saves a cookie choice |
| `snagging_booking_click` | lead_route, page_code | Legacy: link to an external Google Form |

Link clicks are caught by one document listener (`installLinkTracking()`). Links can carry
`data-route` and `data-page`, or sit inside any element with `data-page`/`data-route`; if the route
is missing it is inferred from the phone number, WhatsApp number or email.

## 3. GTM setup

**Variables** (Data Layer Variable, version 2): `lead_route`, `page_code`, `service`, `form`,
`bedrooms`, `value`, `page_path`, `user_data.email`, `user_data.phone_number`.

**Triggers** (Custom Event): `enquiry_submit`, `snagging_booking_submit`, `whatsapp_click`,
`phone_click`, `email_click`, `calculator_result`, `user_data_ready`, `consent_update`.

**Google Ads conversion actions** (create in Google Ads, then one Conversion Tracking tag each):

| Conversion action | Trigger | Goal setting | Value |
|---|---|---|---|
| Enquiry form submitted | enquiry_submit | **Primary** | optional, by lead_route |
| Snagging booking submitted | snagging_booking_submit | **Primary** | optional |
| WhatsApp enquiry | whatsapp_click | **Secondary** for the first 30 days, then review | |
| Phone call click | phone_click | Secondary | |

Also add a **Conversion Linker** tag (All Pages). For **enhanced conversions**, turn on "Include
user-provided data" in the two primary conversion tags and set a User-Provided Data variable
(manual configuration) using `user_data.email` and `user_data.phone_number`. The site pushes these
only when advertising consent is granted, right before the conversion event.

**GA4**: Google tag (config) on Initialization, All Pages. One GA4 Event tag per custom event, using
the event name and passing lead_route, page_code, service, form, bedrooms, value as parameters. Mark
`enquiry_submit` and `snagging_booking_submit` as key events in GA4.

**Consent settings in GTM**:
- Google tags (GA4, Google Ads, Conversion Linker) have built-in consent checks: leave "Additional
  consent" as not required. With consent denied they send cookieless pings (Consent Mode advanced).
- **Meta Pixel** (Custom HTML or template): Consent Settings > Require additional consent >
  `ad_storage`. Fire the base code on a Consent Initialization or All Pages trigger plus the
  `consent_update` event so it loads as soon as consent is given; map `enquiry_submit` and
  `snagging_booking_submit` to the Meta `Lead` event and `whatsapp_click` to `Contact`.
- Enable Consent Overview in Admin > Container Settings to check every tag.

## 4. Lead capture

Forms post to Web3Forms (`settings.web3formsKey`) with subject `[<route label>] <service>: <name>`,
route, route_owner, page, page_code and all attribution fields (gclid, gbraid, wbraid, fbclid,
utm_*, landing_page, referrer, captured_at, first_* when a 90 day first touch exists). If
`settings.leadSheetUrl` is set they also post the same data to the Apps Script logger
(`scripts/lead-sheet/`). That second call never affects the visitor.

Attribution: `captureAttribution()` stores this session's touch in sessionStorage. With advertising
consent a first-touch copy is kept in localStorage for 90 days.

## 5. Test checklist

Use GTM Preview (Tag Assistant) on the preview deployment.

1. Fresh private window: banner appears after load, page is scrollable and clickable behind it.
   In Tag Assistant > Consent, all ad and analytics signals show **denied** on the default.
2. Reject all: `consent_update` with both false; reload; banner does not return; consent stays denied on page load.
3. Footer "Cookie settings" reopens the panel with toggles; focus moves into it; Escape closes it.
4. Accept all: `consent_update` true/true; Google Ads and GA4 tags fire normally; Meta Pixel fires.
5. Open `/?gclid=TEST123&utm_source=google&utm_medium=cpc&utm_campaign=test`, browse two pages, send an
   enquiry. The Web3Forms email and LEADS row show gclid TEST123, the landing page and Source `Google Ads`.
6. With advertising consent: `user_data_ready` fires **before** `enquiry_submit`, phone as `+353…`.
   With advertising denied: no `user_data_ready` at all.
7. `enquiry_submit` carries lead_route, service, page_code, form. The primary conversion tag fires once.
8. Snag booking: `snagging_booking_submit` with bedrooms; email subject `[Snagging booking] 3 bed: Name`.
9. Click WhatsApp, phone and email links on a service page: each event has lead_route and page_code.
   A WhatsApp link opens with "Hi MF Project Solutions, I'd like to ask about … (ref CODE)."
10. Block `api.web3forms.com` in DevTools and submit: error panel shows the email fallback and phone number.
11. Leave phone empty, submit: inline messages appear and focus moves to the first problem field.
12. View source of a prerendered page: no banner markup, no errors in the console on hydration.
