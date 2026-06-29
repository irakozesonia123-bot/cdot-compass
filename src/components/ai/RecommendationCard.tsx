import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FolderKanban, Users } from 'lucide-react'
import type { Department } from '@/types'
import { cardClass } from '@/components/common/Card'
import { Tag } from '@/components/common/Tag'
import { CompatibilityMeter } from '@/components/common/CompatibilityMeter'
import { hoverLift } from '@/animations/variants'
import { cn } from '@/lib/utils'

interface RecommendationCardProps {
  department: Department
  /** Compatibility score, 0–100. */
  score: number
  /** Why this division was recommended. */
  reason: string
  className?: string
}

/**
 * Compass Guide result card: a recommended division with its compatibility
 * meter, the reasoning, focus tags, and quick stats.
 */
export function RecommendationCard({
  department,
  score,
  reason,
  className,
}: RecommendationCardProps) {
  return (
    <motion.article whileHover={hoverLift} className={cn('group h-full', className)}>
      <Link
        to={`/division/${department.slug}`}
        className={cn(
          cardClass,
          'flex h-full flex-col p-6 transition-shadow duration-200 hover:shadow-card-hover',
        )}
      >
        <div className="flex items-center gap-4">
          <CompatibilityMeter value={score} size={76} label="match" />
          <div className="min-w-0">
            <h3 className="text-card-title font-semibold text-heading">{department.name}</h3>
            <p className="mt-0.5 line-clamp-2 text-small text-muted-foreground">
              {department.mission}
            </p>
          </div>
        </div>

        <p className="mt-4 text-small text-foreground">
          <span className="font-semibold text-heading">Why it fits: </span>
          {reason}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {department.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 text-small text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <FolderKanban className="h-4 w-4" aria-hidden />
              {department.projects.length} projects
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" aria-hidden />
              {department.employees.length} people
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
            Explore
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
