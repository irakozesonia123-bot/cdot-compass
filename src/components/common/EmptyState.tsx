import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  /** Optional call-to-action (e.g. a "Clear filters" button). */
  action?: ReactNode
  className?: string
}

/**
 * Thoughtful empty state for directories and search results.
 * Pairs a soft icon medallion with a title, description, and optional action.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-card border border-dashed border-border bg-card/50 px-6 py-14 text-center',
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="mt-4 text-base font-semibold text-heading">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-small text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
