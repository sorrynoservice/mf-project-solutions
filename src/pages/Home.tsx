import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram } from "lucide-react";
import Layout from "@/components/site/Layout";
import ContactBlock from "@/components/site/ContactBlock";
import Pic from "@/components/ui/Pic";
import Img from "@/components/Img";
import Video from "@/components/ui/Video";
import { Pair, type PairData } from "@/components/ui/Pair";
import { GoogleBadge, ProjectCard, ReviewGrid, SectionHead, Steps } from "@/components/ui/Blocks";
import { img } from "@/lib/img";
import { pageContent, people, projects, reviewsByIds, settings } from "@/lib/content";
import type { MediaItem, VideoItem } from "@/lib/types";
import { residentialOther } from "@/components/site/nav";

type HomeContent = {
  heroSlides: { desktop: MediaItem; mobile: MediaItem; sector: string; caption: string }[];
  sectors: { route: string; title: string; text: string; image: MediaItem }[];
  pairs: PairData[];
  crew: MediaItem;
  video: VideoItem;
};

const REVIEWS = ["harry-english-2026-05-27", "cathal-brennan-2025-10-19", "paula-medici-2026-04-03"];

const steps = [
  { title: "Site visit", text: "We look at the house or unit with you, and at your drawings if you have them." },
  { title: "Written quotation", text: "A detailed written quotation that lists what is included, so you can compare it properly." },
  { title: "Programme", text: "Start date, sequence and who you deal with on site, agreed before work starts." },
  { title: "The build", text: "Our crew, our joiners and the specialist trades, run by a named contact from MF." },
  { title: "Handover", text: "We walk the finished work with you and close out the paperwork with your design team." },
];

