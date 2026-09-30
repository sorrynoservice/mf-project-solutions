import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/site/Layout";
import Pic, { HeroImage } from "@/components/ui/Pic";
import Gallery from "@/components/ui/Gallery";
import Video from "@/components/ui/Video";
import { Pair } from "@/components/ui/Pair";
import { Crumbs, Faq, GoogleBadge, Pending, PriceBlock, ProjectCard, ReviewGrid, SectionHead, Steps } from "@/components/ui/Blocks";
import EnquiryForm, { SERVICE_BY_CODE } from "@/components/forms/EnquiryForm";
import SnagBookingForm from "@/components/forms/SnagBookingForm";
import { projectsByTag, reviewsByIds, serviceByRoute, settings } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import type { ServicePage } from "@/lib/types";

const parentOf = (s: ServicePage) =>
  s.leadRoute === "property"
    ? { name: "Property services", to: "/property-services" }
    : s.pageCode === "COM"
      ? { name: "Commercial", to: "/commercial" }
      : s.pageCode === "DES"
        ? undefined
        : { name: "Residential", to: "/residential" };

/** Every service landing page: one template, all copy and media from /content/services. */
export default function ServiceLanding({ route }: { route: string }) {
  const s = serviceByRoute(route);
  if (!s) return null;
  const r = settings.routes[s.leadRoute];
  const service = SERVICE_BY_CODE[s.pageCode] || s.name;
  const reviews = reviewsByIds(s.reviews ?? []);
  const related = s.projectsTag ? projectsByTag(s.projectsTag).slice(0, 3) : [];
  const booking = s.form === "snag-booking";
  const parent = parentOf(s);
  const wa = waLink(s.leadRoute, s.pageCode, service);

  return (
    <Layout
      header="overlay"
      page={{ route: s.leadRoute, pageCode: s.pageCode, service, contactHref: "#enquire", ctaShort: booking ? "Book an inspection" : s.hero.ctaLabel.length < 22 ? s.hero.ctaLabel : "Get a quotation" }}
    >
      {/* Hero */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink pb-14 pt-28 text-white md:min-h-[82vh] md:pb-20">
        <div className="absolute inset-0">
          <HeroImage desktop={s.hero.image} mobile={s.hero.imageMobile} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/60 via-black/20 to-transparent md:block" />
        <div className="wrap relative z-10">
          <Pending note={s.hidden ? "hidden page: not in menus or sitemap until switched on" : undefined} className="mb-4 max-w-xl" />
          {parent && (
            <div className="mb-5">
              <Crumbs tone="dark" items={[{ name: "Home", to: "/" }, parent, { name: s.name }]} />
            </div>
          )}
          <div className="eyebrow mb-4 text-tan">{s.hero.eyebrow}</div>
          <h1 className="max-w-4xl text-[2.35rem] leading-[1.05] sm:text-5xl md:text-6xl">{s.hero.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{s.hero.sub}</p>
          {s.hero.bullets && (
            <ul className="mt-6 grid max-w-3xl gap-2 text-[15px] text-white/90 sm:grid-cols-3 sm:gap-4">
              {s.hero.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-tan" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#enquire" className="btn-tan h-14 px-8 text-base">
              {s.hero.ctaLabel}
            </a>
            <a href={wa} target="_blank" rel="noreferrer" data-route={s.leadRoute} data-page={s.pageCode} className="btn-ghost-light h-14">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp {r.person}
            </a>
            <a href={r.tel} data-route={s.leadRoute} data-page={s.pageCode} className="btn h-14 text-white/90 hover:text-white">
              <Phone className="h-5 w-5" aria-hidden="true" /> {r.phone}
            </a>
          </div>
          <div className="mt-7">
            <GoogleBadge tone="dark" />
          </div>
        </div>
      </section>

      {/* Proof points */}
      <section className="border-b border-border bg-paper">
        <div className="wrap grid gap-8 py-12 md:grid-cols-3 md:gap-10">
          {s.proof.map((p) => (
            <div key={p.title} className="border-l-2 border-tan pl-5">
              <h2 className="text-xl text-ink">{p.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro beside the video */}
      {(s.intro || s.video) && (
        <section className="py-20">
          <div className={`wrap grid gap-12 lg:items-center ${s.video ? "lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]" : "lg:grid-cols-[1fr_1.2fr]"}`}>
            {s.intro ? (
              s.video ? (
                <div>
                  <SectionHead className="mb-6" eyebrow={s.name} title={s.intro.title} />
                  <div className="prose-mf text-lg text-neutral-700">
                    {s.intro.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <SectionHead className="mb-0" eyebrow={s.name} title={s.intro.title} />
                  <div className="prose-mf text-lg text-neutral-700">
                    {s.intro.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </>
              )
            ) : (
              <SectionHead className="mb-0" eyebrow={s.name} title={s.gallery.title} text={s.gallery.intro} />
            )}
            {s.video && (
              <div className="mx-auto w-full max-w-[20rem]">
                {s.video.title && <div className="eyebrow mb-3 text-tan-deep">{s.video.title}</div>}
                <Video video={s.video} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      {s.gallery.items.length > 0 && (
        <section className={s.intro || s.video ? "pb-20" : "py-20"}>
          <div className="wrap">
            {(s.intro || !s.video) && <SectionHead className="mb-8" title={s.gallery.title} text={s.gallery.intro} />}
            <Gallery items={s.gallery.items} variant="feature" />
          </div>
        </section>
      )}

      {/* Design beside built / before and after */}
      {s.pairs && s.pairs.length > 0 && (
        <section className="bg-paper py-20">
          <div className="wrap">
            <SectionHead
              eyebrow={s.pairs[0].type === "before-after" ? "Before and after" : "Designed, then built"}
              title={s.pairs[0].type === "before-after" ? "The same place, before and after" : "The design, and what we built from it"}
            />
            <div className={`grid gap-10 ${s.pairs.length > 1 ? "lg:grid-cols-2" : "max-w-3xl"}`}>
              {s.pairs.slice(0, 4).map((p) => (
                <Pair key={p.caption} pair={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Extra sections */}
      {s.sections && s.sections.length > 0 && (
        <section className="py-20">
          <div className={`wrap grid gap-x-16 gap-y-14 ${s.sections.length > 1 ? "lg:grid-cols-2" : "max-w-4xl"}`}>
            {s.sections.map((sec) => (
              <div key={sec.title}>
                <h2 className="mb-4 text-2xl text-ink md:text-3xl">{sec.title}</h2>
                {sec.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)} className="mb-4 text-[17px] leading-relaxed text-neutral-700">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="mt-2 space-y-2.5">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[16px] leading-relaxed text-neutral-700">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-tan-deep" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {sec.image && <Pic item={sec.image} className="mt-6 aspect-[3/2] rounded-lg" />}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What is included, price */}
      {(s.included || s.price) && (
        <section className="border-y border-border bg-white py-20">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            {s.included && (
              <div>
                <SectionHead className="mb-6" eyebrow="What you get" title={s.included.title} />
                <ul className="space-y-3">
                  {s.included.items.map((i) => (
                    <li key={i} className="flex gap-3 text-[17px] text-neutral-700">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-tan-deep" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="space-y-8">
              {s.price && <PriceBlock price={s.price} />}
              {s.included?.priceFactors && (
                <div>
                  <h3 className="mb-4 text-xl text-ink">What changes the price</h3>
                  <ul className="space-y-2.5">
                    {s.included.priceFactors.map((f) => (
                      <li key={f} className="flex gap-3 text-[16px] text-muted-foreground">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tan-deep" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {s.process && s.process.length > 0 && (
        <section className="bg-ink py-20 text-white">
          <div className="wrap">
            <SectionHead tone="dark" eyebrow="How it works" title="What happens next" />
            <Steps items={s.process} tone="dark" />
          </div>
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="bg-paper py-20">
          <div className="wrap">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHead className="mb-0" eyebrow="Reviews" title="What clients say" />
              <GoogleBadge />
            </div>
            <ReviewGrid items={reviews.slice(0, 6)} />
          </div>
        </section>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-20">
          <div className="wrap">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHead className="mb-0" eyebrow="Projects" title="Related projects" />
              <Link to="/projects" className="link-arrow text-ink">
                All projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {s.faqs && s.faqs.length > 0 && (
        <section className={`py-20 ${related.length ? "bg-paper" : ""}`}>
          <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr]">
            <SectionHead className="mb-0" eyebrow="Questions" title="Common questions" />
            <Faq items={s.faqs} />
          </div>
        </section>
      )}

      {/* Cross-sell */}
      {s.crossSell && s.crossSell.length > 0 && (
        <section className="border-t border-border py-14">
          <div className="wrap grid gap-5 md:grid-cols-2">
            {s.crossSell.map((c) => (
              <Link key={c.route} to={c.route} className="group flex items-center justify-between gap-6 rounded-lg border border-border p-6 hover:border-tan hover:bg-paper">
                <div>
                  <div className="text-lg font-semibold text-ink">{c.label}</div>
                  <p className="mt-1 text-[15px] text-muted-foreground">{c.text}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-tan-deep transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-20 bg-ink py-20 text-white">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <div className="eyebrow mb-3 text-tan">{booking ? "Book" : "Enquire"}</div>
            <h2 className="text-3xl leading-tight md:text-[2.6rem]">{s.cta.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">{s.cta.text}</p>
            <div className="mt-8 space-y-4 text-[15px]">
              <p className="text-white/70">
                {booking ? "Bookings are handled by" : "Your enquiry goes to"} <span className="font-semibold text-white">{r.person}</span>.
              </p>
              <a href={wa} target="_blank" rel="noreferrer" data-route={s.leadRoute} data-page={s.pageCode} className="flex items-center gap-3 text-white hover:text-tan">
                <MessageCircle className="h-5 w-5 text-tan" aria-hidden="true" /> WhatsApp {r.phone}
              </a>
              <a href={r.tel} data-route={s.leadRoute} data-page={s.pageCode} className="flex items-center gap-3 text-white hover:text-tan">
                <Phone className="h-5 w-5 text-tan" aria-hidden="true" /> Call {r.phone}
              </a>
              <p className="text-sm text-white/55">We work {settings.serviceArea.summary}.</p>
            </div>
          </div>
          <div className="rounded-xl bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-8">
            {booking ? (
              <SnagBookingForm pageCode={s.pageCode} tone="dark" />
            ) : (
              <EnquiryForm route={s.leadRoute} pageCode={s.pageCode} service={service} tone="dark" />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
