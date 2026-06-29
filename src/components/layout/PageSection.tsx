import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { SectionHeader } from '@/components/common/SectionHeader'
import type { AccentKey } from '@/config/accents'
import { cn } from '@/lib/utils'

interface PageSectionProps {
  /** Section title; when omitted, no header is rendered. */
  title?: string
  description?: string
  icon?: LucideIcon
  accent?: AccentKey
  /** Right-aligned action for the section header (e.g. "View all"). */
  action?: ReactNode
  /** Optional id for in-page anchor navigation. */
  id?: string
  children: ReactNode
  className?: string
}

/**
 * A labeled page section: an optional {@link SectionHeader} followed by its
 * content, with consistent internal spacing. Pages compose these instead of
 * repeating heading + spacing markup.
 */
export function PageSection({
  title,
  description,
  icon,
  accent,
  action,
  id,
  children,
  className,
}: PageSectionProps) {
  return (
    <section id={id} className={cn('space-y-5', className)}>
      {title && (
        <SectionHeader
          title={title}
          description={description}
          icon={icon}
          accent={accent}
          action={action}
        />
      )}
      {children}
    </section>
  )
}
