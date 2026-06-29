/**
 * Typed data access layer.
 *
 * This is the ONLY module that imports the raw JSON datasets. Everything else
 * in the app consumes the strongly-typed arrays and query helpers exported
 * here, so components never touch JSON directly.
 */
import type {
  Department,
  Employee,
  Project,
  Resource,
  Event,
  Spotlight,
} from '@/types'

import departmentsJson from '@/data/departments.json'
import employeesJson from '@/data/employees.json'
import projectsJson from '@/data/projects.json'
import resourcesJson from '@/data/resources.json'
import eventsJson from '@/data/events.json'
import spotlightsJson from '@/data/spotlights.json'

// All imagery (division/project photos and employee avatars) is bundled under
// src/assets/images. Vite hashes the files at build time; we resolve the stored
// filename to its final URL. Any string that isn't a known filename (e.g. a
// remote URL) passes through unchanged.
const imageModules = {
  ...import.meta.glob('../assets/images/photos/*.jpg', { eager: true, query: '?url', import: 'default' }),
  ...import.meta.glob('../assets/images/avatars/*.jpg', { eager: true, query: '?url', import: 'default' }),
  ...import.meta.glob('../assets/images/avatars/*.svg', { eager: true, query: '?url', import: 'default' }),
} as Record<string, string>

const photoMap: Record<string, string> = {}
for (const [path, url] of Object.entries(imageModules)) {
  const file = path.split('/').pop()
  if (file) photoMap[file] = url
}

function resolveImage(key: string): string {
  return photoMap[key] ?? key
}

// JSON imports widen string-literal unions to `string`; cast through `unknown`
// once here so the rest of the app gets fully-typed records.
export const departments = (departmentsJson as unknown as Department[]).map((d) => ({
  ...d,
  image: resolveImage(d.image),
}))
export const employees = (employeesJson as unknown as Employee[]).map((e) => ({
  ...e,
  image: resolveImage(e.image),
}))
export const projects = (projectsJson as unknown as Project[]).map((p) => ({
  ...p,
  image: resolveImage(p.image),
}))
export const resources = resourcesJson as unknown as Resource[]
export const events = eventsJson as unknown as Event[]
export const spotlights = spotlightsJson as unknown as Spotlight[]

/* ----------------------------- Lookups ----------------------------- */

export function getDepartmentBySlug(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug)
}

export function getDepartmentById(id: string): Department | undefined {
  return departments.find((d) => d.id === id)
}

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find((e) => e.id === id)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

/** Find a project by exact title (used to link an employee's favorite project). */
export function getProjectByTitle(title: string): Project | undefined {
  return projects.find((p) => p.title === title)
}

export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id)
}

export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id)
}

export function getSpotlightById(id: string): Spotlight | undefined {
  return spotlights.find((s) => s.id === id)
}

/* --------------------------- Relationships ------------------------- */

/** Employees whose home division is the given department slug. */
export function getEmployeesByDepartment(slug: string): Employee[] {
  return employees.filter((e) => e.division === slug)
}

/** Projects that the given department participates in. */
export function getProjectsByDepartment(slug: string): Project[] {
  return projects.filter((p) => p.divisions.includes(slug))
}

/** Projects an employee is on the engineering roster for. */
export function getProjectsByEmployee(employeeId: string): Project[] {
  return projects.filter((p) => p.engineers.includes(employeeId))
}

/** Resolve an employee's home division. */
export function getDepartmentForEmployee(employee: Employee): Department | undefined {
  return getDepartmentBySlug(employee.division)
}

/**
 * Suggest related people for an employee profile: prioritizes shared skills,
 * then same-division colleagues, with a small boost for available mentors.
 */
export function getRelatedEmployees(employee: Employee, limit = 3): Employee[] {
  return employees
    .filter((e) => e.id !== employee.id)
    .map((e) => {
      const sharedSkills = e.skills.filter((s) => employee.skills.includes(s)).length
      const sameDivision = e.division === employee.division ? 1 : 0
      const mentorBonus = e.mentor ? 1 : 0
      return { e, score: sharedSkills * 3 + sameDivision * 2 + mentorBonus }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.e.name.localeCompare(b.e.name))
    .slice(0, limit)
    .map((x) => x.e)
}

/** The engineers staffed on a project. */
export function getEngineersForProject(project: Project): Employee[] {
  return project.engineers
    .map((id) => getEmployeeById(id))
    .filter((e): e is Employee => Boolean(e))
}

/**
 * People connected to a project but not on its engineer roster — drawn from
 * its participating and related divisions. Useful as "others you could talk to."
 */
export function getRelatedEmployeesForProject(project: Project, limit = 3): Employee[] {
  const slugs = new Set([...project.divisions, ...project.relatedDepartments])
  const roster = new Set(project.engineers)
  return employees
    .filter((e) => slugs.has(e.division) && !roster.has(e.id))
    .sort((a, b) => Number(b.mentor) - Number(a.mentor) || a.name.localeCompare(b.name))
    .slice(0, limit)
}

/** All departments participating in a project (lead listed first). */
export function getDepartmentsForProject(project: Project): Department[] {
  return project.divisions
    .map((slug) => getDepartmentBySlug(slug))
    .filter((d): d is Department => Boolean(d))
    .sort((a, b) =>
      a.slug === project.leadDivision ? -1 : b.slug === project.leadDivision ? 1 : 0,
    )
}

/** Resolve a list of department slugs to department records. */
export function getRelatedDepartments(slugs: string[]): Department[] {
  return slugs
    .map((slug) => getDepartmentBySlug(slug))
    .filter((d): d is Department => Boolean(d))
}

/** The employee featured by a spotlight. */
export function getEmployeeForSpotlight(spotlight: Spotlight): Employee | undefined {
  return getEmployeeById(spotlight.employeeId)
}

/* ----------------------------- Events ------------------------------ */

/** Events sorted chronologically (earliest first). */
export function getEventsSorted(): Event[] {
  return [...events].sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * Upcoming events on or after the given ISO date, soonest first.
 * @param fromIso ISO date string (YYYY-MM-DD) to compare against.
 */
export function getUpcomingEvents(fromIso: string): Event[] {
  return getEventsSorted().filter((e) => e.date >= fromIso)
}

/* ---------------------------- Projects ----------------------------- */

/** Most recently started projects first (a stand-in for "recently updated"). */
export function getRecentProjects(limit = 4): Project[] {
  return [...projects]
    .sort((a, b) => b.startYear - a.startYear || a.id.localeCompare(b.id))
    .slice(0, limit)
}

/* ----------------------------- Stats ------------------------------- */

/** Headline counts used by the dashboard and elsewhere. */
export function getStats() {
  return {
    departments: departments.length,
    employees: employees.length,
    projects: projects.length,
    resources: resources.length,
    events: events.length,
    spotlights: spotlights.length,
  }
}

// In development, validate referential integrity once at startup.
if (import.meta.env.DEV) {
  // Lazy import to keep the validator out of production bundles.
  void import('@/utils/validate').then(({ validateData }) => {
    const problems = validateData()
    if (problems.length > 0) {
      console.warn(
        `[CDOT Compass] Data validation found ${problems.length} issue(s):`,
        problems,
      )
    }
  })
}
