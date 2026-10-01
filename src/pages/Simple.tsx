import { Link, useLocation } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/site/Layout";
import ContactBlock from "@/components/site/ContactBlock";
import PageHero from "@/components/ui/PageHero";
import Pic from "@/components/ui/Pic";
import { Faq, SectionHead, Steps } from "@/components/ui/Blocks";
import { CookieSettingsLink } from "@/components/ConsentBanner";
import { settings } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import type { LeadRoute } from "@/lib/types";

/* Contact ------------------------------------------------------------------ */

export function Contact() {
  return (
    <Layout page={{ route: "major", pageCode: "CON", service: "a project", contactHref: "#contact", ctaShort: "Send an enquiry" }}>
      <PageHero
        eyebrow="Contact"
        title="Talk to the right person first time"
        sub="Choose what your enquiry is about and it goes straight to the person who handles it. Call or WhatsApp if that is easier; photos and drawings are simplest by WhatsApp or email."
        crumbs={[{ name: "Home", to: "/" }, { name: "Contact" }]}
      />
      <ContactBlock title="Send an enquiry" text="We aim to reply the same working day." pageCode="CON" />
      <section className="py-16">
        <div className="wrap grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl text-ink">Office and workshop</h2>
            <p className="text-[17px] text-neutral-700">{settings.company.address}, {settings.company.eircode}</p>
            <p className="mt-4 text-muted-foreground">We work {settings.serviceArea.summary}.</p>
          </div>
          <div>
            <h2 className="mb-3 text-2xl text-ink">Email</h2>
            <ul className="space-y-2 text-[17px]">
              <li>General and construction: <a className="text-ink underline underline-offset-4" href={`mailto:${settings.routes.small.email}`}>{settings.routes.small.email}</a></li>
              <li>Snagging and inspections: <a className="text-ink underline underline-offset-4" href={`mailto:${settings.routes.property.email}`}>{settings.routes.property.email}</a></li>
              <li>Larger projects and architects: <a className="text-ink underline underline-offset-4" href={`mailto:${settings.routes.major.email}`}>{settings.routes.major.email}</a></li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* How we work -------------------------------------------------------------- */

const steps = [
  { title: "First conversation", text: "Tell us what you have in mind by phone, WhatsApp or the form. Photos, drawings and rough sizes help." },
  { title: "Site visit", text: "We look at the house or unit with you, and at your drawings if you have them. Where a project needs design first, we explain how our design service works and what it costs." },
  { title: "Detailed written quotation", text: "A written quotation that lists what is included and what is not, with any allowances or provisional sums shown clearly." },
  { title: "Programme and contract", text: "Start date, sequence of work, payment stages and your contact at MF, agreed in writing before work starts." },
  { title: "The build", text: "Our crew, our joiners and the specialist trades we work with, run by your contact at MF, with progress photos as the work goes in." },
  { title: "Handover and close-out", text: "We walk the finished work with you, deal with anything outstanding, and close out the documentation with your design team." },
];

const faqs = [
  { q: "Do you work with my architect?", a: "Yes. Much of our larger work is built from an architect's drawings. We price from the tender package, work with the design team through the build and credit the architect on our projects page." },
  { q: "Can you design the project too?", a: "Yes. We develop layouts, interiors, 3D visualisation and planning drawings as a paid service, and bring in an architect, engineer or certifier where a project needs one. You can then have us build it, or not." },
  { q: "How are changes during the build handled?", a: "Any change is priced and agreed with you before it is carried out, so you always know where the cost stands." },
  { q: "Who will be on site?", a: "Our own crew does the building work and our joiners make and fit the joinery. Specialist work such as electrics and plumbing is done by trades we work with regularly, under our management." },
];

export function HowWeWork() {
  return (
    <Layout page={{ route: "major", pageCode: "HWW", service: "a project", contactHref: "#contact", ctaShort: "Discuss a project" }}>
      <PageHero
        eyebrow="How we work"
        title="How a project runs, from the first call to handover"
        sub="The same steps apply whether we are building from your architect's drawings or designed the work with you."
        crumbs={[{ name: "Home", to: "/" }, { name: "How we work" }]}
      />
      <section className="py-20">
        <div className="wrap">
          <h2 className="sr-only">The steps of a project</h2>
          <Steps items={steps.slice(0, 3)} />
          <div className="mt-10"><Steps items={steps.slice(3)} /></div>
        </div>
      </section>
      <section className="bg-paper py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHead className="mb-0" eyebrow="Questions" title="Working with us" />
          <Faq items={faqs} />
        </div>
      </section>
      <ContactBlock title="Ready to talk about your project?" text="Choose what it is about and it goes to the right person." pageCode="HWW" />
    </Layout>
  );
}

/* FAQs --------------------------------------------------------------------- */

const generalFaqs: { title: string; route: LeadRoute; items: { q: string; a: string; link?: { to: string; label: string } }[] }[] = [
  {
    title: "Getting started",
    route: "major",
    items: [
      { q: "How do I get a quotation?", a: "Send us a message by WhatsApp, phone or the form with photos, drawings or rough sizes. We arrange a visit and prepare a detailed written quotation for the work." },
      { q: "Which areas do you cover?", a: "We work within 50 km of Dunshaughlin, Co. Meath. That covers all of Dublin and towns across Meath, Kildare, Louth such as Drogheda, and north Wicklow." },
      { q: "Do you build from an architect's drawings?", a: "Yes. We price from your design team's tender package and work with them through the build. Where you have no drawings yet, our design service can develop them." },
      { q: "Is there anything you do not do?", a: "We do not do painting and decorating, general house repairs, or fit booster pumps. We do not provide structural engineering design or certification; those come from the appropriate external professional." },
    ],
  },
  {
    title: "Planning and regulations",
    route: "major",
    items: [
      { q: "Do I need planning permission for a garden room?", a: "Many garden rooms are exempt if they meet the conditions, including size and height limits and keeping enough rear garden. Our garden rooms page and guide explain the current rules.", link: { to: "/guides/garden-room-or-garden-home", label: "Read the guide: garden room or garden home" } },
      { q: "Can I build a garden home without planning permission?", a: "Since 27 July 2026 a detached garden home of 32 to 45 m² can be exempt if every condition is met, including notifying the council before you start. Our garden homes guide sets out the conditions.", link: { to: "/guides/garden-home-rules-2026", label: "Read the guide: garden home rules 2026" } },
      { q: "Do Building Regulations still apply if I do not need planning?", a: "Yes. Exempt work still has to comply with the Building Regulations, including structure, fire safety, insulation and drainage." },
    ],
  },
  {
    title: "Snagging and inspections",
    route: "property",
    items: [
      { q: "What is a snag inspection?", a: "A room by room inspection of a new home that records defects and unfinished work in a photo report you can send to the builder.", link: { to: "/guides/snag-list-new-build", label: "Read the guide: snag list for a new build" } },
      { q: "When should I book it?", a: "Before you close, once the builder says the house is finished, so the builder can fix the items before you move in. Contact Wanessa as soon as you have a date." },
      { q: "How much does it cost?", a: "Our snagging prices are fixed by house size and include VAT and travel within 50 km of Dunshaughlin. See the snagging page for the current prices." },
    ],
  },
];

export function Faqs() {
  return (
    <Layout page={{ route: "major", pageCode: "FAQ", service: "a project", contactHref: "/contact", ctaShort: "Ask a question" }}>
      <PageHero eyebrow="FAQs" title="Frequently asked questions" crumbs={[{ name: "Home", to: "/" }, { name: "FAQs" }]} />
      <section className="py-16 md:py-20">
        <div className="wrap space-y-16">
          {generalFaqs.map((g) => (
            <div key={g.title} className="grid gap-8 lg:grid-cols-[1fr_2fr]">
              <h2 className="text-2xl text-ink md:text-3xl">{g.title}</h2>
              <Faq items={g.items} />
            </div>
          ))}
          <div className="rounded-lg border border-border p-6">
            <p className="text-ink">
              More detail on each service is on its own page. Start with{" "}
              <Link to="/residential" className="underline underline-offset-4">residential work</Link>,{" "}
              <Link to="/commercial" className="underline underline-offset-4">commercial work</Link> or{" "}
              <Link to="/property-services" className="underline underline-offset-4">property inspections</Link>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* Legal -------------------------------------------------------------------- */

const LegalWrap = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Layout page={{ route: "small", pageCode: "LEG", service: "a question", contactHref: "/contact", ctaShort: "Contact us" }}>
    <PageHero eyebrow="Legal" title={title} crumbs={[{ name: "Home", to: "/" }, { name: title }]} />
    <article className="wrap max-w-3xl py-14 text-[16px] leading-relaxed text-neutral-700 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-ink [&_li]:mb-2 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">{children}</article>
  </Layout>
);

export function Privacy() {
  const c = settings.company;
  return (
    <LegalWrap title="Privacy policy">
      <p>Updated 30 September 2026.</p>
      <p>
        This policy explains how {c.legalName}, trading as {c.name} (company no. {c.companyReg}, {c.address}, {c.eircode}), collects and uses personal data when you use this website or contact us. We are the data controller.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>What you send us: your name, phone number, email, the area or Eircode of the property, details of your project, and anything you attach or write in a message.</li>
        <li>How you found us: the page you enquired from and, where present, the advertising or campaign reference in the web address (for example a Google Ads click reference).</li>
        <li>With your consent only: analytics and advertising cookies, described in our <Link to="/cookies" className="underline">cookie policy</Link>.</li>
      </ul>
      <h2>Why we use it</h2>
      <ul>
        <li>To reply to your enquiry, visit, quote and carry out the work you ask for (steps before and under a contract).</li>
        <li>To keep records of enquiries, quotations and jobs, and to understand which of our advertising brings genuine enquiries (our legitimate interests, and your consent where cookies are involved).</li>
        <li>To meet our legal obligations, for example tax and company records.</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>
        Only service providers that help us run the business, under contract: our website host (Vercel), our form delivery service (Web3Forms), Google (email, documents and spreadsheets where we keep enquiry records, and, with your consent, Google Analytics, Google Ads and Tag Manager), and Meta (Facebook and Instagram advertising measurement, only with your consent). Some of these providers may process data outside the European Economic Area under safeguards such as the EU Standard Contractual Clauses. We never sell personal data.
      </p>
      <h2>How long we keep it</h2>
      <p>Enquiries that do not become work are kept for up to two years. Records of quotations and jobs are kept for as long as needed for guarantees, tax and legal purposes, normally seven years.</p>
      <h2>Your rights</h2>
      <p>
        You can ask for a copy of your data, ask us to correct or delete it, object to or restrict its use, and withdraw consent at any time. Email <a className="underline" href={`mailto:${settings.routes.small.email}`}>{settings.routes.small.email}</a>. You can also complain to the Data Protection Commission (dataprotection.ie).
      </p>
    </LegalWrap>
  );
}

export function Cookies() {
  return (
    <LegalWrap title="Cookie policy">
      <p>Updated 30 September 2026.</p>
      <p>We only use analytics and advertising cookies if you agree. You can change your choice at any time: <CookieSettingsLink className="font-semibold text-ink underline" label="open cookie settings" />.</p>
      <h2>Always on</h2>
      <ul>
        <li><strong>Your cookie choice</strong> (mf_consent_v1, stored in your browser): remembers what you chose so we do not ask on every page.</li>
        <li><strong>Enquiry reference</strong> (stored for your visit only): keeps the page you arrived on and any campaign reference so it can be sent with an enquiry you choose to submit.</li>
      </ul>
      <h2>Analytics, only with consent</h2>
      <ul>
        <li><strong>Google Analytics</strong> (_ga, _ga_*): shows which pages people use and which help them get in touch. Kept up to 2 years.</li>
      </ul>
      <h2>Advertising, only with consent</h2>
      <ul>
        <li><strong>Google Ads</strong> (_gcl_au, _gcl_aw and similar): tells us which ads lead to enquiries. Kept up to 90 days.</li>
        <li><strong>Meta</strong> (_fbp, if our Meta tag is active): measures which Facebook and Instagram ads lead to enquiries. Kept up to 90 days.</li>
      </ul>
      <p>If you reject these, Google may still receive a cookieless signal that a page was viewed or an enquiry sent, without identifiers, as part of Google Consent Mode.</p>
    </LegalWrap>
  );
}

/* Thank you and 404 ---------------------------------------------------------- */

export function ThankYou() {
  const loc = useLocation();
  const route = (new URLSearchParams(loc.search).get("route") as LeadRoute) || "small";
  const r = settings.routes[route] ?? settings.routes.small;
  return (
    <Layout page={{ route, pageCode: "TY", service: "my enquiry", contactHref: "/contact", ctaShort: "Contact" }}>
      <section className="py-24">
        <div className="wrap max-w-2xl text-center">
          <div className="eyebrow mb-3 text-tan-deep">Thank you</div>
          <h1 className="text-4xl text-ink md:text-5xl">Your enquiry has been sent</h1>
          <p className="mt-5 text-lg text-muted-foreground">{r.person} will be in touch. If it is urgent, call or WhatsApp.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={r.tel} data-route={route} data-page="TY" className="btn-ink"><Phone className="h-4 w-4" /> {r.phone}</a>
            <a href={waLink(route, "TY")} target="_blank" rel="noreferrer" data-route={route} data-page="TY" className="btn-ghost-ink"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
          </div>
          <Link to="/projects" className="link-arrow mt-10 text-ink">See our projects <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </Layout>
  );
}

export function NotFound() {
  return (
    <Layout page={{ route: "major", pageCode: "404", service: "a project", contactHref: "/contact", ctaShort: "Contact" }}>
      <section className="py-24">
        <div className="wrap max-w-3xl">
          <div className="eyebrow mb-3 text-tan-deep">Page not found</div>
          <h1 className="text-4xl text-ink md:text-5xl">We could not find that page</h1>
          <p className="mt-5 text-lg text-muted-foreground">It may have moved when we updated the website. These are good places to start:</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ["Projects", "/projects"],
              ["Residential work", "/residential"],
              ["Commercial work", "/commercial"],
              ["Snagging inspections", "/snagging"],
              ["Garden rooms", "/garden-rooms"],
              ["Contact", "/contact"],
            ].map(([n, to]) => (
              <li key={to}><Link to={to} className="flex items-center justify-between rounded-md border border-border p-4 text-ink hover:border-tan hover:bg-paper">{n} <ArrowRight className="h-4 w-4" /></Link></li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export { Pic };
