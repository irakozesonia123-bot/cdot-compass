import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Quote } from 'lucide-react'
import type { Spotlight } from '@/types'
import { cardClass } from '@/components/common/Card'
import { hoverLift } from '@/animations/variants'
import { getDepartmentBySlug, getEmployeeForSpotlight } from '@/utils/data'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  spotlight: Spotlight
  /** When provided, the card opens this handler instead of linking to /spotlights. */
  onRead?: (spotlight: Spotlight) => void
  className?: string
}

/**
 * Magazine-style spotlight card: a featured employee portrait, headline, and
 * pull quote. Resolves the featured employee from the spotlight internally.
 */
export function SpotlightCard({ spotlight, onRead, className }: SpotlightCardProps) {
  const employee = getEmployeeForSpotlight(spotlight)
  if (!employee) return null
  const divisionName = getDepartmentBySlug(employee.division)?.name ?? employee.division

  const body = (
    <>
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <img
          src={employee.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cdot-navy/80 via-cdot-navy/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-sm font-semibold">{employee.name}</p>
          <p className="text-xs text-white/80">
            {employee.title} · {divisionName}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-card-title font-semibold text-heading">{spotlight.headline}</h3>
        <blockquote className="mt-2 flex gap-2 text-small italic text-muted-foreground">
          <Quote className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span className="line-clamp-2">{spotlight.quote}</span>
        </blockquote>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-small font-semibold text-primary">
          Read story
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </>
  )

  const sharedClass = cn(
    cardClass,
    'flex h-full flex-col overflow-hidden text-left transition-shadow duration-200 hover:shadow-card-hover',
  )

  return (
    <motion.article whileHover={hoverLift} className={cn('group h-full', className)}>
      {onRead ? (
        <button type="button" onClick={() => onRead(spotlight)} className={cn(sharedClass, 'w-full')}>
          {body}
        </button>
      ) : (
        <Link to="/spotlights" className={sharedClass}>
          {body}
        </Link>
      )}
    </motion.article>
  )
}
