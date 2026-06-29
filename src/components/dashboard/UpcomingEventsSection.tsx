import { ContentGrid } from '@/components/layout/ContentGrid'
import { EventCard } from '@/components/events/EventCard'
import { getEventsSorted, getUpcomingEvents } from '@/utils/data'

/** The next few upcoming events (falls back to soonest scheduled). */
export function UpcomingEventsSection() {
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = getUpcomingEvents(today)
  const events = (upcoming.length > 0 ? upcoming : getEventsSorted()).slice(0, 4)

  return (
    <ContentGrid cols={2} animate>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ContentGrid>
  )
}
