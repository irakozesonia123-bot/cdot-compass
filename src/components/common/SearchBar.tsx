import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** Accessible label for the input (defaults to the placeholder). */
  'aria-label'?: string
  autoFocus?: boolean
  className?: string
}

/**
 * Controlled search input with a leading icon and a clear button.
 * Instant — the parent decides how to use the value as it changes.
 */
export function SearchBar({
  value,
  onChange,
  placeholder = 'Search…',
  autoFocus = false,
  className,
  ...props
}: SearchBarProps) {
  return (
    <div
      role="search"
      className={cn(
        'flex items-center gap-2.5 rounded-search border border-border bg-card px-3.5 py-2.5 shadow-soft transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
        className,
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={props['aria-label'] ?? placeholder}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        className="min-w-0 flex-1 bg-transparent text-body text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="-mr-1 rounded-button p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  )
}
