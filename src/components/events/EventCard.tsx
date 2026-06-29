import { motion } from 'framer-motion'
import { Clock, MapPin, Bookmark, CalendarPlus } from 'lucide-react'
import type { Event } from '@/types'
import { cardClass } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { hoverLift } from '@/animations/variants'
import { formatEventDate } from '@/utils/date'
import { downloadEventIcs } from '@/utils/calendar'
import { useDemoAction } from '@/hooks/useDemoAction'
import { useToast } from '@/contexts/ToastContext'
import { useBookmarks } from '@/hooks/useBookmarks'
import { cn } from '@/lib/utils'

interface EventCardProps {
  event: Event
  className?: string
}

/**
 * Event card with a calendar date block, details, and demo actions
 * (register + bookmark). Used on the Events timeline and the dashboard.
 */
export function EventCard({ event, className }: EventCardProps) {
  const { register } = useDemoAction()
  const { toast } = useToast()
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const date = formatEventDate(event.date)
  const bookmarked = isBookmarked(event.id)

  const addToCalendar = () => {
    downloadEventIcs(event)
    toast({
      variant: 'info',
      title: 'Added to calendar',
      description: 'An .ics file was downloaded for this event.',
    })
  }

  return (
    <motion.article
      whileHover={hoverLift}
      className={cn(cardClass, 'flex gap-4 p-5', className)}
    >
      {/* Date block */}
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-card bg-primary/10 text-primary">
        <span className="text-[11px] font-bold uppercase tracking-wide">{date.month}</span>
        <span className="text-2xl font-bold leading-none">{date.day}</span>
      </div>

      <div className="min-w-0 flex-1">
        <Badge tone="primary" className="mb-1.5">
          {event.category}
        </Badge>
        <h3 className="text-base font-semibold text-heading">{event.title}</h3>

        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-small text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {event.location}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-small text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => register(event.title)}
            className="inline-flex items-center justify-center rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => toggleBookmark(event.id, event.title)}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark event'}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-button border px-3 py-2 text-small font-semibold transition-colors',
              bookmarked
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-foreground hover:bg-muted',
            )}
          >
            <Bookmark
              className={cn('h-4 w-4', bookmarked && 'fill-current')}
              aria-hidden
            />
            {bookmarked ? 'Saved' : 'Save'}
          </button>
          <button
            type="button"
            onClick={addToCalendar}
            aria-label="Add to calendar"
            title="Add to calendar"
            className="inline-flex items-center justify-center rounded-button border border-border bg-card p-2 text-foreground transition-colors hover:bg-muted"
          >
            <CalendarPlus className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
