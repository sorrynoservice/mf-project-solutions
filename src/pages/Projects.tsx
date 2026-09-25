import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import EnquiryForm from "@/components/EnquiryForm";
import NotFound from "@/pages/NotFound";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { useSeo } from "@/lib/seo";

const wrap = "max-w-7xl mx-auto px-8 sm:px-11 md:px-16 lg:px-22";
const chip = "px-4 py-2 rounded-full border text-sm transition-colors";

/** Maps a project category to the enquiry form's project type. */
const formType: Record<ProjectCategory, string> = {
  "Garden room": "Garden room",
  "Granny flat": "Granny flat",
  Extension: "Extension",
  Landscaping: "Landscaping",
  Commercial: "Other",
};

export const Projects = () => {
  useSeo("/projects");
  const [params, setParams] = useSearchParams();
  const active = projectCategories.find((c) => c === params.get("category")) ?? null;
  const shown = active ? projects.filter((p) => p.category === active) : projects;
  const categories = projectCategories.filter((c) => projects.some((p) => p.category === c));

  const choose = (c: ProjectCategory | null) => setParams(c ? { category: c } : {}, { replace: true });

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />

      <section className="pt-32 pb-12 border-b border-border">
        <div className={wrap}>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-6">Our Projects</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Garden rooms, granny flats, extensions, landscaping and commercial fit outs built by our own team.
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <button
              onClick={() => choose(null)}
              aria-pressed={!active}
              className={`${chip} ${!active ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:bg-muted"}`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => choose(c)}
                aria-pressed={active === c}
                className={`${chip} ${active === c ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:bg-muted"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className={`${wrap} grid sm:grid-cols-2 lg:grid-cols-3 gap-8`}>
          {shown.map((p, i) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="group rounded-2xl border border-border shadow-soft bg-card overflow-hidden hover:shadow-luxury transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">{p.category}</div>
                <h2 className="text-lg font-bold text-foreground">{p.title}</h2>
                {p.location && (
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {p.location}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter tagline="Our Projects" />
    </div>
  );
};

export const ProjectDetail = () => {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  useSeo(`/projects/${slug}`, {
    title: p ? `${p.title} | MF Project Solutions` : undefined,
    description: p?.summary,
  });
  if (!p) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />

      <section className="pt-28 pb-12">
        <div className={wrap}>
          <Link
            to={`/projects?category=${encodeURIComponent(p.category)}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All {p.category.toLowerCase()} projects
          </Link>
          <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">{p.category}</div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-4">{p.title}</h1>
          {p.location && (
            <div className="flex items-center gap-1 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" /> {p.location}
            </div>
          )}
          <p className="text-lg text-muted-foreground max-w-3xl mb-2">{p.summary}</p>
          {p.architect && <p className="text-sm text-muted-foreground">Architect: {p.architect}</p>}

          <div className={`mt-10 grid gap-6 ${p.images.length > 1 ? "md:grid-cols-2" : ""}`}>
            {p.images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${p.title}, photo ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="rounded-2xl shadow-luxury w-full h-auto max-h-[80vh] object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 border-t border-border bg-muted/30">
        <div className={`${wrap} max-w-4xl`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
            Planning a similar project?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 text-center">
            Tell us about it and we'll arrange a free site visit.
          </p>
          <div className="rounded-2xl border border-border shadow-soft p-6 bg-card">
            <EnquiryForm defaultType={formType[p.category]} />
          </div>
        </div>
      </section>

      <SiteFooter tagline="Our Projects" />
    </div>
  );
};
