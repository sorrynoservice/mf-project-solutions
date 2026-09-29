import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { findCase } from "@/data/caseStudies";
import { commercialDesign, findPage, servicePages } from "@/data/servicePages";
import { CaseCard, ContactSection, Gallery, PageHero, PairCard, SectionTitle, wrap } from "@/components/work/Work";
import { useSeo } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

const galleryFor: Record<string, string> = {"residential": "kitchens", "whole-house": "interiors", "extensions": "extensions", "kitchens-bathrooms": "kitchens", "joinery": "joinery", "garden-buildings": "garden", "outdoor-living": "outdoor", "interior-design": "design", "commercial": "commercial"};

const ServiceLanding = ({ route }: { route: string }) => {
  useSeo(route);
  const page = findPage(route);
  if (!page) return <NotFound />;
  const featured = page.featured.map((s) => findCase(s)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const isHub = page.key === "residential";
  const children = isHub ? servicePages.filter((p) => p.route.startsWith("/residential/")) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header variant="home" />
      <PageHero id={page.hero} eyebrow={page.eyebrow} title={page.title} lead={page.lead}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="inline-flex items-center h-12 rounded-lg px-6 font-semibold bg-[#d4af37] text-[#0a2e2a] hover:bg-[#d4af37]/90">
            Arrange a site visit
          </a>
          <a href="#projects" className="inline-flex items-center h-12 rounded-lg px-6 font-semibold border-2 border-white/80 text-white hover:bg-white/10">
            See the projects
          </a>
        </div>
      </PageHero>

      <section className="py-16 md:py-20">
        <div className={`${wrap} grid lg:grid-cols-5 gap-12`}>
          <div className="lg:col-span-3 space-y-5 text-lg text-foreground/85 leading-relaxed">
            {page.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {page.includes.length > 0 && (
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-[#0a2e2a] text-white p-7">
                <h2 className="font-serif text-2xl mb-5">What we do</h2>
                <ul className="space-y-4">
                  {page.includes.map((i) => (
                    <li key={i.title} className="flex gap-3">
                      <Check className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold">{i.title}</div>
                        <div className="text-sm text-white/75">{i.text}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {isHub && (
        <section className="pb-16">
          <div className={`${wrap} grid sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {children.map((c) => (
              <Link
                key={c.route}
                to={c.route}
                className="group flex items-center justify-between rounded-xl border border-border p-5 hover:border-[#d4af37] hover:bg-muted/40 transition-colors"
              >
                <span className="font-semibold text-foreground">{c.name}</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {page.pairs && page.pairs.length > 0 && (
        <section className="py-16 bg-muted/30 border-y border-border">
          <div className={wrap}>
            <SectionTitle eyebrow="Designed, then built" title="The design beside the finished result" text="Where we have the design and the photographs of the finished room, we show them together." />
            <div className="grid md:grid-cols-2 gap-6">
              {page.pairs.map((p) => (
                <PairCard key={p.design + p.built} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="projects" className="py-16 md:py-20 scroll-mt-20">
        <div className={wrap}>
          <SectionTitle eyebrow="Projects" title={isHub ? "Recent residential projects" : "Projects"} />
          <div className={`grid sm:grid-cols-2 gap-6 ${featured.length === 4 || featured.length === 2 ? "" : "lg:grid-cols-3"}`}>
            {featured.map((c, i) => (
              <CaseCard key={c.slug} c={c} eager={i < 3} ctx={page.key} />
            ))}
          </div>
          <Link to={page.key === "commercial" ? "/projects?sector=Commercial" : isHub ? "/projects?sector=Residential" : `/projects?service=${page.key}`} className="mt-8 inline-flex items-center gap-2 font-semibold text-foreground hover:gap-3 transition-all">
            All projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {page.key === "commercial" && (
        <section className="py-16 bg-muted/30 border-y border-border">
          <div className={wrap}>
            <SectionTitle
              eyebrow="Commercial design"
              title="Design work for restaurants and food halls"
              text="Layouts, 3D views and joinery details prepared by MF. These are design images, not photographs of finished units."
            />
            <div className="space-y-12">
              {commercialDesign.map((d) => (
                <div key={d.title}>
                  <h3 className="text-xl font-bold text-foreground">{d.title}</h3>
                  <p className="text-muted-foreground mb-4">{d.text}</p>
                  <Gallery ids={d.images} cols={d.images.length === 4 ? 4 : 3} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.gallery && page.gallery.length > 0 && (
        <section className="py-16">
          <div className={wrap}>
            <SectionTitle eyebrow="Gallery" title="More of this work" />
            <Gallery ids={page.gallery} cols={4} />
            <Link to={`/gallery?type=${galleryFor[page.key] ?? "kitchens"}`} className="mt-8 inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all">
              See all photos in the gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {page.faqs && page.faqs.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className={`${wrap} max-w-4xl`}>
            <SectionTitle title="Questions we are often asked" />
            <div className="divide-y divide-border border-y border-border">
              {page.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex justify-between gap-4 font-semibold text-foreground">
                    {f.q}
                    <span className="text-[#8a6d12] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.related && (
        <section className="pb-4">
          <div className={`${wrap} flex flex-wrap gap-3`}>
            {page.related.map((r) => (
              <Link key={r.to} to={r.to} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">
                {r.label} <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <ContactSection formType={page.formType} />
      <SiteFooter tagline={page.name} />
    </div>
  );
};

export default ServiceLanding;
