import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Pic from "@/components/ui/Pic";
import { img } from "@/lib/img";
import type { MediaItem } from "@/lib/types";

type Props = {
  items: MediaItem[];
  /** "feature": first image large, rest in a grid. "grid": equal tiles. */
  variant?: "feature" | "grid";
  cols?: 2 | 3 | 4;
};

/** Lays tiles out in balanced rows (never a lone photo on the last row). */
function Rows({
  items,
  offset,
  tile,
  max = 4,
}: {
  items: MediaItem[];
  offset: number;
  tile: (m: MediaItem, i: number, cls: string, layout: string) => JSX.Element;
  max?: number;
}) {
  const n = items.length;
  const rows = Math.ceil(n / max);
  const base = Math.floor(n / rows);
  const extra = n % rows;
  const out: JSX.Element[] = [];
  let k = 0;
  for (let r = 0; r < rows; r++) {
    const count = base + (r < extra ? 1 : 0);
    const cls = { 1: "", 2: "grid-cols-2", 3: "grid-cols-2 sm:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" }[count] ?? "grid-cols-2 lg:grid-cols-4";
    out.push(
      <div key={r} className={`grid gap-3 ${cls}`}>
        {items.slice(k, k + count).map((m, i) => tile(m, offset + k + i, "aspect-[4/3]", `(min-width: 1024px) ${Math.round(100 / count)}vw, 50vw`))}
      </div>,
    );
    k += count;
  }
  return <div className="space-y-3">{out}</div>;
}

/** Photo grid; any photo opens full screen with keyboard and swipe navigation. */
export default function Gallery({ items, variant = "grid", cols = 3 }: Props) {
  const list = items.filter((i) => i?.image);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);
  const [touchX, setTouchX] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  if (!list.length) return null;
  const cur = open !== null ? list[open] : null;
  const big = cur ? img(cur.image) : null;
  const bigSrc = big?.srcSet ? big.srcSet.split(", ").pop()!.split(" ")[0] : big?.src;

  const tile = (m: MediaItem, i: number, cls: string, layout: string) => (
    <button
      key={`${m.image}-${i}`}
      type="button"
      onClick={() => setOpen(i)}
      className={`group relative block overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-tan ${cls}`}
      aria-label={`Open photo: ${m.caption || m.alt || "project photo"}`}
    >
      <Pic item={m} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" layout={layout} />
      {m.caption && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8 text-left text-xs text-white/95 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          {m.caption}
        </span>
      )}
    </button>
  );

  return (
    <>
      {variant === "feature" && list.length >= 3 ? (
        <div className="space-y-3">
          <div className="grid gap-3 lg:h-[560px] lg:grid-cols-3 lg:grid-rows-2">
            {tile(list[0], 0, "aspect-[4/3] lg:aspect-auto lg:col-span-2 lg:row-span-2", "(min-width: 1024px) 66vw, 100vw")}
            {list.slice(1, 3).map((m, i) => tile(m, i + 1, "aspect-[4/3] lg:aspect-auto", "(min-width: 1024px) 33vw, 100vw"))}
          </div>
          {list.length > 3 && <Rows items={list.slice(3)} offset={3} tile={tile} />}
        </div>
      ) : (
        <Rows items={list} offset={0} tile={tile} max={cols} />
      )}

      {cur && open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            setTouchX(null);
          }}
        >
          <img src={bigSrc} alt={cur.alt || cur.caption || ""} className="max-h-[86vh] max-w-[94vw] object-contain" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-4 left-0 right-0 px-16 text-center text-sm text-white/85">
            {cur.kind && cur.kind !== "photo" && (
              <span className="mr-2 rounded bg-white/15 px-2 py-0.5 text-xs uppercase tracking-wider">{cur.kind === "drawing" ? "Drawing" : "Design"}</span>
            )}
            {cur.caption}
            <span className="ml-2 text-white/50">
              {open + 1} / {list.length}
            </span>
          </div>
          <button type="button" className="absolute right-3 top-3 p-3 text-white" onClick={close} aria-label="Close">
            <X className="h-7 w-7" />
          </button>
          {list.length > 1 && (
            <>
              <button type="button" className="absolute left-1 top-1/2 -translate-y-1/2 p-3 text-white" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo">
                <ChevronLeft className="h-9 w-9" />
              </button>
              <button type="button" className="absolute right-1 top-1/2 -translate-y-1/2 p-3 text-white" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo">
                <ChevronRight className="h-9 w-9" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
