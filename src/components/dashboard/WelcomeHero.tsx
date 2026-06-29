import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Calendar, Coffee, Compass, Navigation, Sparkles } from 'lucide-react'
import { reveal } from '@/animations/variants'
import { HeroPattern } from '@/components/common/HeroPattern'
import { INTERN_PROFILE, getOverallProgress } from '@/config/internProfile'
import {
  getDepartmentBySlug,
  getEmployeeById,
  getEventsSorted,
  getUpcomingEvents,
} from '@/utils/data'
import { formatEventDate } from '@/utils/date'
import { useGreeting } from '@/hooks/useGreeting'
import { useBookmarks } from '@/hooks/useBookmarks'
import { useDemoAction } from '@/hooks/useDemoAction'

/**
 * Dashboard hero: greeting, today's focus, primary CTAs, and an at-a-glance
 * snapshot (progress, current division, mentor, next event).
 */
export function WelcomeHero() {
  const greeting = useGreeting()
  const { bookmarks } = useBookmarks()
  const { requestCoffeeChat } = useDemoAction()

  const division = getDepartmentBySlug(INTERN_PROFILE.currentDivision)
  const mentor = getEmployeeById(INTERN_PROFILE.mentorId)
  const today = new Date().toISOString().slice(0, 10)
  const nextEvent = getUpcomingEvents(today)[0] ?? getEventsSorted()[0]
  const overall = getOverallProgress(bookmarks.length)

  return (
    <motion.section
      variants={reveal}
      initial="hidden"
      animate="visible"
      className="grid gap-6 lg:grid-cols-3"
    >
      {/* Greeting / CTAs */}
      <div className="relative isolate overflow-hidden rounded-card bg-gradient-to-br from-primary to-cdot-navy p-8 text-white shadow-card sm:p-10 lg:col-span-2">
        <HeroPattern className="absolute inset-0 -z-10 text-white" />
        <p className="text-small font-medium text-white/80">
          {INTERN_PROFILE.role} · Week {INTERN_PROFILE.weekNumber} of {INTERN_PROFILE.programWeeks}
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          {greeting}, {INTERN_PROFILE.name} 👋
        </h1>
        <p className="mt-2 max-w-lg text-white/85">
          Helping you discover people, projects, and career paths across CDOT.
        </p>

        <div className="mt-5 inline-flex max-w-md items-start gap-2.5 rounded-card bg-white/10 px-4 py-3 backdrop-blur">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cdot-yellow" aria-hidden />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
              Today’s focus
            </p>
            <p className="text-small text-white/95">{INTERN_PROFILE.todaysFocus}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-button bg-white px-5 py-2.5 text-small font-semibold text-primary transition-colors hover:bg-white/90"
          >
            <Compass className="h-4 w-4" aria-hidden />
            Explore Divisions
          </Link>
          <Link
            to="/compass-guide"
            className="inline-flex items-center gap-2 rounded-button border border-white/40 px-5 py-2.5 text-small font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Navigation className="h-4 w-4" aria-hidden />
            Compass Guide
          </Link>
        </div>
      </div>

      {/* Snapshot */}
      <div className="flex flex-col gap-4 rounded-card border border-border bg-card p-6 shadow-card">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-small font-semibold text-heading">Internship progress</span>
            <span className="text-small font-semibold text-primary">{overall}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${overall}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            You’re {overall}% through your onboarding journey.
          </p>
        </div>

        <div className="h-px bg-border" />

        {division && (
          <SnapshotRow icon={Building2} label="Current division">
            <Link to={`/division/${division.slug}`} className="font-medium text-foreground hover:text-primary">
              {division.name}
            </Link>
          </SnapshotRow>
        )}

        {mentor && (
          <SnapshotRow icon={Coffee} label="Your mentor">
            <div className="flex items-center justify-between gap-2">
              <Link
                to={`/employee/${mentor.id}`}
                className="flex items-center gap-2 font-medium text-foreground hover:text-primary"
              >
                <img src={mentor.image} alt="" className="h-7 w-7 rounded-full object-cover ring-1 ring-border" />
                <span className="truncate">{mentor.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => requestCoffeeChat(mentor.name.split(' ')[0])}
                className="shrink-0 rounded-button border border-border px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-muted"
              >
                Coffee chat
              </button>
            </div>
          </SnapshotRow>
        )}

        {nextEvent && (
          <SnapshotRow icon={Calendar} label="Next event">
            <Link to="/events" className="font-medium text-foreground hover:text-primary">
              {nextEvent.title}
            </Link>
            <span className="text-xs text-muted-foreground">{formatEventDate(nextEvent.date).full}</span>
          </SnapshotRow>
        )}
      </div>
    </motion.section>
  )
}

function SnapshotRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Building2
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-button bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="mt-0.5 text-small">{children}</div>
      </div>
    </div>
  )
}
