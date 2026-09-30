/**
 * Server entry, used only at build time by scripts/prerender.mjs:
 *   vite build --ssr src/entry-server.tsx --outDir dist-ssr
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { matchRoutes } from "react-router-dom";
import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import App from "./App";
import { HeadCollector, HeadProvider, renderHeadTags } from "@/lib/head";
import { routes, sitemapRoutes } from "@/routes";

export function render(url: string): { html: string; head: string; status: number } {
  const collector = new HeadCollector();
  const html = renderToString(
    <StrictMode>
      <HeadProvider collector={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadProvider>
    </StrictMode>,
  );
  const path = url.split(/[?#]/)[0];
  const matched = matchRoutes(routes.map((r) => ({ path: r.path })), path);
  return { html, head: renderHeadTags(collector.state(path)), status: matched ? 200 : 404 };
}

/** Everything prerender.mjs needs to know about the routes. */
export const routeList = routes.map((r) => ({
  path: r.path,
  noindex: Boolean(r.meta.noindex),
  sitemap: r.sitemap !== false && !r.meta.noindex,
  priority: r.priority,
}));

export const sitemapPaths = sitemapRoutes().map((r) => r.path);
