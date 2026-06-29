import { Link } from 'react-router-dom'
import { ArrowRight, Quote, Building2, FolderKanban } from 'lucide-react'
import type { Spotlight } from '@/types'
import { Modal } from '@/components/common/Modal'
import {
  getEmployeeForSpotlight,
  getDepartmentBySlug,
  getProjectByTitle,
} from '@/utils/data'

interface SpotlightDetailModalProps {
  spotlight: Spotlight | null
  open: boolean
  onClose: () => void
}

/** Full spotlight story with links to the employee, division, and project. */
export function SpotlightDetailModal({ spotlight, open, onClose }: SpotlightDetailModalProps) {
  if (!spotlight) return null
  const employee = getEmployeeForSpotlight(spotlight)
  if (!employee) return null

  const division = getDepartmentBySlug(employee.division)
  const favoriteProject = getProjectByTitle(employee.favoriteProject)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={spotlight.headline}
      description="Employee Spotlight"
      className="max-w-2xl"
      footer={
        <>
          {division && (
            <Link
              to={`/division/${division.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Building2 className="h-4 w-4" aria-hidden />
              {division.shortName}
            </Link>
          )}
          <Link
            to={`/employee/${employee.id}`}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View full profile
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </>
      }
    >
      <div className="flex items-center gap-3">
        <img
          src={employee.image}
          alt=""
          className="h-14 w-14 rounded-full object-cover ring-2 ring-border"
        />
        <div className="min-w-0">
          <p className="font-semibold text-heading">{employee.name}</p>
          <p className="text-small text-muted-foreground">
            {employee.title}
            {division ? ` · ${division.name}` : ''}
          </p>
        </div>
      </div>

      <blockquote className="mt-4 flex gap-2.5 rounded-card bg-primary/5 p-4 text-body italic text-foreground">
        <Quote className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        <span>{spotlight.quote}</span>
      </blockquote>

      <div className="mt-5 space-y-4 text-small text-muted-foreground">
        <p className="text-body text-foreground">{spotlight.story}</p>
        <div>
          <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
            Career journey
          </h3>
          <p className="mt-1.5">{spotlight.careerJourney}</p>
        </div>
        <div>
          <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
            Favorite project
          </h3>
          <p className="mt-1.5">{spotlight.favoriteProject}</p>
          {favoriteProject && (
            <Link
              to={`/project/${favoriteProject.id}`}
              onClick={onClose}
              className="mt-2 inline-flex items-center gap-1.5 text-small font-semibold text-primary hover:underline"
            >
              <FolderKanban className="h-4 w-4" aria-hidden />
              {favoriteProject.title}
            </Link>
          )}
        </div>
      </div>
    </Modal>
  )
}
