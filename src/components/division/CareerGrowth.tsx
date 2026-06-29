import { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'

interface CareerGrowthProps {
  /** Representative roles, ordered from entry to senior. */
  paths: string[]
  /** Narrative describing growth in the division. */
  narrative: string
}

/**
 * Visualizes a division's career ladder as a connected sequence of roles,
 * preceded by a short narrative.
 */
export function CareerGrowth({ paths, narrative }: CareerGrowthProps) {
  return (
    <div className="space-y-5">
      <p className="max-w-3xl text-body text-muted-foreground">{narrative}</p>
      <ol className="flex flex-wrap items-center gap-2">
        {paths.map((role, i) => (
          <Fragment key={role}>
            {i > 0 && (
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            )}
            <li className="rounded-button border border-border bg-card px-3 py-2 text-small font-medium text-foreground shadow-soft">
              {role}
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  )
}
