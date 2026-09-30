import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/site/Layout";
import ContactBlock from "@/components/site/ContactBlock";
import PageHero from "@/components/ui/PageHero";
import Pic from "@/components/ui/Pic";
import { GoogleBadge, ProjectCard, ReviewGrid, SectionHead } from "@/components/ui/Blocks";
import { residentialMain, residentialOther } from "@/components/site/nav";
import { projects, reviewsByIds, serviceByRoute } from "@/lib/content";

export default function Residential() {
  const main = residentialMain.map((l) => ({ l, s: serviceByRoute(l.to) })).filter((x) => x.s);
  const other = residentialOther.map((l) => ({ l, s: serviceByRoute(l.to) })).filter((x) => x.s);
  const res = projects.filter((p) => p.sector === "residential" && p.flagship).slice(0, 4);
  const reviews = reviewsByIds(["cathal-brennan-2025-10-19", "harry-english-2026-05-27", "paula-medici-2026-04-03"]);
  const phib = projects.find((p) => p.slug === "extension-renovation-phibsborough");

  return (
    <Layout header="overlay" page={{ route: "major", pageCode: "RES", service: "a residential project", contactHref: "#contact", ctaShort: "Discuss a project" }}>
      <PageHero
        eyebrow="Residential"
        title="Extensions, renovations and new rooms for your home"
        sub="We build to your architect's drawings or design the work with you first, then run the build with our own crew, joiners and specialist trades."
        image={phib?.hero}
        mobile={phib?.heroMobile}
        crumbs={[{ name: "Home", to: "/" }, { name: "Residential" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn-tan h-14 px-8 text-base">Discuss your project</a>
          <Link to="/projects" className="btn-ghost-light h-14 px-8 text-base">See our projects</Link>
        </div>
      </PageHero>

      <section className="py-20 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="What we build" title="Larger residential work" text="Most of our residential work is a large part of a house: structural openings, extensions, new services, kitchens and bathrooms, finished with joinery from our workshop." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {main.map(({ l, s }) => (
              <Link key={l.to} to={l.to} className="group overflow-hidden rounded-lg border border-border bg-white shadow-soft transition-shadow hover:shadow-luxury">
                <Pic item={s!.hero.image} className="aspect-[4/3]" layout="third" />
                <div className="p-6">
                  <h3 className="text-xl text-ink">{l.name}</h3>
                  <p className="mt-2 line-clamp-3 text-[15px] text-muted-foreground">{s!.hero.sub}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-all group-hover:gap-2.5">
                    {l.name} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-2xl text-ink">Other residential work</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {other.map(({ l, s }) => (
                <Link key={l.to} to={l.to} className="group flex items-center gap-4 rounded-lg border border-border bg-white p-3 hover:border-tan hover:bg-paper">
                  <Pic item={s!.hero.image} className="h-20 w-24 shrink-0 rounded-md" layout="thumb" badge={false} />
                  <div>
                    <div className="font-semibold text-ink">{l.name}</div>
                    <div className="mt-0.5 text-sm text-tan-deep group-hover:underline">See the work</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead className="mb-0" eyebrow="Projects" title="Residential projects" />
            <Link to="/projects" className="link-arrow text-ink">All projects <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {res.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead className="mb-0" eyebrow="Reviews" title="What homeowners say" />
            <GoogleBadge />
          </div>
          <ReviewGrid items={reviews} />
        </div>
      </section>

      <ContactBlock title="Planning work on your home?" text="Tell us what you have in mind and send drawings or photos if you have them. We will arrange a visit." pageCode="RES" />
    </Layout>
  );
}
