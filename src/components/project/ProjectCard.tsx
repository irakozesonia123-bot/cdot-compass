import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Users, FolderKanban } from 'lucide-react'
import type { Project, ProjectStatus } from '@/types'
import type { BadgeTone } from '@/components/common/Badge'
import { cardClass } from '@/components/common/Card'
import { MediaImage } from '@/components/common/MediaImage'
import { SaveButton } from '@/components/common/SaveButton'
import { Badge } from '@/components/common/Badge'
import { Tag } from '@/components/common/Tag'
import { hoverLift } from '@/animations/variants'
import { getDepartmentBySlug } from '@/utils/data'
import { cn } from '@/lib/utils'

const STATUS_TONE: Record<ProjectStatus, BadgeTone> = {
  Active: 'success',
  Completed: 'neutral',
  Planned: 'info',
  'On Hold': 'warning',
}

interface ProjectCardProps {
  project: Project
  className?: string
}

/**
 * Project card for the Project Explorer: image, status & phase, participating
 * divisions, engineer count, and location — surfacing cross-division work.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const divisionNames = project.divisions
    .map((slug) => getDepartmentBySlug(slug)?.shortName ?? slug)
    .slice(0, 3)
  const extraDivisions = project.divisions.length - divisionNames.length

  return (
    <motion.article whileHover={hoverLift} className={cn('group relative h-full', className)}>
      <SaveButton
        id={project.id}
        label={project.title}
        variant="overlay"
        className="absolute right-3 top-3 z-10"
      />
      <Link
        to={`/project/${project.id}`}
        className={cn(
          cardClass,
          'flex h-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-card-hover',
        )}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <MediaImage
            src={project.image}
            alt=""
            icon={FolderKanban}
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <Badge tone={STATUS_TONE[project.status]} dot>
              {project.status}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2">
            <Badge tone="primary">{project.phase}</Badge>
          </div>
          <h3 className="mt-2 text-card-title font-semibold text-heading">{project.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-small text-muted-foreground">
            {project.summary}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {divisionNames.map((name) => (
              <Tag key={name}>{name}</Tag>
            ))}
            {extraDivisions > 0 && <Tag>+{extraDivisions} more</Tag>}
          </div>

          <div className="mt-auto flex items-center justify-between pt-4 text-small text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" aria-hidden />
                {project.engineers.length}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden />
                <span className="max-w-[10rem] truncate">{project.location}</span>
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
