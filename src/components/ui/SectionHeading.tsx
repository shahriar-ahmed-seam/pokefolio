import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <Reveal className={`flex flex-col gap-4 ${isCenter ? "items-center text-center" : "items-start text-left"}`}>
      <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.4em] text-accent">
        <span className="h-px w-8 bg-accent/60" aria-hidden />
        {eyebrow}
        <span className="h-px w-8 bg-accent/60" aria-hidden />
      </span>
      <h2 className="text-4xl sm:text-5xl md:text-6xl leading-[1.02]" style={{ fontFamily: "var(--font-display)" }}>
        <span className="text-pop">{title}</span>
      </h2>
      {description && (
        <p className={`max-w-2xl text-base sm:text-lg text-ink-dim ${isCenter ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
