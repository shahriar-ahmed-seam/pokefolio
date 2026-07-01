import type { SVGProps } from "react";

/** A clean, theme-aware Poké Ball. Top half uses the current accent colour. */
export function Pokeball({ size = 40, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Poké Ball"
      {...props}
    >
      <defs>
        <clipPath id="pb-clip">
          <circle cx="50" cy="50" r="46" />
        </clipPath>
      </defs>
      <g clipPath="url(#pb-clip)">
        <rect x="0" y="0" width="100" height="50" fill="var(--accent)" />
        <rect x="0" y="50" width="100" height="50" fill="#f4f6fb" />
        <rect x="0" y="46" width="100" height="8" fill="#0b0e18" />
      </g>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#0b0e18" strokeWidth="5" />
      <circle cx="50" cy="50" r="15" fill="#0b0e18" />
      <circle cx="50" cy="50" r="10" fill="#f4f6fb" stroke="#0b0e18" strokeWidth="3" />
      <circle cx="50" cy="50" r="5" fill="#fff" />
    </svg>
  );
}
