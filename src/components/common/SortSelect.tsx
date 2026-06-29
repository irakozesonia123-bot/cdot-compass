import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SortOption {
  value: string
  label: string
}

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
  options: SortOption[]
  label?: string
  className?: string
}

/** Accessible single-select sort control (styled native select). */
export function SortSelect({
  value,
  onChange,
  options,
  label = 'Sort by',
  className,
}: SortSelectProps) {
  return (
    <label className={cn('inline-flex items-center gap-2 text-small text-muted-foreground', className)}>
      <span className="hidden sm:inline">{label}</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-button border border-border bg-card py-2 pl-3 pr-9 text-small font-medium text-foreground shadow-soft transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </span>
    </label>
  )
}
