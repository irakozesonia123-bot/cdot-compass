import { Link } from 'react-router-dom'
import {
  Bookmark,
  UserRound,
  FolderKanban,
  BookOpen,
  Calendar,
  X,
  type LucideIcon,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageSection } from '@/components/layout/PageSection'
import { EmptyState } from '@/components/common/EmptyState'
import { Card } from '@/components/common/Card'
import type { AccentKey } from '@/config/accents'
import { ACCENT_STYLES } from '@/config/accents'
import { useBookmarks } from '@/hooks/useBookmarks'
import { groupSaved, SAVED_KIND_LABEL, type SavedKind, type SavedRef } from '@/utils/saved'
import { cn } from '@/lib/utils'

const KIND_META: Record<SavedKind, { icon: LucideIcon; accent: AccentKey }> = {
  people: { icon: UserRound, accent: 'teal' },
  projects: { icon: FolderKanban, accent: 'orange' },
  resources: { icon: BookOpen, accent: 'blue' },
  events: { icon: Calendar, accent: 'gold' },
}

const ORDER: SavedKind[] = ['people', 'projects', 'resources', 'events']

/** Saved page — everything the intern has bookmarked, grouped, with removal. */
export default function Saved() {
  const { bookmarks, toggleBookmark } = useBookmarks()
  const groups = groupSaved(bookmarks)

  return (
    <PageContainer>
      <PageHeader
        title="Saved"
        description="People, projects, resources, and events you've kept for later."
        icon={Bookmark}
        accent="blue"
      />

      {bookmarks.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="Nothing saved yet"
          description="Tap Save on any person, project, resource, or event and it will appear here."
          action={
            <Link
              to="/explore"
              className="rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start exploring
            </Link>
          }
        />
      ) : (
        ORDER.filter((kind) => groups[kind].length > 0).map((kind) => {
          const meta = KIND_META[kind]
          return (
            <PageSection
              key={kind}
              title={SAVED_KIND_LABEL[kind]}
              icon={meta.icon}
              accent={meta.accent}
            >
              <div className="space-y-2">
                {groups[kind].map((ref) => (
                  <SavedRow
                    key={ref.id}
                    item={ref}
                    accent={meta.accent}
                    icon={meta.icon}
                    onRemove={() => toggleBookmark(ref.id, ref.title)}
                  />
                ))}
              </div>
            </PageSection>
          )
        })
      )}
    </PageContainer>
  )
}

function SavedRow({
  item,
  icon: Icon,
  accent,
  onRemove,
}: {
  item: SavedRef
  icon: LucideIcon
  accent: AccentKey
  onRemove: () => void
}) {
  const accentStyle = ACCENT_STYLES[accent]
  return (
    <Card className="flex items-center gap-3 p-3">
      <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-button', accentStyle.soft, accentStyle.icon)}>
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <Link to={item.to} className="min-w-0 flex-1">
        <span className="block truncate text-small font-semibold text-foreground">{item.title}</span>
        <span className="block truncate text-xs text-muted-foreground">{item.subtitle}</span>
      </Link>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${item.title} from saved`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-button text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </Card>
  )
}
