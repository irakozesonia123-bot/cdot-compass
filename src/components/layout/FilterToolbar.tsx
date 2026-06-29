import { SearchBar } from '@/components/common/SearchBar'
import { FilterBar, type FilterGroup } from '@/components/common/FilterBar'
import { cn } from '@/lib/utils'

interface FilterToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  /** Faceted filter groups; omit for search-only toolbars. */
  groups?: FilterGroup[]
  selected?: Record<string, string[]>
  onFilterChange?: (groupKey: string, values: string[]) => void
  onClear?: () => void
  /** Number of matching results, shown as a small caption. */
  resultCount?: number
  /** Total available results (for "N of M" context). */
  totalCount?: number
  className?: string
}

/**
 * Search + faceted filters + result count, combined into one toolbar.
 * The standard control surface for directory pages (People, Explore,
 * Projects, Resources, Events).
 */
export function FilterToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  groups,
  selected = {},
  onFilterChange,
  onClear,
  resultCount,
  totalCount,
  className,
}: FilterToolbarProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />

      {groups && groups.length > 0 && onFilterChange && (
        <FilterBar
          groups={groups}
          selected={selected}
          onChange={onFilterChange}
          onClear={onClear}
        />
      )}

      {resultCount != null && (
        <p className="text-small text-muted-foreground" aria-live="polite">
          {resultCount}
          {totalCount != null ? ` of ${totalCount}` : ''}{' '}
          {resultCount === 1 ? 'result' : 'results'}
        </p>
      )}
    </div>
  )
}
