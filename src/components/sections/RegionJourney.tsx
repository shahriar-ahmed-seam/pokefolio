"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey, type Gym } from "@/data/portfolio";

const BADGE_ICON = { work: Briefcase, study: GraduationCap, award: Award } as const;

function Row({ g, i }: { g: Gym; i: number }) {
  const Icon = BADGE_ICON[g.badge];
  return (
    <motion.li
      initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="relative pl-12 sm:pl-0"
    >
      <div className={`sm:flex sm:items-center sm:gap-8 ${i % 2 ? "sm:flex-row-reverse" : ""}`}>
        <div className="sm:w-1/2">
          <div className={`glass rounded-2xl p-5 ${i % 2 ? "sm:text-right" : ""}`}>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">{g.region}</span>
            <h4 className="mt-1 text-xl text-ink" style={{ fontFamily: "var(--font-heading)" }}>{g.title}</h4>
            <p className="text-sm font-semibold text-ink-dim">{g.place}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{g.description}</p>
          </div>
        </div>
        <div className="sm:w-1/2" />
      </div>
      <span
        className="absolute left-3 top-6 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 text-[var(--accent-ink)] sm:left-1/2"
        style={{ background: "var(--accent)", borderColor: "var(--accent-2)", boxShadow: "0 0 14px -2px var(--accent-glow)" }}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
    </motion.li>
  );
}

export function RegionJourney() {
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Journey"
          title="Gym Badges Earned"
          description="Every region taught a lesson. Here's the route so far."
        />

        <div className="mx-auto mt-14 max-w-4xl">
          <ol className="relative space-y-8 before:absolute before:left-3 before:top-2 before:h-full before:w-0.5 before:bg-accent/30 sm:before:left-1/2">
            {journey.map((g, i) => (
              <Row key={g.region + g.title} g={g} i={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
