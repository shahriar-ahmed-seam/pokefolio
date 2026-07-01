import Image from "next/image";
import { getPhoto, sized, cn } from "@/lib/utils";

interface UnsplashImageProps {
  imageKey: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  showCredit?: boolean;
  fill?: boolean;
}

/** next/image wrapper over curated images.json with required photographer credit. */
export function UnsplashImage({
  imageKey,
  alt,
  className,
  imgClassName,
  width = 1600,
  quality = 80,
  priority = false,
  sizes = "100vw",
  showCredit = true,
  fill = true,
}: UnsplashImageProps) {
  const photo = getPhoto(imageKey);
  const src = sized(photo.url, width, quality);

  return (
    <figure className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? photo.alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
          style={{ backgroundColor: photo.color }}
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: photo.color }} />
      )}
      {showCredit && photo.credit.name && (
        <figcaption className="pointer-events-auto absolute bottom-2 right-2 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-sm">
          Photo:{" "}
          <a
            href={`${photo.credit.link}?utm_source=trainers_portfolio&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted hover:text-white"
          >
            {photo.credit.name}
          </a>
        </figcaption>
      )}
    </figure>
  );
}
