import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { company, contacts } from "@/data/site";
import { useSeo } from "@/lib/seo";
import googleRating from "@/data/google-rating.json";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  Users,
} from "lucide-react";

const wrap = "max-w-7xl mx-auto px-8 sm:px-11 md:px-16 lg:px-22";
const card = "rounded-lg border bg-card text-card-foreground shadow-sm border-border shadow-soft";
const pill =
  "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-accent text-sm font-medium";
const outlineBtn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-primary/20 bg-transparent text-foreground hover:bg-primary/5 h-11 px-6 py-2 w-full text-sm";

const stats = [
  { value: String(company.established), label: "Established" },
  { value: "~15", label: "In our team" },
  { value: "500+", label: "Projects and inspections" },
  { value: googleRating.rating.toFixed(1), label: `Stars from ${googleRating.count}+ Google reviews` },
];

const principles = [
  {
    icon: Award,
    title: "1. Free site visit",
    text: "We visit, measure and give you honest advice on planning before anything is priced.",
  },
  {
    icon: Briefcase,
    title: "2. Written, itemised quote",
    text: "Every item and every exclusion is listed, so you know exactly what you are paying for.",
  },
  {
    icon: TrendingUp,
    title: "3. Our own team builds",
    text: "Our own crew and joinery workshop deliver the work, with one point of contact throughout.",
  },
  {
    icon: Users,
    title: "4. Handover",
    text: "A walkthrough of the finished work and a snag check before we hand over.",
  },
];

type Leader = {
  name: string;
  role: string;
  image?: string;
  bio: string;
  email: string;
  phone: string;
  tel: string;
};

const leaders: Leader[] = [
  {
    name: "Alexandre Ferreira",
    role: "Founder and Managing Director",
    image: "/assets/alexandre-ferreira.jpg",
    bio: "Alexandre founded MF Project Solutions in 2021 after more than 15 years in engineering and construction, including quality management roles on large projects in Ireland and across Europe. He leads design, estimating and delivery on every job.",
    email: contacts.alex.email,
    phone: contacts.alex.display,
    tel: contacts.alex.tel,
  },
  {
    name: "Wanessa Correa",
    role: "Director of Operations and Quantity Surveyor",
    image: "/assets/wanessa-correa.jpg",
    bio: "Wanessa worked in quantity surveying and procurement on major Irish projects with Linesight and Cairn before joining MF Project Solutions. She manages costs, procurement and scheduling, runs our snagging inspections, and is a qualified BER assessor.",
    email: contacts.snagging.email,
    phone: contacts.snagging.display,
    tel: contacts.snagging.tel,
  },
  {
    name: "Rosana Roos Corrêa",
    role: "Business and Financial Project Manager",
    image: "/assets/rosana-roos-correa.jpg",
    bio: "Rosana manages the business and financial side of our projects: quotes, client accounts, payments and scheduling, and she is often the first person clients deal with. She brings more than 10 years of banking experience as a relationship manager.",
    email: contacts.construction.email,
    phone: contacts.construction.display,
    tel: contacts.construction.tel,
  },
];

type Project = { category: string; title: string; image?: string; text: string };

