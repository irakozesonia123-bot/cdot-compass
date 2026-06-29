import { Children, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/animations/variants'
import { cn } from '@/lib/utils'

type GridCols = 2 | 3 | 4

/** Static column classes so Tailwind can detect them at build time. */
const COLS_CLASS: Record<GridCols, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

interface ContentGridProps {
  children: ReactNode
  /** Max columns at the largest breakpoint. */
  cols?: GridCols
  /** Stagger children into view on first scroll-in. */
  animate?: boolean
  className?: string
}

/**
 * Responsive card grid. Optionally staggers its children into view once.
 * Powers every directory and dashboard card grid for consistent gutters.
 */
export function ContentGrid({ children, cols = 3, animate = false, className }: ContentGridProps) {
  const gridClass = cn('grid gap-6', COLS_CLASS[cols], className)

  if (!animate) {
    return <div className={gridClass}>{children}</div>
  }

  return (
    <motion.div
      className={gridClass}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {Children.map(children, (child) => (
        <motion.div variants={staggerItem} className="h-full">
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
