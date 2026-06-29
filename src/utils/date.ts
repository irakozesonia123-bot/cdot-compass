/**
 * Date formatting helpers for events.
 *
 * Dataset dates are ISO day strings (YYYY-MM-DD). We anchor parsing at midday
 * local time so the calendar day never shifts due to timezone offsets.
 */
function parseIsoDay(iso: string): Date {
  return new Date(`${iso}T12:00:00`)
}

export interface EventDateParts {
  /** Uppercase short month, e.g. "JUL" */
  month: string
  /** Day of month with no leading zero, e.g. "9" */
  day: string
  /** Short weekday, e.g. "Thu" */
  weekday: string
  /** Full readable date, e.g. "July 9, 2026" */
  full: string
}

export function formatEventDate(iso: string): EventDateParts {
  const date = parseIsoDay(iso)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: String(date.getDate()),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    full: date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  }
}