const projects: Project[] = [
  {
    category: "Bathroom Renovation",
    title: "Bathroom Renovation",
    image: "/assets/luxury-bathroom-BWMvLKQ1.jpg",
    text: "Full bathroom renovation with a walk-in shower, new tiling and modern fittings.",
  },
  {
    category: "Home Extension",
    title: "Open Plan Extension",
    image: "/assets/modern-living-C4itTDh5.jpg",
    text: "Extension creating an open plan kitchen and living area with contemporary finishes and natural light.",
  },
  {
    category: "Commercial Design and Build",
    title: "BAH33, Royal Hibernian Way, Dublin 2",
    // TODO: add project photos when available.
    text: "Design and build of a restaurant fit out, completed in 2024, increasing capacity from about 26 to 80 seats.",
  },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

const About = () => {
  useSeo({
    title: "About Us | MF Project Solutions",
    description:
      "Residential construction and renovation company based in Drumree, Co. Meath, with our own build team and joinery workshop.",
    path: "/about",
  });

  return (
  <div className="min-h-screen bg-background">
    <Header variant="dark" />

    <section className="relative border-b border-border">
      <div className={`${wrap} py-20 md:py-28`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-secondary/10 border border-border">
                <Building2 className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold text-foreground tracking-wide">EST. {company.established}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[0.95] text-foreground tracking-tight">
                Engineering led builders for homes in Dublin and Meath
              </h1>
              <div className="h-1 w-24 bg-accent" />
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                A design and build contractor with our own team and joinery workshop, delivering
                garden rooms, extensions and renovations across Dublin, Meath, Louth, Kildare and
                Wicklow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((s) => (
                <div key={s.label} className="p-6 rounded-xl border border-border bg-card shadow-soft">
                  <div className="text-4xl font-bold text-foreground mb-1">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative lg:h-[600px]">
            <div className="absolute inset-0 bg-accent/10 rounded-2xl transform translate-x-4 translate-y-4" />
            <div className="relative h-full rounded-2xl overflow-hidden border-2 border-border shadow-luxury">
              <img
                src="/assets/construction-site-DcX15qfU.jpg"
                alt="MF Project Solutions construction team on site"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className={wrap}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className={`${pill} mb-6`}>
              <Building2 className="w-4 h-4" />
              Our Company
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Who we are
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              MF Project Solutions is the trading name of MF Engineering and Designs Limited,
              established in 2021 and based at Merrywell Business Park, Drumree, Co. Meath. We are
              an engineering led design and build contractor.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our founder brings more than 15 years of engineering and construction experience,
              including quality management on large projects in Ireland and across Europe, and we
              apply the same standards to every home we build.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We deliver garden rooms and granny flats, house extensions, full renovations,
              kitchens, bathrooms and outdoor spaces, plus commercial fit outs and snagging
              inspections for new homes. We work with homeowners and with architects, and our team
              works in English and Brazilian Portuguese.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">How we work</h3>
            {principles.map(({ icon: Icon, title, text }) => (
              <div key={title} className={card}>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-secondary/20 shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border bg-muted/30">
      <div className={wrap}>
        <div className="text-center mb-16">
          <div className={`${pill} mb-4`}>
            <Users className="w-4 h-4" />
            Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The people you will deal with, from your first call to handover
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {leaders.map((leader) => (
            <div key={leader.name} className={`${card} overflow-hidden`}>
              <div className="p-0">
                <div className="aspect-square w-full overflow-hidden bg-muted/50">
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={`${leader.name}, ${leader.role}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0a2e2a] text-[#d4af37] text-6xl font-serif">
                      {initials(leader.name)}
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-1">{leader.name}</h3>
                  <p className="text-accent font-medium mb-4">{leader.role}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{leader.bio}</p>
                  <div className="space-y-3 pt-4 border-t border-border">
                    <a
                      href={`mailto:${leader.email}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {leader.email}
                    </a>
                    <a
                      href={leader.tel}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {leader.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className={wrap}>
        <div className="text-center mb-16">
          <div className={`${pill} mb-4`}>
            <Award className="w-4 h-4" />
            Our Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of residential and commercial work
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`${card} overflow-hidden group hover:shadow-luxury transition-all duration-300`}
            >
              <div className="p-0">
                {p.image && (
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-xs font-medium text-accent mb-2">{p.category}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="contact" className="py-20 border-t border-border">
      <div className={wrap}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Your Project Today
          </h2>
          <p className="text-lg text-muted-foreground">Request a free site visit and a written quote</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className={card}>
            <div className="p-6">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <MessageSquare className="w-5 h-5 text-accent" /> WhatsApp
              </div>
              <a href={contacts.construction.whatsapp} target="_blank" rel="noreferrer">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 luxury-gradient text-primary-foreground hover:opacity-90 shadow-luxury font-semibold h-14 rounded-lg px-6 text-base w-full">
                  Message us <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </div>

          <div className={card}>
            <div className="p-6">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <Phone className="w-5 h-5 text-accent" /> Phone
              </div>
              <div className="space-y-2">
                <a href={contacts.construction.tel}>
                  <button className={outlineBtn}>{contacts.construction.display} (construction)</button>
                </a>
                <a href={contacts.snagging.tel}>
                  <button className={outlineBtn}>{contacts.snagging.display} (snagging)</button>
                </a>
                <a href={contacts.alex.tel}>
                  <button className={outlineBtn}>{contacts.alex.display} (Alex)</button>
                </a>
              </div>
            </div>
          </div>

          <div className={card}>
            <div className="p-6">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <Mail className="w-5 h-5 text-accent" /> Email
              </div>
              <div className="space-y-2">
                <a href={`mailto:${contacts.construction.email}`}>
                  <button className={outlineBtn}>{contacts.construction.email}</button>
                </a>
                <a href={`mailto:${contacts.alex.email}`}>
                  <button className={outlineBtn}>{contacts.alex.email}</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter tagline="Engineering led design and build" />
  </div>
  );
};

export default About;