function HeroSlideshow({ slides }: { slides: HomeContent["heroSlides"] }) {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [held, slides.length]);
  return (
    <>
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((s, k) => {
          // Only the first slide loads with the page; the rest load after hydration.
          if (k > 0 && !ready) return null;
          const d = img(s.desktop.image);
          const m = img(s.mobile.image);
          return (
            <picture key={k} className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${k === i ? "opacity-100" : "opacity-0"}`}>
              <source media="(max-width: 767px)" srcSet={m.srcSet || m.src} sizes="100vw" />
              <img
                src={d.src}
                srcSet={d.srcSet}
                sizes="100vw"
                width={d.w}
                height={d.h}
                alt=""
                loading={k === 0 ? "eager" : "lazy"}
                {...(k === 0 ? { fetchpriority: "high" } : {})}
                decoding="async"
                className="h-full w-full object-cover fx"
                style={{ backgroundColor: d.color, ["--pos" as string]: s.desktop.focus || "50% 50%", ["--mpos" as string]: s.mobile.focus || "50% 50%" }}
              />
            </picture>
          );
        })}
      </div>
      <div className="absolute bottom-6 right-5 z-10 flex items-center gap-2 sm:right-8 lg:right-12" role="group" aria-label="Hero photographs">
        {slides.map((s, k) => (
          <button key={k} type="button" onClick={() => { setI(k); setHeld(true); }} aria-label={`Show photo: ${s.caption}`} aria-current={k === i} className="group py-2">
            <span className={`block h-[3px] rounded-full transition-all duration-500 ${k === i ? "w-9 bg-tan" : "w-5 bg-white/45 group-hover:bg-white/80"}`} />
          </button>
        ))}
      </div>
      <p className="absolute bottom-7 left-5 z-10 hidden max-w-md text-xs text-white/70 sm:left-8 md:block lg:left-12" aria-live="polite">
        <span className="uppercase tracking-[0.18em] text-tan">{slides[i].sector}</span> · {slides[i].caption}
      </p>
    </>
  );
}

export default function Home() {
  const c = pageContent<HomeContent>("home");
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const reviews = reviewsByIds(REVIEWS);
  const team = people.filter((p) => p.headshot && !p.pending).slice(0, 3);
  const strip = settings.instagramStrip ?? [];

  return (
    <Layout header="overlay" page={{ route: "major", pageCode: "HOME", service: "a project", contactHref: "#contact", ctaShort: "Discuss a project" }}>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pb-24 pt-28 text-white md:pb-28">
        <HeroSlideshow slides={c.heroSlides} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/60 via-black/15 to-transparent md:block" />
        <div className="wrap relative z-10">
          <div className="eyebrow mb-5 text-tan">Residential and commercial construction · Dublin, Meath and Kildare</div>
          <h1 className="max-w-4xl text-[2.5rem] leading-[1.04] sm:text-6xl md:text-7xl">Extensions, renovations and commercial fit-outs, built properly.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            A family-run construction company with its own site crew and joinery workshop. We build from your architect's drawings, or help you design the project first.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-tan h-14 px-8 text-base">Discuss your project</a>
            <Link to="/projects" className="btn-ghost-light h-14 px-8 text-base">See our projects</Link>
          </div>
          <div className="mt-8">
            <GoogleBadge tone="dark" />
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-20 md:py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead className="mb-0" eyebrow="Projects" title="Recent work, from structure to handover" />
            <Link to="/projects" className="link-arrow text-ink">All projects <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Two routes */}
      <section className="bg-paper py-20 md:py-24">
        <div className="wrap">
          <SectionHead
            eyebrow="Design and construction"
            title="Two ways to start"
            text="Most of our larger projects begin one of two ways. Either suits us, and we are clear about which one you are on from the first meeting."
          />
          <div className="mb-14 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-white p-7">
              <div className="eyebrow mb-3 text-tan-deep">You already have drawings</div>
              <h3 className="text-2xl text-ink">We price and build from your architect's or designer's drawings</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
                We work with your design team through the build, from the first structural openings to close-out. Phibsborough and Leixlip were both built this way.
              </p>
              <Link to="/for-architects" className="link-arrow mt-5 text-ink">Working with architects <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="rounded-lg border border-border bg-white p-7">
              <div className="eyebrow mb-3 text-tan-deep">You need design help</div>
              <h3 className="text-2xl text-ink">We develop the layouts, interiors, 3D views and planning drawings</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
                Then we can build it. Where a project needs an architect, engineer or certifier, we bring in the right professional.
              </p>
              <Link to="/design" className="link-arrow mt-5 text-ink">Our design service <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-3">
            {c.pairs.map((p) => (
              <Pair key={p.caption} pair={p} />
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-20 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="What we build" title="Homes and businesses" />
          <div className="grid gap-6 md:grid-cols-3">
            {c.sectors.map((s) => (
              <Link key={s.route} to={s.route} className="group overflow-hidden rounded-lg border border-border bg-white shadow-soft transition-shadow hover:shadow-luxury">
                <Pic item={s.image} className="aspect-[4/3]" layout="(min-width: 768px) 33vw, 100vw" />
                <div className="p-6">
                  <h3 className="text-2xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-all group-hover:gap-2.5">
                    Find out more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 rounded-lg border border-border p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-[15px] text-muted-foreground">
                We also build <span className="text-ink">bathrooms, garden rooms, patios, landscaping and timber verandas</span>, and carry out <span className="text-ink">snagging and pre-purchase inspections</span>.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-ink">
                {residentialOther.slice(0, 4).map((l) => (
                  <Link key={l.to} to={l.to} className="underline-offset-4 hover:underline">{l.name}</Link>
                ))}
                <Link to="/property-services" className="underline-offset-4 hover:underline">Property inspections</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How a project runs */}
      <section className="bg-ink py-20 text-white md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center">
          <div className="mx-auto w-full max-w-xs">
            <Video video={c.video} />
          </div>
          <div>
            <SectionHead tone="dark" eyebrow="How a project runs" title="From the first visit to handover" />
            <Steps items={steps} tone="dark" />
            <Link to="/how-we-work" className="link-arrow mt-10 text-tan">How we work <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* People */}
      <section className="py-20 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
          <Pic item={c.crew} className="aspect-[4/3] rounded-lg" layout="half" />
          <div>
            <SectionHead className="mb-6" eyebrow="Who we are" title="A family-run company, with the owners on the job" />
            <p className="text-lg leading-relaxed text-neutral-700">
              MF Project Solutions is a family-run company, and the people who own it run the work. From the first call to handover you deal with named people: the person who prices your job, the person who manages it and the crew who build it. Our joiners make the kitchens and joinery in our own workshop in Drumree.
            </p>
            {team.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-6">
                {team.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <Img src={p.headshot} alt={p.name} layout="thumb" className="h-14 w-14 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-ink">{p.name}</div>
                      <div className="text-sm text-muted-foreground">{p.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link to="/about" className="link-arrow mt-8 text-ink">About us <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-paper py-20 md:py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead className="mb-0" eyebrow="Reviews" title="What our clients say" />
            <GoogleBadge />
          </div>
          <ReviewGrid items={reviews} />
        </div>
      </section>

      {/* Architects */}
      <section className="border-b border-border py-16">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow mb-2 text-tan-deep">Architects and designers</div>
            <h2 className="text-2xl text-ink md:text-3xl">Looking for a contractor to build your design?</h2>
            <p className="mt-2 text-muted-foreground">Send us the tender drawings, or ask to add MF to your tender list.</p>
          </div>
          <Link to="/for-architects" className="btn-ink shrink-0">For architects and designers <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* On site now */}
      {strip.length > 0 && (
        <section className="py-16">
          <div className="wrap">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-2xl text-ink">On site now</h2>
              {settings.company.instagram && (
                <a href={settings.company.instagram} target="_blank" rel="noreferrer" className="link-arrow text-sm text-ink">
                  <Instagram className="h-4 w-4" /> Follow on Instagram
                </a>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {strip.slice(0, 3).map((m) => (
                <Pic key={m.image} item={m} className="aspect-square rounded-md" layout="third" />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactBlock
        title="Tell us about your project"
        text="Choose what it is about and it goes straight to the right person. Photos and drawings are easiest by WhatsApp."
        pageCode="HOME"
      />
    </Layout>
  );
}
