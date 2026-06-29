import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  /** Optional leading icon shown in an accent medallion. */
  icon?: LucideIcon
  accent?: AccentKey
  /** Optional right-aligned actions (buttons, links). */
  actions?: ReactNode
  className?: string
}

/**
 * Top-of-page header used by every section page. Larger than SectionHeader,
 * which is for in-page section titles.
 */
export function PageHeader({
  title,
  description,
  icon: Icon,
  accent = 'blue',
  actions,
  className,
}: PageHeaderProps) {
  const accentStyle = ACCENT_STYLES[accent]
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between', className)}>
      <div className="flex items-center gap-4">
        {Icon && (
          <span
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-card',
              accentStyle.soft,
              accentStyle.icon,
            )}
          >
            <Icon className="h-7 w-7" aria-hidden />
          </span>
        )}
        <div>
          <h1 className="text-section text-heading">{title}</h1>
          {description && (
            <p className="mt-1 max-w-2xl text-body text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}
