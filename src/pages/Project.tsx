import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Calendar,
  Compass,
  FolderKanban,
  GraduationCap,
  Network,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { recordRecent } from '@/hooks/useRecentlyViewed'
import { PageSection } from '@/components/layout/PageSection'
import { StatsRow } from '@/components/layout/StatsRow'
import { ContentGrid } from '@/components/layout/ContentGrid'
import { Card } from '@/components/common/Card'
import { StatCard } from '@/components/common/StatCard'
import { Tag } from '@/components/common/Tag'
import { CheckList } from '@/components/common/CheckList'
import { EmptyState } from '@/components/common/EmptyState'
import { DemoDisclaimer } from '@/components/common/DemoDisclaimer'
import { DepartmentCard } from '@/components/division/DepartmentCard'
import { EmployeeCard } from '@/components/employee/EmployeeCard'
import { ProjectHero } from '@/components/project/ProjectHero'
import { ProjectPhases } from '@/components/project/ProjectPhases'
import {
  getProjectById,
  getDepartmentBySlug,
  getDepartmentsForProject,
  getEngineersForProject,
  getRelatedDepartments,
  getRelatedEmployeesForProject,
} from '@/utils/data'

export default function Project() {
  const { id } = useParams()
  const project = id ? getProjectById(id) : undefined

  useEffect(() => {
    if (project) {
      recordRecent({
        id: project.id,
        type: 'project',
        title: project.title,
        subtitle: project.phase,
        to: `/project/${project.id}`,
      })
    }
  }, [project])

  if (!project) {
    return (
      <PageContainer>
        <EmptyState
          icon={Compass}
          title="Project not found"
          description="We couldn't find that project. Browse the full Project Explorer instead."
          action={
            <Link
              to="/projects"
              className="rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to Projects
            </Link>
          }
        />
      </PageContainer>
    )
  }

  const divisions = getDepartmentsForProject(project)
  const engineers = getEngineersForProject(project)
  const related = getRelatedDepartments(project.relatedDepartments)
  const relatedPeople = getRelatedEmployeesForProject(project, 3)
  const lead = getDepartmentBySlug(project.leadDivision)

  const divisionNames = divisions.map((d) => d.shortName).join(', ')
  const why = `${project.title} brings ${divisions.length} divisions together — ${divisionNames} — to deliver ${project.tags.join(', ').toLowerCase()} along ${project.location}. It's a clear example of how CDOT disciplines collaborate to move a single project forward.`
  const learning = [
    `Work alongside ${lead?.name ?? 'the lead division'} engineers during the ${project.phase.toLowerCase()} phase.`,
    `Gain hands-on experience with tools like ${project.software.slice(0, 3).join(', ')}.`,
    `See how ${divisions.length} divisions coordinate on one corridor: ${divisionNames}.`,
    `Build skills around ${project.tags.join(', ').toLowerCase()}.`,
  ]

  return (
    <PageContainer>
      <Breadcrumbs items={[{ label: 'Projects', to: '/projects' }, { label: project.title }]} />
      <ProjectHero project={project} />
      <DemoDisclaimer />

      <StatsRow>
        <StatCard label="Divisions" value={divisions.length} icon={Network} accent="purple" />
        <StatCard label="Engineers" value={engineers.length} icon={Users} accent="teal" />
        <StatCard label="Tools used" value={project.software.length} icon={Wrench} accent="blue" />
        <StatCard label="Timeline" value={project.duration} icon={Calendar} accent="gold" />
      </StatsRow>

      <PageSection title="Project overview" icon={FolderKanban} accent="orange">
        <p className="max-w-3xl text-body text-muted-foreground">{project.description}</p>
      </PageSection>

      <PageSection title="Project phase" icon={TrendingUp} accent="green">
        <Card className="p-6">
          <ProjectPhases project={project} />
        </Card>
      </PageSection>

      <PageSection title="Why this project matters" icon={Sparkles} accent="orange">
        <Card className="bg-primary/5 p-6">
          <p className="max-w-3xl text-body text-foreground">{why}</p>
        </Card>
      </PageSection>

      <PageSection
        id="divisions"
        title="Participating divisions"
        description="The disciplines collaborating on this project."
        icon={Network}
        accent="purple"
      >
        <ContentGrid cols={3} animate>
          {divisions.map((d) => (
            <DepartmentCard key={d.id} department={d} />
          ))}
        </ContentGrid>
      </PageSection>

      <PageSection
        id="engineers"
        title="Engineers involved"
        description={`${engineers.length} people on the project team — reach out to learn more.`}
        icon={Users}
        accent="teal"
      >
        {engineers.length > 0 ? (
          <ContentGrid cols={3} animate>
            {engineers.map((e) => (
              <EmployeeCard key={e.id} employee={e} />
            ))}
          </ContentGrid>
        ) : (
          <EmptyState icon={Users} title="No engineers listed yet" />
        )}
      </PageSection>

      <PageSection title="Tools & focus" icon={Wrench} accent="blue">
        <Card className="space-y-5 p-6">
          <div>
            <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
              Software &amp; tools
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.software.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
              Project tags
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </Card>
      </PageSection>

      <PageSection title="Intern learning opportunities" icon={GraduationCap} accent="green">
        <Card className="p-6">
          <CheckList items={learning} />
        </Card>
      </PageSection>

      {related.length > 0 && (
        <PageSection title="Related divisions" icon={Network} accent="purple">
          <ContentGrid cols={3} animate>
            {related.map((d) => (
              <DepartmentCard key={d.id} department={d} />
            ))}
          </ContentGrid>
        </PageSection>
      )}

      {relatedPeople.length > 0 && (
        <PageSection
          title="People you could learn from"
          description="Others connected to this kind of work."
          icon={Users}
          accent="teal"
        >
          <ContentGrid cols={3} animate>
            {relatedPeople.map((person) => (
              <EmployeeCard key={person.id} employee={person} />
            ))}
          </ContentGrid>
        </PageSection>
      )}
    </PageContainer>
  )
}
