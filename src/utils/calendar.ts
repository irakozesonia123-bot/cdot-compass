import type { Event } from '@/types'

/**
 * Generate and download an .ics calendar file for an event.
 *
 * Uses an all-day VEVENT (DATE value) so we don't need to parse the human
 * time range. Works entirely client-side — no backend required.
 */
export function downloadEventIcs(event: Event): void {
  const dateCompact = event.date.replace(/-/g, '') // YYYYMMDD
  const escape = (s: string) => s.replace(/[\\,;]/g, (m) => `\\${m}`).replace(/\n/g, '\\n')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CDOT Compass//Prototype//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@cdot-compass.demo`,
    `DTSTART;VALUE=DATE:${dateCompact}`,
    `SUMMARY:${escape(event.title)}`,
    `LOCATION:${escape(event.location)}`,
    `DESCRIPTION:${escape(`${event.description} (Time: ${event.time}. Hosted by ${event.host}.)`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${event.id}.ics`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
