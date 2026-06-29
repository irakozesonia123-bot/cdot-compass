import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  description?: string
  /** Optional leading icon shown in an accent chip. */
  icon?: LucideIcon
  /** Accent color for the icon chip. */
  accent?: AccentKey
  /** Optional content aligned to the right (e.g. a "View all" link). */
  action?: ReactNode
  className?: string
}

/**
 * Consistent heading for page sections: optional accent icon, title,
 * supporting description, and an optional right-aligned action.
 */
export function SectionHeader({
  title,
  description,
  icon: Icon,
  accent = 'blue',
  action,
  className,
}: SectionHeaderProps) {
  const accentStyle = ACCENT_STYLES[accent]
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-button',
              accentStyle.soft,
              accentStyle.icon,
            )}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
        )}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-heading sm:text-2xl">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-small text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
