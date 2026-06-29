import { ExternalLink, Copy, Bookmark } from 'lucide-react'
import type { Resource } from '@/types'
import { Modal } from '@/components/common/Modal'
import { Badge } from '@/components/common/Badge'
import { getLucideIcon } from '@/lib/icons'
import { useToast } from '@/contexts/ToastContext'
import { useDemoAction } from '@/hooks/useDemoAction'
import { useBookmarks } from '@/hooks/useBookmarks'
import { cn } from '@/lib/utils'

interface ResourceDetailModalProps {
  resource: Resource | null
  open: boolean
  onClose: () => void
}

/** Detail view for a resource, with Open / Copy link / Save demo actions. */
export function ResourceDetailModal({ resource, open, onClose }: ResourceDetailModalProps) {
  const { toast } = useToast()
  const { copyMessage } = useDemoAction()
  const { isBookmarked, toggleBookmark } = useBookmarks()

  if (!resource) return null

  const Icon = getLucideIcon(resource.icon)
  const demoUrl = `https://compass.cdot.gov/resources/${resource.id}`
  const saved = isBookmarked(resource.id)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={resource.title}
      description={resource.category}
      footer={
        <>
          <button
            type="button"
            onClick={() => toggleBookmark(resource.id, resource.title)}
            aria-pressed={saved}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-button border px-4 py-2 text-small font-semibold transition-colors',
              saved
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-foreground hover:bg-muted',
            )}
          >
            <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} aria-hidden />
            {saved ? 'Saved' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => copyMessage(demoUrl)}
            className="inline-flex items-center gap-1.5 rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Copy className="h-4 w-4" aria-hidden />
            Copy link
          </button>
          <button
            type="button"
            onClick={() => toast({ variant: 'info', title: 'Opening resource', description: `${resource.title} (demo).` })}
            className="inline-flex items-center gap-1.5 rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Open resource
          </button>
        </>
      }
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-card bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <Badge tone="neutral">{resource.category}</Badge>
      </div>

      <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
        How this helps you
      </h3>
      <p className="mt-2 text-body text-foreground">{resource.description}</p>
      <p className="mt-3 text-small text-muted-foreground">
        Open it to learn more, save it to revisit later, or copy the link to share with another intern.
      </p>
    </Modal>
  )
}
