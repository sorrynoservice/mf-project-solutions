/**
 * Head manager.
 *
 * <Head title description ... /> can be rendered anywhere. Every route already gets one from its
 * registry entry (src/routes.tsx), so pages only render <Head> to override something (for
 * example a JSON-LD block or a different og image).
 *
 * Merging: fields from the Head with the higher `priority` win (route meta is priority 0, a
 * page's <Head> defaults to 1); among equal priorities the one rendered last wins. JSON-LD
 * blocks from every mounted Head are all output.
 *
 * Server: Heads write into a collector during renderToString; renderHeadTags() turns it into
 * HTML for scripts/prerender.mjs. Client: Heads register in effects and document.head is
 * updated after every change (route changes included).
 */
import { createContext, useContext, useEffect, useId, useRef, type ReactNode } from "react";

export const SITE_URL = "https://mfprojectsolutions.ie";
export const SITE_NAME = "MF Project Solutions";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export type HeadProps = {
  title?: string;
  description?: string;
  /** Path for the canonical and og:url. Defaults to the current route. */
  path?: string;
  noindex?: boolean;
  jsonLd?: object[];
  /** Path under /public or absolute URL. */
  ogImage?: string;
  ogType?: string;
  priority?: number;
};

type Entry = HeadProps & { key: string; order: number };

export type HeadState = {
  title: string;
  description: string;
  canonical: string;
  noindex: boolean;
  jsonLd: object[];
  ogImage: string;
  ogType: string;
};

export class HeadCollector {
  private entries = new Map<string, Entry>();
  private counter = 0;
  private listener?: () => void;

  set(key: string, props: HeadProps) {
    const prev = this.entries.get(key);
    this.entries.set(key, { ...props, key, order: prev?.order ?? this.counter++ });
    this.listener?.();
  }

  remove(key: string) {
    if (this.entries.delete(key)) this.listener?.();
  }

  onChange(fn: () => void) {
    this.listener = fn;
  }

  state(fallbackPath = "/"): HeadState {
    const list = [...this.entries.values()].sort((a, b) => (a.priority ?? 1) - (b.priority ?? 1) || a.order - b.order);
    const pick = <K extends keyof HeadProps>(k: K): HeadProps[K] | undefined => {
      for (let i = list.length - 1; i >= 0; i--) if (list[i][k] !== undefined) return list[i][k];
      return undefined;
    };
    return {
      title: pick("title") ?? SITE_NAME,
      description: pick("description") ?? "",
      canonical: canonicalUrl(pick("path") ?? fallbackPath),
      noindex: Boolean(pick("noindex")),
      jsonLd: list.flatMap((e) => e.jsonLd ?? []),
      ogImage: absoluteUrl(pick("ogImage") ?? DEFAULT_OG_IMAGE),
      ogType: pick("ogType") ?? "website",
    };
  }
}

/** https://mfprojectsolutions.ie + path, no trailing slash except the root, no query or hash. */
export const canonicalUrl = (path: string): string => {
  let p = (path || "/").split(/[?#]/)[0];
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p === "/" ? `${SITE_URL}/` : SITE_URL + p;
};

export const absoluteUrl = (pathOrUrl: string): string =>
  /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : SITE_URL + (pathOrUrl.startsWith("/") ? "" : "/") + pathOrUrl;

const HeadContext = createContext<HeadCollector | null>(null);

export const HeadProvider = ({ collector, children }: { collector: HeadCollector; children: ReactNode }) => (
  <HeadContext.Provider value={collector}>{children}</HeadContext.Provider>
);

const isServer = typeof window === "undefined";

export function Head(props: HeadProps) {
  const collector = useContext(HeadContext);
  const key = useId();
  const serialised = JSON.stringify(props);

  // Server: record during render (effects never run in renderToString).
  const recorded = useRef(false);
  if (isServer && collector && !recorded.current) {
    recorded.current = true;
    collector.set(key, props);
  }

  useEffect(() => {
    if (!collector) return;
    collector.set(key, JSON.parse(serialised) as HeadProps);
  }, [collector, key, serialised]);

  useEffect(() => {
    if (!collector) return;
    return () => collector.remove(key);
  }, [collector, key]);

  return null;
}

// Server output ----------------------------------------------------------------

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** JSON for an inline <script>, safe against "</script>" in content. */
const jsonForScript = (o: object) => JSON.stringify(o).replace(/</g, "\\u003c");

export function renderHeadTags(s: HeadState): string {
  const t = esc(s.title);
  const d = esc(s.description);
  const lines = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" data-head />`,
    // No canonical on noindex pages (404, thank-you, hidden pages).
    s.noindex
      ? `<meta name="robots" content="noindex, follow" data-head />`
      : `<link rel="canonical" href="${esc(s.canonical)}" data-head />`,
    `<meta property="og:type" content="${esc(s.ogType)}" data-head />`,
    `<meta property="og:site_name" content="${SITE_NAME}" data-head />`,
    `<meta property="og:url" content="${esc(s.canonical)}" data-head />`,
    `<meta property="og:title" content="${t}" data-head />`,
    `<meta property="og:description" content="${d}" data-head />`,
    `<meta property="og:image" content="${esc(s.ogImage)}" data-head />`,
    `<meta name="twitter:card" content="summary_large_image" data-head />`,
    `<meta name="twitter:title" content="${t}" data-head />`,
    `<meta name="twitter:description" content="${d}" data-head />`,
    `<meta name="twitter:image" content="${esc(s.ogImage)}" data-head />`,
    ...s.jsonLd.map((o) => `<script type="application/ld+json" data-head>${jsonForScript(o)}</script>`),
  ];
  return lines.filter(Boolean).join("\n    ");
}

// Client output ----------------------------------------------------------------

const setMeta = (attr: "name" | "property", key: string, content: string | null) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute("data-head", "");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export function applyHeadToDocument(s: HeadState) {
  document.title = s.title;
  setMeta("name", "description", s.description);
  setMeta("name", "robots", s.noindex ? "noindex, follow" : null);
  setMeta("property", "og:type", s.ogType);
  setMeta("property", "og:url", s.canonical);
  setMeta("property", "og:title", s.title);
  setMeta("property", "og:description", s.description);
  setMeta("property", "og:image", s.ogImage);
  setMeta("name", "twitter:title", s.title);
  setMeta("name", "twitter:description", s.description);
  setMeta("name", "twitter:image", s.ogImage);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (s.noindex) {
    canonical?.remove();
  } else {
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = s.canonical;
  }

  const wanted = s.jsonLd.map(jsonForScript);
  const current = [
    ...document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"][data-head]'),
  ];
  if (current.map((el) => el.textContent).join("\n") !== wanted.join("\n")) {
    current.forEach((el) => el.remove());
    for (const text of wanted) {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-head", "");
      el.textContent = text;
      document.head.appendChild(el);
    }
  }
}

/** Client: create a collector that keeps document.head in sync. */
export function createClientHead(): HeadCollector {
  const collector = new HeadCollector();
  let queued = false;
  collector.onChange(() => {
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      applyHeadToDocument(collector.state(window.location.pathname));
    });
  });
  return collector;
}
