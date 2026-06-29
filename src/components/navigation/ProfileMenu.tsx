import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { UserCircle2, UserRound, Bookmark, Settings, BarChart3 } from 'lucide-react'
import { INTERN_PROFILE } from '@/config/internProfile'
import { getDepartmentBySlug } from '@/utils/data'

const MENU = [
  { to: '/profile', label: 'Your profile', icon: UserRound },
  { to: '/saved', label: 'Saved items', icon: Bookmark },
  { to: '/impact', label: 'Executive impact', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

/** Avatar trigger + dropdown menu for the intern's account. */
export function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const division = getDepartmentBySlug(INTERN_PROFILE.currentDivision)

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
        aria-label="Your account"
        aria-expanded={open}
        className="flex h-9 items-center gap-2 rounded-button pl-1 pr-2 transition-colors hover:bg-muted"
      >
        <UserCircle2 className="h-7 w-7 text-primary" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-card border border-border bg-card shadow-dialog"
            role="menu"
          >
            <div className="border-b border-border px-4 py-3">
              <p className="text-small font-semibold text-heading">{INTERN_PROFILE.name}</p>
              <p className="text-xs text-muted-foreground">
                {INTERN_PROFILE.role}
                {division ? ` · ${division.shortName}` : ''}
              </p>
            </div>
            <div className="p-1.5">
              {MENU.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-button px-3 py-2 text-small font-medium text-foreground transition-colors hover:bg-muted"
                  role="menuitem"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
