import { Coffee, Eye } from 'lucide-react'
import type { Department } from '@/types'
import { useDemoAction } from '@/hooks/useDemoAction'

interface ConnectCTAProps {
  department: Department
}

/**
 * Call-to-action band inviting the intern to connect with the division,
 * wired to the demo coffee-chat and job-shadow actions.
 */
export function ConnectCTA({ department }: ConnectCTAProps) {
  const { requestCoffeeChat, requestJobShadow } = useDemoAction()
  const teamLabel = `the ${department.shortName} team`

  return (
    <div className="flex flex-col gap-4 rounded-card border border-border bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-heading">
          Want to learn more about {department.name}?
        </h3>
        <p className="mt-0.5 text-small text-muted-foreground">
          Reach out to the team for a coffee chat or to set up a job shadow.
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => requestCoffeeChat(teamLabel)}
          className="inline-flex items-center justify-center gap-1.5 rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Coffee className="h-4 w-4" aria-hidden />
          Coffee chat
        </button>
        <button
          type="button"
          onClick={() => requestJobShadow(teamLabel)}
          className="inline-flex items-center justify-center gap-1.5 rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <Eye className="h-4 w-4" aria-hidden />
          Job shadow
        </button>
      </div>
    </div>
  )
}
