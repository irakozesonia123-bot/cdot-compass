/**
 * Compass Guide — onboarding quiz + recommendation engine.
 *
 * A deterministic, explainable recommender. Each quiz option maps to the
 * divisions it favors; selected options tally division weights, and the top
 * divisions drive recommendations for people, projects, resources, events,
 * and spotlights — each with a plain-language reason. No AI (that's previewed
 * separately as a future direction).
 */
import type { Department, Employee, Project, Resource, Event, Spotlight } from '@/types'
import {
  departments,
  resources,
  spotlights,
  getEmployeesByDepartment,
  getProjectsByDepartment,
  getDepartmentBySlug,
  getUpcomingEvents,
  getEventsSorted,
  getEmployeeForSpotlight,
} from '@/utils/data'

export interface QuizOption {
  value: string
  label: string
  /** Division slugs this answer favors. */
  divisions: string[]
}

export interface QuizQuestion {
  id: string
  prompt: string
  helper: string
  multi: boolean
  options: QuizOption[]
}

export type QuizAnswers = Record<string, string[]>

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'interests',
    prompt: 'Which engineering areas interest you most?',
    helper: 'Pick as many as apply — this is the biggest signal for your matches.',
    multi: true,
    options: [
      { value: 'structures', label: 'Structures & bridges', divisions: ['bridge-asset-management'] },
      { value: 'water', label: 'Water & hydraulics', divisions: ['hydraulics'] },
      { value: 'roads', label: 'Roads & construction', divisions: ['construction', 'materials'] },
      { value: 'traffic', label: 'Traffic & safety', divisions: ['traffic-safety'] },
      { value: 'planning', label: 'Transportation planning', divisions: ['planning'] },
      { value: 'environment', label: 'Environment & wildlife', divisions: ['environmental'] },
      { value: 'geotech', label: 'Geotech & materials', divisions: ['materials'] },
      { value: 'data', label: 'Data & research', divisions: ['applied-research'] },
      { value: 'aviation', label: 'Aviation & airports', divisions: ['aviation'] },
    ],
  },
  {
    id: 'workstyle',
    prompt: 'Where do you do your best work?',
    helper: 'Most roles blend these — choose what energizes you.',
    multi: true,
    options: [
      { value: 'field', label: 'Out in the field', divisions: ['construction', 'maintenance', 'bridge-asset-management', 'materials'] },
      { value: 'office', label: 'In the office', divisions: ['planning', 'applied-research', 'traffic-safety'] },
      { value: 'hybrid', label: 'A mix of both', divisions: ['hydraulics', 'environmental', 'aviation'] },
      { value: 'lab', label: 'In the lab', divisions: ['materials', 'applied-research'] },
    ],
  },
  {
    id: 'excites',
    prompt: 'What excites you most about the work?',
    helper: 'What would make a day feel worthwhile?',
    multi: true,
    options: [
      { value: 'technical', label: 'Solving hard technical problems', divisions: ['bridge-asset-management', 'hydraulics', 'materials'] },
      { value: 'outdoors', label: 'Working outdoors', divisions: ['construction', 'maintenance', 'bridge-asset-management'] },
      { value: 'impact', label: 'Public service & impact', divisions: ['planning', 'traffic-safety', 'aviation'] },
      { value: 'analysis', label: 'Data & analysis', divisions: ['applied-research', 'traffic-safety', 'planning'] },
      { value: 'building', label: 'Building things that last', divisions: ['construction', 'materials'] },
      { value: 'nature', label: 'Protecting the environment', divisions: ['environmental', 'hydraulics'] },
      { value: 'innovation', label: 'New technology & innovation', divisions: ['applied-research', 'traffic-safety'] },
    ],
  },
  {
    id: 'skills',
    prompt: 'Which skills would you like to build this summer?',
    helper: 'Your matches will favor divisions where you can grow these.',
    multi: true,
    options: [
      { value: 'gis', label: 'GIS & mapping', divisions: ['planning', 'environmental', 'hydraulics', 'aviation'] },
      { value: 'modeling', label: 'Modeling & simulation', divisions: ['hydraulics', 'traffic-safety', 'applied-research'] },
      { value: 'cad', label: 'CAD & design', divisions: ['bridge-asset-management', 'aviation', 'construction'] },
      { value: 'coding', label: 'Data analysis & coding', divisions: ['applied-research', 'planning', 'traffic-safety'] },
      { value: 'cm', label: 'Construction management', divisions: ['construction'] },
      { value: 'inspection', label: 'Field inspection', divisions: ['bridge-asset-management', 'materials', 'construction'] },
      { value: 'research', label: 'Research methods', divisions: ['applied-research'] },
      { value: 'geotest', label: 'Geotechnical testing', divisions: ['materials'] },
    ],
  },
  {
    id: 'goal',
    prompt: 'What career direction appeals to you most?',
    helper: 'Pick the one that fits best for now — it can change.',
    multi: false,
    options: [
      { value: 'expert', label: 'Become a technical expert (PE track)', divisions: ['bridge-asset-management', 'hydraulics', 'materials'] },
      { value: 'lead', label: 'Move into leadership & management', divisions: ['construction', 'planning', 'aviation'] },
      { value: 'specialize', label: 'Specialize deeply in one area', divisions: ['materials', 'environmental', 'applied-research'] },
      { value: 'explore', label: 'Explore broadly before deciding', divisions: ['planning', 'applied-research', 'traffic-safety'] },
      { value: 'public', label: 'Work on high-impact public projects', divisions: ['construction', 'traffic-safety', 'planning'] },
    ],
  },
  {
    id: 'internGoals',
    prompt: 'What do you most want from your internship?',
    helper: 'These shape which people and resources we suggest.',
    multi: true,
    options: [
      { value: 'skills', label: 'Build technical skills', divisions: ['bridge-asset-management', 'hydraulics', 'materials'] },
      { value: 'mentors', label: 'Meet mentors', divisions: [] },
      { value: 'explore', label: 'Explore different divisions', divisions: [] },
      { value: 'fieldexp', label: 'Get field experience', divisions: ['construction', 'maintenance', 'materials'] },
      { value: 'realproject', label: 'Contribute to a real project', divisions: ['construction', 'bridge-asset-management'] },
      { value: 'direction', label: 'Clarify my career direction', divisions: [] },
    ],
  },
  {
    id: 'projectTypes',
    prompt: 'Which kinds of projects would you want to work on?',
    helper: 'We’ll surface real projects that match.',
    multi: true,
    options: [
      { value: 'bridges', label: 'Bridges & structures', divisions: ['bridge-asset-management'] },
      { value: 'highways', label: 'Highways & interstates', divisions: ['construction', 'traffic-safety'] },
      { value: 'water', label: 'Water & drainage', divisions: ['hydraulics', 'environmental'] },
      { value: 'safety', label: 'Safety & traffic', divisions: ['traffic-safety'] },
      { value: 'wildlife', label: 'Environmental & wildlife', divisions: ['environmental'] },
      { value: 'aviation', label: 'Aviation & airports', divisions: ['aviation'] },
      { value: 'research', label: 'Research & innovation', divisions: ['applied-research'] },
      { value: 'multimodal', label: 'Planning & multimodal', divisions: ['planning'] },
    ],
  },
]

