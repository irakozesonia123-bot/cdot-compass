import { useCallback, useSyncExternalStore } from 'react'
import { NOTIFICATIONS } from '@/config/notifications'

/**
 * Read-state store for demo notifications. The notification list itself is
 * static; this just tracks which ids the user has read (persisted) so the
 * unread badge behaves believably.
 */
const STORAGE_KEY = 'cdot-compass:notifications-read'

function read(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

let readCache: string[] = read()
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function persist(next: string[]) {
  readCache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
  emit()
}

export function useNotifications() {
  const readIds = useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => readCache,
    () => readCache,
  )

  const unreadCount = NOTIFICATIONS.filter((n) => !readIds.includes(n.id)).length

  const isRead = useCallback((id: string) => readIds.includes(id), [readIds])

  const markAllRead = useCallback(() => {
    persist(NOTIFICATIONS.map((n) => n.id))
  }, [])

  const markRead = useCallback((id: string) => {
    if (!readCache.includes(id)) persist([...readCache, id])
  }, [])

  return { notifications: NOTIFICATIONS, unreadCount, isRead, markAllRead, markRead }
}
