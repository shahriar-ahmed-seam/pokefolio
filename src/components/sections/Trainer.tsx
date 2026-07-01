"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Sparkles } from "lucide-react";
import { UnsplashImage } from "@/components/ui/UnsplashImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { profile, stats, party } from "@/data/portfolio";
import { artwork, TYPES, type TypeId } from "@/data/types";
import { useTrainerType } from "@/context/TypeProvider";

const AVATAR: Record<TypeId, string> = {
  fire: "/trainer/fire.png",
  water: "/trainer/water.png",
  grass: "/trainer/grass.png",
  electric: "/trainer/electric.png",
};

export function Trainer() {
  const { type } = useTrainerType();
  const active = type ? TYPES[type] : null;

  return (
    <section id="trainer" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Trainer Card"
          title="Meet the Trainer"
          description="Every Pokédex has a keeper. Here's the trainer behind the entries."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_1fr]">
          <Reveal>
            <motion.div
              whileHover={{ rotateX: 4, rotateY: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="glass glow-ring relative mx-auto max-w-sm rounded-3xl p-5"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                {active ? (
                  <Image
                    key={active.id}
                    src={AVATAR[active.id]}
                    alt={`${profile.name} — ${active.name}-type trainer`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 400px"
                    className="object-cover object-center animate-[fadeIn_0.6s_ease]"
                  />
                ) : (
                  <UnsplashImage imageKey="trainer" width={900} sizes="(max-width: 1024px) 90vw, 400px" className="h-full w-full" imgClassName="grayscale-[0.15]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {/* Scanline */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
                  <div className="h-1/3 w-full bg-gradient-to-b from-accent/20 to-transparent" style={{ animation: "scan 4s linear infinite" }} />
                </div>
                <div className="absolute bottom-3 left-4">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                    {active ? `${active.name}-Type Trainer` : "Trainer ID"}
                  </p>
                  <p className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>{profile.name}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-ink-dim"><Briefcase className="h-4 w-4 text-accent" /><span>{profile.company}</span></div>
                <div className="flex items-center gap-2 text-ink-dim"><MapPin className="h-4 w-4 text-accent" /><span>{profile.location}</span></div>
              </div>

              {/* Party roster */}
              <div className="mt-4 rounded-2xl border border-line bg-black/20 p-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-dim">Party</p>
                <div className="flex justify-between">
                  {party.map((p) => (
                    <span key={p.dex} className="relative h-10 w-10" title={p.name}>
                      <Image src={artwork(p.dex)} alt={p.name} fill sizes="40px" className="object-contain" />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {profile.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-lg leading-relaxed text-ink-dim">
                  {i === 0 ? <Sparkles className="mr-2 inline h-4 w-4 text-accent" /> : null}
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-line bg-white/[0.02] p-4 text-center">
                    <dt className="text-3xl text-pop" style={{ fontFamily: "var(--font-display)" }}>{s.value}</dt>
                    <dd className="mt-1 text-xs font-semibold uppercase tracking-widest text-ink-dim">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
