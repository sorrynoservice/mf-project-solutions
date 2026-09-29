import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { caseStudies } from "@/data/caseStudies";
import { company, contacts } from "@/data/site";
import googleRating from "@/data/google-rating.json";
import { CaseCard, Img, PairCard, SectionTitle, wrap } from "@/components/work/Work";
import { useSeo } from "@/lib/seo";

const flagships = caseStudies.filter((c) => c.flagship);

const sectors = [
  {
    to: "/residential",
    img: "N092",
    t: "Residential",
    d: "Whole-house renovations, extensions, attic conversions, kitchens, bathrooms and joinery.",
  },
  {
    to: "/commercial",
    img: "M164",
    t: "Commercial",
    d: "Clinics, restaurants, retail and offices, designed, fitted out and closed out.",
  },
  {
    to: "/interior-design",
    img: "M319",
    t: "Interior design",
    d: "Layouts, 3D views and joinery drawings, as a service or as part of design and build.",
  },
];

const Index = () => {
  useSeo("/");
  return (
    <div className="min-h-screen bg-background">
      <Header variant="home" />

      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-end pb-16 md:pb-24 pt-28 text-white">
        <div className="absolute inset-0">
          <Img id="M83" className="w-full h-full" eager label={false} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
        <div className={`${wrap} relative z-10 w-full`}>
          <h1 className="text-[#d4af37] text-xs md:text-sm uppercase tracking-[0.25em] font-semibold mb-5">
            Design and build in Dublin, Meath and Kildare
          </h1>
          <p className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.05] max-w-4xl">
            We take responsibility for the <span className="text-[#d4af37] italic">whole project</span>.
          </p>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl">
            Design, engineering and construction under one contract. Whole-house renovations, extensions and commercial fit-outs, built by our own team and finished in our own joinery workshop.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#contact" className="inline-flex items-center justify-center h-14 rounded-lg px-8 font-semibold bg-[#d4af37] text-[#0a2e2a] hover:bg-[#d4af37]/90 shadow-lg">
              Arrange a site visit
            </a>
            <Link to="/projects" className="inline-flex items-center justify-center h-14 rounded-lg px-8 font-semibold border-2 border-white text-white hover:bg-white/10">
              See our projects
            </Link>
            <a
              href={contacts.construction.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 rounded-lg px-6 font-semibold text-white/90 hover:text-white"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp us
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
            <a href={company.reviewUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </span>
              {googleRating.rating.toFixed(1)} from {googleRating.count}+ Google reviews
            </a>
            <span>Pictured: extension and renovation, Phibsborough. Architect: Francesco Panzeri</span>
          </div>
        </div>
      </section>

      {/* Design beside built */}
      <section className="py-20">
        <div className={wrap}>
          <SectionTitle
            eyebrow="We design it, then we build it"
            title="The design, and the room we built from it"
            text="Our design work is only worth something if it gets built as drawn. These are three of our projects, design on the left, finished on the right."
          />
          <div className="grid lg:grid-cols-3 gap-6">
            <PairCard design="M124" built="M141" caption="Clinic reception, Dublin 1" />
            <PairCard design="M332" built="M86" caption="Kitchen, Phibsborough" />
            <PairCard design="M316" built="M29" caption="Bathroom, Rathcoole" />
          </div>
          <Link to="/how-we-work" className="mt-8 inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all">
            How we work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className={wrap}>
          <SectionTitle eyebrow="Projects" title="Recent projects, from before to handover" />
          <div className="grid sm:grid-cols-2 gap-6">
            {flagships.map((c) => (
              <CaseCard key={c.slug} c={c} ctx="home" />
            ))}
          </div>
          <Link to="/projects" className="mt-8 inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all">
            All projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20">
        <div className={wrap}>
          <SectionTitle eyebrow="What we do" title="Homes and businesses" />
          <div className="grid md:grid-cols-3 gap-6">
            {sectors.map((s) => (
              <Link key={s.to} to={s.to} className="group rounded-2xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-luxury transition-all">
                <Img id={s.img} className="aspect-[4/3]" sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="p-6">
                  <h3 className="text-2xl font-serif text-foreground mb-2">{s.t}</h3>
                  <p className="text-muted-foreground">{s.d}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all">
                    Find out more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Proof band */}
      <section className="py-20 bg-[#0a2e2a] text-white">
        <div className={`${wrap} grid lg:grid-cols-2 gap-12 items-center`}>
          <Img id="M01" className="aspect-[4/3] rounded-2xl" label={false} sizes="(min-width: 1024px) 50vw, 100vw" />
          <div>
            <div className="text-[#d4af37] text-xs uppercase tracking-[0.25em] font-semibold mb-4">Who we are</div>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-6">An engineering-led team with its own workshop</h2>
            <p className="text-white/80 mb-4">
              MF Project Solutions is founder-led by an engineer and quantity surveyor with over 25 years in construction. Our own site team carries out the building work, and our joinery is made in our workshop in Drumree, Co. Meath.
            </p>
            <p className="text-white/80 mb-8">We work with architects, engineers and certifiers, and we work in English and Portuguese.</p>
            <dl className="grid grid-cols-2 gap-6">
              {[
                ["2021", "Company founded"],
                ["500+", "Projects, including inspections"],
                [googleRating.rating.toFixed(1), `Google rating, ${googleRating.count}+ reviews`],
                ["Drumree", "Our own joinery workshop"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="text-3xl font-serif text-[#d4af37]">{n}</dt>
                  <dd className="text-sm text-white/75">{l}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-[#d4af37] hover:gap-3 transition-all">
              About us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Garden buildings band */}
      <section className="py-20">
        <div className={`${wrap} grid lg:grid-cols-2 gap-12 items-center`}>
          <div className="order-2 lg:order-1">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8a6d12] mb-3">Garden buildings and garden dwellings</div>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight mb-5">Built like part of the house</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Insulated garden rooms and self-contained garden dwellings with kitchens and shower rooms, on proper foundations with services run from the house.
            </p>
            <Link to="/residential/garden-buildings" className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all">
              Garden buildings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Img id="N018" className="order-1 lg:order-2 aspect-[4/3] rounded-2xl" label={false} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </section>

      <Testimonials category="build" heading="What our clients say" />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
