/**
 * Reusable filtering utilities for every directory in the app.
 *
 * Each entity type gets a typed text matcher, a faceted `filterX` function
 * whose criteria are AND-combined, and facet helpers that produce the option
 * lists consumed by <FilterBar />. These are the typed primitives the feature
 * pages (People, Explore, Projects, Resources, Events) build on.
 */
import type { Department, Employee, Event, Project, Resource } from '@/types'
import {
  departments,
  employees,
  events,
  projects,
  resources,
  getDepartmentBySlug,
  getEmployeeById,
} from '@/utils/data'

/** Lowercase + trim for case-insensitive comparisons. */
export function normalize(value: string): string {
  return value.toLowerCase().trim()
}

/** A selectable option for <FilterBar /> (structurally a FilterOption). */
export interface FacetOption {
  value: string
  label: string
  count?: number
}

/* ============================ Employees ============================ */

export function employeeMatchesText(employee: Employee, query: string): boolean {
  const q = normalize(query)
  if (!q) return true
  return [employee.name, employee.title, employee.division, employee.location, ...employee.skills]
    .join(' ')
    .toLowerCase()
    .includes(q)
}

/** Faceted criteria for the People directory. Omitted fields are ignored. */
export interface EmployeeFilter {
  query?: string
  divisions?: string[]
  locations?: string[]
  skills?: string[]
  mentor?: boolean
  coffeeChat?: boolean
  jobShadow?: boolean
  careerAdvice?: boolean
  leadership?: boolean
  fieldWork?: boolean
  remote?: boolean
  minYears?: number
  maxYears?: number
}

export function filterEmployees(list: Employee[], filter: EmployeeFilter): Employee[] {
  return list.filter((e) => {
    if (!employeeMatchesText(e, filter.query ?? '')) return false
    if (filter.divisions?.length && !filter.divisions.includes(e.division)) return false
    if (filter.locations?.length && !filter.locations.includes(e.location)) return false
    if (filter.skills?.length && !filter.skills.every((s) => e.skills.includes(s))) return false
    if (filter.mentor && !e.mentor) return false
    if (filter.coffeeChat && !e.coffeeChat) return false
    if (filter.jobShadow && !e.jobShadow) return false
    if (filter.careerAdvice && !e.careerAdvice) return false
    if (filter.leadership && !e.leadership) return false
    if (filter.fieldWork && !e.fieldWork) return false
    if (filter.remote && !e.remote) return false
    if (filter.minYears != null && e.yearsExperience < filter.minYears) return false
    if (filter.maxYears != null && e.yearsExperience > filter.maxYears) return false
    return true
  })
}

/* ============================ Projects ============================= */

export function projectMatchesText(project: Project, query: string): boolean {
  const q = normalize(query)
  if (!q) return true
  const divisionNames = project.divisions.map(
    (slug) => getDepartmentBySlug(slug)?.name ?? slug,
  )
  const engineerNames = project.engineers.map((id) => getEmployeeById(id)?.name ?? '')
  return [
    project.title,
    project.summary,
    project.location,
    project.phase,
    project.status,
    ...project.tags,
    ...project.software,
    ...divisionNames,
    ...engineerNames,
  ]
    .join(' ')
    .toLowerCase()
    .includes(q)
}

export interface ProjectFilter {
  query?: string
  divisions?: string[]
  phases?: string[]
  statuses?: string[]
  tags?: string[]
  software?: string[]
}

export function filterProjects(list: Project[], filter: ProjectFilter): Project[] {
  return list.filter((p) => {
    if (!projectMatchesText(p, filter.query ?? '')) return false
    if (filter.divisions?.length && !filter.divisions.some((d) => p.divisions.includes(d))) {
      return false
    }
    if (filter.phases?.length && !filter.phases.includes(p.phase)) return false
    if (filter.statuses?.length && !filter.statuses.includes(p.status)) return false
    if (filter.tags?.length && !filter.tags.some((t) => p.tags.includes(t))) return false
    if (filter.software?.length && !filter.software.some((s) => p.software.includes(s))) {
      return false
    }
    return true
  })
}

/* =========================== Departments ========================== */

export function departmentMatchesText(department: Department, query: string): boolean {
  const q = normalize(query)
  if (!q) return true
  return [department.name, department.shortName, department.mission, department.description, ...department.tags, ...department.skills]
    .join(' ')
    .toLowerCase()
    .includes(q)
}

export interface DepartmentFilter {
  query?: string
  tags?: string[]
}

export function filterDepartments(list: Department[], filter: DepartmentFilter): Department[] {
  return list.filter((d) => {
    if (!departmentMatchesText(d, filter.query ?? '')) return false
    if (filter.tags?.length && !filter.tags.some((t) => d.tags.includes(t))) return false
    return true
  })
}

/* ============================ Resources =========================== */

export interface ResourceFilter {
  query?: string
  categories?: string[]
}

export function filterResources(list: Resource[], filter: ResourceFilter): Resource[] {
  const q = normalize(filter.query ?? '')
  return list.filter((r) => {
    if (q && !`${r.title} ${r.category} ${r.description}`.toLowerCase().includes(q)) {
      return false
    }
    if (filter.categories?.length && !filter.categories.includes(r.category)) return false
    return true
  })
}

