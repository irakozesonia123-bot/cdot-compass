import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type BadgeTone =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  /** Show a leading status dot. */
  dot?: boolean
  className?: string
}

const TONE_CLASS: Record<BadgeTone, string> = {
  neutral: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-destructive/10 text-destructive',
  info: 'bg-accent/10 text-accent',
}

const DOT_CLASS: Record<BadgeTone, string> = {
  neutral: 'bg-muted-foreground',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-destructive',
  info: 'bg-accent',
}

/**
 * A status / category badge with semantic tones. Used for project status and
 * phase, employee availability, event categories, and similar metadata.
 */
export function Badge({ children, tone = 'neutral', dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        TONE_CLASS[tone],
        className,
      )}
    >
      {dot && (
        <span className={cn('h-1.5 w-1.5 rounded-full', DOT_CLASS[tone])} aria-hidden />
      )}
      {children}
    </span>
  )
}
