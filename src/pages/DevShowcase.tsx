import { useState } from 'react'
import {
  Coffee,
  Compass,
  Navigation,
  FolderKanban,
  Users,
  BookOpen,
  Calendar,
  SearchX,
  Building2,
} from 'lucide-react'

import { SectionHeader } from '@/components/common/SectionHeader'
import { SearchBar } from '@/components/common/SearchBar'
import { FilterBar, type FilterGroup } from '@/components/common/FilterBar'
import { Tag } from '@/components/common/Tag'
import { Badge } from '@/components/common/Badge'
import { StatCard } from '@/components/common/StatCard'
import { QuickActionCard } from '@/components/common/QuickActionCard'
import { CompatibilityMeter } from '@/components/common/CompatibilityMeter'
import { Timeline } from '@/components/common/Timeline'
import { EmptyState } from '@/components/common/EmptyState'
import { SkeletonCardGrid } from '@/components/common/LoadingSkeleton'
import { DepartmentCard } from '@/components/division/DepartmentCard'
import { EmployeeCard } from '@/components/employee/EmployeeCard'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ResourceCard } from '@/components/resources/ResourceCard'
import { EventCard } from '@/components/events/EventCard'
import { SpotlightCard } from '@/components/spotlights/SpotlightCard'
import { RecommendationCard } from '@/components/ai/RecommendationCard'

import { useToast } from '@/contexts/ToastContext'
import { useDemoAction } from '@/hooks/useDemoAction'
import {
  departments,
  employees,
  projects,
  resources,
  events,
  spotlights,
  getStats,
} from '@/utils/data'
import { getDivisionOptions, getProjectPhaseOptions } from '@/utils/filter'
import { searchGrouped, countResults } from '@/utils/search'

/**
 * Internal component showcase (dev only, not in the sidebar).
 * Renders every shared primitive with real data to verify look and behavior
 * before the feature pages are built. Reachable at /dev.
 */