/* ============================== Events ============================ */

export interface EventFilter {
  query?: string
  categories?: string[]
  locations?: string[]
}

export function filterEvents(list: Event[], filter: EventFilter): Event[] {
  const q = normalize(filter.query ?? '')
  return list.filter((ev) => {
    if (q && !`${ev.title} ${ev.category} ${ev.location} ${ev.host} ${ev.description}`.toLowerCase().includes(q)) {
      return false
    }
    if (filter.categories?.length && !filter.categories.includes(ev.category)) return false
    if (filter.locations?.length && !filter.locations.includes(ev.location)) return false
    return true
  })
}

export function getEventLocationOptions(): FacetOption[] {
  return [...new Set(events.map((e) => e.location))]
    .sort((a, b) => a.localeCompare(b))
    .map((v) => ({ value: v, label: v }))
}

/* ============================== Facets ============================ */

/** Unique, sorted list of all employee locations. */
export function getEmployeeLocations(): string[] {
  return [...new Set(employees.map((e) => e.location))].sort((a, b) => a.localeCompare(b))
}

/** Unique, sorted list of all skills across employees. */
export function getAllSkills(): string[] {
  return [...new Set(employees.flatMap((e) => e.skills))].sort((a, b) => a.localeCompare(b))
}

/** Division options (slug -> display name) for filter bars. */
export function getDivisionOptions(): FacetOption[] {
  return departments.map((d) => ({ value: d.slug, label: d.shortName }))
}

export function getSkillOptions(): FacetOption[] {
  return getAllSkills().map((s) => ({ value: s, label: s }))
}

export function getLocationOptions(): FacetOption[] {
  return getEmployeeLocations().map((l) => ({ value: l, label: l }))
}

export function getProjectPhaseOptions(): FacetOption[] {
  return [...new Set(projects.map((p) => p.phase))].sort().map((v) => ({ value: v, label: v }))
}

export function getProjectStatusOptions(): FacetOption[] {
  return [...new Set(projects.map((p) => p.status))].sort().map((v) => ({ value: v, label: v }))
}

export function getProjectTagOptions(): FacetOption[] {
  return [...new Set(projects.flatMap((p) => p.tags))]
    .sort((a, b) => a.localeCompare(b))
    .map((v) => ({ value: v, label: v }))
}

/** Most frequent project tags (for a concise "project type" filter). */
export function getTopProjectTagOptions(limit = 10): FacetOption[] {
  const counts = new Map<string, number>()
  for (const p of projects) {
    for (const tag of p.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, label: value, count }))
}

/** Unique software/tools across projects (≈15 — fine as a flat list). */
export function getProjectSoftwareOptions(): FacetOption[] {
  return [...new Set(projects.flatMap((p) => p.software))]
    .sort((a, b) => a.localeCompare(b))
    .map((v) => ({ value: v, label: v }))
}

export function getDepartmentTagOptions(): FacetOption[] {
  return [...new Set(departments.flatMap((d) => d.tags))]
    .sort((a, b) => a.localeCompare(b))
    .map((v) => ({ value: v, label: v }))
}

export function getResourceCategoryOptions(): FacetOption[] {
  return [...new Set(resources.map((r) => r.category))]
    .sort((a, b) => a.localeCompare(b))
    .map((v) => ({ value: v, label: v }))
}

export function getEventCategoryOptions(): FacetOption[] {
  return [...new Set(events.map((e) => e.category))]
    .sort((a, b) => a.localeCompare(b))
    .map((v) => ({ value: v, label: v }))
}

/** Availability toggles for the People directory (values match Employee flags). */
export const AVAILABILITY_OPTIONS: FacetOption[] = [
  { value: 'coffeeChat', label: 'Coffee chats' },
  { value: 'mentor', label: 'Mentoring' },
  { value: 'jobShadow', label: 'Job shadows' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'fieldWork', label: 'Field work' },
  { value: 'remote', label: 'Remote / Hybrid' },
]

/** Most frequent employee skills (keeps the skills filter concise). */
export function getTopSkillOptions(limit = 15): FacetOption[] {
  const counts = new Map<string, number>()
  for (const e of employees) {
    for (const skill of e.skills) counts.set(skill, (counts.get(skill) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, label: value, count }))
}

/** Experience buckets used by the People experience filter. */
export const EXPERIENCE_BUCKETS = [
  { value: 'entry', label: 'Entry (0–3 yrs)', min: 0, max: 3 },
  { value: 'mid', label: 'Mid (4–9 yrs)', min: 4, max: 9 },
  { value: 'senior', label: 'Senior (10+ yrs)', min: 10, max: Infinity },
] as const

export function getExperienceOptions(): FacetOption[] {
  return EXPERIENCE_BUCKETS.map((b) => ({ value: b.value, label: b.label }))
}

/** Whether a years-of-experience value falls in the named bucket. */
export function matchesExperienceBucket(years: number, bucketValue: string): boolean {
  const bucket = EXPERIENCE_BUCKETS.find((b) => b.value === bucketValue)
  if (!bucket) return true
  return years >= bucket.min && years <= bucket.max
}
