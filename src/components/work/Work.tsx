import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { W } from "@/data/work";
import type { CaseStudy } from "@/data/caseStudies";
import EnquiryForm from "@/components/EnquiryForm";

export const wrap = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-12";
export const gold = "#d4af37";
export const green = "#0a2e2a";

/** Design images are marked so they are never mistaken for photographs. */
const designIds = new Set([
  "M124", "M126", "M129", "M130", "M149", "M150", "M203", "M208", "M209", "M210",
  "M295", "M296", "M297", "M298", "M299", "M300", "M301", "M304", "M305", "M306", "M307",
  "M311", "M312", "M315", "M316", "M319", "M320", "M321", "M322", "M323",
  "M329", "M330", "M331", "M332", "M333", "M336", "M338", "M339", "M340", "M341",
]);
const drawingIds = new Set(["M129", "M130", "M297", "M298", "M301", "M333", "M336", "M338", "M339", "M340", "M341"]);
export const isDesign = (id: string) => designIds.has(id);

type ImgProps = {
  id: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  /** Show a small Design label on design images. */
  label?: boolean;
  fit?: "cover" | "contain";
};

export const Img = ({ id, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", eager, label = true, fit = "cover" }: ImgProps) => {
  const p = W[id];
  if (!p) return null;
  const drawing = drawingIds.has(id);
  return (
    <div className={`relative overflow-hidden ${drawing ? "bg-white" : "bg-muted"} ${className}`}>
      <img
        src={p.lowRes ? p.sm : p.src}
        srcSet={p.lowRes ? undefined : `${p.sm} 900w, ${p.src} ${p.w}w`}
        sizes={sizes}
        alt={p.alt}
        width={p.w}
        height={p.h}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`w-full h-full ${drawing || fit === "contain" ? "object-contain p-2" : "object-cover"}`}
      />
      {label && isDesign(id) && (
        <span className="absolute left-2 top-2 rounded bg-black/65 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
          {drawing ? "Drawing" : "Design"}
        </span>
      )}
    </div>
  );
};

/** Grid of photos that open full screen. */
export const Gallery = ({ ids, cols = 3 }: { ids: string[]; cols?: 2 | 3 | 4 }) => {
  const list = ids.filter((id) => W[id]);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const grid = cols === 2 ? "sm:grid-cols-2" : cols === 4 ? "grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  const cur = open !== null ? W[list[open]] : null;

  return (
    <>
      <div className={`grid gap-3 ${grid}`}>
        {list.map((id, i) => (
          <button
            key={id}
            onClick={() => setOpen(i)}
            className="group block text-left rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            aria-label={`Open photo: ${W[id].alt}`}
          >
            <Img id={id} className="aspect-[4/3] group-hover:opacity-90 transition-opacity" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          </button>
        ))}
      </div>
      {cur && open !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" role="dialog" aria-modal="true" onClick={close}>
          <img
            src={cur.src}
            alt={cur.alt}
            className="max-h-[88vh] max-w-[94vw] object-contain bg-white/0"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/85 text-sm px-16">
            {isDesign(list[open]) && <span className="mr-2 rounded bg-white/15 px-2 py-0.5 text-xs uppercase tracking-wider">Design</span>}
            {cur.alt}
          </div>
          <button className="absolute top-4 right-4 text-white p-2" onClick={close} aria-label="Close">
            <X className="w-7 h-7" />
          </button>
          {list.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-3"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-3"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

/** A design image beside the finished result. */
export const PairCard = ({ design, built, caption }: { design: string; built: string; caption: string }) => (
  <figure className="rounded-2xl overflow-hidden border border-border bg-card shadow-soft">
    <div className="grid grid-cols-2">
      <div className="relative">
        <Img id={design} className="aspect-[4/3]" label={false} sizes="(min-width: 1024px) 25vw, 50vw" />
        <span className="absolute left-2 top-2 rounded bg-black/65 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">Design</span>
      </div>
      <div className="relative">
        <Img id={built} className="aspect-[4/3]" label={false} sizes="(min-width: 1024px) 25vw, 50vw" />
        <span className="absolute left-2 top-2 rounded bg-[#d4af37] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#0a2e2a]">Built</span>
      </div>
    </div>
    <figcaption className="px-4 py-3 text-sm text-muted-foreground">{caption}</figcaption>
  </figure>
);

export const CaseCard = ({ c, eager, ctx }: { c: CaseStudy; eager?: boolean; ctx?: string }) => (
  <Link
    to={`/projects/${c.slug}`}
    className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-luxury transition-all duration-300"
  >
    <Img id={(ctx && c.covers?.[ctx]) || c.cover} className="aspect-[4/3]" eager={eager} label={false} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
    <div className="p-5 flex flex-col flex-1">
      <div className="text-xs uppercase tracking-wider font-semibold text-[#8a6d12] mb-1">{c.sector}</div>
      <h3 className="text-lg font-bold text-foreground leading-snug">{c.title}</h3>
      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4 shrink-0" /> {c.location}
        {c.year && <span className="ml-1">· {c.year}</span>}
      </div>
      <p className="mt-3 text-sm text-muted-foreground flex-1">{c.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground group-hover:gap-2 transition-all">
        View project <ArrowRight className="w-4 h-4" />
      </span>
    </div>
  </Link>
);

export const PageHero = ({ id, eyebrow, title, lead, children }: { id: string; eyebrow: string; title: string; lead: string; children?: React.ReactNode }) => (
  <section className="relative min-h-[70svh] flex items-end pt-28 pb-14 text-white">
    <div className="absolute inset-0">
      <Img id={id} className="w-full h-full" eager label={false} sizes="100vw" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
    <div className={`${wrap} relative z-10 w-full`}>
      <div className="text-[#d4af37] text-xs md:text-sm uppercase tracking-[0.25em] font-semibold mb-4">{eyebrow}</div>
      <h1 className="text-4xl md:text-6xl font-serif leading-tight max-w-4xl">{title}</h1>
      <p className="mt-5 text-lg md:text-xl text-white/90 max-w-3xl">{lead}</p>
      {children}
    </div>
  </section>
);

export const SectionTitle = ({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) => (
  <div className="max-w-3xl mb-10">
    {eyebrow && <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8a6d12] mb-3">{eyebrow}</div>}
    <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight">{title}</h2>
    {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
  </div>
);

export const ContactSection = ({ formType = "", title = "Planning a project?" }: { formType?: string; title?: string }) => (
  <section id="contact" className="py-20 border-t border-border bg-muted/30 scroll-mt-20">
    <div className={`${wrap} max-w-4xl`}>
      <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3 text-center">{title}</h2>
      <p className="text-lg text-muted-foreground mb-10 text-center">
        Tell us about it and we will arrange a site visit. Drawings, if you have them, help us price accurately.
      </p>
      <div className="rounded-2xl border border-border shadow-soft p-6 bg-card">
        <EnquiryForm defaultType={formType} />
      </div>
    </div>
  </section>
);