export interface DivisionRecommendation {
  department: Department
  score: number
  reason: string
}

export interface Recommendation<T> {
  item: T
  reason: string
}

export interface CompassRecommendations {
  divisions: DivisionRecommendation[]
  people: Recommendation<Employee>[]
  projects: Recommendation<Project>[]
  resources: Recommendation<Resource>[]
  events: Recommendation<Event>[]
  spotlights: Recommendation<Spotlight>[]
  /** Distinct selected interest labels, for an "based on your interests" recap. */
  interests: string[]
  /** True when the intern said they want to meet mentors. */
  wantsMentors: boolean
}

function suggestResources(interestText: string): Recommendation<Resource>[] {
  const words = interestText.toLowerCase()
  const KEYS = ['data', 'design', 'research', 'field', 'leadership', 'plan', 'water', 'bridge', 'safety', 'environment']
  const scored = resources
    .map((r) => {
      const hay = `${r.title} ${r.category} ${r.description}`.toLowerCase()
      let score = ['Career Planning', 'Professional Development', 'Training'].includes(r.category) ? 1 : 0
      for (const w of KEYS) if (words.includes(w) && hay.includes(w)) score += 2
      return { r, score }
    })
    .sort((a, b) => b.score - a.score || a.r.title.localeCompare(b.r.title))
  return scored.slice(0, 3).map(({ r }) => ({
    item: r,
    reason: 'Builds skills and connections that support your goals.',
  }))
}

