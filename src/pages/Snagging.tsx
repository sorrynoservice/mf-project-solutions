import { useRef, useState } from "react";
import {
  ArrowRight,
  CircleCheck,
  ClipboardList,
  ExternalLink,
  Mail,
  MessageSquare,
  Pause,
  Phone,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import Testimonials from "@/components/Testimonials";
import { snagging, snaggingIcons } from "@/data/snagging";
import { contacts } from "@/data/site";
import { useSeo } from "@/lib/seo";

const wrap = "max-w-7xl mx-auto px-8 sm:px-11 md:px-16 lg:px-22";
const goldBtn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 luxury-gradient text-primary-foreground hover:opacity-90 shadow-luxury font-semibold h-14 rounded-lg px-10 text-base";
const goldBtnSm =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 luxury-gradient text-primary-foreground hover:opacity-90 shadow-luxury font-semibold h-11 px-6 py-2 w-full";
const outlineBtn =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-primary/20 bg-transparent text-foreground hover:bg-primary/5 h-11 px-6 py-2 w-full text-sm";
const softCard = "rounded-2xl border border-border shadow-soft p-6 bg-card";
const BOOKING_URL = "https://forms.gle/pV5qTNMyJ5j4Xyt3A";

const Snagging = () => {
  useSeo("/snagging");
    const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />

      <section className="relative">
        <div className="w-full h-[60vh] md:h-[70vh]">
          <img
            src={snagging.hero.image}
            alt={snagging.hero.alt}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="bg-background py-12 border-t border-border">
          <div className={wrap}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-6">
              {snagging.hero.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">{snagging.hero.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                <button className={`${goldBtn} w-full sm:w-auto`}>
                  Request consultation <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <a href={contacts.snagging.whatsapp} target="_blank" rel="noreferrer">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold h-14 rounded-lg px-10 text-base w-full sm:w-auto border-2 border-primary/30 text-foreground hover:bg-primary/5 transition-colors">
                  <MessageSquare className="w-4 h-4" /> WhatsApp Wanessa
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className={wrap}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center md:justify-end md:pr-6">
              <div className="relative rounded-2xl shadow-luxury overflow-hidden group cursor-pointer aspect-[9/16] max-h-[600px]">
                <video
                  ref={videoRef}
                  src={snagging.expert.video}
                  loop
                  muted={muted}
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 flex gap-3">
                  <button
                    onClick={togglePlay}
                    aria-label={playing ? "Pause video" : "Play video"}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                  >
                    {playing ? (
                      <Pause className="w-6 h-6 text-white drop-shadow-lg" />
                    ) : (
                      <Play className="w-6 h-6 text-white drop-shadow-lg" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                  >
                    {muted ? (
                      <VolumeX className="w-6 h-6 text-white drop-shadow-lg" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-white drop-shadow-lg" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {snagging.expert.heading}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">{snagging.expert.p1}</p>
              <p className="text-muted-foreground mb-6">{snagging.expert.p2}</p>
              <a href="#contact">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-luxury h-14 rounded-lg px-10 text-base">
                  Get in touch
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 border-t border-border bg-muted/30">
        <div className={wrap}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {snagging.pricingHeading}
            </h2>
            <p className="text-lg text-muted-foreground">{snagging.pricingSub}</p>
            <p className="text-sm text-muted-foreground mt-2">{snagging.pricingNote}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {snagging.tiers.map((tier) => {
              const Icon = snaggingIcons[tier.icon];
              return (
                <div
                  key={tier.name}
                  className="rounded-2xl border border-border shadow-soft p-6 bg-card/80 backdrop-blur hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                    {Icon && <Icon className="w-5 h-5 text-accent" />}
                  </div>
                  <div className="text-3xl font-bold text-foreground">{tier.price}</div>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-muted-foreground">
                        <CircleCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="mt-6 block">
                    <button className={goldBtnSm}>
                      Book a snag now <ArrowRight className="w-4 h-4" />
                    </button>
                  </a>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {snagging.addons.map((addon) => (
              <div key={addon.name} className={softCard}>
                <div className="font-semibold text-foreground mb-2">{addon.name}</div>
                <div className="text-3xl font-bold text-foreground mb-3">{addon.price}</div>
                <p className="text-sm text-muted-foreground">{addon.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 border-t border-border">
        <div className={wrap}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {snagging.processHeading}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {snagging.processSub}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {snagging.steps.map((step) => {
              const Icon = snaggingIcons[step.icon];
              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-border shadow-soft p-8 bg-card text-center"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-secondary/20 mb-4">
                    {Icon && <Icon className="w-8 h-8 text-accent" />}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img loading="lazy" decoding="async"
                src={snagging.doc.image}
                alt={snagging.doc.alt}
                className="rounded-2xl shadow-luxury w-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{snagging.doc.heading}</h3>
              <p className="text-muted-foreground mb-4">{snagging.doc.intro}</p>
              <ul className="space-y-3">
                {snagging.doc.items.map((item) => (
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

      <section className="py-20 border-t border-border">
        <div className={wrap}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {snagging.inspections.heading}
            </h2>
            <p className="text-lg text-muted-foreground">{snagging.inspections.sub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {snagging.inspections.images.map((img) => (
              <img loading="lazy" decoding="async"
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="rounded-2xl shadow-luxury w-full h-full object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <Testimonials category="snagging" heading="What our snagging clients say" />

      <section id="faq" className="py-20 border-t border-border bg-muted/30">
        <div className={wrap}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {snagging.faqHeading}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {snagging.faq.map((item) => (
              <div key={item.q} className={softCard}>
                <div className="font-semibold text-foreground mb-2">{item.q}</div>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 border-t border-border">
        <div className={wrap}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {snagging.contactHeading}
            </h2>
            <p className="text-lg text-muted-foreground">{snagging.contactSub}</p>
          </div>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-6 max-w-6xl mx-auto [&>*]:min-w-0">
          <img
            src="/assets/team/snagging-team-site.jpg"
            alt="MF Project Solutions snagging team in hard hats at a new-build estate"
            loading="lazy"
            decoding="async"
            className="rounded-2xl shadow-luxury w-full h-80 lg:h-full object-cover object-[center_30%]"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className={softCard}>
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <MessageSquare className="w-5 h-5 text-accent" /> Fastest response
              </div>
              <a href="https://wa.me/353838014857" target="_blank" rel="noreferrer">
                <button className={`${goldBtn} w-full mb-3`}>
                  WhatsApp Wanessa <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <div className="text-xs text-muted-foreground">
                She coordinates times and access (EN or PT-BR)
              </div>
            </div>

            <div className={softCard}>
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <ClipboardList className="w-5 h-5 text-accent" /> Book online
              </div>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                <button className={`${goldBtn} w-full mb-3`}>
                  Open booking form <ExternalLink className="w-4 h-4" />
                </button>
              </a>
              <div className="text-xs text-muted-foreground">
                Get confirmation by email with next steps
              </div>
            </div>

            <div className={softCard}>
              <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                <Phone className="w-5 h-5 text-accent" /> Call us
              </div>
              <div className="space-y-2">
                <a href="tel:+353838014857">
                  <button className={`${outlineBtn} flex items-center justify-between`}>
                    <span>+353 83 801 4857</span>
                    <span className="text-xs text-muted-foreground">Wanessa</span>
                  </button>
                </a>
                <a href="tel:+353876039378">
                  <button className={`${outlineBtn} flex items-center justify-between`}>
                    <span>+353 87 603 9378</span>
                    <span className="text-xs text-muted-foreground">Alex</span>
                  </button>
                </a>
              </div>
            </div>

            <div className={softCard}>
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

      <SiteFooter tagline="Professional Snagging Services" variant="snagging" />
    </div>
  );
};

export default Snagging;
