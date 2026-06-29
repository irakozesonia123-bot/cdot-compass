import { useSyncExternalStore } from 'react'

/**
 * Recently-viewed store.
 *
 * A small localStorage-backed external store (same pattern as bookmarks) that
 * records the detail pages an intern has visited, newest first. Detail pages
 * call `recordRecent` on mount; the dashboard and profile read the list.
 */
export type RecentType = 'division' | 'employee' | 'project'

export interface RecentItem {
  id: string
  type: RecentType
  title: string
  subtitle: string
  to: string
  image?: string
}

const STORAGE_KEY = 'cdot-compass:recently-viewed'
const MAX_ITEMS = 10

function read(): RecentItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as RecentItem[]) : []
  } catch {
    return []
  }
}

let cache: RecentItem[] = read()
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function write(next: RecentItem[]) {
  cache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore storage failures
  }
  emit()
}

/** Record a visit. Safe to call from a detail page effect. */
export function recordRecent(item: RecentItem) {
  const without = cache.filter((x) => x.id !== item.id)
  write([item, ...without].slice(0, MAX_ITEMS))
}

/** Clear the recently-viewed history. */
export function clearRecent() {
  write([])
}

export function useRecentlyViewed(): RecentItem[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => cache,
    () => cache,
  )
}
