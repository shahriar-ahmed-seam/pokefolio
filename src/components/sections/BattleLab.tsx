"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TypeBadge } from "@/components/ui/TypeBadge";
import { moveSets, type Move } from "@/data/portfolio";

function MoveCard({ move, index }: { move: Move; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-white/[0.02] p-5 transition-all hover:border-accent hover:bg-accent/[0.05]"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" style={{ background: "var(--accent)" }} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-xl text-ink" style={{ fontFamily: "var(--font-heading)" }}>{move.name}</h4>
          <p className="mt-0.5 text-sm font-semibold text-accent">{move.move}</p>
        </div>
        <TypeBadge type={move.type} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-ink-dim">
        <span className="uppercase tracking-widest">{move.category}</span>
        <span className="font-bold text-ink">PWR {move.power}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
          initial={{ width: 0 }}
          whileInView={{ width: `${move.power}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export function BattleLab() {
  const [active, setActive] = useState(moveSets[0].id);
  const current = moveSets.find((m) => m.id === active) ?? moveSets[0];

  return (
    <section id="battle-lab" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Battle Lab"
          title="Moves & Abilities"
          description="Skills catalogued as battle moves — pick a move-set to see the full type chart."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {moveSets.map((m) => {
            const isActive = m.id === active;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-all ${
                  isActive ? "border-accent bg-accent text-[var(--accent-ink)]" : "border-line text-ink-dim hover:border-accent hover:text-accent"
                }`}
              >
                {m.title}
                <span className="ml-2 hidden text-xs opacity-70 sm:inline">· {m.subject}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {current.moves.map((move, i) => (
              <MoveCard key={move.name} move={move} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
