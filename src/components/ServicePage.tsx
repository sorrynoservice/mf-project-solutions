import { Link } from "react-router-dom";
import { ArrowRight, Calculator, CircleCheck, Mail, MessageSquare, Phone } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { serviceIcons, services, type ServiceSlug } from "@/data/services";

const wrap = "max-w-7xl mx-auto px-8 sm:px-11 md:px-16 lg:px-22";
const goldBtn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 luxury-gradient text-primary-foreground hover:opacity-90 shadow-luxury font-semibold h-14 rounded-lg px-10 text-base";
const outlineBtn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-primary/20 bg-transparent text-foreground hover:bg-primary/5 h-11 px-6 py-2 w-full text-sm";
const softCard = "rounded-2xl border border-border shadow-soft p-6 bg-card";

type Block = (typeof services)[ServiceSlug]["blocks"][number];

const ServicePage = ({ slug }: { slug: ServiceSlug }) => {
  const data = services[slug];
  let tinted = true; // section backgrounds alternate, starting tinted

  const renderBlock = (block: Block, index: number) => {
    const bg = tinted ? " bg-muted/30" : "";
    if (block.type !== "calculatorCta") tinted = !tinted;

    switch (block.type) {
      case "transform":
        return (
          <section key={index} className={`py-20 border-t border-border${bg}`}>
            <div className={wrap}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {block.heading}
                  </h2>
                  {block.paras.map((p, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "text-lg text-muted-foreground mb-6"
                          : "text-muted-foreground mb-6"
                      }
                    >
                      {p}
                    </p>
                  ))}
                  {"ctaLabel" in block && block.ctaLabel && (
                    <a href="#contact">
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-luxury h-14 rounded-lg px-10 text-base">
                        {block.ctaLabel}
                      </button>
                    </a>
                  )}
                </div>
                <div className="flex justify-center">
                  <div style={{ position: "relative", width: "100%", paddingBottom: "100%" }}>
                    <div style={{ position: "absolute", inset: 0 }}>
                      {block.media.type === "video" ? (
                        <video
                          src={block.media.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="rounded-2xl shadow-luxury w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={block.media.src}
                          alt={"alt" in block.media ? block.media.alt : ""}
                          className="rounded-2xl shadow-luxury w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "benefits":
        return (
          <section key={index} className={`py-20 border-t border-border${bg}`}>
            <div className={wrap}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {block.heading}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{block.sub}</p>
              </div>
              <div
                className={
                  block.cards.length === 4
                    ? "grid md:grid-cols-4 gap-8"
                    : "grid md:grid-cols-3 gap-8"
                }
              >
                {block.cards.map((card) => {
                  const Icon = card.icon ? serviceIcons[card.icon] : null;
                  return (
                    <div
                      key={card.title}
                      className="rounded-2xl border border-border shadow-soft p-8 bg-card text-center"
                    >
                      <div className="inline-flex p-4 rounded-2xl bg-secondary/20 mb-4">
                        {Icon && <Icon className="w-8 h-8 text-accent" />}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                      <p className="text-muted-foreground">{card.text}</p>
                    </div>
                  );
                })}
              </div>

              {"nested" in block && block.nested && (
                <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <img
                      src={block.nested.image}
                      alt={block.nested.alt}
                      className="rounded-2xl shadow-luxury w-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {block.nested.heading}
                    </h3>
                    <ul className="space-y-3">
                      {block.nested.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-muted-foreground">
                          <CircleCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>
        );

      case "features":
        return (
          <section key={index} className={`py-20 border-t border-border${bg}`}>
            <div className={wrap}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src={block.image}
                    alt={block.alt}
                    className="rounded-2xl shadow-luxury w-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{block.heading}</h3>
                  <ul className="space-y-3">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground">
                        <CircleCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );

      case "calculatorCta":
        return (
          <section key={index} className="py-16 border-t border-border bg-accent/5">
            <div className={`${wrap} text-center`}>
              <Calculator className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {block.heading}
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">{block.sub}</p>
              <Link to={block.href}>
                <button className={goldBtn}>
                  {block.buttonLabel} <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </section>
        );

      case "work":
        return (
          <section key={index} className={`py-20 border-t border-border${bg}`}>
            <div className={wrap}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {block.heading}
                </h2>
                <p className="text-lg text-muted-foreground">{block.sub}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {block.images.map((img) => (
                  <img
                    key={img.src + img.alt}
                    src={img.src}
                    alt={img.alt}
                    className="rounded-2xl shadow-luxury w-full h-80 object-cover"
                  />
                ))}
              </div>
            </div>
          </section>
        );

      case "faq":
        return (
          <section key={index} className={`py-20 border-t border-border${bg}`}>
            <div className={wrap}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {block.heading}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {block.items.map((item) => (
                  <div key={item.q} className={softCard}>
                    <div className="font-semibold text-foreground mb-2">{item.q}</div>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />

      <section className="relative">
        <div className="w-full h-[60vh] md:h-[70vh]">
          <img
            src={data.heroImage}
            alt={data.heroAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="bg-background py-12 border-t border-border">
          <div className={wrap}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-6">
              {data.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{data.intro}</p>
            <a href="#contact">
              <button className={goldBtn}>
                {data.ctaLabel} <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {data.blocks.map((block, i) => renderBlock(block as Block, i))}

      <section id="contact" className="py-20 border-t border-border">
        <div className={wrap}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {data.contactHeading}
            </h2>
            <p className="text-lg text-muted-foreground">{data.contactSub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className={softCard}>
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <MessageSquare className="w-5 h-5 text-accent" /> Fastest response
              </div>
              <a href="https://wa.me/353838014857" target="_blank" rel="noreferrer">
                <button className={`${goldBtn} w-full mb-3`}>
                  WhatsApp us <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <div className="text-xs text-muted-foreground">{data.contactNote}</div>
            </div>

            <div className={softCard}>
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <Phone className="w-5 h-5 text-accent" /> Call us
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

            <div className={`${softCard} md:col-span-2`}>
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <Mail className="w-5 h-5 text-accent" /> Email
              </div>
              <div className="grid md:grid-cols-2 gap-2">
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
      </section>

      <SiteFooter tagline={data.footerTagline} />
    </div>
  );
};

export default ServicePage;
