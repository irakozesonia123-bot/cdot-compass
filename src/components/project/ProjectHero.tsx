import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Users, Network, FolderKanban } from 'lucide-react'
import type { Project, ProjectStatus } from '@/types'
import { MediaImage } from '@/components/common/MediaImage'
import { reveal } from '@/animations/variants'
import { getDepartmentBySlug } from '@/utils/data'

const STATUS_CLASS: Record<ProjectStatus, string> = {
  Active: 'bg-success/20 text-white',
  Completed: 'bg-white/20 text-white',
  Planned: 'bg-accent/30 text-white',
  'On Hold': 'bg-warning/30 text-white',
}

interface ProjectHeroProps {
  project: Project
}

/** Project detail hero: transportation image, status/phase, title, and summary. */
export function ProjectHero({ project }: ProjectHeroProps) {
  const lead = getDepartmentBySlug(project.leadDivision)

  return (
    <motion.section
      variants={reveal}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-card shadow-card"
    >
      <div className="absolute inset-0 bg-muted">
        <MediaImage src={project.image} alt="" icon={FolderKanban} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-cdot-navy/95 via-cdot-navy/65 to-cdot-navy/30" />

      <div className="relative flex min-h-[320px] flex-col justify-end p-7 text-white sm:p-9">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur ${STATUS_CLASS[project.status]}`}>
            {project.status}
          </span>
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur">
            {project.phase}
          </span>
          {lead && (
            <Link
              to={`/division/${lead.slug}`}
              className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur hover:bg-white/25"
            >
              Led by {lead.shortName}
            </Link>
          )}
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-2 max-w-2xl text-white/90">{project.summary}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-white/85">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden />
            {project.location}
          </span>
          <span className="text-white/70">{project.duration}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#divisions"
            className="inline-flex items-center gap-2 rounded-button bg-white px-5 py-2.5 text-small font-semibold text-cdot-navy transition-colors hover:bg-white/90"
          >
            <Network className="h-4 w-4" aria-hidden />
            Divisions involved
          </a>
          <a
            href="#engineers"
            className="inline-flex items-center gap-2 rounded-button border border-white/40 px-5 py-2.5 text-small font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Users className="h-4 w-4" aria-hidden />
            Meet the engineers
          </a>
        </div>
      </div>
    </motion.section>
  )
}
