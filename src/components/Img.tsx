import type { CSSProperties, ImgHTMLAttributes } from "react";
import { img, sizesFor, type ImageLayout } from "@/lib/img";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "width" | "height"> & {
  /** Path under /public, e.g. "/assets/work/x.jpg". */
  src: string;
  alt: string;
  /** Layout name for the sizes attribute, or a custom sizes string. Default "content". */
  layout?: ImageLayout | (string & {});
  /** CSS object-position, e.g. a MediaItem's focus. */
  focus?: string;
  /** Load eagerly with high priority (use for the hero only). */
  priority?: boolean;
};

/** Plain responsive <img> built from the image manifest. Styling is left to the caller. */
export default function Img({ src, alt, layout = "content", focus, priority, style, ...rest }: Props) {
  const i = img(src);
  const s: CSSProperties = { backgroundColor: i.color, ...(focus ? { objectPosition: focus } : {}), ...style };
  return (
    <img
      src={i.src}
      srcSet={i.srcSet}
      sizes={i.srcSet ? sizesFor(layout) : undefined}
      width={i.w}
      height={i.h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchpriority: "high" } : {})}
      style={s}
      {...rest}
    />
  );
}
