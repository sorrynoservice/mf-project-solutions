import { useEffect } from "react";
import { SITE_URL } from "@/data/site";
import seoPages from "@/data/seo.json";

type Options = {
  /** Overrides for pages not listed in seo.json, such as a single project. */
  title?: string;
  description?: string;
  /** Optional JSON-LD object added to the page while it is mounted. */
  jsonLd?: object;
};

const fallback = seoPages[0];

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/**
 * Sets the page title, description, social tags and canonical link from src/data/seo.json.
 * The same file feeds scripts/generate-route-html.mjs, which writes these tags into static
 * HTML at build time so link previews work without JavaScript.
 * The canonical always points at mfprojectsolutions.ie (never the vercel.app copy).
 */
export const useSeo = (path: string, { title, description, jsonLd }: Options = {}) => {
  const page = seoPages.find((p) => p.route === path);
  const t = title ?? page?.title ?? fallback.title;
  const d = description ?? page?.description ?? fallback.description;

  useEffect(() => {
    const url = SITE_URL + (path === "/" ? "/" : path);
    document.title = t;
    setMeta("name", "description", d);
    setMeta("property", "og:title", t);
    setMeta("property", "og:description", d);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", t);
    setMeta("name", "twitter:description", d);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.page = path;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      script?.remove();
    };
  }, [t, d, path, jsonLd]);
};
