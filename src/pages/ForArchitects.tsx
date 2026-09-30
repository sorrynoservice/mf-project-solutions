import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@/components/site/Layout";
import ContactBlock from "@/components/site/ContactBlock";
import PageHero from "@/components/ui/PageHero";
import Pic from "@/components/ui/Pic";
import Video from "@/components/ui/Video";
import { ProjectCard, SectionHead } from "@/components/ui/Blocks";
import { people, projectBySlug } from "@/lib/content";
import Img from "@/components/Img";

const how = [
  { t: "We price your tender package as drawn", d: "Priced from your drawings and specification, with anything unclear raised as a query rather than assumed." },
  { t: "We build it as drawn", d: "Where site conditions call for a change, we bring it to you before we act on it." },
  { t: "You see the work at every stage", d: "Stage photos and site visits as the structure, services and finishes go in." },
  { t: "We close out with you", d: "We work through inspections, fire stopping and the documentation needed for completion with the Assigned Certifier and the rest of the design team." },
];

export default function ForArchitects() {
  const phib = projectBySlug("extension-renovation-phibsborough");
  const leix = projectBySlug("rear-extension-leixlip");
  const bah = projectBySlug("restaurant-fit-out-dublin-2");
  const alex = people.find((p) => p.id === "alex-ferreira");
  const stages = (phib?.stages ?? []).filter((s) => ["construction", "existing"].includes(s.stage)).flatMap((s) => s.images).slice(0, 6);
  return (
    <Layout header="overlay" page={{ route: "major", pageCode: "ARC", service: "pricing a project from drawings", contactHref: "#contact", ctaShort: "Send tender drawings" }}>
      <PageHero
        eyebrow="For architects and designers"
        title="A contractor that builds your design as drawn"
        sub="We price from your tender package, build to your drawings with our own crew and joiners, and close out with you and the rest of the design team."
        image={phib?.hero}
        mobile={phib?.heroMobile}
        crumbs={[{ name: "Home", to: "/" }, { name: "Commercial", to: "/commercial" }, { name: "For architects and designers" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn-tan h-14 px-8 text-base">Send us tender drawings</a>
          <a href="#contact" className="btn-ghost-light h-14 px-8 text-base">Add MF to your tender list</a>
        </div>
      </PageHero>

      <section className="py-20 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="How we work with design teams" title="What you can expect from us" />
          <div className="grid gap-8 md:grid-cols-2">
            {how.map((h) => (
              <div key={h.t} className="flex gap-4">
                <Check className="mt-1 h-6 w-6 shrink-0 text-tan-deep" aria-hidden="true" />
                <div>
                  <h3 className="text-xl text-ink">{h.t}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">{h.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="Built with architects" title="Recent projects built from architects' drawings" text="Architects are credited on every project where the design is theirs." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[phib, leix, bah].filter(Boolean).map((p) => (
              <ProjectCard key={p!.slug} p={p!} />
            ))}
          </div>
        </div>
      </section>

      {stages.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
            <div>
              <SectionHead className="mb-6" eyebrow="On site" title="The structural stages, not just the finish" text="From Phibsborough: the house stripped back, the extension shell formed and the rooflight openings framed before the finishes went in." />
              {leix?.videos?.[0] && (
                <div className="mx-auto max-w-xs lg:mx-0">
                  <Video video={leix.videos[0]} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {stages.map((m) => (
                <Pic key={m.image} item={m} className="aspect-square rounded-md" layout="(min-width: 1024px) 20vw, 33vw" />
              ))}
            </div>
          </div>
        </section>
      )}

      {alex && (
        <section className="bg-ink py-20 text-white">
          <div className="wrap flex flex-col gap-8 md:flex-row md:items-center">
            <Img src={alex.headshot} alt={alex.name} layout="thumb" className="h-28 w-28 shrink-0 rounded-full object-cover" />
            <div className="max-w-3xl">
              <div className="eyebrow mb-2 text-tan">Your contact</div>
              <h2 className="text-2xl md:text-3xl">{alex.name}, {alex.role}</h2>
              <p className="mt-3 text-lg leading-relaxed text-white/80">{alex.bio[0]}</p>
              <Link to="/about" className="link-arrow mt-4 text-tan">About MF <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      )}

      <ContactBlock
        title="Send us your tender package"
        text="Tell us about the project and the programme. Drawings can follow by email or WhatsApp; Alex will come back to you."
        pageCode="ARC"
        initial="major"
        lock
      />
    </Layout>
  );
}
