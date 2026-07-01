"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Swords } from "lucide-react";
import { UnsplashImage } from "@/components/ui/UnsplashImage";
import { Pokeball } from "@/components/fx/Pokeball";
import { profile } from "@/data/portfolio";
import { artwork } from "@/data/types";
import { useTrainerType } from "@/context/TypeProvider";
import { TYPES } from "@/data/types";

export function Hero() {
  const { type } = useTrainerType();
  const starter = type ? TYPES[type] : null;

  return (
    <section id="top" className="relative flex min-h-dvh items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <UnsplashImage
          imageKey={type ?? "hero"}
          priority
          width={2400}
          quality={82}
          sizes="100vw"
          className="h-full w-full"
          imgClassName="scale-105"
          showCredit={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_30%,transparent,rgba(0,0,0,0.6))]" />
      </div>

      <div className="container-x relative z-10 grid items-center gap-10 pt-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-black/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent backdrop-blur-sm"
          >
            <span className="animate-[spin_4s_linear_infinite]"><Pokeball size={14} /></span>
            A wild developer appeared
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl leading-[0.95] sm:text-7xl md:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-pop drop-shadow-[0_2px_24px_var(--accent-glow)]">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-4 text-lg font-semibold uppercase tracking-[0.3em] text-ink sm:text-2xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {profile.epithet}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 max-w-xl text-lg text-ink-dim sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#starter"
              className="rounded-full bg-accent px-7 py-3 text-sm font-bold uppercase tracking-widest text-[var(--accent-ink)] transition-transform hover:scale-105"
              style={{ boxShadow: "0 0 30px -6px var(--accent-glow)" }}
            >
              Choose your Starter
            </a>
            <a
              href="#league"
              className="flex items-center gap-2 rounded-full border border-accent/50 px-7 py-3 text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent/10"
            >
              <Swords className="h-4 w-4" />
              Challenge me
            </a>
          </motion.div>
        </div>

        {/* Floating starter artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          <div
            className="absolute inset-0 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          />
          <motion.div animate={{ y: [-12, 12, -12] }} transition={{ duration: 6, repeat: Infinity }} className="relative h-full w-full">
            <Image
              key={starter?.id ?? "default"}
              src={artwork(starter ? starter.starterDex : 25)}
              alt={starter ? starter.starter : "Pikachu"}
              fill
              sizes="420px"
              className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#starter"
        aria-label="Scroll to Choose your Starter"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-accent"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </section>
  );
}
