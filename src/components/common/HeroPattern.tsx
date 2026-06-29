import { cn } from '@/lib/utils'

/**
 * Subtle engineering-drawing motif for dark hero panels — flowing contour /
 * roadway-alignment curves with faint bridge-cable geometry. Rendered in
 * `currentColor` at very low opacity so the transportation identity is felt,
 * not noticed. Purely decorative; stretches to fill its (positioned) parent.
 */
export function HeroPattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 420"
      preserveAspectRatio="none"
      aria-hidden
      className={cn('pointer-events-none select-none', className)}
    >
      {/* Bridge-cable geometry from the upper-right */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.05">
        <line x1="1200" y1="-20" x2="540" y2="420" />
        <line x1="1200" y1="-20" x2="720" y2="420" />
        <line x1="1200" y1="-20" x2="900" y2="420" />
        <line x1="1200" y1="-20" x2="1080" y2="420" />
      </g>
      {/* Contour / roadway-alignment curves */}
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M-60 110 C 220 50 420 170 660 110 S 1060 40 1260 120" opacity="0.07" />
        <path d="M-60 170 C 240 110 440 230 680 170 S 1080 100 1260 180" opacity="0.06" />
        <path d="M-60 230 C 260 170 460 290 700 230 S 1100 160 1260 240" opacity="0.05" />
        <path d="M-60 290 C 280 230 480 350 720 290 S 1120 220 1260 300" opacity="0.045" />
        <path d="M-60 350 C 300 290 500 410 740 350 S 1140 280 1260 360" opacity="0.04" />
      </g>
    </svg>
  )
}
