import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/site/Layout";
import ContactBlock from "@/components/site/ContactBlock";
import PageHero from "@/components/ui/PageHero";
import Pic from "@/components/ui/Pic";
import Gallery from "@/components/ui/Gallery";
import Video from "@/components/ui/Video";
import { Compare, Pair } from "@/components/ui/Pair";
import { Crumbs, Pending, ProjectCard, ReviewGrid, SectionHead } from "@/components/ui/Blocks";
import { projectBySlug, projects, reviewsByIds, serviceByRoute } from "@/lib/content";
import type { Project, ProjectStageKey } from "@/lib/types";

const FILTERS: { tag: string; label: string }[] = [
  { tag: "all", label: "All" },
  { tag: "extension", label: "Extensions" },
  { tag: "renovation", label: "Renovations" },
  { tag: "commercial", label: "Commercial" },
  { tag: "kitchen", label: "Kitchens" },
  { tag: "bathroom", label: "Bathrooms" },
  { tag: "joinery", label: "Joinery" },
  { tag: "design", label: "Design" },
  { tag: "attic", label: "Attics" },
  { tag: "garden-home", label: "Garden homes" },
  { tag: "garden-room", label: "Garden rooms" },
  { tag: "veranda", label: "Verandas and glass rooms" },
  { tag: "landscaping", label: "Landscaping" },
];

