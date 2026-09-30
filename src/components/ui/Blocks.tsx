import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Play, Star } from "lucide-react";
import googleRatingRaw from "@/generated/google-rating.json";
import Pic from "@/components/ui/Pic";
import { isPreview, settings } from "@/lib/content";
import type { PriceGuide, Project, Review } from "@/lib/types";

/** Section heading with an optional eyebrow and lead text. */
export function SectionHead({
  eyebrow,
  title,
  text,
  tone = "light",
  align = "left",
  className = "",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const dark = tone === "dark";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl mb-10 ${className}`}>
      {eyebrow && <div className={`eyebrow mb-3 ${dark ? "text-tan" : "text-tan-deep"}`}>{eyebrow}</div>}
      <As className={`text-3xl md:text-[2.6rem] leading-[1.1] ${dark ? "text-white" : "text-ink"}`}>{title}</As>
      {text && <div className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/80" : "text-muted-foreground"}`}>{text}</div>}
    </div>
  );
}

/** A marker shown only on the preview, for anything awaiting the owner's confirmation. */
export function Pending({ note, className = "" }: { note?: string; className?: string }) {
  if (!isPreview || !note) return null;
  return (
    <div className={`rounded border border-amber-400 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900 ${className}`} role="note">
      Review marker, never shown on the live site. Needs confirmation: {note}
    </div>
  );
}

const googleRating = googleRatingRaw as { rating: number | null; count: number | null; show: boolean; source: string };

/**
 * Written at build time by scripts/fetch-google-rating.mjs (the only source of the numbers).
 * When no live or recent figure exists, `show` is false and no numbers appear anywhere.
 */
export const googleSummary = () =>
  googleRating.show && typeof googleRating.rating === "number" && typeof googleRating.count === "number"
    ? `${googleRating.rating.toFixed(1)} on Google from ${googleRating.count} reviews`
    : "Read our reviews on Google";

export function GoogleBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a
      href={settings.company?.reviewUrl?.replace("/review", "") || "https://www.google.com/maps"}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 text-sm ${dark ? "text-white/85 hover:text-white" : "text-ink/80 hover:text-ink"}`}
    >
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-tan text-tan" />
        ))}
      </span>
      {googleSummary()}
    </a>
  );
}

const monthYear = (iso: string) => {
  const [y, m] = iso.split("-").map(Number);
  const names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return m ? `${names[m - 1]} ${y}` : String(y);
};

/** Verbatim Google reviews. Long ones are clamped with a "read more". */
export function ReviewCard({ r, tone = "light" }: { r: Review; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const long = r.text.length > 420;
  return (
    <figure className={`flex h-full flex-col rounded-lg p-6 ${dark ? "bg-white/[0.06] border border-white/10" : "bg-white border border-border shadow-soft"}`}>
      <Pending note={r.pending} className="mb-3" />
      {r.rating ? (
        <div className="mb-3 flex gap-0.5" aria-label={`${r.rating} star review`}>
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-tan text-tan" aria-hidden="true" />
          ))}
        </div>
      ) : (
        <div className="mb-3 eyebrow text-tan-deep">Google review</div>
      )}
      <blockquote className={`flex-1 text-[15px] leading-relaxed ${dark ? "text-white/90" : "text-neutral-700"}`}>
        {long ? (
          <details className="group">
            <summary className="cursor-pointer list-none">
              <span className="whitespace-pre-line">{r.text.slice(0, 380).replace(/\s+\S*$/, "")}…</span>{" "}
              <span className={`font-semibold underline underline-offset-2 group-open:hidden ${dark ? "text-tan" : "text-ink"}`}>Read more</span>
            </summary>
            <span className="whitespace-pre-line">{r.text.slice(r.text.slice(0, 380).replace(/\s+\S*$/, "").length)}</span>
          </details>
        ) : (
          <p className="whitespace-pre-line">{r.text}</p>
        )}
      </blockquote>
      <figcaption className={`mt-5 text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
        <span className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{r.name}</span>
        <span> · Google review, {monthYear(r.date)}</span>
        {r.translated && <span> · translated from Portuguese</span>}
      </figcaption>
    </figure>
  );
}

export function ReviewGrid({ items, tone = "light" }: { items: Review[]; tone?: "light" | "dark" }) {
  if (!items.length) return null;
  const cols = items.length === 1 ? "md:grid-cols-1 max-w-2xl" : items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-5 ${cols}`}>
      {items.map((r) => (
        <ReviewCard key={r.id} r={r} tone={tone} />
      ))}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-medium text-ink">
            {f.q}
            <ChevronDown className="mt-1 h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Steps({ items, tone = "light" }: { items: { title: string; text: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className={`grid gap-6 sm:grid-cols-2 ${items.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {items.map((s, i) => (
        <li key={s.title} className="relative">
          <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full font-serif text-lg ${dark ? "bg-tan text-ink" : "bg-ink text-tan"}`}>{i + 1}</div>
          <h3 className={`mb-2 text-lg ${dark ? "text-white" : "text-ink"}`}>{s.title}</h3>
          <p className={`text-[15px] leading-relaxed ${dark ? "text-white/75" : "text-muted-foreground"}`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Price guidance. Unconfirmed prices never show in production; the preview shows them marked. */
export function PriceBlock({ price }: { price: PriceGuide }) {
  if (!price.confirmed && !isPreview) return null;
  return (
    <div className="rounded-lg border border-tan bg-paper p-6 md:p-8">
      {!price.confirmed && <Pending note={price.pending || "price not yet approved for publishing"} className="mb-4" />}
      <div className="eyebrow mb-2 text-tan-deep">Price guide</div>
      <p className="font-serif text-2xl leading-snug text-ink md:text-[1.7rem]">{price.headline}</p>
      {price.table && (
        <dl className="mt-5 divide-y divide-tan/50 border-y border-tan/50">
          {price.table.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-ink">{r.label}</dt>
              <dd className="font-semibold text-ink tabular-nums">{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {price.note && <p className="mt-4 text-sm text-muted-foreground">{price.note}</p>}
    </div>
  );
}

export function ProjectCard({ p, compact = false }: { p: Project; compact?: boolean }) {
  return (
    <Link to={`/projects/${p.slug}`} className="group block overflow-hidden rounded-lg border border-border bg-white shadow-soft transition-shadow hover:shadow-luxury">
      <div className="relative">
        <Pic item={p.hero} className={compact ? "aspect-[4/3]" : "aspect-[3/2]"} layout="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        {!!p.videos?.length && (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded bg-black/65 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            <Play className="h-3 w-3 fill-current" /> Video
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="eyebrow mb-2 text-tan-deep">{p.sector === "commercial" ? "Commercial" : "Residential"} · {p.location}</div>
        <h3 className="text-xl leading-snug text-ink">{p.title}</h3>
        {!compact && <p className="mt-2 line-clamp-3 text-[15px] text-muted-foreground">{p.summary}</p>}
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:gap-2.5 transition-all">
          View project <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function Crumbs({ items, tone = "light" }: { items: { name: string; to?: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-1.5">
            {it.to ? (
              <Link to={it.to} className={dark ? "hover:text-white" : "hover:text-ink"}>
                {it.name}
              </Link>
            ) : (
              <span aria-current="page">{it.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
