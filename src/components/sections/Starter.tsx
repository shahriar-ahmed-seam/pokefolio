"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { UnsplashImage } from "@/components/ui/UnsplashImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pokeball } from "@/components/fx/Pokeball";
import { useTrainerType } from "@/context/TypeProvider";
import { TYPES, TYPE_LIST, QUIZ, tallyQuiz, artwork, type TypeId } from "@/data/types";

type Mode = "intro" | "quiz" | "result";

export function Starter() {
  const { type, setType, reset } = useTrainerType();
  const [mode, setMode] = useState<Mode>(type ? "result" : "intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<TypeId[]>([]);

  const active = type ? TYPES[type] : null;

  const begin = () => { setAnswers([]); setStep(0); setMode("quiz"); };

  const choose = (choice: TypeId) => {
    const next = [...answers, choice];
    if (next.length === QUIZ.length) {
      setType(tallyQuiz(next));
      setAnswers(next);
      setMode("result");
    } else {
      setAnswers(next);
      setStep((s) => s + 1);
    }
  };

  const pickDirect = (id: TypeId) => { setType(id); setMode("result"); };
  const tryAgain = () => { reset(); setAnswers([]); setStep(0); setMode("intro"); };

  const question = QUIZ[step];
  const progress = ((step + (mode === "result" ? 1 : 0)) / QUIZ.length) * 100;

  return (
    <section id="starter" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 opacity-30">
        <UnsplashImage imageKey="arena" width={1800} showCredit={false} className="h-full w-full" />
        <div className="absolute inset-0 bg-bg/85" />
      </div>

      <div className="container-x">
        <SectionHeading
          eyebrow="Professor's Lab"
          title="Choose Your Starter"
          description="Every trainer begins by choosing a partner. Answer the Professor's questions — the whole Pokédex will re-theme to your type."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="glass glow-ring relative rounded-3xl p-6 sm:p-10">
            {mode === "quiz" && (
              <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
              </div>
            )}

            <AnimatePresence mode="wait">
              {mode === "intro" && (
                <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="flex flex-col items-center gap-8 text-center">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                    <Pokeball size={64} />
                  </motion.div>
                  <p className="max-w-lg text-lg text-ink-dim">Five questions stand between you and your partner Pokémon. Ready, trainer?</p>
                  <button
                    onClick={begin}
                    className="rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-widest text-[var(--accent-ink)] transition-transform hover:scale-105"
                    style={{ boxShadow: "0 0 30px -6px var(--accent-glow)" }}
                  >
                    Begin the Trial
                  </button>
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-ink-dim/60">or pick a starter directly</span>
                    <div className="flex flex-wrap justify-center gap-4">
                      {TYPE_LIST.map((t) => (
                        <button key={t.id} onClick={() => pickDirect(t.id)} title={`${t.name} · ${t.starter}`} className="group flex flex-col items-center gap-1 transition-transform hover:-translate-y-1">
                          <span className="relative h-16 w-16">
                            <Image src={artwork(t.starterDex)} alt={t.starter} fill sizes="64px" className="object-contain" />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: t.colors[0] }}>{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {mode === "quiz" && question && (
                <motion.div key={question.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col gap-6">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Question {step + 1} of {QUIZ.length}</span>
                  <h3 className="text-2xl leading-snug sm:text-3xl" style={{ fontFamily: "var(--font-heading)" }}>{question.prompt}</h3>
                  <div className="grid gap-3">
                    {question.options.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => choose(opt.type)}
                        className="group flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-5 py-4 text-left text-lg text-ink transition-all hover:border-accent hover:bg-accent/10"
                      >
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent/40 transition-all group-hover:scale-150 group-hover:bg-accent" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {mode === "result" && active && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center gap-5 text-center">
                  <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 160 }} className="relative h-44 w-44">
                    <div className="absolute inset-0 rounded-full opacity-50 blur-2xl" style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />
                    <Image src={artwork(active.starterDex)} alt={active.starter} fill sizes="176px" className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]" priority />
                  </motion.div>
                  <div className="flex items-center gap-2 text-accent">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-[0.3em]">Your partner is</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="text-4xl sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                    <span className="text-pop">{active.starter}!</span>
                  </h3>
                  <p className="max-w-md text-lg text-ink-dim">A <strong className="text-accent">{active.name}</strong>-type trainer — {active.trait.toLowerCase()}. {active.motto}</p>
                  <button
                    onClick={tryAgain}
                    className="mt-1 flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ink-dim transition-colors hover:border-accent hover:text-accent"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Choose again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
