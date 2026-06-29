import { useMemo, useState } from 'react'
import { Users, SearchX } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { FilterPanel } from '@/components/layout/FilterPanel'
import { CollectionView } from '@/components/layout/CollectionView'
import { EmployeeCard } from '@/components/employee/EmployeeCard'
import { DemoDisclaimer } from '@/components/common/DemoDisclaimer'
import { SortSelect, type SortOption } from '@/components/common/SortSelect'
import type { FilterGroup } from '@/components/common/FilterBar'
import type { Employee } from '@/types'
import { employees } from '@/utils/data'
import {
  AVAILABILITY_OPTIONS,
  filterEmployees,
  getDivisionOptions,
  getExperienceOptions,
  getLocationOptions,
  getTopSkillOptions,
  matchesExperienceBucket,
} from '@/utils/filter'

const SORT_OPTIONS: SortOption[] = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'division', label: 'Division' },
  { value: 'years', label: 'Most experience' },
  { value: 'mentor', label: 'Mentors first' },
  { value: 'coffee', label: 'Coffee-chat ready' },
]

function sortEmployees(list: Employee[], sort: string): Employee[] {
  const sorted = [...list]
  switch (sort) {
    case 'division':
      return sorted.sort((a, b) => a.division.localeCompare(b.division) || a.name.localeCompare(b.name))
    case 'years':
      return sorted.sort((a, b) => b.yearsExperience - a.yearsExperience || a.name.localeCompare(b.name))
    case 'mentor':
      return sorted.sort((a, b) => Number(b.mentor) - Number(a.mentor) || a.name.localeCompare(b.name))
    case 'coffee':
      return sorted.sort((a, b) => Number(b.coffeeChat) - Number(a.coffeeChat) || a.name.localeCompare(b.name))
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
}

/** People Directory — search, filter, and sort all CDOT employees. */
export default function People() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [sort, setSort] = useState('name')

  const primaryGroups: FilterGroup[] = useMemo(
    () => [
      { key: 'availability', label: 'Availability', options: AVAILABILITY_OPTIONS },
      { key: 'divisions', label: 'Division', options: getDivisionOptions() },
    ],
    [],
  )
  const moreGroups: FilterGroup[] = useMemo(
    () => [
      { key: 'experience', label: 'Experience', options: getExperienceOptions() },
      { key: 'locations', label: 'Location', options: getLocationOptions() },
      { key: 'skills', label: 'Top skills', options: getTopSkillOptions(15) },
    ],
    [],
  )

  const results = useMemo(() => {
    const availability = new Set(selected.availability ?? [])
    let list = filterEmployees(employees, {
      query,
      divisions: selected.divisions,
      locations: selected.locations,
      skills: selected.skills,
      coffeeChat: availability.has('coffeeChat') || undefined,
      mentor: availability.has('mentor') || undefined,
      jobShadow: availability.has('jobShadow') || undefined,
      leadership: availability.has('leadership') || undefined,
      fieldWork: availability.has('fieldWork') || undefined,
      remote: availability.has('remote') || undefined,
    })

    const buckets = selected.experience ?? []
    if (buckets.length > 0) {
      list = list.filter((e) => buckets.some((b) => matchesExperienceBucket(e.yearsExperience, b)))
    }

    return sortEmployees(list, sort)
  }, [query, selected, sort])

  const activeCount = Object.values(selected).reduce((sum, values) => sum + values.length, 0)
  const clearAll = () => {
    setQuery('')
    setSelected({})
  }

  return (
    <PageContainer>
      <PageHeader
        title="People"
        description="Meet the engineers, mentors, and specialists across CDOT — and reach out."
        icon={Users}
        accent="teal"
        actions={<SortSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />}
      />

      <FilterPanel
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search people by name, role, or skill…"
        primaryGroups={primaryGroups}
        moreGroups={moreGroups}
        selected={selected}
        onChange={(key, values) => setSelected((s) => ({ ...s, [key]: values }))}
        onClear={clearAll}
        activeCount={activeCount}
        resultCount={results.length}
        totalCount={employees.length}
        itemLabel="people"
      />

      <CollectionView
        items={results}
        getKey={(e) => e.id}
        cols={3}
        renderItem={(e) => <EmployeeCard employee={e} />}
        empty={{
          icon: SearchX,
          title: 'No people match your filters',
          description: 'Try removing a filter or searching a different skill.',
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
