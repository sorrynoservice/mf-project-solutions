import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ClipboardList, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { contacts } from "@/data/site";
import { useSeo } from "@/lib/seo";

const wrap = "max-w-4xl mx-auto px-8 sm:px-11 md:px-16";

type Faq = { q: string; a: string; link?: { to: string; label: string } };
type Group = { id: string; heading: string; items: Faq[] };

/**
 * Questions only go here once the answer is confirmed. VAT and insurance
 * answers are waiting on Alex and are deliberately left out.
 */
const groups: Group[] = [
  {
    id: "getting-started",
    heading: "Getting started",
    items: [
      {
        q: "How do I get a quote?",
        a: "Send us a WhatsApp or fill in the enquiry form with your project type, location and a few photos. We then arrange a free site visit and send you a written, itemised quote.",
      },
      {
        q: "Is the site visit free?",
        a: "Yes. We visit, measure, talk through what you want and check planning at no cost.",
      },
      {
        q: "Which areas do you cover?",
        a: "Anywhere within 50km of Dunshaughlin, Co. Meath. That takes in all of Dublin, most of Meath and Kildare, Drogheda and Ardee in Louth, Bray and Blessington in Wicklow, and Kinnegad and Edenderry.",
      },
      {
        q: "Do you speak Portuguese?",
        a: "Yes. Our team works in English and Brazilian Portuguese.",
      },
      {
        q: "Who will actually do the work?",
        a: "Our own build team of around 15 people, with specialist trades such as electricians and plumbers managed by us. Joinery is made in our own workshop in Drumree, Co. Meath. You have one point of contact from quote to handover.",
      },
    ],
  },
  {
    id: "planning",
    heading: "Planning permission",
    items: [
      {
        q: "Do I need planning permission for a garden room?",
        a: "Since 27 July 2026, garden rooms up to 30m² used as a home office, gym, studio or similar are usually exempt, as long as they are behind the front wall of the house, no higher than 4m with a pitched roof or 3m with a flat roof, and at least 25m² of rear garden is left. Existing sheds count towards the 30m². A room used to live or sleep in is different, see the next question.",
        link: { to: "/garden-rooms", label: "Garden rooms" },
      },
      {
        q: "Can I build a granny flat without planning permission?",
        a: "In many cases, yes. The new rules allow a detached garden dwelling of 32m² to 45m² without planning, if it is used together with the main house (which must be the owner's home), is not sold or let separately, is not used for short term letting, has its services connected through the main house, and the council is notified at least 14 days before work starts. It must be completed by 31 December 2030.",
        link: { to: "/granny-flats", label: "Granny flats: the full list of conditions" },
      },
      {
        q: "What size extension can I build without planning?",
        a: "Rear extensions up to 45m², subject to conditions on height, boundaries and remaining garden space. Side and rear dormers are also now exempt in many cases.",
        link: { to: "/home-extensions", label: "Home extensions" },
      },
      {
        q: "What if my project needs planning permission?",
        a: "We can prepare and manage the application for you, or work with your architect.",
      },
      {
        q: "Do Building Regulations still apply if I don't need planning?",
        a: "Yes. Every build must meet Building Regulations, including structure, fire safety, insulation and ventilation. We build to them on every project.",
      },
    ],
  },
  {
    id: "costs",
    heading: "Costs",
    items: [
      {
        q: "How much does a garden room cost?",
        a: "It depends on the size, specification, and how far the room is from the house for power, water and drainage. We give a fixed, itemised quote after the site visit.",
      },
      {
        q: "Are service connections included?",
        a: "Connections for electricity, water and drainage, and any trenching and groundworks, are quoted as separate items so you can see exactly what each part costs.",
      },
      {
        q: "How do payments work?",
        a: "Payments are staged: a deposit to book your start date, then instalments as the work progresses. The full schedule is set out in your quote before you commit.",
      },
      {
        q: "What happens if I want to change something during the build?",
        a: "We price any change in writing before doing the work, so there are no surprises on the final bill.",
      },
    ],
  },
  {
    id: "during-the-build",
    heading: "During the build",
    items: [
      {
        q: "How long does a garden room take?",
        a: "Typically 6 to 8 weeks from start on site to completion, depending on size and specification.",
      },
      {
        q: "Do I need to be at home during the works?",
        a: "No. We only need access to the site and to the power and water supply at the main house.",
      },
      {
        q: "What guarantee do you give?",
        a: "12 months on our workmanship from handover: if a defect in our work shows up in that time, we come back and fix it at no cost. Products and materials carry their manufacturers' guarantees, which we pass to you in writing at handover. This is on top of your rights under consumer law.",
      },
      {
        q: "Is there anything you don't do?",
        a: "We do not run internet or data cabling, or supply booster pumps. Painting is limited to white finishes where included in the quote. Your quote lists exactly what is and isn't included.",
      },
    ],
  },
  {
    id: "snagging",
    heading: "Snagging inspections",
    items: [
      {
        q: "What is a snag inspection?",
        a: "A detailed inspection of a new build home before you close or move in, to find defects the builder needs to fix.",
      },
      {
        q: "When should I book it?",
        a: "As soon as the builder gives you a date for the home to be ready for inspection. We can usually inspect within a few days.",
      },
      {
        q: "How quickly do I get the report?",
        a: "Within 24 to 48 hours, with photos and a clear description of each item.",
      },
      {
        q: "Do you do re-inspections?",
        a: "Yes. Once the builder says the snags are fixed, we can return and check each item.",
      },
      {
        q: "Do I need to be there?",
        a: "No. Many clients are not present. We walk you through the report afterwards.",
      },
      {
        q: "How much does a snag inspection cost?",
        a: "Prices depend on the property type and are listed on our snagging page.",
        link: { to: "/snagging#pricing", label: "Snagging prices" },
      },
    ],
  },
];