export default function DevShowcase() {
  const stats = getStats()
  const { toast } = useToast()
  const demo = useDemoAction()

  const [query, setQuery] = useState('')
  const grouped = searchGrouped(query)
  const resultCount = countResults(grouped)

  const filterGroups: FilterGroup[] = [
    { key: 'divisions', label: 'Division', options: getDivisionOptions() },
    { key: 'phases', label: 'Project phase', options: getProjectPhaseOptions() },
  ]
  const [selected, setSelected] = useState<Record<string, string[]>>({})

  return (
    <div className="space-y-14 pb-10">
      <header>
        <Badge tone="warning" dot>
          Dev only · /dev
        </Badge>
        <h1 className="mt-2 text-section text-heading">Component Showcase</h1>
        <p className="mt-1 text-body text-muted-foreground">
          A scratch page to verify the Sprint 3 shared components with real data.
        </p>
      </header>

      {/* Search */}
      <section className="space-y-4">
        <SectionHeader title="Global search" icon={Compass} accent="blue" />
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search divisions, people, projects, resources, events…"
        />
        {query && (
          <div className="rounded-card border border-border bg-card p-4">
            <p className="mb-2 text-small text-muted-foreground">{resultCount} results</p>
            <div className="space-y-1">
              {(Object.keys(grouped) as (keyof typeof grouped)[]).flatMap((type) =>
                grouped[type].map((r) => (
                  <div key={`${r.type}-${r.id}`} className="flex items-center gap-2 text-small">
                    <Badge tone="neutral">{r.type}</Badge>
                    <span className="font-medium text-foreground">{r.title}</span>
                    <span className="truncate text-muted-foreground">— {r.subtitle}</span>
                  </div>
                )),
              )}
              {resultCount === 0 && (
                <p className="text-small text-muted-foreground">No matches.</p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Filters */}
      <section className="space-y-4">
        <SectionHeader title="Filter bar" icon={SearchX} accent="teal" />
        <FilterBar
          groups={filterGroups}
          selected={selected}
          onChange={(key, values) => setSelected((s) => ({ ...s, [key]: values }))}
          onClear={() => setSelected({})}
        />
      </section>

      {/* Stat cards */}
      <section className="space-y-4">
        <SectionHeader title="Stat cards" accent="blue" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Divisions" value={stats.departments} icon={Building2} accent="blue" />
          <StatCard label="Employees" value={stats.employees} icon={Users} accent="teal" />
          <StatCard label="Projects" value={stats.projects} icon={FolderKanban} accent="orange" />
          <StatCard label="Events" value={stats.events} icon={Calendar} accent="gold" />
        </div>
      </section>

      {/* Quick actions */}
      <section className="space-y-4">
        <SectionHeader title="Quick action cards" accent="green" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard title="Explore Divisions" description="Browse every division at CDOT." icon={Compass} to="/explore" accent="green" />
          <QuickActionCard title="Compass Guide" description="Find divisions that fit you." icon={Navigation} to="/compass-guide" accent="indigo" />
          <QuickActionCard title="Find a Mentor" description="Connect over a coffee chat." icon={Coffee} to="/people" accent="teal" />
        </div>
      </section>

      {/* Tags & badges */}
      <section className="space-y-4">
        <SectionHeader title="Tags & badges" accent="purple" />
        <div className="flex flex-wrap gap-2">
          <Tag>HEC-RAS</Tag>
          <Tag>NEPA</Tag>
          <Tag>GIS</Tag>
          <Badge tone="success" dot>Active</Badge>
          <Badge tone="neutral">Completed</Badge>
          <Badge tone="info" dot>Planned</Badge>
          <Badge tone="warning" dot>On Hold</Badge>
          <Badge tone="primary">Design</Badge>
        </div>
      </section>

      {/* Department cards */}
      <section className="space-y-4">
        <SectionHeader title="Department cards" icon={Compass} accent="green" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.slice(0, 3).map((d) => (
            <DepartmentCard key={d.id} department={d} />
          ))}
        </div>
      </section>

      {/* Project cards */}
      <section className="space-y-4">
        <SectionHeader title="Project cards" icon={FolderKanban} accent="orange" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* Employee cards */}
      <section className="space-y-4">
        <SectionHeader title="Employee cards" icon={Users} accent="teal" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {employees.slice(0, 3).map((e) => (
            <EmployeeCard key={e.id} employee={e} />
          ))}
        </div>
      </section>

      {/* Resource cards */}
      <section className="space-y-4">
        <SectionHeader title="Resource cards" icon={BookOpen} accent="blue" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.slice(0, 4).map((r) => (
            <ResourceCard
              key={r.id}
              resource={r}
              onOpen={(res) => toast({ variant: 'info', title: res.title, description: 'Resource details (demo).' })}
            />
          ))}
        </div>
      </section>

      {/* Event cards */}
      <section className="space-y-4">
        <SectionHeader title="Event cards" icon={Calendar} accent="gold" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {events.slice(0, 2).map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      </section>

      {/* Spotlight cards */}
      <section className="space-y-4">
        <SectionHeader title="Spotlight cards" accent="purple" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spotlights.slice(0, 3).map((s) => (
            <SpotlightCard key={s.id} spotlight={s} />
          ))}
        </div>
      </section>

      {/* Recommendation cards + meters */}
      <section className="space-y-4">
        <SectionHeader title="Recommendation cards & meters" icon={Navigation} accent="indigo" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecommendationCard department={departments[1]} score={92} reason="Your interest in water and field work strongly matches this division's projects." />
          <RecommendationCard department={departments[6]} score={74} reason="Your interest in data and safety aligns with this division's analytics work." />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <CompatibilityMeter value={92} label="match" />
          <CompatibilityMeter value={68} label="match" />
          <CompatibilityMeter value={45} label="match" />
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        <SectionHeader title="Career timeline" accent="teal" />
        <div className="max-w-md rounded-card border border-border bg-card p-6">
          <Timeline steps={employees[4].careerJourney} />
        </div>
      </section>

      {/* Demo actions */}
      <section className="space-y-4">
        <SectionHeader title="Demo actions & toasts" accent="green" />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => demo.requestCoffeeChat('Elena')} className="rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground hover:bg-primary/90">Coffee chat</button>
          <button type="button" onClick={() => demo.requestJobShadow('Elena')} className="rounded-button bg-secondary px-4 py-2 text-small font-semibold text-secondary-foreground hover:bg-secondary/90">Job shadow</button>
          <button type="button" onClick={() => demo.register('Intern Welcome Mixer')} className="rounded-button bg-cdot-orange px-4 py-2 text-small font-semibold text-white hover:opacity-90">Register</button>
          <button type="button" onClick={() => demo.copyMessage('Hi Elena, I would love to learn about your work in Hydraulics.')} className="rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground hover:bg-muted">Copy message</button>
        </div>
      </section>

      {/* Empty + loading states */}
      <section className="space-y-4">
        <SectionHeader title="Empty & loading states" accent="gray" />
        <EmptyState
          icon={SearchX}
          title="No employees match your filters"
          description="Try removing a filter or searching a different skill."
          action={
            <button type="button" className="rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground hover:bg-primary/90">
              Clear filters
            </button>
          }
        />
        <SkeletonCardGrid count={3} />
      </section>
    </div>
  )
}
