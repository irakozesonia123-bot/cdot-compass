import { useMemo, useState } from 'react'
import { BookOpen, SearchX } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { FilterPanel } from '@/components/layout/FilterPanel'
import { CollectionView } from '@/components/layout/CollectionView'
import { ResourceCard } from '@/components/resources/ResourceCard'
import { ResourceDetailModal } from '@/components/resources/ResourceDetailModal'
import { DemoDisclaimer } from '@/components/common/DemoDisclaimer'
import { SortSelect, type SortOption } from '@/components/common/SortSelect'
import type { FilterGroup } from '@/components/common/FilterBar'
import type { Resource } from '@/types'
import { resources } from '@/utils/data'
import { filterResources, getResourceCategoryOptions } from '@/utils/filter'

const SORT_OPTIONS: SortOption[] = [
  { value: 'featured', label: 'Recommended' },
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'category', label: 'Category' },
]

/** A small curated set surfaced first under "Recommended". */
const FEATURED_IDS = new Set(['res-01', 'res-12', 'res-15', 'res-16', 'res-18'])

function sortResources(list: Resource[], sort: string): Resource[] {
  const sorted = [...list]
  switch (sort) {
    case 'name':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'category':
      return sorted.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title))
    default:
      return sorted.sort(
        (a, b) =>
          Number(FEATURED_IDS.has(b.id)) - Number(FEATURED_IDS.has(a.id)) ||
          a.title.localeCompare(b.title),
      )
  }
}

/** Resources — professional development, training, ERGs, and career planning. */
export default function Resources() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [sort, setSort] = useState('featured')
  const [active, setActive] = useState<Resource | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const primaryGroups: FilterGroup[] = useMemo(
    () => [{ key: 'categories', label: 'Category', options: getResourceCategoryOptions() }],
    [],
  )

  const results = useMemo(() => {
    const list = filterResources(resources, { query, categories: selected.categories })
    return sortResources(list, sort)
  }, [query, selected, sort])

  const activeCount = Object.values(selected).reduce((sum, values) => sum + values.length, 0)
  const clearAll = () => {
    setQuery('')
    setSelected({})
  }
  const openResource = (resource: Resource) => {
    setActive(resource)
    setModalOpen(true)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Resources"
        description="Professional development, training, employee groups, and career planning — all in one place."
        icon={BookOpen}
        accent="blue"
        actions={<SortSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />}
      />

      <FilterPanel
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search resources by name or topic…"
        primaryGroups={primaryGroups}
        selected={selected}
        onChange={(key, values) => setSelected((s) => ({ ...s, [key]: values }))}
        onClear={clearAll}
        activeCount={activeCount}
        resultCount={results.length}
        totalCount={resources.length}
        itemLabel="resources"
      />

      <CollectionView
        items={results}
        getKey={(r) => r.id}
        cols={3}
        renderItem={(r) => <ResourceCard resource={r} onOpen={openResource} />}
        empty={{
          icon: SearchX,
          title: 'No resources match your search',
          description: 'Try a different term or clear your filters.',
          action: (
            <button
              type="button"
              onClick={clearAll}
              className="rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Clear filters
            </button>
          ),
        }}
      />

      <DemoDisclaimer text="Demo resource data is fictional and not an official CDOT record." />

      <ResourceDetailModal resource={active} open={modalOpen} onClose={() => setModalOpen(false)} />
    </PageContainer>
  )
}
