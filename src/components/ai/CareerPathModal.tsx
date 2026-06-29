import { Link } from 'react-router-dom'
import { ArrowRight, FolderKanban, Users, BookOpen } from 'lucide-react'
import { Modal } from '@/components/common/Modal'
import { Tag } from '@/components/common/Tag'
import type { CareerPath } from '@/utils/compassGuide'
import { getSuggestedResourcesForPath } from '@/utils/compassGuide'
import {
  getDepartmentBySlug,
  getEmployeesByDepartment,
  getProjectsByDepartment,
} from '@/utils/data'

interface CareerPathModalProps {
  path: CareerPath | null
  open: boolean
  onClose: () => void
}

/** Rich detail for a career path: what they do, projects, skills, people, resources. */
export function CareerPathModal({ path, open, onClose }: CareerPathModalProps) {
  if (!path) return null
  const department = getDepartmentBySlug(path.slug)
  if (!department) return null

  const projects = getProjectsByDepartment(path.slug).slice(0, 3)
  const people = [...getEmployeesByDepartment(path.slug)]
    .sort((a, b) => Number(b.mentor) - Number(a.mentor) || a.name.localeCompare(b.name))
    .slice(0, 2)
  const resources = getSuggestedResourcesForPath(department, 2)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={path.label}
      description={department.mission}
      className="max-w-2xl"
      footer={
        <Link
          to={`/division/${department.slug}`}
          onClick={onClose}
          className="inline-flex items-center gap-1.5 rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Explore the {department.shortName} division
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      }
    >
      <p className="text-small text-muted-foreground">{department.description}</p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Skills</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {department.skills.slice(0, 6).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Software</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {department.software.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <FolderKanban className="h-3.5 w-3.5" aria-hidden /> Typical projects
        </h3>
        <ul className="mt-2 space-y-1">
          {projects.map((p) => (
            <li key={p.id}>
              <Link
                to={`/project/${p.id}`}
                onClick={onClose}
                className="text-small font-medium text-primary hover:underline"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Users className="h-3.5 w-3.5" aria-hidden /> Suggested people
          </h3>
          <ul className="mt-2 space-y-1.5">
            {people.map((e) => (
              <li key={e.id} className="text-small">
                <Link
                  to={`/employee/${e.id}`}
                  onClick={onClose}
                  className="font-medium text-primary hover:underline"
                >
                  {e.name}
                </Link>
                <span className="text-muted-foreground"> · {e.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" aria-hidden /> Suggested resources
          </h3>
          <ul className="mt-2 space-y-1.5">
            {resources.map((r) => (
              <li key={r.id} className="text-small">
                <span className="font-medium text-foreground">{r.title}</span>
                <span className="text-muted-foreground"> · {r.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  )
}
