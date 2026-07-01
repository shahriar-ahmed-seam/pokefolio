"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Mail, Swords } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Pokeball } from "@/components/fx/Pokeball";
import { profile, socials, type Social } from "@/data/portfolio";

const ICONS = { github: GithubIcon, linkedin: LinkedinIcon, twitter: Mail, mail: Mail } as const;

export function League() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Battle request from ${form.name || "a challenger"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-dim/50 focus:border-accent";

  return (
    <section id="league" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Pokémon League"
          title="Challenge the Champion"
          description="Got a project, a role, or an impossible idea? Step into the arena — I answer challenges fast."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <Reveal className="glass glow-ring rounded-3xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 py-12 text-center">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                    <Pokeball size={56} />
                  </motion.div>
                  <h3 className="text-2xl text-pop" style={{ fontFamily: "var(--font-heading)" }}>Challenge accepted!</h3>
                  <p className="max-w-sm text-ink-dim">
                    Your mail client should be open. If not, reach me directly at{" "}
                    <a href={`mailto:${profile.email}`} className="text-accent underline">{profile.email}</a>.
                  </p>
                  <button onClick={() => setSent(false)} className="mt-2 rounded-full border border-line px-5 py-2 text-xs font-bold uppercase tracking-widest text-ink-dim transition-colors hover:border-accent hover:text-accent">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={onSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-sm text-ink-dim">
                      Your name
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ash Ketchum" className={field} />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm text-ink-dim">
                      Return address
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@pallet.town" className={field} />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5 text-sm text-ink-dim">
                    Your message
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="I'd like to challenge you to a project…" className={`${field} resize-none`} />
                  </label>
                  <button
                    type="submit"
                    className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-[var(--accent-ink)] transition-transform hover:scale-[1.02]"
                    style={{ boxShadow: "0 0 30px -6px var(--accent-glow)" }}
                  >
                    <Send className="h-4 w-4" />
                    Send Challenge
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-4">
            <div className="rounded-3xl border border-line bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 text-accent">
                <Swords className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-widest">{profile.available ? "Accepting challenges" : "In a gym battle"}</span>
              </div>
              <p className="mt-3 text-ink-dim">Open to freelance quests, full-time roles and the occasional legendary raid.</p>
            </div>

            <div className="rounded-3xl border border-line bg-white/[0.02] p-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-dim">Find me across regions</p>
              <ul className="flex flex-col gap-3">
                {socials.map((s: Social) => {
                  const Icon = ICONS[s.icon];
                  return (
                    <li key={s.label}>
                      <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-3 text-ink-dim transition-colors hover:text-accent">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm text-ink">{s.label}</span>
                          <span className="text-xs">{s.handle}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
