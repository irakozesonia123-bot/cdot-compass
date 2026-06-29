import { Coffee, Compass, BookmarkCheck, CalendarCheck, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import { INTERN_PROFILE } from '@/config/internProfile'
import { useBookmarks } from '@/hooks/useBookmarks'
import { cn } from '@/lib/utils'

interface ProgressTileData {
  label: string
  completed: number
  goal: number
  icon: LucideIcon
  accent: AccentKey
}

/** Onboarding progress tiles. Saved resources reflects live bookmark state. */
export function InternProgress() {
  const { bookmarks } = useBookmarks()
  const { progress } = INTERN_PROFILE

  const tiles: ProgressTileData[] = [
    { label: 'Coffee chats', completed: progress.coffeeChats.completed, goal: progress.coffeeChats.goal, icon: Coffee, accent: 'teal' },
    { label: 'Divisions explored', completed: progress.divisionsExplored.completed, goal: progress.divisionsExplored.goal, icon: Compass, accent: 'green' },
    { label: 'Saved resources', completed: bookmarks.length, goal: progress.savedResourcesGoal, icon: BookmarkCheck, accent: 'blue' },
    { label: 'Events attended', completed: progress.eventsAttended.completed, goal: progress.eventsAttended.goal, icon: CalendarCheck, accent: 'gold' },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((tile) => (
        <ProgressTile key={tile.label} {...tile} />
      ))}
    </div>
  )
}

function ProgressTile({ label, completed, goal, icon: Icon, accent }: ProgressTileData) {
  const accentStyle = ACCENT_STYLES[accent]
  const pct = goal > 0 ? Math.min(100, Math.round((completed / goal) * 100)) : 0

  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-button',
            accentStyle.soft,
            accentStyle.icon,
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="text-sm font-semibold text-muted-foreground">
          <span className="text-xl text-heading">{completed}</span>
          <span aria-hidden> / {goal}</span>
        </span>
      </div>
      <div>
        <p className="text-small font-medium text-foreground">{label}</p>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full', accentStyle.dot)}
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={completed}
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-label={`${label}: ${completed} of ${goal}`}
          />
        </div>
      </div>
    </Card>
  )
}
