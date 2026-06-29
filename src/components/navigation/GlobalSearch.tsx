import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  Building2,
  User,
  FolderKanban,
  BookOpen,
  Calendar,
  CornerDownLeft,
  type LucideIcon,
} from 'lucide-react'
import { searchGrouped, countResults, type SearchResultType } from '@/utils/search'
import { cn } from '@/lib/utils'

interface GlobalSearchProps {
  open: boolean
  onClose: () => void
}

const TYPE_META: Record<SearchResultType, { label: string; icon: LucideIcon }> = {
  department: { label: 'Divisions', icon: Building2 },
  employee: { label: 'People', icon: User },
  project: { label: 'Projects', icon: FolderKanban },
  resource: { label: 'Resources', icon: BookOpen },
  event: { label: 'Events', icon: Calendar },
}

const ORDER: SearchResultType[] = ['department', 'employee', 'project', 'resource', 'event']
const SUGGESTIONS = ['Bridge', 'Hydraulics', 'Floyd Hill', 'Mentorship', 'Aviation']

/**
 * App-wide command-palette search. Opens from the top bar or ⌘/Ctrl-K, searches
 * across divisions, people, projects, resources, and events, and groups results.
 */
export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    setQuery('')
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const grouped = searchGrouped(query, 5)
  const total = countResults(grouped)

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]">
          <motion.div
            className="absolute inset-0 bg-cdot-navy/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search CDOT Compass"
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-dialog border border-border bg-card shadow-dialog"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search people, projects, divisions, resources, events…"
                aria-label="Search query"
                className="flex-1 bg-transparent py-4 text-body text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-xs text-muted-foreground sm:inline">
                Esc
              </kbd>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {!query && (
                <div className="p-3">
                  <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Try searching
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 px-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-border bg-card px-3 py-1 text-small text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query && total === 0 && (
                <p className="px-4 py-8 text-center text-small text-muted-foreground">
                  No matches for “{query}”.
                </p>
              )}

              {query &&
                ORDER.filter((type) => grouped[type].length > 0).map((type) => {
                  const Meta = TYPE_META[type]
                  return (
                    <div key={type} className="px-1 py-1">
                      <p className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        <Meta.icon className="h-3.5 w-3.5" aria-hidden />
                        {Meta.label}
                      </p>
                      {grouped[type].map((result) => (
                        <Link
                          key={`${result.type}-${result.id}`}
                          to={result.to}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-3 rounded-button px-3 py-2 transition-colors hover:bg-muted"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-small font-medium text-foreground">
                              {result.title}
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {result.subtitle}
                            </span>
                          </span>
                          <CornerDownLeft
                            className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden
                          />
                        </Link>
                      ))}
                    </div>
                  )
                })}
            </div>

            {query && total > 0 && (
              <div className={cn('border-t border-border px-4 py-2 text-xs text-muted-foreground')}>
                {total} result{total === 1 ? '' : 's'}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
