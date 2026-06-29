import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { AccentKey } from '@/config/accents'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  description?: string
  /** Optional leading icon, shown in a restrained neutral chip. */
  icon?: LucideIcon
  /**
   * Accepted for API compatibility, but section headers use a neutral
   * treatment by design — accent color is reserved for page identity
   * (PageHeader) and meaning (status badges, meters).
   */
  accent?: AccentKey
  /** Optional content aligned to the right (e.g. a "View all" link). */
  action?: ReactNode
  className?: string
}

/**
 * Consistent heading for in-page sections: a calm neutral icon chip, a title,
 * a supporting description, and an optional right-aligned action. Kept
 * intentionally monochromatic for a cohesive, enterprise-grade feel.
 */
export function SectionHeader({
  title,
  description,
  icon: Icon,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-button bg-muted text-muted-foreground">
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
