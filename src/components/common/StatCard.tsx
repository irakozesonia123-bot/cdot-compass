import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  accent?: AccentKey
  className?: string
}

/** Compact metric card: an accent icon beside a large value and label. */
export function StatCard({ label, value, icon: Icon, accent = 'blue', className }: StatCardProps) {
  const accentStyle = ACCENT_STYLES[accent]
  return (
    <Card className={cn('flex items-center gap-4 p-5', className)}>
      <span
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-card',
          accentStyle.soft,
          accentStyle.icon,
        )}
      >
        <Icon className="h-7 w-7" aria-hidden />
      </span>
      <div className="min-w-0">
        <div className="text-2xl font-semibold leading-tight text-heading">{value}</div>
        <div className="truncate text-small text-muted-foreground">{label}</div>
      </div>
    </Card>
  )
}
