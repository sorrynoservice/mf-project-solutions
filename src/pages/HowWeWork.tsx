import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { ContactSection, Img, PageHero, PairCard, SectionTitle, wrap } from "@/components/work/Work";
import { useSeo } from "@/lib/seo";

const steps = [
  {
    t: "Site visit and brief",
    d: "We visit, measure and listen. If you already have drawings, we review them with you and note anything that needs an engineer or a planning check.",
  },
  {
    t: "Design",
    d: "We work from your architect's drawings, or we design it ourselves: layouts, 3D views, finishes, lighting and joinery details, so you see the rooms before they are built.",
  },
  {
    t: "Fixed price and contract",
    d: "A clear specification and a fixed contract price, with what is included and what is not set out in writing, and a schedule of rates for any changes you ask for.",
  },
  {
    t: "Construction",
    d: "Our own site team carries out the general building work, with trusted specialist trades. Structural work follows your engineer's design.",
  },
  {
    t: "Joinery from our workshop",
    d: "Desks, wardrobes, media walls and panelling are drawn by us, made in our workshop in Drumree and fitted by the same team.",
  },
  {
    t: "Documentation and handover",
    d: "We keep the records your design team needs for inspections and close-out, and we hand the project over complete.",
  },
];

const HowWeWork = () => {
  useSeo("/how-we-work");
  return (
    <div className="min-h-screen bg-background">
      <Header variant="home" />
      <PageHero
        id="M36"
        eyebrow="How we work"
        title="One team takes responsibility for the whole project"
        lead="Design, engineering coordination, construction and joinery under one contract, founder-led by an engineer and quantity surveyor with over 25 years in construction."
      />

      <section className="py-16 md:py-20">
        <div className={wrap}>
          <SectionTitle eyebrow="The process" title="From first visit to handover" />
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <li key={s.t} className="rounded-2xl border border-border p-6 bg-card">
                <div className="text-sm font-semibold text-[#8a6d12] mb-2">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{s.t}</h3>
                <p className="text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-muted/30 border-y border-border">
        <div className={wrap}>
          <SectionTitle
            eyebrow="Example"
            title="A clinic, designed and then built"
            text="The reception of a Dublin 1 clinic: our 3D design and joinery drawings, the desk being installed, and the finished room."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ["M124", "1. 3D design"],
              ["M130", "2. Joinery drawings"],
              ["M137", "3. Desk installed"],
              ["M141", "4. Finished"],
            ].map(([id, label]) => (
              <figure key={id}>
                <Img id={id} className="aspect-[4/3] rounded-xl" label={false} sizes="(min-width: 1024px) 25vw, 50vw" />
                <figcaption className="mt-2 text-sm font-semibold text-foreground">{label}</figcaption>
              </figure>
            ))}
          </div>
          <Link to="/projects/clinic-fit-out-dublin-1" className="mt-8 inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all">
            See the clinic project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className={`${wrap} grid lg:grid-cols-2 gap-12`}>
          <div>
            <SectionTitle eyebrow="Contracts and payments" title="Clear terms before we start" />
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>Every project has a written specification and a fixed contract price for that scope. Changes are priced before they are carried out.</p>
              <p>Payments are staged and set out in the contract: a booking deposit, a payment at commencement, and the balance as the work progresses.</p>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Working with your design team" title="Architects, engineers and certifiers" />
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>Much of our work is architect led. We price from tender drawings, attend site meetings and follow the structural engineer's design.</p>
              <p>Under the Building Control regulations, your design team certifies the work. We support them with inspections, fire stopping records and the documentation they need to close out the project.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className={`${wrap} grid md:grid-cols-2 gap-6`}>
          <PairCard design="M332" built="M86" caption="Phibsborough kitchen: design visualisation and the finished room" />
          <PairCard design="M340" built="M97" caption="Leixlip kitchen: architect's drawing and the finished island" />
        </div>
      </section>

      <ContactSection />
      <SiteFooter tagline="How we work" />
    </div>
  );
};

export default HowWeWork;
