"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTrainerType } from "@/context/TypeProvider";
import { TYPES } from "@/data/types";
import { Pokeball } from "@/components/fx/Pokeball";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#top", label: "Start" },
  { href: "#starter", label: "Starter" },
  { href: "#trainer", label: "Trainer" },
  { href: "#battle-lab", label: "Battle Lab" },
  { href: "#project-dex", label: "Project Dex" },
  { href: "#journey", label: "Journey" },
  { href: "#league", label: "League" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { type } = useTrainerType();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "glass border-b border-line py-2" : "py-4")}>
      <nav className="container-x flex items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5 text-lg font-bold tracking-wide" style={{ fontFamily: "var(--font-display)" }}>
          <span className="transition-transform group-hover:rotate-180 duration-500">
            <Pokeball size={26} />
          </span>
          <span className="text-pop">PokéFolio</span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.slice(1).map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-dim transition-colors hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {type && (
            <a
              href="#starter"
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-dim transition-colors hover:text-accent sm:flex"
              title={`Your type: ${TYPES[type].name}`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent-glow)" }} />
              {TYPES[type].name}
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-md border border-line p-2 text-accent transition-colors hover:bg-accent/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink-dim transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
