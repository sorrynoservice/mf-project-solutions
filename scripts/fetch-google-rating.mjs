// Google rating and review count: the single source of truth for every badge on the site.
//
// Runs before every build (npm "prebuild"). Writes src/generated/google-rating.json, which is
// the only file the site reads. The result is one of:
//
//   source "live"      fetched from the Google Places API during this build (shown)
//   source "committed" the last-known values in src/data/google-rating.json, shown ONLY if they
//                      were checked within MAX_AGE_DAYS; older values are never shown
//   source "none"      nothing trustworthy: badges show "Read our Google reviews" with no numbers
//
// A failed fetch therefore can never put an old count back on the live site.
//
// Environment:
//   GOOGLE_PLACES_API_KEY   Places API (New) key. Set it in Vercel for Production and Preview.
//   GOOGLE_PLACE_ID         optional override of the Place ID below.
//   GOOGLE_RATING_STRICT=1  optional: fail the build if a production build has no live figure.
//
// After a successful live fetch, commit src/data/google-rating.json if you want the fallback
// refreshed (the build writes the new values there too when running locally).

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEED = path.join(root, "src/data/google-rating.json");
const OUT = path.join(root, "src/generated/google-rating.json");
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJHRA8Rm4uDKcRB7qery8Leio"; // MF Project Solutions
const MAX_AGE_DAYS = 21;
const env = process.env.VERCEL_ENV || (process.env.CI ? "ci" : "local");
const key = process.env.GOOGLE_PLACES_API_KEY;
const log = (m) => console.log(`[google-rating] ${m}`);
const warn = (m) => console.warn(`[google-rating] WARNING: ${m}`);

const write = async (data) => {
  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
};

const ageDays = (iso) => (Date.now() - new Date(iso).getTime()) / 86_400_000;

log(`environment=${env} placeId=${PLACE_ID} apiKey=${key ? "present" : "MISSING"}`);

let live = null;
if (key) {
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "displayName,rating,userRatingCount" },
      signal: AbortSignal.timeout(10_000),
    });
    const body = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${body.slice(0, 300)}`);
    const j = JSON.parse(body);
    if (typeof j.rating !== "number" || typeof j.userRatingCount !== "number") {
      throw new Error(`unexpected response: ${body.slice(0, 300)}`);
    }
    live = { rating: j.rating, count: j.userRatingCount, fetchedAt: new Date().toISOString(), name: j.displayName?.text };
    log(`live fetch OK: "${live.name}" ${live.rating} from ${live.count} reviews`);
  } catch (err) {
    warn(`live fetch failed: ${err.message}`);
  }
} else {
  warn("GOOGLE_PLACES_API_KEY is not set, so no live figure can be fetched.");
}

if (live) {
  await write({ ...live, source: "live", show: true });
  if (env === "local") await writeFile(SEED, `${JSON.stringify({ rating: live.rating, count: live.count, fetchedAt: live.fetchedAt }, null, 2)}\n`);
  process.exit(0);
}

let seed = null;
try {
  seed = JSON.parse(await readFile(SEED, "utf8"));
} catch {
  /* no seed */
}

if (seed && typeof seed.count === "number" && seed.fetchedAt && ageDays(seed.fetchedAt) <= MAX_AGE_DAYS) {
  warn(`using committed values from ${seed.fetchedAt} (${ageDays(seed.fetchedAt).toFixed(0)} days old): ${seed.rating} from ${seed.count}`);
  await write({ rating: seed.rating, count: seed.count, fetchedAt: seed.fetchedAt, source: "committed", show: true });
} else {
  warn(
    seed?.fetchedAt
      ? `committed values are ${ageDays(seed.fetchedAt).toFixed(0)} days old (limit ${MAX_AGE_DAYS}); review numbers will be HIDDEN on this build.`
      : "no committed values; review numbers will be HIDDEN on this build.",
  );
  await write({ rating: null, count: null, fetchedAt: null, source: "none", show: false });
  if (process.env.GOOGLE_RATING_STRICT === "1" && env === "production") {
    console.error("[google-rating] GOOGLE_RATING_STRICT=1 and no live figure on a production build: failing.");
    process.exit(1);
  }
}
