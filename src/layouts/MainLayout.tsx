import { Suspense, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Sparkles, Menu, X } from 'lucide-react'
import { NAV_ITEMS, SECONDARY_NAV_ITEMS, type NavItem } from '@/config/navigation'
import { BrandLogo } from '@/components/common/BrandLogo'
import { GlobalSearch } from '@/components/navigation/GlobalSearch'
import { NotificationCenter } from '@/components/navigation/NotificationCenter'
import { ProfileMenu } from '@/components/navigation/ProfileMenu'
import { cn } from '@/lib/utils'

/**
 * Application shell: branded top bar (with global search, notifications, and
 * account menu), fixed desktop sidebar, scrolling content, footer, and a
 * mobile drawer. The nav list is shared between the sidebar and the drawer.
 */
/** Human-readable titles per top-level route segment. */
const SEGMENT_TITLE: Record<string, string> = {
  explore: 'Explore Divisions',
  division: 'Division',
  projects: 'Project Explorer',
  project: 'Project',
  people: 'People',
  employee: 'Profile',
  'compass-guide': 'Compass Guide',
  resources: 'Resources',
  events: 'Events',
  spotlights: 'Spotlights',
  saved: 'Saved',
  profile: 'Your Profile',
  impact: 'Executive Impact',
  settings: 'Settings',
}

export default function MainLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()

  // Keep the document title in sync with the current route (a11y + tabs).
  useEffect(() => {
    const segment = pathname.split('/')[1]
    const known = segment ? SEGMENT_TITLE[segment] : undefined
    document.title = known
      ? `${known} · CDOT Compass`
      : 'CDOT Compass — Intern Career Navigation'
  }, [pathname])

  // ⌘K / Ctrl-K opens global search anywhere in the app.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Close on Escape and lock body scroll while the drawer is open.
  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-button focus:bg-primary focus:px-4 focus:py-2 focus:text-small focus:font-semibold focus:text-primary-foreground focus:shadow-dialog"
      >
        Skip to main content
      </a>
      <TopBar onMenuClick={() => setMobileNavOpen(true)} onSearchClick={() => setSearchOpen(true)} />
      <div className="flex">
        <SidebarNav />
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 px-6 py-8 focus:outline-none md:px-10 lg:px-12"
        >
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
          <Footer />
        </main>
      </div>
      <MobileDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}

function TopBar({ onMenuClick, onSearchClick }: { onMenuClick: () => void; onSearchClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
      {/* Colorado sunset brand ribbon (navy → blue → green → gold → orange) */}
      <div
        className="h-[3px] w-full bg-[linear-gradient(90deg,hsl(var(--cdot-navy)),hsl(var(--primary)),hsl(var(--secondary)),hsl(var(--cdot-yellow)),hsl(var(--cdot-orange)))]"
        aria-hidden
      />
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-button text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>

        <NavLink to="/" className="flex items-center gap-3" aria-label="CDOT Compass home">
          <BrandLogo />
          <span className="flex flex-col leading-tight">
            <span className="text-[17px] font-semibold tracking-tight text-heading">CDOT Compass</span>
            <span className="hidden text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:block">
              Intern Career Navigation Platform
            </span>
          </span>
        </NavLink>
      </div>

      {/* Global search trigger (desktop shows a full control; mobile an icon) */}
      <button
        type="button"
        onClick={onSearchClick}
        className="hidden h-9 max-w-sm flex-1 items-center gap-2.5 rounded-search border border-border bg-background px-3.5 text-muted-foreground transition-colors hover:border-primary/40 md:flex"
      >
        <Search className="h-4 w-4 shrink-0" aria-hidden />
        <span className="flex-1 text-left text-small">Search people, projects, divisions…</span>
        <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[11px]">⌘K</kbd>
      </button>

      <div className="flex items-center gap-1.5 text-muted-foreground">
        <button
          type="button"
          onClick={onSearchClick}
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-button transition-colors hover:bg-muted hover:text-foreground md:hidden"
        >
          <Search className="h-5 w-5" aria-hidden />
        </button>
        <NotificationCenter />
        <span className="mx-1 hidden h-6 w-px bg-border sm:block" aria-hidden />
        <ProfileMenu />
      </div>
      </div>
    </header>
  )
}

/** Primary navigation links (shared by sidebar and mobile drawer). */
function NavLinks({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {items.map(({ label, path, icon: Icon, description }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          title={description}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'relative flex items-center gap-3 rounded-button px-3 py-2.5 text-small transition-colors',
              isActive
                ? 'bg-primary/10 font-semibold text-primary'
                : 'font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground',
            )
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  'absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary transition-opacity',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
                aria-hidden
              />
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function PrototypeBadge() {
  return (
    <div className="rounded-card border border-border bg-muted/40 p-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-button bg-cdot-yellow/20 text-cdot-orange">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[11px] font-semibold text-foreground">Innovation Challenge</span>
          <span className="text-[11px] text-muted-foreground">Prototype · v1.0</span>
        </span>
      </div>
    </div>
  )
}

function NavGroups({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="space-y-4">
      <NavLinks items={NAV_ITEMS} onNavigate={onNavigate} />
      <div className="space-y-2">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/70">
          Your space
        </p>
        <NavLinks items={SECONDARY_NAV_ITEMS} onNavigate={onNavigate} />
      </div>
    </div>
  )
}

function SidebarNav() {
  return (
    <aside className="sticky top-[67px] hidden h-[calc(100vh-67px)] w-[15rem] shrink-0 flex-col justify-between overflow-y-auto border-r border-border bg-card px-3 py-5 md:flex">
      <NavGroups />
      <PrototypeBadge />
    </aside>
  )
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="md:hidden">
          <motion.div
            className="fixed inset-0 z-40 bg-cdot-navy/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            className="fixed left-0 top-0 z-50 flex h-full w-72 max-w-[80vw] flex-col justify-between overflow-y-auto border-r border-border bg-card px-3 py-4 shadow-dialog"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Navigation"
            aria-modal="true"
          >
            <div>
              <div className="mb-4 flex items-center justify-between px-1">
                <span className="flex items-center gap-2.5">
                  <BrandLogo />
                  <span className="text-base font-semibold text-heading">CDOT Compass</span>
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation"
                  className="flex h-9 w-9 items-center justify-center rounded-button text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <NavGroups onNavigate={onClose} />
            </div>
            <PrototypeBadge />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

function Footer() {
  return (
    <footer className="mx-auto mt-16 flex w-full max-w-6xl flex-col items-center gap-2.5 border-t border-border/70 pt-6 text-center">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
        <span className="h-1.5 w-1.5 rounded-full bg-cdot-yellow" />
        <span className="h-1.5 w-1.5 rounded-full bg-cdot-orange" />
      </div>
      <p className="text-xs text-muted-foreground">
        CDOT Compass — Innovation Challenge prototype. All employee information is fictional.
      </p>
    </footer>
  )
}

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  )
}
