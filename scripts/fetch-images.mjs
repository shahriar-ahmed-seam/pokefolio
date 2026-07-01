// @ts-check
/**
 * Build-time Unsplash image resolver for the Trainer's Portfolio.
 *
 * Stores PERMANENT Unsplash CDN URLs + the photographer attribution the Unsplash
 * API Guidelines require into `src/data/images.json`. No access key is ever needed
 * at runtime or shipped to the browser.
 *
 * Usage:  UNSPLASH_ACCESS_KEY=xxxx node scripts/fetch-images.mjs
 * If the key is absent, the script exits gracefully (CI/Vercel builds never break).
 */

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = resolve(__dirname, "../src/data/images.json");

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const API = "https://api.unsplash.com";

const TARGETS = [
  { key: "hero", query: "aurora night sky mountains cinematic", orientation: "landscape" },
  { key: "arena", query: "stadium lights night dramatic", orientation: "landscape" },
  { key: "fire", query: "volcano lava glowing night", orientation: "landscape" },
  { key: "water", query: "deep ocean waves underwater blue", orientation: "landscape" },
  { key: "grass", query: "lush green forest meadow sunlight", orientation: "landscape" },
  { key: "electric", query: "lightning storm thunder sky", orientation: "landscape" },
  { key: "route", query: "winding road mountains landscape adventure", orientation: "landscape" },
  { key: "city", query: "futuristic city night neon skyline", orientation: "landscape" },
  { key: "trainer", query: "cinematic portrait neon light backdrop", orientation: "portrait" },
];

async function search({ query, orientation }) {
  const url = new URL(`${API}/search/photos`);
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", "1");
  url.searchParams.set("content_filter", "high");
  url.searchParams.set("order_by", "relevant");

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}`, "Accept-Version": "v1" },
  });
  if (!res.ok) throw new Error(`Unsplash ${res.status} for "${query}": ${await res.text()}`);

  const data = await res.json();
  const photo = data.results?.[0];
  if (!photo) throw new Error(`No results for "${query}"`);

  if (photo.links?.download_location) {
    try {
      await fetch(photo.links.download_location, {
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      });
    } catch {
      /* non-fatal */
    }
  }

  return {
    url: photo.urls.raw,
    color: photo.color ?? "#0a0e1a",
    blurHash: photo.blur_hash ?? null,
    alt: photo.alt_description ?? photo.description ?? query,
    credit: {
      name: photo.user?.name ?? "Unknown",
      username: photo.user?.username ?? "",
      link: photo.user?.links?.html ?? "https://unsplash.com",
    },
  };
}

async function main() {
  if (!ACCESS_KEY) {
    console.warn("[fetch-images] UNSPLASH_ACCESS_KEY not set — skipping. Existing images.json kept.");
    return;
  }
  console.log("[fetch-images] Resolving cinematic backdrops from Unsplash…");
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const target of TARGETS) {
    try {
      out[target.key] = await search(target);
      console.log(`  ✓ ${target.key.padEnd(9)} → ${out[target.key].credit.name}`);
    } catch (err) {
      console.error(`  ✗ ${target.key}: ${err.message}`);
    }
  }
  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`[fetch-images] Wrote ${Object.keys(out).length} entries → src/data/images.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
