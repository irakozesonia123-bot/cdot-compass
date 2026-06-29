import { useEffect, useMemo, useState } from 'react'
import { Calendar, CalendarX2 } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { FilterPanel } from '@/components/layout/FilterPanel'
import { ContentGrid } from '@/components/layout/ContentGrid'
import { EventCard } from '@/components/events/EventCard'
import { EmptyState } from '@/components/common/EmptyState'
import { SkeletonCardGrid } from '@/components/common/LoadingSkeleton'
import { DemoDisclaimer } from '@/components/common/DemoDisclaimer'
import { SortSelect, type SortOption } from '@/components/common/SortSelect'
import type { FilterGroup } from '@/components/common/FilterBar'
import type { Event } from '@/types'
import { events } from '@/utils/data'
import { filterEvents, getEventCategoryOptions, getEventLocationOptions } from '@/utils/filter'

const SORT_OPTIONS: SortOption[] = [
  { value: 'soonest', label: 'Soonest first' },
  { value: 'latest', label: 'Latest first' },
]

const TIME_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
]

function monthLabel(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

function groupByMonth(list: Event[]): { label: string; events: Event[] }[] {
  const groups: { label: string; events: Event[] }[] = []
  for (const ev of list) {
    const label = monthLabel(ev.date)
    const group = groups.find((g) => g.label === label)
    if (group) group.events.push(ev)
    else groups.push({ label, events: [ev] })
  }
  return groups
}

/** Events — a timeline of talks, tours, and meetups interns can attend. */
export default function Events() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [sort, setSort] = useState('soonest')
  const [isLoading, setIsLoading] = useState(true)

  // Briefly simulate loading so the skeleton state is part of the experience.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 350)
    return () => clearTimeout(timer)
  }, [])

  const primaryGroups: FilterGroup[] = useMemo(
    () => [
      { key: 'categories', label: 'Category', options: getEventCategoryOptions() },
      { key: 'time', label: 'When', options: TIME_OPTIONS },
    ],
    [],
  )
  const moreGroups: FilterGroup[] = useMemo(
    () => [{ key: 'locations', label: 'Location', options: getEventLocationOptions() }],
    [],
  )

  const filtered = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    const time = new Set(selected.time ?? [])
    let list = filterEvents(events, {
      query,
      categories: selected.categories,
      locations: selected.locations,
    })
    if (time.has('upcoming') && !time.has('past')) list = list.filter((e) => e.date >= today)
    else if (time.has('past') && !time.has('upcoming')) list = list.filter((e) => e.date < today)

    return [...list].sort((a, b) =>
      sort === 'latest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    )
  }, [query, selected, sort])

  const groups = useMemo(() => groupByMonth(filtered), [filtered])
  const activeCount = Object.values(selected).reduce((sum, values) => sum + values.length, 0)
  const clearAll = () => {
    setQuery('')
    setSelected({})
  }

  return (
    <PageContainer>
      <PageHeader
        title="Events"
        description="Talks, tours, workshops, and meetups — find what to attend next."
        icon={Calendar}
        accent="gold"
        actions={<SortSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />}
      />

      <FilterPanel
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search events by name, host, or topic…"
        primaryGroups={primaryGroups}
        moreGroups={moreGroups}
        selected={selected}
        onChange={(key, values) => setSelected((s) => ({ ...s, [key]: values }))}
        onClear={clearAll}
        activeCount={activeCount}
        resultCount={filtered.length}
        totalCount={events.length}
        itemLabel="events"
      />

      {isLoading ? (
        <SkeletonCardGrid count={4} />
      ) : groups.length === 0 ? (
        <EmptyState
          icon={CalendarX2}
          title="No events match your filters"
          description="Try a different search or clear your filters."
          action={
            <button
              type="button"
              onClick={clearAll}
              className="rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.label} className="space-y-4">
              <h2 className="text-lg font-semibold text-heading">{group.label}</h2>
              <ContentGrid cols={2} animate>
                {group.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </ContentGrid>
            </section>
          ))}
        </div>
      )}

      <DemoDisclaimer text="Demo event data is fictional and not an official CDOT record." />
    </PageContainer>
  )
}
