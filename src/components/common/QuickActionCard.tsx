import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cardClass } from '@/components/common/Card'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import { hoverLift } from '@/animations/variants'
import { cn } from '@/lib/utils'

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  /** Destination route. */
  to: string
  accent?: AccentKey
  className?: string
}

/**
 * Large, tappable action card with an accent icon and a hover lift.
 * The arrow nudges right on hover to signal navigation.
 */
export function QuickActionCard({
  title,
  description,
  icon: Icon,
  to,
  accent = 'blue',
  className,
}: QuickActionCardProps) {
  const accentStyle = ACCENT_STYLES[accent]
  return (
    <motion.div whileHover={hoverLift} className={cn('group h-full', className)}>
      <Link
        to={to}
        className={cn(
          cardClass,
          'flex h-full flex-col gap-4 p-6 transition-shadow duration-200 hover:shadow-card-hover focus-visible:shadow-card-hover',
        )}
      >
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-card',
            accentStyle.soft,
            accentStyle.icon,
          )}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <div className="flex-1">
          <h3 className="text-card-title font-semibold text-heading">{title}</h3>
          <p className="mt-1 text-small text-muted-foreground">{description}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-small font-semibold text-primary">
          Open
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </Link>
    </motion.div>
  )
}
