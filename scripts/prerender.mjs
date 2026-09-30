/**
 * Postbuild: renders every route in src/routes.tsx to static HTML so search engines and link
 * previews (WhatsApp, Facebook) get the full page and its tags without running JavaScript.
 *
 *   dist/index.html                 "/"
 *   dist/garden-rooms.html          "/garden-rooms"
 *   dist/projects/phibsborough.html "/projects/phibsborough"
 *   dist/404.html                   unknown URLs (Vercel serves it with status 404)
 *   dist/sitemap.xml, dist/robots.txt
 *
 * vercel.json sets cleanUrls, so /garden-rooms is served from garden-rooms.html.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = "https://mfprojectsolutions.ie";
const dist = path.resolve("dist");
const ssrEntry = path.resolve("dist-ssr/entry-server.js");

const { render, routeList, sitemapPaths } = await import(pathToFileURL(ssrEntry).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const HEAD_MARK = "<!--app-head-->";

/** Removes the static SEO tags from index.html; each page gets its own set instead. */
function prepareTemplate(html) {
  let out = html.replace(/<title>[\s\S]*?<\/title>/, HEAD_MARK);
  if (!out.includes(HEAD_MARK)) out = out.replace("</head>", `  ${HEAD_MARK}\n  </head>`);
  out = out.replace(/[ \t]*<meta\s+(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[\s\S]*?\/?>[ \t]*\n?/g, "");
  out = out.replace(/[ \t]*<link\s+rel="canonical"[^>]*>[ \t]*\n?/g, "");
  out = out.replace(/\n(?:[ \t]*\n){2,}/g, "\n\n");
  if (!/<div id="root"><\/div>/.test(out)) throw new Error('dist/index.html is missing <div id="root"></div>');
  return out;
}

const base = prepareTemplate(template);

const page = (head, html) =>
  base.replace(HEAD_MARK, head).replace(/<div id="root"><\/div>/, () => `<div id="root">${html}</div>`);

const fileFor = (route) => (route === "/" ? path.join(dist, "index.html") : path.join(dist, `${route.replace(/^\/+|\/+$/g, "")}.html`));

let count = 0;
const problems = [];
for (const r of routeList) {
  const { html, head, status } = render(r.path);
  if (status !== 200) problems.push(`${r.path} rendered with status ${status}`);
  const out = fileFor(r.path);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(head, html));
  count++;
}

// 404 page
{
  const { html, head } = render("/404-not-found");
  fs.writeFileSync(path.join(dist, "404.html"), page(head, html));
}

// sitemap.xml
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const priorities = Object.fromEntries(routeList.map((r) => [r.path, r.priority]));
const urls = sitemapPaths
  .filter((p) => p !== "/thank-you")
  .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)))
  .map((p) => {
    const loc = p === "/" ? `${SITE_URL}/` : SITE_URL + p;
    const pr = priorities[p];
    return `  <url><loc>${esc(loc)}</loc>${pr != null ? `<priority>${pr.toFixed(1)}</priority>` : ""}</url>`;
  });
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);

// robots.txt
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`[prerender] ${count} pages, 404.html, sitemap.xml (${urls.length} URLs), robots.txt`);
if (problems.length) {
  console.error(`[prerender] problems:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
