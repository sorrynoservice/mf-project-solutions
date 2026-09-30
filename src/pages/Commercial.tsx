import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@/components/site/Layout";
import ContactBlock from "@/components/site/ContactBlock";
import PageHero from "@/components/ui/PageHero";
import Video from "@/components/ui/Video";
import { Pair } from "@/components/ui/Pair";
import { ProjectCard, SectionHead } from "@/components/ui/Blocks";
import { projectBySlug, serviceByRoute } from "@/lib/content";

const points = [
  { t: "Programmed around your business", d: "At BAH33 we installed a new porcelain floor over the Christmas closure so the restaurant could reopen on time." },
  { t: "Design and joinery in-house", d: "We designed the Dublin 1 clinic's reception and waiting areas, drew the joinery, made it in Drumree and fitted it." },
  { t: "Closed out with your design team", d: "We work with the project's architect, Assigned Certifier and fire engineer through inspections and completion." },
];

const sectors = ["Restaurants and bars", "Clinics and practices", "Retail units", "Offices"];

export default function Commercial() {
  const bah = projectBySlug("restaurant-fit-out-dublin-2");
  const clinic = projectBySlug("clinic-fit-out-dublin-1");
  const fit = serviceByRoute("/commercial-fit-outs");
  const pairs = [bah?.pairs?.[0], clinic?.pairs?.[0]].filter(Boolean) as NonNullable<typeof bah>["pairs"];
  return (
    <Layout header="overlay" page={{ route: "major", pageCode: "COM", service: "a commercial fit-out", contactHref: "#contact", ctaShort: "Discuss a fit-out" }}>
      <PageHero
        eyebrow="Commercial"
        title="Commercial fit-outs for restaurants, clinics, retail and offices"
        sub="Design, construction and joinery for businesses that need the work done around their opening date, and closed out properly with their design team."
        image={bah?.hero}
        mobile={bah?.heroMobile}
        crumbs={[{ name: "Home", to: "/" }, { name: "Commercial" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="btn-tan h-14 px-8 text-base">Send tender drawings</a>
          <Link to="/commercial-fit-outs" className="btn-ghost-light h-14 px-8 text-base">Commercial fit-outs</Link>
        </div>
      </PageHero>

      <section className="border-b border-border bg-paper">
        <div className="wrap grid gap-8 py-12 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.t} className="border-l-2 border-tan pl-5">
              <h2 className="text-xl text-ink">{p.t}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="Case studies" title="Commercial projects" />
          <div className="grid gap-6 md:grid-cols-2">
            {[bah, clinic].filter(Boolean).map((p) => (
              <ProjectCard key={p!.slug} p={p!} />
            ))}
          </div>
        </div>
      </section>

      {pairs && pairs.length > 0 && (
        <section className="bg-paper py-20 md:py-24">
          <div className="wrap">
            <SectionHead eyebrow="Designed, then built" title="Our design work, as built" text="Where we design the interior, the finished room follows the drawings closely." />
            <div className="grid gap-10 lg:grid-cols-2">
              {pairs.map((p) => (
                <Pair key={p.caption} pair={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-center">
          {fit?.video && (
            <div className="mx-auto w-full max-w-xs">
              <Video video={fit.video} />
            </div>
          )}
          <div>
            <SectionHead eyebrow="What we do" title="Fit-out from strip-out to opening" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {sectors.map((s) => (
                <li key={s} className="flex gap-3 text-[17px] text-neutral-700">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-tan-deep" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[17px] leading-relaxed text-neutral-700">
              We price from your design team's tender package, or develop the interior design with you first. Joinery such as reception desks, panelling and bar fronts is made in our workshop in Drumree.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/commercial-fit-outs" className="btn-ink">Commercial fit-outs <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/for-architects" className="btn-ghost-ink">For architects and designers</Link>
            </div>
          </div>
        </div>
      </section>

      <ContactBlock title="Planning a fit-out?" text="Send the tender drawings or tell us about the unit and your opening date. Commercial enquiries go straight to Alex." pageCode="COM" initial="major" lock />
    </Layout>
  );
}
