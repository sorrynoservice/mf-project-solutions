import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/site/Layout";
import PageHero from "@/components/ui/PageHero";
import Img from "@/components/Img";
import Video from "@/components/ui/Video";
import { GoogleBadge, ReviewGrid, SectionHead } from "@/components/ui/Blocks";
import { people, reviewsByIds, serviceByRoute, settings } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";

const REVIEWS = ["gabriela-otaviano-2025-12-06", "pedro-henrique-meyer-2025-11-18", "leonardo-baptista-de-jesus-2025-03-30"];

export default function PropertyServices() {
  const snag = serviceByRoute("/snagging");
  const pps = serviceByRoute("/pre-purchase-survey");
  const w = people.find((p) => p.id === "wanessa-correa");
  const r = settings.routes.property;
  const cards = [snag, pps].filter(Boolean);
  const sample = ["/media/snag-report/page-1.jpg", "/media/snag-report/page-2.jpg", "/media/snag-report/page-3.jpg"];
  return (
    <Layout header="solid" page={{ route: "property", pageCode: "PRS", service: "a property inspection", contactHref: "/snagging#enquire", ctaShort: "Book an inspection" }}>
      <PageHero
        eyebrow="Property services"
        title="Snagging and pre-purchase inspections"
        sub="Careful inspections by construction people, with a clear photo report you can act on. Led by Wanessa, who is your contact from booking to report."
        crumbs={[{ name: "Home", to: "/" }, { name: "Property services" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/snagging#enquire" className="btn-tan h-14 px-8 text-base">Book a snag inspection</Link>
          <a href={waLink("property", "PRS", "a property inspection")} target="_blank" rel="noreferrer" data-route="property" data-page="PRS" className="btn-ghost-light h-14">
            <MessageCircle className="h-5 w-5" /> WhatsApp Wanessa
          </a>
        </div>
        <div className="mt-7">
          <GoogleBadge tone="dark" />
        </div>
      </PageHero>

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {cards.map((s) => (
            <Link key={s!.route} to={s!.route} className="group flex flex-col rounded-lg border border-border bg-white p-8 shadow-soft transition-shadow hover:shadow-luxury">
              <div className="eyebrow mb-3 text-tan-deep">{s!.hero.eyebrow}</div>
              <h2 className="text-2xl text-ink md:text-3xl">{s!.name}</h2>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed text-muted-foreground">{s!.hero.sub}</p>
              {s!.price?.confirmed && !s!.price.table?.length && <p className="mt-4 font-semibold text-ink">{s!.price.headline}</p>}
              {s!.price?.confirmed && !!s!.price.table?.length && (
                <div className="mt-4">
                  <p className="font-semibold text-ink">{s!.price.headline}</p>
                  <dl className="mt-2 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 text-[15px] text-muted-foreground">
                    {s!.price.table.filter((row) => /bedroom/i.test(row.label)).map((row) => (
                      <div key={row.label} className="contents">
                        <dt>{row.label}</dt>
                        <dd className="text-right font-semibold tabular-nums text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-ink transition-all group-hover:gap-2.5">
                {s!.hero.ctaLabel} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <SectionHead className="mb-6" eyebrow="Who inspects" title="Led by Wanessa" />
            <div className="flex items-start gap-5">
              {w && <Img src={w.headshot} alt={w.name} layout="thumb" className="h-24 w-24 shrink-0 rounded-full object-cover" />}
              <div className="space-y-3 text-[17px] leading-relaxed text-neutral-700">
                {w?.bio.map((b) => <p key={b.slice(0, 30)}>{b}</p>)}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-[15px]">
              <a href={r.tel} data-route="property" data-page="PRS" className="flex items-center gap-2 font-semibold text-ink"><Phone className="h-4 w-4" /> {r.phone}</a>
              <a href={`mailto:${r.email}`} className="text-ink underline underline-offset-4">{r.email}</a>
            </div>
          </div>
          {snag?.video && (
            <div className="mx-auto w-full max-w-xs">
              <Video video={snag.video} />
            </div>
          )}
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="The report" title="What a real MF snag report looks like" text="Pages from a report we issued, with the client's details removed. Each defect is photographed, located and described so the builder knows exactly what to fix." />
          <div className="grid gap-4 sm:grid-cols-3">
            {sample.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-lg border border-border bg-white shadow-soft">
                <Img src={src} alt={`Snag report, page ${i + 1} (client details removed)`} layout="third" className="h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead className="mb-0" eyebrow="Reviews" title="What buyers say" />
            <GoogleBadge />
          </div>
          <ReviewGrid items={reviewsByIds(REVIEWS)} />
        </div>
      </section>
    </Layout>
  );
}
