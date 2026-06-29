/**
 * Global search engine.
 *
 * Builds a lightweight in-memory index across departments, employees,
 * projects, resources, and events (covering names, titles, skills, tags,
 * software, and keywords). Returns ranked, route-aware results suitable for a
 * global search box with grouped output.
 */
import {
  departments,
  employees,
  projects,
  resources,
  events,
  getDepartmentBySlug,
} from '@/utils/data'
import { normalize } from '@/utils/filter'

export type SearchResultType =
  | 'department'
  | 'employee'
  | 'project'
  | 'resource'
  | 'event'

export interface SearchResult {
  type: SearchResultType
  id: string
  title: string
  subtitle: string
  /** Route to navigate to when the result is selected. */
  to: string
}

interface IndexEntry extends SearchResult {
  titleLower: string
  haystack: string
}

function divisionName(slug: string): string {
  return getDepartmentBySlug(slug)?.name ?? slug
}

/** Build the index once at module load. */
const INDEX: IndexEntry[] = [
  ...departments.map((d) => ({
    type: 'department' as const,
    id: d.id,
    title: d.name,
    subtitle: d.mission,
    to: `/division/${d.slug}`,
    titleLower: d.name.toLowerCase(),
    haystack: [d.name, d.shortName, d.mission, d.description, ...d.tags, ...d.skills, ...d.software]
      .join(' ')
      .toLowerCase(),
  })),
  ...employees.map((e) => ({
    type: 'employee' as const,
    id: e.id,
    title: e.name,
    subtitle: `${e.title} · ${divisionName(e.division)}`,
    to: `/employee/${e.id}`,
    titleLower: e.name.toLowerCase(),
    haystack: [e.name, e.title, divisionName(e.division), e.location, ...e.skills]
      .join(' ')
      .toLowerCase(),
  })),
  ...projects.map((p) => ({
    type: 'project' as const,
    id: p.id,
    title: p.title,
    subtitle: p.summary,
    to: `/project/${p.id}`,
    titleLower: p.title.toLowerCase(),
    haystack: [p.title, p.summary, p.location, ...p.tags, ...p.software, ...p.divisions.map(divisionName)]
      .join(' ')
      .toLowerCase(),
  })),
  ...resources.map((r) => ({
    type: 'resource' as const,
    id: r.id,
    title: r.title,
    subtitle: r.category,
    to: '/resources',
    titleLower: r.title.toLowerCase(),
    haystack: [r.title, r.category, r.description].join(' ').toLowerCase(),
  })),
  ...events.map((ev) => ({
    type: 'event' as const,
    id: ev.id,
    title: ev.title,
    subtitle: `${ev.category} · ${ev.location}`,
    to: '/events',
    titleLower: ev.title.toLowerCase(),
    haystack: [ev.title, ev.category, ev.location, ev.host, ev.description].join(' ').toLowerCase(),
  })),
]

function scoreEntry(entry: IndexEntry, q: string): number {
  if (entry.titleLower.startsWith(q)) return 100
  if (entry.titleLower.includes(q)) return 70
  if (entry.haystack.includes(q)) return 30
  return 0
}

/** Ranked, flat search across everything. Empty query returns no results. */
export function searchAll(query: string, limit = 24): SearchResult[] {
  const q = normalize(query)
  if (!q) return []
  const scored: { entry: IndexEntry; score: number }[] = []
  for (const entry of INDEX) {
    const score = scoreEntry(entry, q)
    if (score > 0) scored.push({ entry, score })
  }
  scored.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
  return scored.slice(0, limit).map(({ entry }) => ({
    type: entry.type,
    id: entry.id,
    title: entry.title,
    subtitle: entry.subtitle,
    to: entry.to,
  }))
}

export type GroupedSearchResults = Record<SearchResultType, SearchResult[]>

/** Search results grouped by type, with an optional per-group cap. */
export function searchGrouped(query: string, perGroup = 5): GroupedSearchResults {
  const grouped: GroupedSearchResults = {
    department: [],
    employee: [],
    project: [],
    resource: [],
    event: [],
  }
  for (const result of searchAll(query, 100)) {
    if (grouped[result.type].length < perGroup) {
      grouped[result.type].push(result)
    }
  }
  return grouped
}

/** Total number of results across all groups (for "N results" labels). */
export function countResults(grouped: GroupedSearchResults): number {
  return Object.values(grouped).reduce((sum, list) => sum + list.length, 0)
}
