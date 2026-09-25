/**
 * Postbuild: writes dist/<route>/index.html for every route in src/data/seo.json,
 * with that page's title, description, canonical and social tags baked in.
 * Vercel serves these static files before the SPA rewrite, so link previews on
 * WhatsApp and Facebook (which don't run JavaScript) show the right page.
 */
import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://mfprojectsolutions.ie";
const dist = path.resolve("dist");
const pages = JSON.parse(fs.readFileSync("src/data/seo.json", "utf8"));
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Replaces the content of one meta tag, whatever its attribute order or line breaks. */
const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, "s");
  if (!re.test(html)) throw new Error(`index.html is missing <meta ${attr}="${key}">`);
  return html.replace(re, `$1${esc(value)}$2`);
};

for (const { route, title, description } of pages) {
  const url = SITE_URL + (route === "/" ? "/" : route);
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);

  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

console.log(`[route-html] wrote ${pages.length} pages`);
