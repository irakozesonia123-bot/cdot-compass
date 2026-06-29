import { Bookmark } from 'lucide-react'
import { useBookmarks } from '@/hooks/useBookmarks'
import { cn } from '@/lib/utils'

interface SaveButtonProps {
  id: string
  /** Label used in the "Saved" toast. */
  label: string
  /** 'overlay' sits on top of imagery; 'ghost' is a plain icon button. */
  variant?: 'overlay' | 'ghost'
  className?: string
}

/**
 * Reusable bookmark toggle. Safe to place over a Link (it stops propagation
 * and prevents default so it never triggers card navigation).
 */
export function SaveButton({ id, label, variant = 'ghost', className }: SaveButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const saved = isBookmarked(id)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleBookmark(id, label)
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
      title={saved ? 'Saved' : 'Save'}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-button transition-colors',
        variant === 'overlay'
          ? 'border border-border bg-card/90 backdrop-blur hover:bg-card'
          : 'hover:bg-muted',
        saved ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} aria-hidden />
    </button>
  )
}
