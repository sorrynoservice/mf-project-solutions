/**
 * Responsive image lookup. scripts/build-images.mjs writes src/generated/images.json with the
 * size, WebP variants and dominant colour of every photo under /public/assets and /public/media.
 *
 *   const i = img(project.hero.image);
 *   <img src={i.src} srcSet={i.srcSet} sizes={sizesFor("half")} width={i.w} height={i.h}
 *        style={{ backgroundColor: i.color }} loading="lazy" decoding="async" alt="..." />
 *
 * Paths not in the manifest (external URLs, SVGs, files added since the last build) fall back
 * to the original path with no srcSet. Safe on the server and in the browser.
 */

export type ImageEntry = {
  /** Width and height after EXIF rotation. */
  w: number;
  h: number;
  /** [width, url] pairs, smallest first. */
  v: [number, string][];
  /** Dominant colour, "#rrggbb", for a placeholder background. */
  c: string;
};

export type ImgInfo = {
  src: string;
  w?: number;
  h?: number;
  srcSet?: string;
  color?: string;
};

// A glob (rather than a plain import) so the app still compiles if the manifest has not been
// generated yet; it simply resolves to an empty manifest.
const found = import.meta.glob<Record<string, ImageEntry>>("/src/generated/images.json", {
  eager: true,
  import: "default",
});
export const manifest: Record<string, ImageEntry> = Object.values(found)[0] ?? {};

const normalise = (path: string) => {
  const clean = path.split(/[?#]/)[0];
  try {
    return decodeURI(clean.startsWith("/") ? clean : `/${clean}`);
  } catch {
    return clean.startsWith("/") ? clean : `/${clean}`;
  }
};

/** Default src: the variant nearest 1200px wide, which suits browsers that ignore srcSet. */
const DEFAULT_WIDTH = 1200;

export function img(path: string): ImgInfo {
  if (!path) return { src: "" };
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return { src: path };
  const entry = manifest[normalise(path)];
  if (!entry || entry.v.length === 0) return { src: path };
  const pick =
    entry.v.find(([w]) => w >= DEFAULT_WIDTH) ?? entry.v[entry.v.length - 1];
  return {
    src: pick[1],
    w: entry.w,
    h: entry.h,
    srcSet: entry.v.map(([w, url]) => `${url} ${w}w`).join(", "),
    color: entry.c,
  };
}

/** Aspect ratio (width / height) if known, for CSS aspect-ratio. */
export const aspect = (path: string): number | undefined => {
  const e = manifest[normalise(path)];
  return e ? e.w / e.h : undefined;
};

export type ImageLayout =
  | "full" // edge to edge
  | "content" // inside the max-width container
  | "half" // two columns from tablet up
  | "third" // three columns on desktop, two on tablet
  | "quarter" // four columns on desktop
  | "thumb"; // small fixed thumbnail

const SIZES: Record<ImageLayout, string> = {
  full: "100vw",
  content: "(min-width: 1280px) 1200px, 100vw",
  half: "(min-width: 768px) 50vw, 100vw",
  third: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  quarter: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  thumb: "240px",
};

/** The `sizes` attribute for a layout, or pass a custom string straight through. */
export const sizesFor = (layout: ImageLayout | (string & {})): string =>
  (SIZES as Record<string, string>)[layout] ?? layout;
