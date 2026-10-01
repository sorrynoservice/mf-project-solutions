import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import Layout from "@/components/site/Layout";
import ContactBlock from "@/components/site/ContactBlock";
import PageHero from "@/components/ui/PageHero";
import Img from "@/components/Img";
import Pic from "@/components/ui/Pic";
import Video from "@/components/ui/Video";
import { GoogleBadge, Pending, ReviewGrid, SectionHead } from "@/components/ui/Blocks";
import { people, reviewsByIds, settings, visible } from "@/lib/content";
import type { MediaItem } from "@/lib/types";

const REVIEWS = ["cathal-brennan-2025-10-19", "simon-chuberre-2026-05-27", "lilian-ramos-2025-05-29"];

const crew: MediaItem = { image: "/assets/work/phibsborough-whole-crew-in-branded-kit-beside-the-mf-01.jpg", caption: "Our crew on site in Phibsborough" };
const workshop: MediaItem[] = [
  { image: "/assets/work/workshop-joiner-at-the-panel-saw-in-mf-workshop-10.jpg", caption: "At the panel saw in our Drumree workshop" },
  { image: "/assets/work/workshop-measuring-a-worktop-in-the-workshop-13.jpg", caption: "Measuring a worktop before fitting" },
  { image: "/assets/work/phibsborough-site-lead-directing-the-team-07.jpg", caption: "Site lead with the team, Phibsborough" },
];

export default function About() {
  // A person without a photo is not shown until one is supplied (no placeholder portraits).
  const team = people.filter(visible).filter((p) => !!p.headshot);
  return (
    <Layout header="overlay" page={{ route: "major", pageCode: "ABT", service: "a project", contactHref: "#contact", ctaShort: "Get in touch" }}>
      <PageHero
        eyebrow="About us"
        title="A family-run construction company, with the owners on the job"
        sub="MF Project Solutions builds extensions, renovations and commercial fit-outs across Dublin, Meath and Kildare, with our own site crew and a joinery workshop in Drumree, Co. Meath."
        image={crew}
        crumbs={[{ name: "Home", to: "/" }, { name: "About" }]}
      />

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div>
          <SectionHead className="mb-6" eyebrow="Who we are" title="Professional delivery, and a person you can call" />
          <div className="prose-mf text-lg text-neutral-700">
            <p>
              MF is a family business, led day to day by Alex Ferreira and Wanessa Correa. They have called Ireland home for about 13 years, after earlier years in Brazil and the United States.
            </p>
            <p>
              Alex founded the company in 2021. Today we build structural openings, extensions, whole-house renovations, commercial fit-outs and the joinery that finishes them. Our crew builds the work, our joiners make the kitchens and joinery in our own workshop, and we bring in specialist trades, architects, engineers and certifiers where a project needs them.
            </p>
            <p>
              We are growing, and we intend to keep the thing clients tell us they value: you deal with a named person from the first visit to handover.
            </p>
          </div>
          </div>
          <div className="mx-auto w-full max-w-xs">
            <Video video={{ src: "/media/video/alex-intro.mp4", poster: "/media/video/alex-intro.jpg", caption: "Alex on what MF does, from new builds and renovations to kitchens and gardens", loop: false }} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="The people who run MF" title="Who you will deal with" />
          <div className="grid gap-8 md:grid-cols-2">
            {team.map((p, i) => {
              const route = p.route && p.route !== "none" ? settings.routes[p.route] : undefined;
              // An odd last card sits centred at the same width, instead of alone on the left.
              const lastOdd = team.length % 2 === 1 && i === team.length - 1 && team.length > 1;
              return (
                <article key={p.id} className={`flex flex-col gap-5 rounded-lg border border-border bg-white p-6 sm:flex-row ${lastOdd ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1rem)]" : ""}`}>
                  <Img src={p.headshot} alt={p.name} layout="(min-width: 640px) 160px, 100vw" className="h-40 w-40 shrink-0 rounded-md object-cover" />
                  <div>
                    <Pending note={p.pending} className="mb-3" />
                    <h3 className="text-2xl text-ink">{p.name}</h3>
                    <div className="eyebrow mt-1 text-tan-deep">{p.role}</div>
                    <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-neutral-700">
                      {p.bio.map((b) => (
                        <p key={b.slice(0, 30)}>{b}</p>
                      ))}
                    </div>
                    {route && (
                      <a href={route.tel} data-route={p.route} data-page="ABT" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                        <Phone className="h-4 w-4" /> {route.phone}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="The crew and the workshop" title="The people who build it" text="Our own site crew does the building work, and our joiners make and fit the kitchens, wardrobes, panelling and reception desks in our workshop in Drumree. Specialist trades and suppliers we work with regularly complete the team." />
          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <Pic item={crew} className="aspect-[4/3] rounded-lg md:row-span-2 md:aspect-auto" layout="(min-width: 768px) 58vw, 100vw" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              {workshop.slice(0, 2).map((m) => (
                <Pic key={m.image} item={m} className="aspect-[4/3] rounded-lg" layout="(min-width: 768px) 40vw, 50vw" />
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-center">
            <div className="mx-auto w-full max-w-xs">
              <Video video={{ src: "/media/video/V091.mp4", poster: "/media/video/V091.jpg", caption: "Our workshop in Drumree", loop: true }} />
            </div>
            <div>
              <h3 className="text-2xl text-ink">How we deliver a project</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-neutral-700">
                MF contracts for the agreed scope and manages the people needed to deliver it: our crew, our joiners, specialist trades such as electricians and plumbers, suppliers, and external architects, engineers and certifiers where the work calls for them. You have one point of contact at MF throughout.
              </p>
              <Link to="/how-we-work" className="link-arrow mt-5 text-ink">How we work <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead className="mb-0" eyebrow="Reviews" title="What clients say about working with us" />
            <GoogleBadge />
          </div>
          <ReviewGrid items={reviewsByIds(REVIEWS)} />
        </div>
      </section>

      <section className="py-14">
        <div className="wrap">
          <h2 className="mb-4 text-xl text-ink">Company details</h2>
          <dl className="grid gap-x-10 gap-y-3 text-[15px] sm:grid-cols-2">
            <div><dt className="text-muted-foreground">Registered name</dt><dd className="text-ink">{settings.company.legalName}, trading as {settings.company.name}</dd></div>
            <div><dt className="text-muted-foreground">Company number</dt><dd className="text-ink">{settings.company.companyReg} (Ireland)</dd></div>
            <div><dt className="text-muted-foreground">VAT</dt><dd className="text-ink">{settings.company.vat}</dd></div>
            <div><dt className="text-muted-foreground">Office and workshop</dt><dd className="text-ink">{settings.company.address}, {settings.company.eircode}</dd></div>
          </dl>
        </div>
      </section>

      <ContactBlock title="Get in touch" text="Choose what it is about and it goes to the right person." pageCode="ABT" />
    </Layout>
  );
}