export function Projects() {
  const [tag, setTag] = useState("all");
  const list = useMemo(() => (tag === "all" ? projects : projects.filter((p) => p.categories.includes(tag))), [tag]);
  const available = FILTERS.filter((f) => f.tag === "all" || projects.some((p) => p.categories.includes(f.tag)));
  const flag = list.filter((p) => p.flagship);
  const rest = list.filter((p) => !p.flagship);
  return (
    <Layout page={{ route: "major", pageCode: "PRJ", service: "a project", contactHref: "#contact", ctaShort: "Discuss a project" }}>
      <PageHero
        eyebrow="Projects"
        title="Our projects, from before to handover"
        sub="Homes and commercial units we have built, with our role on each stated plainly and the architect credited where the design is theirs."
        crumbs={[{ name: "Home", to: "/" }, { name: "Projects" }]}
      />
      <section className="py-14 md:py-20">
        <div className="wrap">
          <div className="-mx-5 mb-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <div className="flex gap-2 sm:flex-wrap" role="group" aria-label="Filter projects">
              {available.map((f) => (
                <button
                  key={f.tag}
                  type="button"
                  onClick={() => setTag(f.tag)}
                  aria-pressed={tag === f.tag}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${tag === f.tag ? "border-ink bg-ink text-white" : "border-border bg-white text-ink hover:border-ink"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          {flag.length > 0 && (
            <div className="mb-12 grid gap-6 md:grid-cols-2">
              {flag.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          )}
          {rest.length > 0 && (
            <>
              {flag.length > 0 && <h2 className="mb-6 text-2xl text-ink">More projects</h2>}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <ProjectCard key={p.slug} p={p} compact />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <ContactBlock title="Have a project in mind?" text="Tell us about it and it goes to the right person." pageCode="PRJ" />
    </Layout>
  );
}

const stageTitle: Record<ProjectStageKey, string> = {
  existing: "Existing condition",
  design: "Brief and design",
  construction: "Construction",
  technical: "Structural and technical work",
  services: "Services and coordination",
  finishes: "Finishes and joinery",
  completed: "Completed",
};

/** Service page that best matches a project, for the closing link. */
const serviceFor = (p: Project) => {
  const map: Record<string, string> = {
    commercial: "/commercial-fit-outs",
    extension: "/home-extensions",
    renovation: "/house-renovations",
    "garden-home": "/granny-flats",
    "garden-room": "/garden-rooms",
    veranda: "/timber-verandas-glass-rooms",
    attic: "/attic-conversions",
    bathroom: "/bathroom-renovations",
    kitchen: "/kitchens",
    landscaping: "/landscaping",
    patio: "/porcelain-patios",
    joinery: "/bespoke-joinery",
  };
  for (const c of p.categories) if (map[c]) return serviceByRoute(map[c]);
  return undefined;
};

export function ProjectDetail({ slug: fixed }: { slug?: string }) {
  const params = useParams();
  const p = projectBySlug(fixed ?? params.slug ?? "");
  if (!p) return null;
  const svc = serviceFor(p);
  const route = svc?.leadRoute ?? (p.sector === "commercial" ? "major" : "major");
  const related = projects.filter((x) => x.slug !== p.slug && x.categories.some((c) => p.categories.includes(c))).slice(0, 3);
  const reviews = reviewsByIds(p.reviews ?? []);
  const story = (p.stages ?? []).filter((s) => s.images.length || s.text);
  const beforeAfter = (p.pairs ?? []).filter((x) => x.type === "before-after");
  const designBuilt = (p.pairs ?? []).filter((x) => x.type === "design-built");

  return (
    <Layout header="overlay" page={{ route, pageCode: svc?.pageCode ?? "PRJ", service: svc?.name.toLowerCase() ?? "a project", contactHref: "#contact", ctaShort: "Discuss a project" }}>
      <PageHero
        eyebrow={`${p.sector === "commercial" ? "Commercial" : "Residential"} project`}
        title={p.title}
        sub={p.summary}
        image={p.hero}
        mobile={p.heroMobile}
        crumbs={[{ name: "Home", to: "/" }, { name: "Projects", to: "/projects" }, { name: p.title }]}
        size="full"
      />

      {/* Facts panel */}
      <section className="border-b border-border bg-paper">
        <div className="wrap py-10">
          <Pending note={p.pending} className="mb-5" />
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="eyebrow text-tan-deep">Location</dt><dd className="mt-1 text-ink">{p.location}</dd></div>
            {p.year && <div><dt className="eyebrow text-tan-deep">When</dt><dd className="mt-1 text-ink">{p.year}</dd></div>}
            <div className="lg:col-span-2"><dt className="eyebrow text-tan-deep">Our role</dt><dd className="mt-1 text-ink">{p.role}</dd></div>
            {p.architect && <div><dt className="eyebrow text-tan-deep">Architect</dt><dd className="mt-1 text-ink">{p.architect}</dd></div>}
          </dl>
        </div>
      </section>

      {(p.intro?.length || p.scope?.length) && (
        <section className="py-16 md:py-20">
          <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="prose-mf text-lg text-neutral-700">
              {(p.intro ?? []).map((t) => (
                <p key={t.slice(0, 30)}>{t}</p>
              ))}
            </div>
            {p.scope?.length ? (
              <div className="rounded-lg border border-border p-6">
                <h2 className="mb-4 text-xl text-ink">Scope of work</h2>
                <ul className="space-y-2.5 text-[15px] text-neutral-700">
                  {p.scope.map((s) => (
                    <li key={s} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tan-deep" />{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {beforeAfter.length > 0 && (
        <section className="bg-paper py-16 md:py-20">
          <div className="wrap">
            <SectionHead eyebrow="Before and after" title="The same view, before and after" />
            <div className={`grid gap-10 ${beforeAfter.length > 1 ? "lg:grid-cols-2" : "max-w-4xl"}`}>
              {beforeAfter.map((x) => (
                <Compare key={x.caption} pair={x} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The story, stage by stage */}
      {p.flagship && story.length > 0 ? (
        <section className="py-16 md:py-20">
          <div className="wrap space-y-20">
            {story.map((s) => (
              <div key={s.stage}>
                <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_2fr] lg:items-end">
                  <h2 className="text-3xl text-ink">{s.title || stageTitle[s.stage]}</h2>
                  {s.text && <p className="text-lg text-muted-foreground">{s.text}</p>}
                </div>
                <Gallery items={s.images} variant={s.images.length >= 5 ? "feature" : "grid"} cols={s.images.length === 2 ? 2 : 3} />
                {s.stage === "design" && p.designNote && <p className="mt-4 text-sm text-muted-foreground">{p.designNote}</p>}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="py-16 md:py-20">
          <div className="wrap">
            <Gallery items={p.gallery} variant={p.gallery.length >= 5 ? "feature" : "grid"} />
            {p.designNote && <p className="mt-4 text-sm text-muted-foreground">{p.designNote}</p>}
          </div>
        </section>
      )}

      {designBuilt.length > 0 && (
        <section className="bg-paper py-16 md:py-20">
          <div className="wrap">
            <SectionHead eyebrow="Designed, then built" title="Design beside the finished work" />
            <div className="grid gap-10 lg:grid-cols-2">
              {designBuilt.map((x) => (
                <Pair key={x.caption} pair={x} />
              ))}
            </div>
          </div>
        </section>
      )}

      {p.videos && p.videos.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="wrap">
            <SectionHead eyebrow="Video" title="On site and finished" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.videos.map((v) => (
                <Video key={v.src} video={v} />
              ))}
            </div>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="bg-paper py-16 md:py-20">
          <div className="wrap">
            <SectionHead eyebrow="Review" title="What the client said" />
            <ReviewGrid items={reviews} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="wrap">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHead className="mb-0" eyebrow="More work" title="Related projects" />
              {svc && (
                <Link to={svc.route} className="link-arrow text-ink">
                  {svc.name} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((x) => (
                <ProjectCard key={x.slug} p={x} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactBlock title="Planning something similar?" text="Tell us about your project and it goes to the right person." pageCode={svc?.pageCode ?? "PRJ"} initial={route} />
    </Layout>
  );
}

export default Projects;
export { Crumbs, Pic };
