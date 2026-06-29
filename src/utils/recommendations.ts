/**
 * Recommendation engine.
 *
 * A deterministic, interest-based scorer that ranks divisions against a set of
 * interests. It powers the Dashboard's "Recommended for you" today, and the
 * Compass Guide quiz will build on the same scoring approach later.
 */
import type { Department, Employee, Project } from '@/types'
import {
  departments,
  getDepartmentBySlug,
  getEmployeesByDepartment,
  getProjectsByDepartment,
} from '@/utils/data'

export interface DepartmentRecommendation {
  department: Department
  /** Compatibility score, 0–100. */
  score: number
  /** Human-readable explanation referencing matched interests. */
  reason: string
}

/** Build the searchable text for a department once per call. */
function departmentHaystack(d: Department): string {
  return [d.name, d.mission, d.description, ...d.tags, ...d.skills, ...d.careerPaths]
    .join(' ')
    .toLowerCase()
}

interface RecommendOptions {
  /** Exclude this division slug (e.g. the intern's current division). */
  excludeSlug?: string
  limit?: number
}

/**
 * Rank divisions by how well they match the given interests.
 * Score blends a baseline with the number of matched interests so even a
 * single overlap reads as a meaningful, but not perfect, fit.
 */
export function getRecommendedDepartments(
  interests: string[],
  options: RecommendOptions = {},
): DepartmentRecommendation[] {
  const { excludeSlug, limit = 4 } = options
  const normalizedInterests = interests.map((i) => i.toLowerCase())

  const scored = departments
    .filter((d) => d.slug !== excludeSlug)
    .map((d) => {
      const haystack = departmentHaystack(d)
      const matched = interests.filter((_, idx) => haystack.includes(normalizedInterests[idx]))
      const score = Math.max(52, Math.min(97, 58 + matched.length * 11))
      const reason =
        matched.length > 0
          ? `Strong match for your interest in ${formatList(matched.slice(0, 2))}.`
          : 'A great place to broaden your experience across CDOT.'
      return { department: d, score, reason, matchCount: matched.length }
    })

  scored.sort(
    (a, b) =>
      b.matchCount - a.matchCount ||
      b.score - a.score ||
      a.department.name.localeCompare(b.department.name),
  )

  return scored.slice(0, limit).map(({ department, score, reason }) => ({
    department,
    score,
    reason,
  }))
}

/** "A", "A and B", or "A, B" (already capped to two items by the caller). */
function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items[0]} and ${items[1]}`
}

export interface PersonRecommendation {
  employee: Employee
  reason: string
}

export interface ProjectRecommendation {
  project: Project
  reason: string
}

/** The slugs of the divisions an interest set points to. */
function topDivisionSlugs(interests: string[], limit = 3): string[] {
  return getRecommendedDepartments(interests, { limit }).map((r) => r.department.slug)
}

/** People to meet, drawn from the divisions that best match the interests. */
export function recommendPeople(interests: string[], limit = 3): PersonRecommendation[] {
  const slugs = topDivisionSlugs(interests)
  const pool = slugs.flatMap((slug) => getEmployeesByDepartment(slug))
  return [...pool]
    .sort(
      (a, b) =>
        Number(b.mentor) - Number(a.mentor) ||
        Number(b.coffeeChat) - Number(a.coffeeChat) ||
        a.name.localeCompare(b.name),
    )
    .slice(0, limit)
    .map((employee) => {
      const dn = getDepartmentBySlug(employee.division)?.shortName ?? employee.division
      const tag = employee.mentor
        ? 'open to mentoring'
        : employee.coffeeChat
          ? 'open to coffee chats'
          : 'a great person to meet'
      return { employee, reason: `${employee.title} in ${dn} — ${tag}.` }
    })
}

/** Projects to explore, drawn from the best-matching divisions. */
export function recommendProjects(interests: string[], limit = 3): ProjectRecommendation[] {
  const slugs = topDivisionSlugs(interests)
  const seen = new Set<string>()
  const out: ProjectRecommendation[] = []
  for (const slug of slugs) {
    for (const project of getProjectsByDepartment(slug)) {
      if (seen.has(project.id)) continue
      seen.add(project.id)
      const ln = getDepartmentBySlug(project.leadDivision)?.shortName ?? project.leadDivision
      out.push({ project, reason: `A ${project.phase.toLowerCase()} project led by ${ln}.` })
      if (out.length >= limit) return out
    }
  }
  return out
}
