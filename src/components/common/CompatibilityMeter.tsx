import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CompatibilityMeterProps {
  /** Match percentage, 0–100. */
  value: number
  /** Diameter in pixels. */
  size?: number
  strokeWidth?: number
  /** Optional caption shown under the percentage. */
  label?: string
  className?: string
}

/** Pick a semantic color band for the score. */
function colorForValue(value: number): string {
  if (value >= 80) return 'hsl(var(--success))'
  if (value >= 60) return 'hsl(var(--primary))'
  return 'hsl(var(--warning))'
}

/**
 * Radial compatibility ring used by Compass Guide recommendations.
 * Animates the arc on mount and exposes the value to assistive tech.
 */
export function CompatibilityMeter({
  value,
  size = 96,
  strokeWidth = 8,
  label,
  className,
}: CompatibilityMeterProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped / 100)
  const color = colorForValue(clamped)

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${clamped} percent match`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold text-heading">{clamped}%</span>
        {label && (
          <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  )
}
