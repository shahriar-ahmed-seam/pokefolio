import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pokefolio-seam.vercel.app";
  return [{ url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
