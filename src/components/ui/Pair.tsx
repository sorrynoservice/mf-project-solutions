import { useRef, useState } from "react";
import Pic from "@/components/ui/Pic";
import Img from "@/components/Img";
import type { MediaItem } from "@/lib/types";

export type PairData = { a: MediaItem; b: MediaItem; mid?: MediaItem; caption: string; type: "design-built" | "before-after" | "before-design-after" };

const labels = (t: PairData["type"]) => (t === "before-after" ? ["Before", "After"] : t === "before-design-after" ? ["Before", "After"] : ["Design", "Built"]);

/** Design (or before) beside the finished result, with plain labels. */
export function Pair({ pair, tone = "light" }: { pair: PairData; tone?: "light" | "dark" }) {
  const [l1, l2] = labels(pair.type);
  if (pair.type === "before-design-after" && pair.mid) {
    const cells: [MediaItem, string, string][] = [
      [pair.a, "Before", "bg-white/90 text-ink"],
      [pair.mid, "Design", "bg-tan text-ink"],
      [pair.b, "After", "bg-ink text-tan"],
    ];
    return (
      <figure>
        <div className="grid grid-cols-3 gap-2">
          {cells.map(([m, label, cls]) => (
            <div key={label} className="relative">
              <Pic item={m} badge={false} className="aspect-[3/4] rounded-md sm:aspect-[4/3]" layout="(min-width: 1024px) 22vw, 33vw" />
              <span className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cls}`}>{label}</span>
            </div>
          ))}
        </div>
        <figcaption className={`mt-3 text-sm ${tone === "dark" ? "text-white/75" : "text-muted-foreground"}`}>{pair.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure>
      <div className="grid grid-cols-2 gap-2">
        {[pair.a, pair.b].map((m, i) => (
          <div key={i} className="relative">
            <Pic item={m} badge={false} className="aspect-[4/5] rounded-md sm:aspect-[4/3]" layout="(min-width: 1024px) 25vw, 50vw" />
            <span className={`absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${i === 0 ? "bg-white/90 text-ink" : "bg-ink text-tan"}`}>
              {i === 0 ? l1 : l2}
            </span>
          </div>
        ))}
      </div>
      <figcaption className={`mt-3 text-sm ${tone === "dark" ? "text-white/75" : "text-muted-foreground"}`}>{pair.caption}</figcaption>
    </figure>
  );
}

/** Drag slider for a before/after taken from the same viewpoint. */
export function Compare({ pair }: { pair: PairData }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  const [l1, l2] = labels(pair.type);
  return (
    <figure>
      <div
        ref={box}
        className="relative aspect-[4/3] select-none overflow-hidden rounded-lg bg-neutral-200 touch-pan-y"
        onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      >
        <Img src={pair.b.image} alt={pair.b.caption || l2} layout="content" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Img src={pair.a.image} alt={pair.a.caption || l1} layout="content" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
          <div className="absolute top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-lg text-xs font-bold">
            ⟷
          </div>
        </div>
        <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink">{l1}</span>
        <span className="absolute right-3 top-3 rounded bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-tan">{l2}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Slide to compare ${l1.toLowerCase()} and ${l2.toLowerCase()}`}
          className="absolute inset-x-0 bottom-0 h-8 w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">{pair.caption}</figcaption>
    </figure>
  );
}
