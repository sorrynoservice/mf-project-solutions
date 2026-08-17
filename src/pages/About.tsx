import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
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
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Projects" },
  { value: "98%", label: "Satisfaction" },
  { value: "50+", label: "Team Members" },
];

const principles = [
  {
    icon: Award,
    title: "Our Mission",
    text: "To deliver exceptional construction and renovation services that transform spaces and exceed client expectations through innovation, quality, and integrity.",
  },
  {
    icon: TrendingUp,
    title: "Our Vision",
    text: "To be Ireland's most trusted construction partner, recognized for our engineering excellence, innovative solutions, and unwavering commitment to quality.",
  },
  {
    icon: Briefcase,
    title: "Our Approach",
    text: "We combine engineering expertise with practical craftsmanship, ensuring every project benefits from both technical precision and quality execution.",
  },
];

const leaders = [
  {
    name: "Wanessa Correa",
    role: "Managing Director",
    image: "/assets/wanessa-correa-DMt6Behu.jpg",
    bio: "With over 15 years of experience in construction and project management, Wanessa leads our team with a commitment to excellence and innovation.",
    email: "wcorrea@mfeng.ie",
    phone: "+353 83 801 4857",
  },
  {
    name: "Alexandre Ferreira",
    role: "Founder",
    image: "/assets/alexandre-ferreira-R7MdZj-Y.jpg",
    bio: "Alexandre brings extensive expertise in engineering and operations, ensuring every project is delivered to the highest standards.",
    email: "aferreira@mfeng.ie",
    phone: "+353 87 603 9378",
  },
];

const projects = [
  {
    category: "Residential Renovation",
    title: "Luxury Bathroom Renovation",
    image: "/assets/luxury-bathroom-BWMvLKQ1.jpg",
    text: "Complete bathroom transformation featuring premium fixtures, custom tilework, and modern design elements.",
  },
  {
    category: "Home Extension",
    title: "Modern Living Space Extension",
    image: "/assets/modern-living-C4itTDh5.jpg",
    text: "Spacious home extension creating an open-plan living area with contemporary finishes and natural lighting.",
  },
  {
    category: "Commercial Construction",
    title: "New Children's Hospital",
    image: "/assets/childrens-hospital-BQI9LRum.jpg",
    text: "Landmark healthcare facility featuring state-of-the-art medical infrastructure and world-class construction standards, designed to provide exceptional care for Ireland's children.",
  },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Header variant="dark" />

    <section className="relative border-b border-border">
      <div className={`${wrap} py-20 md:py-28`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-secondary/10 border border-border">
                <Building2 className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold text-foreground tracking-wide">EST. 2009</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[0.95] text-foreground tracking-tight">
                Building Ireland's Future
              </h1>
              <div className="h-1 w-24 bg-accent" />
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                MF Project Solutions delivers engineering-led construction excellence across
                residential and commercial sectors. Founded by experienced engineers, we bring
                technical precision to every project.
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
                alt="MF Project Solutions - Professional Construction Team"
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
              Building Excellence Since 2009
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              MF Project Solutions is a premier construction and renovation company based in Dublin,
              Ireland. Founded by experienced engineers Wellington Correa and Alexandre Ferreira, we
              have established ourselves as industry leaders in delivering high-quality construction
              projects.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our company specializes in residential and commercial construction, offering
              comprehensive services from initial design through to project completion. We pride
              ourselves on our engineering expertise, attention to detail, and commitment to
              delivering projects on time and within budget.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a team of highly skilled professionals and a portfolio of successful projects
              across Ireland, we continue to set the standard for construction excellence and
              customer satisfaction.
            </p>
          </div>
          <div className="space-y-6">
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
            Our Leadership Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Led by experienced professionals with decades of combined expertise in construction and
            engineering
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader) => (
            <div key={leader.name} className={`${card} overflow-hidden`}>
              <div className="p-0">
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted/50">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
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
                      href={`tel:${leader.phone}`}
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
            A selection of our recent work showcasing our commitment to quality and innovation
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`${card} overflow-hidden group hover:shadow-luxury transition-all duration-300`}
            >
              <div className="p-0">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
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

    <section className="py-20 border-t border-border">
      <div className={wrap}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Your Project Today
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with our team for a professional consultation
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className={card}>
            <div className="p-6">
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <MessageSquare className="w-5 h-5 text-accent" /> WhatsApp
              </div>
              <a href="https://wa.me/353838014857" target="_blank" rel="noreferrer">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 luxury-gradient text-primary-foreground hover:opacity-90 shadow-luxury font-semibold h-14 rounded-lg px-10 text-base w-full">
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
                <a href="tel:+353838014857">
                  <button className={outlineBtn}>+353 83 801 4857</button>
                </a>
                <a href="tel:+353876039378">
                  <button className={outlineBtn}>+353 87 603 9378</button>
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
                <a href="mailto:wcorrea@mfeng.ie">
                  <button className={outlineBtn}>wcorrea@mfeng.ie</button>
                </a>
                <a href="mailto:aferreira@mfeng.ie">
                  <button className={outlineBtn}>aferreira@mfeng.ie</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter tagline="Engineering Excellence Since 2009" />
  </div>
);

export default About;
