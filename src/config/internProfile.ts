/**
 * Fictional intern profile that powers the Dashboard's personalized content.
 *
 * This is demo data for the prototype — there is no auth or real user. It
 * gives the Dashboard a believable "home" for a new CDOT intern.
 */
export interface ProgressMetric {
  completed: number
  goal: number
}

export interface InternProfile {
  name: string
  role: string
  /** The intern's own employee record id (their public profile). */
  selfId: string
  /** Slug of the intern's current division. */
  currentDivision: string
  /** Employee id of the assigned mentor. */
  mentorId: string
  /** Program length and current week, for the progress framing. */
  programWeeks: number
  weekNumber: number
  /** Interests used by the recommendation engine. */
  interests: string[]
  /** A short, actionable nudge for today. */
  todaysFocus: string
  progress: {
    coffeeChats: ProgressMetric
    divisionsExplored: ProgressMetric
    eventsAttended: ProgressMetric
    /** Goal only — actual saved count comes from live bookmarks. */
    savedResourcesGoal: number
  }
}

export const INTERN_PROFILE: InternProfile = {
  name: 'Sonia',
  role: 'Summer Engineering Intern',
  selfId: 'emp-41',
  currentDivision: 'bridge-asset-management',
  mentorId: 'emp-30',
  programWeeks: 12,
  weekNumber: 4,
  interests: [
    'Data Analysis',
    'GIS',
    'Research',
    'Water',
    'Sustainability',
    'Transportation Planning',
  ],
  todaysFocus: 'Reach out to someone in a division you haven’t explored yet.',
  progress: {
    coffeeChats: { completed: 3, goal: 8 },
    divisionsExplored: { completed: 4, goal: 10 },
    eventsAttended: { completed: 2, goal: 6 },
    savedResourcesGoal: 8,
  },
}

/** Clamp a 0–100 number. */
function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

const ratio = (m: ProgressMetric) => (m.goal > 0 ? m.completed / m.goal : 0)

/**
 * Overall onboarding progress as a percentage, averaging the tracked metrics.
 * `savedResources` is passed in from live bookmark state.
 */
export function getOverallProgress(savedResources: number): number {
  const { coffeeChats, divisionsExplored, eventsAttended, savedResourcesGoal } =
    INTERN_PROFILE.progress
  const saved = savedResourcesGoal > 0 ? savedResources / savedResourcesGoal : 0
  const avg =
    (ratio(coffeeChats) + ratio(divisionsExplored) + ratio(eventsAttended) + Math.min(saved, 1)) /
    4
  return clampPercent(avg * 100)
}
