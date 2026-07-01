import { cn } from "@/lib/utils";
import type { MoveType } from "@/data/portfolio";

export const TYPE_COLORS: Record<MoveType, string> = {
  psychic: "#f95587",
  steel: "#8f8fb0",
  electric: "#e8b800",
  ground: "#dcb44f",
  normal: "#9a9a70",
  fire: "#ee8130",
  water: "#6390f0",
  grass: "#5aad4a",
  ghost: "#8a6db0",
  dragon: "#6f52f8",
};

export function TypeBadge({ type, className }: { type: MoveType; className?: string }) {
  const color = TYPE_COLORS[type];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm",
        className
      )}
      style={{ backgroundColor: color, boxShadow: `0 0 12px -2px ${color}` }}
    >
      {type}
    </span>
  );
}
