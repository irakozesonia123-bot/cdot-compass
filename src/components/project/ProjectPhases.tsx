import { Fragment } from 'react'
import { Check, FlaskConical } from 'lucide-react'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

/** The canonical delivery lifecycle a typical project moves through. */
const LIFECYCLE = ['Planning', 'Environmental Review', 'Design', 'Construction', 'Maintenance'] as const

type StepState = 'done' | 'current' | 'upcoming'

interface ProjectPhasesProps {
  project: Project
}

/**
 * Visual phase breakdown. Renders the project's position in the standard
 * delivery lifecycle (completed steps checked, current highlighted, future
 * muted). Research projects are shown as an iterative, non-linear effort.
 */
export function ProjectPhases({ project }: ProjectPhasesProps) {
  if (project.phase === 'Research') {
    return (
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cdot-indigo/10 text-cdot-indigo">
          <FlaskConical className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-small font-semibold text-heading">Research &amp; innovation</p>
          <p className="text-small text-muted-foreground">
            This effort follows an iterative, non-linear path — piloting ideas and measuring
            results rather than moving through fixed construction phases.
          </p>
        </div>
      </div>
    )
  }

  const completed = project.status === 'Completed' || project.phase === 'Completed'
  const currentIndex = completed ? LIFECYCLE.length : LIFECYCLE.indexOf(project.phase as (typeof LIFECYCLE)[number])

  const steps: { label: string; state: StepState }[] = LIFECYCLE.map((label, i) => ({
    label,
    state: i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'upcoming',
  }))
  if (completed) steps.push({ label: 'Completed', state: 'current' })

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          {i > 0 && <span className="hidden h-px w-5 bg-border sm:block" aria-hidden />}
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-small font-medium',
              step.state === 'done' && 'border-primary/30 bg-primary/10 text-primary',
              step.state === 'current' && 'border-primary bg-primary text-primary-foreground',
              step.state === 'upcoming' && 'border-border bg-card text-muted-foreground',
            )}
          >
            {step.state === 'done' && <Check className="h-3.5 w-3.5" aria-hidden />}
            {step.label}
          </span>
        </Fragment>
      ))}
    </div>
  )
}
