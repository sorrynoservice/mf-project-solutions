// Fetches the live Google rating and review count for the business and writes them
// to src/data/google-rating.json. Runs automatically before `npm run build`.
//
// Needs GOOGLE_PLACES_API_KEY in the environment. If the key is missing or the
// request fails, the committed JSON is left as-is and the build continues — a
// reviews badge that is slightly stale is much better than a deploy that fails.

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PLACE_ID = "ChIJHRA8Rm4uDKcRB7qery8Leio"; // MF Project Solutions, Drumree
const OUT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/data/google-rating.json",
);

const key = process.env.GOOGLE_PLACES_API_KEY;

if (!key) {
  console.warn("[google-rating] GOOGLE_PLACES_API_KEY not set — keeping committed values.");
  process.exit(0);
}

try {
  const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "rating,userRatingCount",
    },
  });

  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);

  const { rating, userRatingCount } = await res.json();
  if (typeof rating !== "number" || typeof userRatingCount !== "number") {
    throw new Error("unexpected response shape from Places API");
  }

  const data = { rating, count: userRatingCount, fetchedAt: new Date().toISOString() };
  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`[google-rating] ${rating} from ${userRatingCount} reviews`);
} catch (err) {
  console.warn(`[google-rating] fetch failed, keeping committed values — ${err.message}`);
}
