import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StatsRowProps {
  children: ReactNode
  /** Columns at the largest breakpoint (2 on mobile by default). */
  cols?: 2 | 3 | 4
  className?: string
}

const COLS_CLASS: Record<NonNullable<StatsRowProps['cols']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
}

/** Responsive row of summary stat cards. */
export function StatsRow({ children, cols = 4, className }: StatsRowProps) {
  return <div className={cn('grid gap-4', COLS_CLASS[cols], className)}>{children}</div>
}
