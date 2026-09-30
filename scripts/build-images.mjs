/**
 * Image pipeline. Runs before `vite dev` and at the start of `npm run build`.
 *
 * Scans public/assets/** and public/media/** for photos, writes sized WebP copies into
 * public/_img/ named <basename>-<hash>-<width>.webp (the hash is taken from the file's
 * content, so replacing a photo gives it a new URL and caches never serve the old one),
 * and writes src/generated/images.json, which src/lib/img.ts reads.
 *
 * Results are cached in node_modules/.cache/mf-images keyed by content hash, so only new
 * or changed photos are processed on later builds (Vercel restores node_modules/.cache).
 */
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC, "_img");
const CACHE_DIR = path.join(ROOT, "node_modules/.cache/mf-images");
const MANIFEST = path.join(ROOT, "src/generated/images.json");
const WIDTHS = [480, 800, 1200, 1800];
const QUALITY = 72;
const CACHE_VERSION = 1;

const SOURCES = [
  { dir: "assets", exts: [".jpg", ".jpeg", ".png", ".webp"] },
  { dir: "media", exts: [".jpg", ".jpeg", ".png"] },
];

async function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "img";

const hex = (n) => n.toString(16).padStart(2, "0");

async function processOne(file) {
  const buf = await fs.readFile(file);
  const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 10);
  const base = slug(path.basename(file, path.extname(file)));
  const cacheSub = path.join(CACHE_DIR, `${hash}`);
  const metaPath = path.join(cacheSub, "meta.json");

  let meta = null;
  if (existsSync(metaPath)) {
    try {
      meta = JSON.parse(await fs.readFile(metaPath, "utf8"));
      if (meta.version !== CACHE_VERSION) meta = null;
      else if (!meta.v.every(([w]) => existsSync(path.join(cacheSub, `${w}.webp`)))) meta = null;
    } catch {
      meta = null;
    }
  }

  if (!meta) {
    const img = sharp(buf, { failOn: "none" }).rotate();
    const info = await img.metadata();
    // EXIF orientations 5-8 swap width and height.
    const swap = (info.orientation ?? 1) >= 5;
    const w = swap ? info.height : info.width;
    const h = swap ? info.width : info.height;
    const widths = WIDTHS.filter((x) => x <= w);
    if (w < WIDTHS[WIDTHS.length - 1] && !widths.includes(w)) widths.push(w);
    await fs.mkdir(cacheSub, { recursive: true });
    for (const width of widths) {
      await sharp(buf, { failOn: "none" })
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path.join(cacheSub, `${width}.webp`));
    }
    const { dominant } = await sharp(buf, { failOn: "none" }).rotate().resize(64).stats();
    const c = `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`;
    meta = { version: CACHE_VERSION, w, h, c, v: widths.map((x) => [x]) };
    await fs.writeFile(metaPath, JSON.stringify(meta));
  }

  const variants = [];
  for (const [width] of meta.v) {
    const name = `${base}-${hash}-${width}.webp`;
    const dest = path.join(OUT_DIR, name);
    if (!existsSync(dest)) await fs.copyFile(path.join(cacheSub, `${width}.webp`), dest);
    variants.push([width, `/_img/${name}`]);
  }
  const webPath = "/" + path.relative(PUBLIC, file).split(path.sep).join("/");
  return [webPath, { w: meta.w, h: meta.h, v: variants, c: meta.c }];
}

async function main() {
  const started = Date.now();
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

  const files = [];
  for (const { dir, exts } of SOURCES) {
    for (const f of await walk(path.join(PUBLIC, dir))) {
      const lower = f.toLowerCase();
      if (!exts.includes(path.extname(lower))) continue;
      if (lower.endsWith("-sm.jpg")) continue;
      files.push(f);
    }
  }
  files.sort();

  const manifest = {};
  let failed = 0;
  let next = 0;
  const workers = Array.from({ length: Math.max(2, Math.min(8, os.cpus().length)) }, async () => {
    while (next < files.length) {
      const file = files[next++];
      try {
        const [key, value] = await processOne(file);
        manifest[key] = value;
      } catch (err) {
        failed++;
        console.warn(`[images] skipped ${path.relative(ROOT, file)}: ${err.message}`);
      }
    }
  });
  await Promise.all(workers);

  // Remove variants that no longer belong to any source photo.
  const keep = new Set(Object.values(manifest).flatMap((m) => m.v.map(([, p]) => path.basename(p))));
  for (const name of await fs.readdir(OUT_DIR)) {
    if (!keep.has(name)) await fs.rm(path.join(OUT_DIR, name), { force: true });
  }

  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  await fs.writeFile(MANIFEST, JSON.stringify(sorted, null, 0) + "\n");
  console.log(
    `[images] ${Object.keys(sorted).length} images, ${keep.size} variants` +
      (failed ? `, ${failed} skipped` : "") +
      ` in ${((Date.now() - started) / 1000).toFixed(1)}s`,
  );
}

main().catch((err) => {
  console.error("[images] failed:", err);
  process.exit(1);
});
