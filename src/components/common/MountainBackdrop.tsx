import { cn } from '@/lib/utils'

/**
 * Decorative layered mountain silhouette — echoes the CDOT roundel and the
 * Colorado mountains. Renders in `currentColor`; set a text color and position
 * it (typically absolute, bottom of a dark hero). Purely decorative.
 */
export function MountainBackdrop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      aria-hidden
      className={cn('pointer-events-none select-none', className)}
    >
      <path
        d="M0 200 V120 L150 64 L320 116 L500 48 L680 110 L860 56 L1040 116 L1200 70 V200 Z"
        fill="currentColor"
        opacity="0.06"
      />
      <path
        d="M0 200 V150 L200 96 L390 146 L560 86 L770 150 L960 98 L1200 152 V200 Z"
        fill="currentColor"
        opacity="0.10"
      />
    </svg>
  )
}
