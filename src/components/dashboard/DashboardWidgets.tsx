import { Link } from 'react-router-dom'
import {
  Navigation,
  Clock,
  Bookmark,
  Coffee,
  Building2,
  UserRound,
  FolderKanban,
  BookOpen,
  Calendar,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/common/Card'
import { INTERN_PROFILE } from '@/config/internProfile'
import { getEmployeeById } from '@/utils/data'
import { useRecentlyViewed, type RecentType } from '@/hooks/useRecentlyViewed'
import { useBookmarks } from '@/hooks/useBookmarks'
import { groupSaved, type SavedKind } from '@/utils/saved'

function WidgetHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: LucideIcon
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="flex items-center gap-2 text-small font-semibold text-heading">
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
        {title}
      </h3>
      {action}
    </div>
  )
}

/** CTA into the Compass Guide quiz. */
export function CompassGuideCard() {
  return (
    <Card className="space-y-3 p-5">
      <WidgetHeader icon={Navigation} title="Compass Guide" />
      <p className="text-small text-muted-foreground">
        Answer 7 quick questions to get divisions, people, and projects matched to your interests —
        with the reasoning behind each.
      </p>
      <Link
        to="/compass-guide"
        className="inline-flex items-center gap-1.5 rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Start now
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Card>
  )
}

const RECENT_ICON: Record<RecentType, LucideIcon> = {
  division: Building2,
  employee: UserRound,
  project: FolderKanban,
}

/** "Continue where you left off" — recently visited detail pages. */
export function RecentlyViewedCard() {
  const recents = useRecentlyViewed().slice(0, 4)
  return (
    <Card className="space-y-3 p-5">
      <WidgetHeader icon={Clock} title="Recently viewed" />
      {recents.length === 0 ? (
        <p className="text-small text-muted-foreground">
          Pages you open will show up here so you can pick up where you left off.
        </p>
      ) : (
        <ul className="space-y-1">
          {recents.map((item) => {
            const Icon = RECENT_ICON[item.type]
            return (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className="flex items-center gap-2.5 rounded-button px-2 py-1.5 transition-colors hover:bg-muted"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span className="min-w-0">
                    <span className="block truncate text-small font-medium text-foreground">{item.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{item.subtitle}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}

const SAVED_ICON: Record<SavedKind, LucideIcon> = {
  people: UserRound,
  projects: FolderKanban,
  resources: BookOpen,
  events: Calendar,
}

/** Snapshot of saved items with a link to the Saved page. */
export function SavedItemsCard() {
  const { bookmarks } = useBookmarks()
  const groups = groupSaved(bookmarks)
  const items = Object.values(groups).flat().slice(0, 4)

  return (
    <Card className="space-y-3 p-5">
      <WidgetHeader
        icon={Bookmark}
        title="Saved items"
        action={
          bookmarks.length > 0 ? (
            <Link to="/saved" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          ) : undefined
        }
      />
      {items.length === 0 ? (
        <p className="text-small text-muted-foreground">
          Tap <span className="font-medium text-foreground">Save</span> on any person, project,
          resource, or event to keep it here.
        </p>
      ) : (
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = SAVED_ICON[item.kind]
            return (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className="flex items-center gap-2.5 rounded-button px-2 py-1.5 transition-colors hover:bg-muted"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span className="min-w-0 truncate text-small font-medium text-foreground">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}

/** Lightweight coffee-chat activity summary. */
export function CoffeeActivityCard() {
  const mentor = getEmployeeById(INTERN_PROFILE.mentorId)
  const { completed, goal } = INTERN_PROFILE.progress.coffeeChats

  return (
    <Card className="space-y-3 p-5">
      <WidgetHeader icon={Coffee} title="Coffee chat activity" />
      <p className="text-small text-muted-foreground">
        <span className="text-base font-semibold text-heading">{completed}</span> of {goal} coffee
        chats this summer.
      </p>
      {mentor && (
        <div className="flex items-center gap-2.5 rounded-button bg-muted/50 p-2">
          <img src={mentor.image} alt="" className="h-8 w-8 rounded-full object-cover ring-1 ring-border" />
          <span className="min-w-0">
            <span className="block truncate text-small font-medium text-foreground">{mentor.name}</span>
            <span className="block text-xs text-muted-foreground">Most recent connection</span>
          </span>
        </div>
      )}
      <Link
        to="/people"
        className="inline-flex items-center gap-1.5 text-small font-semibold text-primary hover:underline"
      >
        Find someone new
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Card>
  )
}
