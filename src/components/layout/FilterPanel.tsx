import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { SearchBar } from '@/components/common/SearchBar'
import { FilterBar, type FilterGroup } from '@/components/common/FilterBar'
import { cn } from '@/lib/utils'

interface FilterPanelProps {
  query: string
  onQueryChange: (value: string) => void
  searchPlaceholder?: string
  /** Always-visible filter groups. */
  primaryGroups: FilterGroup[]
  /** Groups tucked behind a "More filters" disclosure. */
  moreGroups?: FilterGroup[]
  selected: Record<string, string[]>
  onChange: (groupKey: string, values: string[]) => void
  onClear: () => void
  activeCount: number
  resultCount: number
  totalCount: number
  /** Plural noun for the count label, e.g. "projects". */
  itemLabel: string
}

/**
 * Reusable directory filter surface: search + always-visible facets + an
 * optional collapsible "More filters" section + result count and clear-all.
 * Shared by Explore, People, and Projects so filtering looks and behaves the
 * same everywhere and stays uncluttered.
 */
export function FilterPanel({
  query,
  onQueryChange,
  searchPlaceholder = 'Search…',
  primaryGroups,
  moreGroups = [],
  selected,
  onChange,
  onClear,
  activeCount,
  resultCount,
  totalCount,
  itemLabel,
}: FilterPanelProps) {
  const [showMore, setShowMore] = useState(false)

  const moreActive = moreGroups.reduce(
    (sum, group) => sum + (selected[group.key]?.length ?? 0),
    0,
  )

  return (
    <div className="space-y-4">
      <SearchBar value={query} onChange={onQueryChange} placeholder={searchPlaceholder} />

      <FilterBar groups={primaryGroups} selected={selected} onChange={onChange} />

      {moreGroups.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            className="inline-flex items-center gap-1.5 text-small font-semibold text-primary hover:underline"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            {showMore ? 'Fewer filters' : 'More filters'}
            {moreActive > 0 && (
              <span className="rounded-full bg-primary/10 px-1.5 text-xs font-semibold text-primary">
                {moreActive}
              </span>
            )}
            <ChevronDown
              className={cn('h-4 w-4 transition-transform', showMore && 'rotate-180')}
              aria-hidden
            />
          </button>

          <AnimatePresence initial={false}>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <FilterBar groups={moreGroups} selected={selected} onChange={onChange} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-small text-muted-foreground" aria-live="polite">
          {resultCount} of {totalCount} {itemLabel}
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 text-small font-medium text-primary hover:underline"
          >
            <X className="h-4 w-4" aria-hidden />
            Clear all ({activeCount})
          </button>
        )}
      </div>
    </div>
  )
}
