import { useEffect } from "react";
import { SITE_URL } from "@/data/site";

type Seo = {
  title: string;
  description: string;
  /** Path on the live domain, e.g. "/garden-rooms". Used for the canonical URL. */
  path: string;
  /** Optional JSON-LD object added to the page while it is mounted. */
  jsonLd?: object;
};

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
 * Sets the page title, description, social tags and canonical link.
 * Every page calls this so each one is indexed for its own service,
 * and the canonical always points at mfprojectsolutions.ie (never the vercel.app copy).
 */
export const useSeo = ({ title, description, path, jsonLd }: Seo) => {
  useEffect(() => {
    const url = SITE_URL + (path === "/" ? "/" : path);
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

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
  }, [title, description, path, jsonLd]);
};
