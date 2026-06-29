import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FilterOption {
  value: string
  label: string
  /** Optional result count shown alongside the label. */
  count?: number
}

export interface FilterGroup {
  /** Stable key used in the `selected` map. */
  key: string
  label: string
  options: FilterOption[]
}

interface FilterBarProps {
  groups: FilterGroup[]
  /** Map of group key -> selected option values. */
  selected: Record<string, string[]>
  /** Called with the full next list of selected values for a group. */
  onChange: (groupKey: string, values: string[]) => void
  /** Clear all selections across every group. */
  onClear?: () => void
  className?: string
}

/** A single toggleable filter chip. Reusable on its own (e.g. interest chips). */
export function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-small font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
      )}
    >
      {label}
      {count != null && (
        <span className={cn('text-xs', active ? 'text-primary-foreground/80' : 'text-muted-foreground/70')}>
          {count}
        </span>
      )}
    </button>
  )
}

/**
 * Multi-select faceted filter bar. Renders labeled groups of toggle chips and
 * a "Clear all" action. Selections within a group are OR'd; the parent decides
 * how groups combine. Powers People, Explore, Projects, Resources, and Events.
 */
export function FilterBar({
  groups,
  selected,
  onChange,
  onClear,
  className,
}: FilterBarProps) {
  const totalSelected = Object.values(selected).reduce(
    (sum, values) => sum + values.length,
    0,
  )

  const toggle = (groupKey: string, value: string) => {
    const current = selected[groupKey] ?? []
    onChange(
      groupKey,
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {groups.map((group) => (
        <div key={group.key}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                count={option.count}
                active={(selected[group.key] ?? []).includes(option.value)}
                onClick={() => toggle(group.key, option.value)}
              />
            ))}
          </div>
        </div>
      ))}

      {totalSelected > 0 && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 text-small font-medium text-primary hover:underline"
        >
          <X className="h-4 w-4" aria-hidden />
          Clear all filters ({totalSelected})
        </button>
      )}
    </div>
  )
}
