"use client";

import { useEffect, useRef, useState } from "react";
import { useHasFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { Pokeball } from "./Pokeball";

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * A spinning Poké Ball cursor that leaves a trail of energy sparks.
 * Only mounts on fine-pointer devices and when motion is allowed.
 */
export function PokeballCursor() {
  const fine = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const idRef = useRef(0);
  const lastEmit = useRef(0);

  useEffect(() => {
    if (!fine || reduced) return;
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      const now = performance.now();
      if (now - lastEmit.current > 34) {
        lastEmit.current = now;
        const id = idRef.current++;
        setSparks((p) => [
          ...p.slice(-14),
          { id, x: x + (Math.random() - 0.5) * 10, y: y + (Math.random() - 0.5) * 10, size: 2 + Math.random() * 4 },
        ]);
        window.setTimeout(() => setSparks((p) => p.filter((s) => s.id !== id)), 600);
      }
    };
    const down = () => dotRef.current?.classList.add("pb-cast");
    const up = () => dotRef.current?.classList.remove("pb-cast");

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pb-dot pointer-events-none fixed left-0 top-0 z-[9999] -ml-3.5 -mt-3.5"
        style={{ transition: "transform 45ms linear", filter: "drop-shadow(0 0 8px var(--accent-glow))" }}
        aria-hidden
      >
        <div className="animate-[spin_3s_linear_infinite]">
          <Pokeball size={28} />
        </div>
      </div>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="pointer-events-none fixed z-[9998] rounded-full"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            background: "radial-gradient(circle, #fff, var(--accent-2) 50%, transparent 80%)",
            animation: "sparkFade 0.6s ease-out forwards",
          }}
          aria-hidden
        />
      ))}
      <style jsx global>{`
        @keyframes sparkFade {
          0% { opacity: 0.95; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, calc(-50% + 12px)) scale(0.2); }
        }
        .pb-dot.pb-cast { filter: drop-shadow(0 0 16px var(--accent-glow)); }
      `}</style>
    </>
  );
}
