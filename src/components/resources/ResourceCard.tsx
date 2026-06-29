import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Resource, ResourceCategory } from '@/types'
import { cardClass } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import { hoverLift } from '@/animations/variants'
import { getLucideIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

/** Map each resource category to an intentional accent color. */
const CATEGORY_ACCENT: Record<ResourceCategory, AccentKey> = {
  'Professional Development': 'blue',
  Training: 'green',
  'Employee Resource Groups': 'purple',
  'Career Planning': 'teal',
  Leadership: 'orange',
  Learning: 'indigo',
  Benefits: 'gold',
  Organization: 'gray',
}

interface ResourceCardProps {
  resource: Resource
  /** Called when the card is activated (opens resource details). */
  onOpen?: (resource: Resource) => void
  className?: string
}

/** Resource card with a category-accented icon, title, and description. */
export function ResourceCard({ resource, onOpen, className }: ResourceCardProps) {
  const Icon = getLucideIcon(resource.icon)
  const accent = ACCENT_STYLES[CATEGORY_ACCENT[resource.category]]

  return (
    <motion.button
      type="button"
      whileHover={hoverLift}
      onClick={() => onOpen?.(resource)}
      className={cn(
        cardClass,
        'group flex h-full w-full flex-col p-5 text-left transition-shadow duration-200 hover:shadow-card-hover',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-card',
            accent.soft,
            accent.icon,
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
          aria-hidden
        />
      </div>

      <div className="mt-4 flex-1">
        <Badge tone="neutral" className="mb-2">
          {resource.category}
        </Badge>
        <h3 className="text-base font-semibold text-heading">{resource.title}</h3>
        <p className="mt-1 text-small text-muted-foreground">{resource.description}</p>
      </div>
    </motion.button>
  )
}
