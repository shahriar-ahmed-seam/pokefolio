"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { dexEntries, type DexEntry } from "@/data/portfolio";
import { artwork } from "@/data/types";

const CATEGORIES = ["All", "AI/ML", "Systems", "Frontend", "Infra"] as const;
type Category = (typeof CATEGORIES)[number];

function DexCard({ e }: { e: DexEntry }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-bg-panel/60"
    >
      <div className="relative flex items-center justify-center overflow-hidden p-6" style={{ background: "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)" }}>
        <span className="absolute left-4 top-4 font-mono text-sm font-bold text-ink-dim/70">
          Nº {String(e.dex).padStart(3, "0")}
        </span>
        {e.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--accent-ink)]">Featured</span>
        )}
        <motion.div whileHover={{ scale: 1.08, rotate: 2 }} transition={{ type: "spring", stiffness: 200 }} className="relative h-36 w-36">
          <Image
            src={artwork(e.mon.dex)}
            alt={`${e.mon.name} — ${e.title}`}
            fill
            sizes="160px"
            className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:animate-[float_3s_ease-in-out_infinite]"
          />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 pt-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl leading-tight" style={{ fontFamily: "var(--font-heading)" }}>{e.title}</h3>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <TypeBadge type={e.mon.type} />
            <span className="text-xs italic text-ink-dim">{e.species}</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-ink-dim">{e.entry}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {e.tags.map((t) => (
            <li key={t} className="rounded-md border border-line px-2.5 py-1 text-xs text-ink-dim">{t}</li>
          ))}
        </ul>

        <div className="flex items-center gap-4 pt-3">
          {e.liveUrl && (
            <a href={e.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-accent transition-colors hover:text-accent-2">
              Live <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {e.repoUrl && (
            <a href={e.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-ink-dim transition-colors hover:text-accent">
              <GithubIcon className="h-4 w-4" /> Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectDex() {
  const [filter, setFilter] = useState<Category>("All");
  const visible = useMemo(
    () => (filter === "All" ? dexEntries : dexEntries.filter((e) => e.category === filter)),
    [filter]
  );

  return (
    <section id="project-dex" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Project Dex"
          title="Gotta Build 'Em All"
          description="Every project is a Pokémon I've caught and trained. Filter the Pokédex by discipline."
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                filter === c ? "border-accent bg-accent text-[var(--accent-ink)]" : "border-line text-ink-dim hover:border-accent hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((e) => (
              <DexCard key={e.id} e={e} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
