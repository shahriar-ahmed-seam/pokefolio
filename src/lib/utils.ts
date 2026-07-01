import { clsx, type ClassValue } from "clsx";
import imagesJson from "@/data/images.json";

/** Tailwind-friendly className joiner. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export interface UnsplashPhoto {
  url: string;
  color: string;
  blurHash: string | null;
  alt: string;
  credit: { name: string; username: string; link: string };
}

const images = imagesJson as Record<string, UnsplashPhoto>;

/** Resolve a curated Unsplash photo by semantic key. */
export function getPhoto(key: string): UnsplashPhoto {
  return (
    images[key] ?? {
      url: "",
      color: "#0a0e1a",
      blurHash: null,
      alt: "",
      credit: { name: "Unsplash", username: "", link: "https://unsplash.com" },
    }
  );
}

/** Build a sized Unsplash CDN url from a permanent raw url. */
export function sized(url: string, w: number, q = 80): string {
  if (!url) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}auto=format&fit=crop&w=${w}&q=${q}`;
}
