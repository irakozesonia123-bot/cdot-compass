import { Sparkles, Lock } from 'lucide-react'

/**
 * A clearly-labeled preview of the long-term AI vision. Intentionally
 * non-functional — it communicates direction without implying AI exists yet.
 */
export function AiPreviewCard() {
  return (
    <div className="relative overflow-hidden rounded-card border border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-cdot-indigo/10 p-6 sm:p-8">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
        <Sparkles className="h-3.5 w-3.5" aria-hidden />
        Coming soon
      </span>

      <h2 className="mt-3 text-xl font-semibold text-heading sm:text-2xl">AI Career Match</h2>
      <p className="mt-2 max-w-2xl text-body text-muted-foreground">
        Today, Compass Guide uses a transparent, rules-based recommendation engine so interns can
        understand why suggestions are made. A future version could use AI to learn from interests,
        previous activity, conversations, and career goals to recommend mentors, divisions,
        projects, resources, and opportunities — and explain those recommendations in plain
        language.
      </p>

      {/* Faux, disabled preview to hint at the future interaction */}
      <div className="mt-5 flex max-w-lg items-center gap-2 rounded-button border border-border bg-card/70 p-2 opacity-70">
        <Sparkles className="ml-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span className="flex-1 truncate text-small text-muted-foreground">
          “I enjoyed my bridge inspection day. What teams should I explore next?”
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-button bg-muted px-3 py-1.5 text-small font-semibold text-muted-foreground">
          <Lock className="h-3.5 w-3.5" aria-hidden />
          Soon
        </span>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Preview only — AI is not used in this Innovation Challenge prototype.
      </p>
    </div>
  )
}
