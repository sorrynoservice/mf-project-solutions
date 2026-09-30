import Img from "@/components/Img";
import { img, type ImageLayout } from "@/lib/img";
import type { MediaItem } from "@/lib/types";

const kindLabel: Record<string, string> = {
  design: "Design",
  drawing: "Drawing",
  "ai-enhanced": "Design image",
};

type Props = {
  item: MediaItem;
  className?: string;
  /** Classes for the <img> itself. */
  imgClassName?: string;
  layout?: ImageLayout | (string & {});
  priority?: boolean;
  /** Show the Design / Drawing badge on anything that is not a photograph. Default true. */
  badge?: boolean;
  /** Mobile focal point, if different. */
  mobileFocus?: string;
};

/**
 * A content image in a sized box. Drawings are shown whole on white; everything that is not a
 * photograph carries a small label so a render is never taken for a photo.
 */
export default function Pic({ item, className = "", imgClassName = "", layout = "content", priority, badge = true, mobileFocus }: Props) {
  const drawing = item.kind === "drawing";
  const label = item.kind && item.kind !== "photo" ? kindLabel[item.kind] : undefined;
  return (
    <div className={`relative overflow-hidden ${drawing ? "bg-white" : "bg-neutral-200"} ${className}`}>
      <Img
        src={item.image}
        alt={item.alt || item.caption || ""}
        layout={layout}
        priority={priority}
        className={`h-full w-full ${drawing ? "object-contain p-3" : "object-cover fx"} ${imgClassName}`}
        style={{ ["--pos" as string]: item.focus || "50% 50%", ...(mobileFocus ? { ["--mpos" as string]: mobileFocus } : {}) }}
      />
      {badge && label && (
        <span className="absolute left-2 top-2 rounded bg-black/65 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Full-bleed hero photo with a separate phone crop. One <picture>, so the phone only downloads
 * its own image.
 */
export function HeroImage({ desktop, mobile, className = "" }: { desktop: MediaItem; mobile?: MediaItem; className?: string }) {
  const d = img(desktop.image);
  const m = mobile ? img(mobile.image) : undefined;
  return (
    <picture className={className}>
      {m && <source media="(max-width: 767px)" srcSet={m.srcSet || m.src} sizes="100vw" />}
      <img
        src={d.src}
        srcSet={d.srcSet}
        sizes="100vw"
        width={d.w}
        height={d.h}
        alt={desktop.alt || desktop.caption || ""}
        loading="eager"
        decoding="async"
        {...{ fetchpriority: "high" }}
        className="absolute inset-0 h-full w-full object-cover fx"
        style={{ backgroundColor: d.color, ["--pos" as string]: desktop.focus || "50% 50%", ["--mpos" as string]: (mobile ?? desktop).focus || "50% 50%" }}
      />
    </picture>
  );
}
