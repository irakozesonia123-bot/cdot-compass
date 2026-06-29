import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import type { Spotlight } from '@/types'
import { cardClass } from '@/components/common/Card'
import { spotlights, getEmployeeForSpotlight, getDepartmentBySlug } from '@/utils/data'
import { cn } from '@/lib/utils'

interface FeaturedSpotlightProps {
  /** Spotlight to feature (defaults to the first). */
  spotlight?: Spotlight
  /** Optional handler for "Read the full story" (defaults to linking to /spotlights). */
  onRead?: (spotlight: Spotlight) => void
}

/** A single, prominent employee spotlight feature. */
export function FeaturedSpotlight({ spotlight: provided, onRead }: FeaturedSpotlightProps = {}) {
  const spotlight = provided ?? spotlights[0]
  const employee = spotlight ? getEmployeeForSpotlight(spotlight) : undefined
  if (!spotlight || !employee) return null

  const divisionName = getDepartmentBySlug(employee.division)?.name ?? employee.division

  return (
    <article className={cn(cardClass, 'grid overflow-hidden md:grid-cols-2')}>
      <div className="relative min-h-56 bg-muted">
        <img
          src={employee.image}
          alt={`Portrait of ${employee.name}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cdot-navy/70 via-transparent to-transparent md:bg-gradient-to-r" />
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          Employee Spotlight
        </span>
        <h3 className="mt-2 text-2xl font-semibold text-heading">{spotlight.headline}</h3>
        <blockquote className="mt-3 flex gap-2 text-body italic text-muted-foreground">
          <Quote className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <span>{spotlight.quote}</span>
        </blockquote>
        <p className="mt-4 text-small font-medium text-foreground">{employee.name}</p>
        <p className="text-small text-muted-foreground">
          {employee.title} · {divisionName}
        </p>
        {onRead ? (
          <button
            type="button"
            onClick={() => onRead(spotlight)}
            className="mt-5 inline-flex items-center gap-1.5 text-small font-semibold text-primary hover:underline"
          >
            Read the full story
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <Link
            to="/spotlights"
            className="mt-5 inline-flex items-center gap-1.5 text-small font-semibold text-primary hover:underline"
          >
            Read the full story
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  )
}
