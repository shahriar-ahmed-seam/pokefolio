"use client";

import { useEffect, useState } from "react";

interface Mote { left: number; size: number; duration: number; delay: number; drift: number; opacity: number; }
interface Star { top: number; left: number; size: number; delay: number; }

function generate(count: number): { motes: Mote[]; stars: Star[] } {
  return {
    motes: Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 14 + Math.random() * 16,
      delay: -Math.random() * 30,
      drift: (Math.random() - 0.5) * 160,
      opacity: 0.3 + Math.random() * 0.5,
    })),
    stars: Array.from({ length: 34 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 1.6,
      delay: Math.random() * 4,
    })),
  };
}

/** Rising energy motes + faint twinkles — the ambient layer. */
export function Particles({ count = 22 }: { count?: number }) {
  const [{ motes, stars }, setData] = useState<{ motes: Mote[]; stars: Star[] }>({ motes: [], stars: [] });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only seed
    setData(generate(count));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={`s-${i}`}
          className="absolute rounded-full bg-accent-2"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, animation: `twinkle 3s ease-in-out ${s.delay}s infinite` }}
        />
      ))}
      {motes.map((m, i) => (
        <span
          key={`m-${i}`}
          className="absolute bottom-0 rounded-full"
          style={
            {
              left: `${m.left}%`,
              width: m.size,
              height: m.size,
              background: "radial-gradient(circle, var(--accent-2) 0%, var(--accent) 60%, transparent 100%)",
              boxShadow: "0 0 10px var(--accent-glow)",
              animation: `rise ${m.duration}s linear ${m.delay}s infinite`,
              "--drift": `${m.drift}px`,
              "--o": m.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
