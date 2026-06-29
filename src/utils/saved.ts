/**
 * Resolve saved (bookmarked) ids back into typed references.
 *
 * Bookmarks store only ids; the id prefix tells us the kind, and the data
 * layer resolves the display details. Powers the Saved page and the dashboard
 * "Saved items" widget.
 */
import { getEmployeeById, getProjectById, getResourceById, getEventById } from '@/utils/data'

export type SavedKind = 'people' | 'projects' | 'resources' | 'events'

export interface SavedRef {
  id: string
  kind: SavedKind
  title: string
  subtitle: string
  to: string
}

export function resolveSaved(id: string): SavedRef | null {
  if (id.startsWith('emp-')) {
    const e = getEmployeeById(id)
    return e ? { id, kind: 'people', title: e.name, subtitle: e.title, to: `/employee/${id}` } : null
  }
  if (id.startsWith('prj-')) {
    const p = getProjectById(id)
    return p ? { id, kind: 'projects', title: p.title, subtitle: p.phase, to: `/project/${id}` } : null
  }
  if (id.startsWith('res-')) {
    const r = getResourceById(id)
    return r ? { id, kind: 'resources', title: r.title, subtitle: r.category, to: '/resources' } : null
  }
  if (id.startsWith('evt-')) {
    const ev = getEventById(id)
    return ev ? { id, kind: 'events', title: ev.title, subtitle: ev.location, to: '/events' } : null
  }
  return null
}

export const SAVED_KIND_LABEL: Record<SavedKind, string> = {
  people: 'Saved people',
  projects: 'Saved projects',
  resources: 'Saved resources',
  events: 'Saved events',
}

/** Group a list of bookmark ids by kind, preserving order. */
export function groupSaved(ids: string[]): Record<SavedKind, SavedRef[]> {
  const groups: Record<SavedKind, SavedRef[]> = { people: [], projects: [], resources: [], events: [] }
  for (const id of ids) {
    const ref = resolveSaved(id)
    if (ref) groups[ref.kind].push(ref)
  }
  return groups
}
