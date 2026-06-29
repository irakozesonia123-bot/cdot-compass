import type { LucideIcon } from 'lucide-react'
import { Sparkles } from 'lucide-react'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import { cn } from '@/lib/utils'

interface PagePlaceholderProps {
  /** Page title */
  title: string
  /** Short supporting line describing the page */
  description: string
  /** Lucide icon representing the page */
  icon: LucideIcon
  /** Intentional accent color for the page icon */
  accent: AccentKey
  /** Sprint in which this page is implemented (shown as a build note) */
  plannedFor: string
  /** 2–3 bullets previewing what the finished page will do */
  bullets: string[]
}

/**
 * Staged placeholder rendered by every route until its feature sprint lands.
 *
 * Each page previews its intent with a short "What this page will do" list and
 * carries its own accent color, so the prototype reads as intentionally
 * in-progress rather than empty. Replaced by real content as each page is built.
 */
export function PagePlaceholder({
  title,
  description,
  icon: Icon,
  accent,
  plannedFor,
  bullets,
}: PagePlaceholderProps) {
  const accentStyle = ACCENT_STYLES[accent]

  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-card border border-border bg-card p-8 shadow-card sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-card',
              accentStyle.soft,
              accentStyle.icon,
            )}
          >
            <Icon className="h-7 w-7" aria-hidden />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-button border border-border bg-muted/50 px-3 py-1 text-small font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Planned for {plannedFor}
          </span>
        </div>

        <h1 className="mt-6 text-section text-heading">{title}</h1>
        <p className="mt-2 text-body text-muted-foreground">{description}</p>

        <div className="mt-8 rounded-card border border-border bg-background/60 p-5">
          <h2 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
            What this page will do
          </h2>
          <ul className="mt-3 space-y-2.5">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-body text-foreground"
              >
                <span
                  className={cn(
                    'mt-2 h-1.5 w-1.5 shrink-0 rounded-full',
                    accentStyle.dot,
                  )}
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
