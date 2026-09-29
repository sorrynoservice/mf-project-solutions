import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import NotFound from "@/pages/NotFound";
import { caseStudies, findCase, stageLabels, type ServiceKey } from "@/data/caseStudies";
import { servicePages } from "@/data/servicePages";
import { CaseCard, ContactSection, Gallery, Img, PairCard, SectionTitle, wrap } from "@/components/work/Work";
import { useSeo } from "@/lib/seo";

const chip = "px-4 py-2 rounded-full border text-sm transition-colors";
const on = "bg-foreground text-background border-foreground";
const off = "border-border text-foreground hover:bg-muted";

const serviceNames = Object.fromEntries(
  servicePages.filter((p) => p.key !== "residential").map((p) => [p.key, p.name]),
) as Record<ServiceKey, string>;

const serviceForm: Partial<Record<ServiceKey, string>> = Object.fromEntries(
  servicePages.map((p) => [p.key, p.formType]),
);

export const Projects = () => {
  useSeo("/projects");
  const [params, setParams] = useSearchParams();
  const sector = params.get("sector");
  const service = params.get("service") as ServiceKey | null;
  let shown = caseStudies;
  if (sector === "Residential" || sector === "Commercial") shown = shown.filter((c) => c.sector === sector);
  if (service && serviceNames[service]) shown = shown.filter((c) => c.services.includes(service));
  const flag = shown.filter((c) => c.flagship);
  const rest = shown.filter((c) => !c.flagship);

  const set = (next: Record<string, string>) => setParams(next, { replace: true });
  const services = (Object.keys(serviceNames) as ServiceKey[]).filter((k) => caseStudies.some((c) => c.services.includes(k)));

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />
      <section className="pt-32 pb-10 border-b border-border">
        <div className={wrap}>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight text-foreground mb-5">Projects</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Homes and commercial units we have designed, built or both. Each project shows the stages we have photographs for, from before to finished.
          </p>
          <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Filter by sector">
            {["All", "Residential", "Commercial"].map((s) => {
              const active = s === "All" ? !sector && !service : sector === s;
              return (
                <button key={s} onClick={() => set(s === "All" ? {} : { sector: s })} aria-pressed={active} className={`${chip} ${active ? on : off}`}>
                  {s}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type of work">
            {services.map((k) => (
              <button key={k} onClick={() => set({ service: k })} aria-pressed={service === k} className={`${chip} text-xs ${service === k ? on : off}`}>
                {serviceNames[k]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {flag.length > 0 && (
        <section className="pt-14">
          <div className={wrap}>
            <SectionTitle eyebrow="Case studies" title="From design to handover" />
            <div className="grid sm:grid-cols-2 gap-6">
              {flag.map((c, i) => (
                <CaseCard key={c.slug} c={c} eager={i < 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="py-14">
          <div className={wrap}>
            {flag.length > 0 && <SectionTitle eyebrow="More projects" title="Other recent work" />}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((c) => (
                <CaseCard key={c.slug} c={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection formType={service ? serviceForm[service] ?? "" : sector === "Commercial" ? "Commercial fit-out" : ""} />
      <SiteFooter tagline="Projects" />
    </div>
  );
};

export const ProjectDetail = () => {
  const { slug } = useParams();
  const c = findCase(slug);
  useSeo(`/projects/${slug}`, {
    title: c ? `${c.title} | MF Project Solutions` : undefined,
    description: c?.summary,
  });
  if (!c) return <NotFound />;
  const firstService = c.services[0];

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />

      <section className="pt-28 pb-10">
        <div className={wrap}>
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> All projects
          </Link>
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="text-xs uppercase tracking-wider font-semibold text-[#8a6d12] mb-2">{c.sector}</div>
              <h1 className="text-3xl md:text-5xl font-serif leading-tight text-foreground mb-4">{c.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground mb-5">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {c.location}
                </span>
                {c.year && <span>{c.year}</span>}
                {c.architect && <span>Architect: {c.architect}</span>}
              </div>
              <div className="space-y-4 text-foreground/85 leading-relaxed">
                {(c.intro ?? [c.summary]).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              {c.scope && (
                <ul className="mt-6 grid gap-2">
                  {c.scope.map((s) => (
                    <li key={s} className="flex gap-2 text-sm">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#d4af37] shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="lg:col-span-3">
              <Img id={c.cover} className="aspect-[4/3] rounded-2xl shadow-luxury" eager label={false} sizes="(min-width: 1024px) 60vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      {c.stages.length > 1 && (
        <nav className="sticky top-16 z-30 bg-background/95 backdrop-blur border-y border-border" aria-label="Project stages">
          <div className={`${wrap} flex gap-2 overflow-x-auto py-3`}>
            {c.stages.map((s, i) => (
              <a key={s.stage} href={`#${s.stage}`} className="shrink-0 rounded-full border border-border px-4 py-1.5 text-sm hover:bg-muted">
                {i + 1}. {stageLabels[s.stage]}
              </a>
            ))}
          </div>
        </nav>
      )}

      {c.stages.map((s, i) => (
        <section key={s.stage} id={s.stage} className={`py-12 scroll-mt-32 ${i % 2 ? "bg-muted/30" : ""}`}>
          <div className={wrap}>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-sm font-semibold text-[#8a6d12]">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">{stageLabels[s.stage]}</h2>
            </div>
            {s.text && <p className="text-muted-foreground mb-6 max-w-3xl">{s.text}</p>}
            {s.stage === "design" && c.designNote && <p className="text-xs text-muted-foreground mb-4 max-w-3xl">{c.designNote}</p>}
            <Gallery ids={s.images} cols={s.images.length === 1 ? 2 : s.images.length % 4 === 0 ? 4 : 3} />
          </div>
        </section>
      ))}

      {c.pairs && c.pairs.length > 0 && (
        <section className="py-14 border-t border-border">
          <div className={wrap}>
            <SectionTitle eyebrow="Designed, then built" title="Design beside the result" />
            <div className="grid md:grid-cols-2 gap-6">
              {c.pairs.map((p) => (
                <PairCard key={p.design + p.built} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection formType={serviceForm[firstService] ?? ""} title="Planning a similar project?" />
      <SiteFooter tagline="Projects" />
    </div>
  );
};
