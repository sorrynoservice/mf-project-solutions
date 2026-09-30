import type { ReactNode } from "react";
import { HeroImage } from "@/components/ui/Pic";
import { Crumbs } from "@/components/ui/Blocks";
import type { MediaItem } from "@/lib/types";

type Props = {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  image?: MediaItem;
  mobile?: MediaItem;
  crumbs?: { name: string; to?: string }[];
  children?: ReactNode;
  /** Shorter band for inner pages. */
  size?: "full" | "medium";
};

/** Full-bleed photo hero (use with the "overlay" header), or a plain green band when no image is given. */
export default function PageHero({ eyebrow, title, sub, image, mobile, crumbs, children, size = "medium" }: Props) {
  const h = size === "full" ? "min-h-[88svh] md:min-h-[82vh]" : image ? "min-h-[62svh] md:min-h-[64vh]" : "";
  return (
    <section className={`relative flex items-end overflow-hidden bg-ink pb-14 pt-32 text-white md:pb-16 ${h}`}>
      {image && (
        <>
          <HeroImage desktop={image} mobile={mobile} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/15 to-transparent md:block" />
        </>
      )}
      <div className="wrap relative z-10">
        {crumbs && (
          <div className="mb-5">
            <Crumbs tone="dark" items={crumbs} />
          </div>
        )}
        <div className="eyebrow mb-4 text-tan">{eyebrow}</div>
        <h1 className="max-w-4xl text-[2.35rem] leading-[1.06] sm:text-5xl md:text-6xl">{title}</h1>
        {sub && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{sub}</div>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
