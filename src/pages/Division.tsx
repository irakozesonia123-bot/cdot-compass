import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Building2,
  Compass,
  FolderKanban,
  HelpCircle,
  Network,
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
import { ViewAllLink } from '@/components/common/ViewAllLink'
import { DepartmentCard } from '@/components/division/DepartmentCard'
import { EmployeeCard } from '@/components/employee/EmployeeCard'
import { ProjectCard } from '@/components/project/ProjectCard'
import { DivisionHero } from '@/components/division/DivisionHero'
import { ConnectCTA } from '@/components/division/ConnectCTA'
import { CareerGrowth } from '@/components/division/CareerGrowth'
import { FAQ, type FAQItem } from '@/components/division/FAQ'
import {
  getDepartmentBySlug,
  getEmployeesByDepartment,
  getProjectsByDepartment,
  getRelatedDepartments,
} from '@/utils/data'

export default function Division() {
  const { slug } = useParams()
  const department = slug ? getDepartmentBySlug(slug) : undefined

  useEffect(() => {
    if (department) {
      recordRecent({
        id: department.id,
        type: 'division',
        title: department.name,
        subtitle: department.shortName,
        to: `/division/${department.slug}`,
      })
    }
  }, [department])

  if (!department) {
    return (
      <PageContainer>
        <EmptyState
          icon={Compass}
          title="Division not found"
          description="We couldn't find that division. Browse all divisions instead."
          action={
            <Link
              to="/explore"
              className="rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to Explore
            </Link>
          }
        />
      </PageContainer>
    )
  }

  const projects = getProjectsByDepartment(department.slug)
  const team = getEmployeesByDepartment(department.slug)
  const related = getRelatedDepartments(department.relatedDepartments)

  const faqItems: FAQItem[] = [
    { question: `What does ${department.name} do?`, answer: department.description },
    {
      question: 'What skills would I use here?',
      answer: `You'd build skills like ${department.skills.slice(0, 4).join(', ')}, working with tools such as ${department.software.slice(0, 3).join(', ')}.`,
    },
    {
      question: 'What projects would I work on?',
      answer: `${department.name} participates in ${projects.length} projects${
        projects.length > 0 ? `, including ${projects.slice(0, 2).map((p) => p.title).join(' and ')}` : ''
      }.`,
    },
    {
      question: 'What might my career path look like?',
      answer: `${department.careerGrowth} Common roles include ${department.careerPaths.join('; ')}.`,
    },
    {
      question: 'Who could I talk to?',
      answer: (
        <>
          The {department.name} team has {team.length} people you can reach out to —{' '}
          <a href="#team" className="font-medium text-primary hover:underline">
            meet the team
          </a>{' '}
          and request a coffee chat.
        </>
      ),
    },
  ]

  return (
    <PageContainer>
      <Breadcrumbs items={[{ label: 'Explore', to: '/explore' }, { label: department.name }]} />
      <DivisionHero department={department} />

      <StatsRow>
        <StatCard label="Projects" value={projects.length} icon={FolderKanban} accent="orange" />
        <StatCard label="Team members" value={team.length} icon={Users} accent="teal" />
        <StatCard label="Tools used" value={department.software.length} icon={Wrench} accent="blue" />
        <StatCard label="Related divisions" value={related.length} icon={Network} accent="purple" />
      </StatsRow>

      <PageSection title="About this division" icon={Building2} accent="green">
        <p className="max-w-3xl text-body text-muted-foreground">{department.description}</p>
      </PageSection>

      <PageSection
        id="projects"
        title="Current projects"
        icon={FolderKanban}
        accent="orange"
        action={projects.length > 0 ? <ViewAllLink to="/projects" /> : undefined}
      >
        {projects.length > 0 ? (
          <ContentGrid cols={3} animate>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ContentGrid>
        ) : (
          <EmptyState icon={FolderKanban} title="No active projects listed" />
        )}
      </PageSection>

      <PageSection title="What you’d do here" icon={Wrench} accent="blue">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-5 p-6">
            <div>
              <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
                Engineering skills
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {department.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
                Software &amp; tools
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {department.software.map((tool) => (
                  <Tag key={tool}>{tool}</Tag>
                ))}
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
              Typical intern tasks
            </h3>
            <CheckList items={department.internTasks} className="mt-3" />
          </Card>
        </div>
      </PageSection>

      <PageSection id="career" title="Career growth" icon={TrendingUp} accent="green">
        <Card className="p-6">
          <CareerGrowth paths={department.careerPaths} narrative={department.careerGrowth} />
        </Card>
      </PageSection>

      <PageSection
        id="team"
        title="Meet the team"
        description={`${team.length} people you could learn from in ${department.name}.`}
        icon={Users}
        accent="teal"
      >
        <ConnectCTA department={department} />
        {team.length > 0 ? (
          <ContentGrid cols={3} animate className="mt-6">
            {team.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </ContentGrid>
        ) : (
          <EmptyState icon={Users} title="No team members listed yet" className="mt-6" />
        )}
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

      <PageSection title="Frequently asked questions" icon={HelpCircle} accent="gray">
        <FAQ items={faqItems} />
      </PageSection>
    </PageContainer>
  )
}
