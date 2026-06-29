import { useMemo, useState } from 'react'
import { FolderKanban, SearchX } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { FilterPanel } from '@/components/layout/FilterPanel'
import { CollectionView } from '@/components/layout/CollectionView'
import { ProjectCard } from '@/components/project/ProjectCard'
import { DemoDisclaimer } from '@/components/common/DemoDisclaimer'
import { SortSelect, type SortOption } from '@/components/common/SortSelect'
import type { FilterGroup } from '@/components/common/FilterBar'
import type { Project } from '@/types'
import { projects } from '@/utils/data'
import {
  filterProjects,
  getDivisionOptions,
  getProjectPhaseOptions,
  getProjectSoftwareOptions,
  getProjectStatusOptions,
  getTopProjectTagOptions,
} from '@/utils/filter'

const SORT_OPTIONS: SortOption[] = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'phase', label: 'Phase' },
  { value: 'status', label: 'Status' },
  { value: 'divisions', label: 'Most divisions' },
  { value: 'engineers', label: 'Most engineers' },
]

function sortProjects(list: Project[], sort: string): Project[] {
  const sorted = [...list]
  switch (sort) {
    case 'phase':
      return sorted.sort((a, b) => a.phase.localeCompare(b.phase) || a.title.localeCompare(b.title))
    case 'status':
      return sorted.sort((a, b) => a.status.localeCompare(b.status) || a.title.localeCompare(b.title))
    case 'divisions':
      return sorted.sort((a, b) => b.divisions.length - a.divisions.length || a.title.localeCompare(b.title))
    case 'engineers':
      return sorted.sort((a, b) => b.engineers.length - a.engineers.length || a.title.localeCompare(b.title))
    default:
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
  }
}

/** Project Explorer — see how divisions collaborate on transportation projects. */
export default function Projects() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [sort, setSort] = useState('name')

  const primaryGroups: FilterGroup[] = useMemo(
    () => [
      { key: 'phases', label: 'Phase', options: getProjectPhaseOptions() },
      { key: 'statuses', label: 'Status', options: getProjectStatusOptions() },
      { key: 'divisions', label: 'Division', options: getDivisionOptions() },
    ],
    [],
  )
  const moreGroups: FilterGroup[] = useMemo(
    () => [
      { key: 'tags', label: 'Project type', options: getTopProjectTagOptions(12) },
      { key: 'software', label: 'Tools & software', options: getProjectSoftwareOptions() },
    ],
    [],
  )

  const results = useMemo(() => {
    const list = filterProjects(projects, {
      query,
      divisions: selected.divisions,
      phases: selected.phases,
      statuses: selected.statuses,
      tags: selected.tags,
      software: selected.software,
    })
    return sortProjects(list, sort)
  }, [query, selected, sort])

  const activeCount = Object.values(selected).reduce((sum, values) => sum + values.length, 0)
  const clearAll = () => {
    setQuery('')
    setSelected({})
  }

  return (
    <PageContainer>
      <PageHeader
        title="Project Explorer"
        description="See how disciplines across CDOT collaborate on real transportation projects."
        icon={FolderKanban}
        accent="orange"
        actions={<SortSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />}
      />

      <FilterPanel
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search projects by name, corridor, tool, or engineer…"
        primaryGroups={primaryGroups}
        moreGroups={moreGroups}
        selected={selected}
        onChange={(key, values) => setSelected((s) => ({ ...s, [key]: values }))}
        onClear={clearAll}
        activeCount={activeCount}
        resultCount={results.length}
        totalCount={projects.length}
        itemLabel="projects"
      />

      <CollectionView
        items={results}
        getKey={(p) => p.id}
        cols={3}
        renderItem={(p) => <ProjectCard project={p} />}
        empty={{
          icon: SearchX,
          title: 'No projects match your filters',
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

      <DemoDisclaimer />
    </PageContainer>
  )
}
