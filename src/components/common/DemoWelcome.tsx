import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Compass, X } from 'lucide-react'

const STORAGE_KEY = 'cdot-compass:demo-welcome-dismissed'

/**
 * First-visit notice that sets expectations for the public prototype: there is
 * no sign-in, and the experience is shown through a representative demo profile
 * (Sonia Irakoze). Dismissal is remembered in localStorage so returning
 * visitors don't see it again.
 */
export function DemoWelcome() {
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== '1'
    } catch {
      return true
    }
  })

  function dismiss() {
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore — dismissal just won't persist */
    }
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, height: 0, marginBottom: -40 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          className="relative overflow-hidden rounded-card border border-primary/20 bg-gradient-to-br from-primary/5 to-cdot-indigo/5 p-4 sm:p-5"
        >
          <div className="flex items-start gap-3.5 pr-8">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-button bg-primary/10 text-primary">
              <Compass className="h-5 w-5" aria-hidden />
            </span>
            <div className="space-y-2">
              <p className="text-small font-semibold text-heading">
                Welcome — this is an interactive prototype.
              </p>
              <p className="max-w-2xl text-small text-muted-foreground">
                You're exploring CDOT Compass through a sample intern profile,{' '}
                <span className="font-medium text-foreground">Sonia Irakoze</span>. No sign-in is
                needed — just look around. In a full version, CDOT employees would sign in with
                their own account to get a personalized dashboard and recommendations.
              </p>
              <button
                type="button"
                onClick={dismiss}
                className="mt-1 rounded-button bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Got it
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss welcome message"
            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-button text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