export function computeRecommendations(
  answers: QuizAnswers,
  todayIso: string,
): CompassRecommendations {
  const tally = new Map<string, number>()
  const contributors = new Map<string, Set<string>>()
  const interests: string[] = []
  let wantsMentors = false

  for (const question of QUIZ_QUESTIONS) {
    const selected = answers[question.id] ?? []
    for (const option of question.options) {
      if (!selected.includes(option.value)) continue
      interests.push(option.label)
      if (option.value === 'mentors') wantsMentors = true
      for (const slug of option.divisions) {
        tally.set(slug, (tally.get(slug) ?? 0) + 1)
        if (!contributors.has(slug)) contributors.set(slug, new Set())
        contributors.get(slug)!.add(option.label)
      }
    }
  }

  const ranked = departments
    .map((d) => ({ d, t: tally.get(d.slug) ?? 0 }))
    .sort((a, b) => b.t - a.t || a.d.name.localeCompare(b.d.name))
  const top = ranked.slice(0, 3)
  const topSlugs = top.map((x) => x.d.slug)

  const divisions: DivisionRecommendation[] = top.map(({ d, t }) => {
    const contribs = [...(contributors.get(d.slug) ?? [])]
    const score = Math.max(55, Math.min(97, 58 + t * 8))
    const reason = contribs.length
      ? `Matches your interest in ${contribs.slice(0, 2).join(' and ').toLowerCase()}.`
      : 'A strong, well-rounded division to start exploring.'
    return { department: d, score, reason }
  })

  // People — prefer mentors / coffee-chat-ready folks from the top divisions.
  const peoplePool = topSlugs.flatMap((slug) => getEmployeesByDepartment(slug))
  const people: Recommendation<Employee>[] = [...peoplePool]
    .sort(
      (a, b) =>
        Number(b.mentor) - Number(a.mentor) ||
        Number(b.coffeeChat) - Number(a.coffeeChat) ||
        a.name.localeCompare(b.name),
    )
    .slice(0, 3)
    .map((e) => {
      const dn = getDepartmentBySlug(e.division)?.shortName ?? e.division
      const tag = e.mentor ? 'open to mentoring' : e.coffeeChat ? 'open to coffee chats' : 'a great person to meet'
      return { item: e, reason: `A ${e.title.toLowerCase()} in ${dn} — ${tag}.` }
    })

  // Projects — first few unique across the top divisions.
  const seen = new Set<string>()
  const projects: Recommendation<Project>[] = []
  for (const slug of topSlugs) {
    for (const p of getProjectsByDepartment(slug)) {
      if (seen.has(p.id)) continue
      seen.add(p.id)
      const ln = getDepartmentBySlug(p.leadDivision)?.shortName ?? p.leadDivision
      projects.push({ item: p, reason: `A ${p.phase.toLowerCase()} project led by ${ln}.` })
      if (projects.length >= 3) break
    }
    if (projects.length >= 3) break
  }

  const upcoming = getUpcomingEvents(todayIso)
  const events: Recommendation<Event>[] = (upcoming.length ? upcoming : getEventsSorted())
    .slice(0, 3)
    .map((ev) => ({ item: ev, reason: 'Coming up — a great chance to meet people and learn.' }))

  const spot =
    spotlights.find((s) => {
      const e = getEmployeeForSpotlight(s)
      return e && topSlugs.includes(e.division)
    }) ?? spotlights[0]
  const spotRecs: Recommendation<Spotlight>[] = spot
    ? [
        {
          item: spot,
          reason: (() => {
            const e = getEmployeeForSpotlight(spot)
            const dn = e ? getDepartmentBySlug(e.division)?.shortName : ''
            return `A career story${dn ? ` from ${dn}` : ''} you might relate to.`
          })(),
        },
      ]
    : []

  return {
    divisions,
    people,
    projects,
    resources: suggestResources(interests.join(' ')),
    events,
    spotlights: spotRecs,
    interests: [...new Set(interests)],
    wantsMentors,
  }
}

/** Career paths interns can browse (each maps to a division). */
export interface CareerPath {
  label: string
  slug: string
}

export const CAREER_PATHS: CareerPath[] = [
  { label: 'Bridge Engineering', slug: 'bridge-asset-management' },
  { label: 'Hydraulics', slug: 'hydraulics' },
  { label: 'Aviation', slug: 'aviation' },
  { label: 'Traffic & ITS', slug: 'traffic-safety' },
  { label: 'Planning', slug: 'planning' },
  { label: 'Environmental', slug: 'environmental' },
  { label: 'Construction', slug: 'construction' },
  { label: 'Materials', slug: 'materials' },
  { label: 'Applied Research', slug: 'applied-research' },
]

/** Two resources suggested for a given division/path (keyword-relevant). */
export function getSuggestedResourcesForPath(department: Department, limit = 2): Resource[] {
  const hay = [...department.skills, ...department.tags].join(' ').toLowerCase()
  const scored = resources
    .map((r) => {
      const text = `${r.title} ${r.description}`.toLowerCase()
      let score = ['Career Planning', 'Professional Development', 'Training'].includes(r.category) ? 1 : 0
      for (const word of hay.split(/\s+/)) {
        if (word.length > 4 && text.includes(word)) score += 2
      }
      return { r, score }
    })
    .sort((a, b) => b.score - a.score || a.r.title.localeCompare(b.r.title))
  return scored.slice(0, limit).map(({ r }) => r)
}
