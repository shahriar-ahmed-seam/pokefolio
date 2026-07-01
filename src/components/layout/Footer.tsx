"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Pokeball } from "@/components/fx/Pokeball";
import { profile, socials, type Social } from "@/data/portfolio";
import { useTrainerType } from "@/context/TypeProvider";
import { TYPES } from "@/data/types";

const ICONS = { github: GithubIcon, linkedin: LinkedinIcon, twitter: Mail, mail: Mail } as const;

function SocialIcon({ social }: { social: Social }) {
  const Icon = ICONS[social.icon];
  return (
    <a
      href={social.href}
      target={social.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={social.label}
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-dim transition-all hover:-translate-y-1 hover:border-accent hover:text-accent"
    >
      <Icon className="h-4.5 w-4.5" />
    </a>
  );
}

export function Footer() {
  const { type } = useTrainerType();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-line py-12">
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2 text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
          <Pokeball size={20} />
          <span className="text-pop">Thanks for playing!</span>
        </div>

        <div className="flex gap-3">
          {socials.map((s) => (
            <SocialIcon key={s.label} social={s} />
          ))}
        </div>

        <p className="max-w-md text-sm text-ink-dim">
          {type
            ? `Registered as a ${TYPES[type].name}-type trainer. ${TYPES[type].motto}`
            : "Choose your starter above to register your Trainer Card."}
        </p>

        <div className="hairline h-px w-40" />

        <p className="text-xs text-ink-dim/70">
          © {year} {profile.name}. Built with Next.js, TypeScript & a full team of Pokémon.
          <br />
          Pokémon artwork via the open{" "}
          <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">PokéAPI</a>.
          A fan-made tribute — Pokémon © Nintendo / Game Freak / The Pokémon Company. Not affiliated.
        </p>
      </div>
    </footer>
  );
}
