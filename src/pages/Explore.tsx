import { useMemo, useState } from 'react'
import { Compass, SearchX } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { FilterPanel } from '@/components/layout/FilterPanel'
import { CollectionView } from '@/components/layout/CollectionView'
import { DepartmentCard } from '@/components/division/DepartmentCard'
import { SortSelect, type SortOption } from '@/components/common/SortSelect'
import type { FilterGroup } from '@/components/common/FilterBar'
import { departments, getProjectsByDepartment } from '@/utils/data'
import {
  filterDepartments,
  getDepartmentTagOptions,
  getTopProjectTagOptions,
} from '@/utils/filter'

const SORT_OPTIONS: SortOption[] = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'projects', label: 'Most projects' },
  { value: 'people', label: 'Most people' },
]

/** Explore Divisions — browse, search, filter, and sort all CDOT divisions. */
export default function Explore() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [sort, setSort] = useState('name')

  const primaryGroups: FilterGroup[] = useMemo(
    () => [{ key: 'projectType', label: 'Project type', options: getTopProjectTagOptions(10) }],
    [],
  )
  const moreGroups: FilterGroup[] = useMemo(
    () => [{ key: 'focus', label: 'Focus area', options: getDepartmentTagOptions() }],
    [],
  )

  const results = useMemo(() => {
    let list = filterDepartments(departments, { query, tags: selected.focus })

    const projectTypes = selected.projectType ?? []
    if (projectTypes.length > 0) {
      list = list.filter((d) =>
        getProjectsByDepartment(d.slug).some((p) =>
          p.tags.some((t) => projectTypes.includes(t)),
        ),
      )
    }

    return [...list].sort((a, b) => {
      if (sort === 'projects') {
        return b.projects.length - a.projects.length || a.name.localeCompare(b.name)
      }
      if (sort === 'people') {
        return b.employees.length - a.employees.length || a.name.localeCompare(b.name)
      }
      return a.name.localeCompare(b.name)
    })
  }, [query, selected, sort])

  const activeCount = Object.values(selected).reduce((sum, values) => sum + values.length, 0)
  const clearAll = () => {
    setQuery('')
    setSelected({})
  }

  return (
    <PageContainer>
      <PageHeader
        title="Explore Divisions"
        description="Browse every division at CDOT and discover where you fit."
        icon={Compass}
        accent="green"
        actions={<SortSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />}
      />

      <FilterPanel
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search divisions, skills, or focus areas…"
        primaryGroups={primaryGroups}
        moreGroups={moreGroups}
        selected={selected}
        onChange={(key, values) => setSelected((s) => ({ ...s, [key]: values }))}
        onClear={clearAll}
        activeCount={activeCount}
        resultCount={results.length}
        totalCount={departments.length}
        itemLabel="divisions"
      />

      <CollectionView
        items={results}
        getKey={(d) => d.id}
        cols={3}
        renderItem={(d) => <DepartmentCard department={d} />}
        empty={{
          icon: SearchX,
          title: 'No divisions match your filters',
          description: 'Try a different search term or clear your filters.',
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
    </PageContainer>
  )
}
