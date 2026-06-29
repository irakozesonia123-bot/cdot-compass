import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FolderKanban, Users, Building2 } from 'lucide-react'
import type { Department } from '@/types'
import { cardClass } from '@/components/common/Card'
import { MediaImage } from '@/components/common/MediaImage'
import { Tag } from '@/components/common/Tag'
import { hoverLift } from '@/animations/variants'
import { cn } from '@/lib/utils'

interface DepartmentCardProps {
  department: Department
  className?: string
}

/**
 * Division card for the Explore grid: image with hover zoom, mission, up to
 * three focus tags, and project / people counts.
 */
export function DepartmentCard({ department, className }: DepartmentCardProps) {
  return (
    <motion.article whileHover={hoverLift} className={cn('group h-full', className)}>
      <Link
        to={`/division/${department.slug}`}
        className={cn(
          cardClass,
          'flex h-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-card-hover',
        )}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <MediaImage
            src={department.image}
            alt=""
            icon={Building2}
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-card-title font-semibold text-heading">{department.name}</h3>
          <p className="mt-1.5 line-clamp-2 text-small text-muted-foreground">
            {department.mission}
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
            <ArrowRight
              className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
