/**
 * Lightweight runtime data validator (development only).
 *
 * The seed generator already validates integrity at build time; this mirrors
 * the key checks so a hand-edited JSON file can't silently break the app
 * during local development. Returns a list of human-readable problems.
 */
import {
  departments,
  employees,
  projects,
  spotlights,
} from '@/utils/data'

export function validateData(): string[] {
  const issues: string[] = []

  const deptSlugs = new Set(departments.map((d) => d.slug))
  const empIds = new Set(employees.map((e) => e.id))
  const projIds = new Set(projects.map((p) => p.id))

  for (const e of employees) {
    if (!deptSlugs.has(e.division)) {
      issues.push(`Employee ${e.id} has unknown division "${e.division}"`)
    }
    for (const pid of e.projects) {
      if (!projIds.has(pid)) {
        issues.push(`Employee ${e.id} references unknown project "${pid}"`)
      }
    }
  }

  for (const p of projects) {
    if (!deptSlugs.has(p.leadDivision)) {
      issues.push(`Project ${p.id} has unknown leadDivision "${p.leadDivision}"`)
    }
    for (const s of p.divisions) {
      if (!deptSlugs.has(s)) issues.push(`Project ${p.id} has unknown division "${s}"`)
    }
    for (const id of p.engineers) {
      if (!empIds.has(id)) issues.push(`Project ${p.id} has unknown engineer "${id}"`)
    }
  }

  for (const s of spotlights) {
    if (!empIds.has(s.employeeId)) {
      issues.push(`Spotlight ${s.id} references unknown employee "${s.employeeId}"`)
    }
  }

  return issues
}