const Faqs = () => {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: groups.flatMap((g) =>
        g.items.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      ),
    }),
    [],
  );

  useSeo("/faqs", { jsonLd });

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />

      <section className="pt-32 pb-12 border-b border-border">
        <div className={wrap}>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Planning rules, costs, timelines and snagging. If your question isn't here, WhatsApp us.
          </p>
          <nav aria-label="FAQ sections" className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="px-4 py-2 rounded-full border border-border text-sm text-foreground hover:bg-muted transition-colors"
              >
                {g.heading}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {groups.map((g, gi) => (
        <section
          key={g.id}
          id={g.id}
          className={`py-16 border-t border-border scroll-mt-24${gi % 2 === 0 ? " bg-muted/30" : ""}`}
        >
          <div className={wrap}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{g.heading}</h2>
            <div className="space-y-3">
              {g.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-border shadow-soft bg-card p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                    {item.q}
                    <ChevronDown className="w-5 h-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-muted-foreground">{item.a}</p>
                  {item.link && (
                    <Link to={item.link.to} className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
                      {item.link.label}
                    </Link>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="contact" className="py-16 border-t border-border">
        <div className={`${wrap} grid md:grid-cols-2 gap-6`}>
          <div className="rounded-2xl border border-border shadow-soft p-6 bg-card">
            <div className="flex items-center gap-2 text-foreground font-semibold mb-3">
              <MessageSquare className="w-5 h-5 text-accent" /> Didn't find your answer?
            </div>
            <a
              href={contacts.construction.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="text-accent font-medium hover:underline"
            >
              WhatsApp us on {contacts.construction.display}
            </a>
          </div>
          <div className="rounded-2xl border border-border shadow-soft p-6 bg-card">
            <div className="flex items-center gap-2 text-foreground font-semibold mb-3">
              <ClipboardList className="w-5 h-5 text-accent" /> Snagging questions
            </div>
            <a
              href={contacts.snagging.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="text-accent font-medium hover:underline"
            >
              WhatsApp Wanessa on {contacts.snagging.display}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Frequently Asked Questions" />
    </div>
  );
};

export default Faqs;
