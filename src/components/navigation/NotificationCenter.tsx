import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, CheckCheck } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import { getLucideIcon } from '@/lib/icons'
import { ACCENT_STYLES } from '@/config/accents'
import { cn } from '@/lib/utils'

/** Bell trigger + dropdown listing demo notifications with read state. */
export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { notifications, unreadCount, isRead, markAllRead, markRead } = useNotifications()

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-button transition-colors hover:bg-muted hover:text-foreground"
      >
        <Bell className="h-5 w-5" aria-hidden />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-card border border-border bg-card shadow-dialog"
            role="menu"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-small font-semibold text-heading">Notifications</p>
              <button
                type="button"
                onClick={markAllRead}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <CheckCheck className="h-3.5 w-3.5" aria-hidden />
                Mark all read
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {notifications.map((n) => {
                const Icon = getLucideIcon(n.icon)
                const accent = ACCENT_STYLES[n.accent]
                const read = isRead(n.id)
                return (
                  <Link
                    key={n.id}
                    to={n.to}
                    onClick={() => {
                      markRead(n.id)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex gap-3 border-b border-border px-4 py-3 transition-colors last:border-0 hover:bg-muted/60',
                      !read && 'bg-primary/[0.04]',
                    )}
                  >
                    <span className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-button', accent.soft, accent.icon)}>
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-small font-medium text-foreground">{n.title}</span>
                        {!read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />}
                      </span>
                      <span className="block text-xs text-muted-foreground">{n.description}</span>
                      <span className="block text-[11px] text-muted-foreground/80">{n.time}</span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
