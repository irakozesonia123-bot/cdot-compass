import { useCallback, useSyncExternalStore } from 'react'
import { useToast } from '@/contexts/ToastContext'

/**
 * Bookmark store.
 *
 * A minimal external store backed by localStorage so bookmark state persists
 * across reloads and stays in sync across every component that reads it
 * (via useSyncExternalStore) without needing a context provider.
 */
const STORAGE_KEY = 'cdot-compass:bookmarks'

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

let cache: string[] = readStorage()
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function write(next: string[]) {
  cache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Ignore storage failures (e.g. private mode); in-memory cache still works.
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return cache
}

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const { toast } = useToast()

  const isBookmarked = useCallback(
    (id: string) => bookmarks.includes(id),
    [bookmarks],
  )

  const toggleBookmark = useCallback(
    (id: string, label?: string) => {
      const exists = cache.includes(id)
      write(exists ? cache.filter((x) => x !== id) : [...cache, id])
      toast(
        exists
          ? { variant: 'info', title: 'Removed from bookmarks' }
          : {
              variant: 'success',
              title: 'Bookmarked',
              description: label ? `Saved “${label}”.` : undefined,
            },
      )
    },
    [toast],
  )

  const clearBookmarks = useCallback(() => {
    write([])
    toast({ variant: 'info', title: 'Cleared saved items' })
  }, [toast])

  return { bookmarks, isBookmarked, toggleBookmark, clearBookmarks }
}
