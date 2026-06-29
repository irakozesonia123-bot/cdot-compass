import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Users,
  Sparkles,
  TrendingUp,
  FolderKanban,
  Heart,
  Lightbulb,
  Star,
  Check,
  Minus,
  type LucideIcon,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageSection } from '@/components/layout/PageSection'
import { ContentGrid } from '@/components/layout/ContentGrid'
import { Card } from '@/components/common/Card'
import { Tag } from '@/components/common/Tag'
import { Timeline } from '@/components/common/Timeline'
import { EmptyState } from '@/components/common/EmptyState'
import { EmployeeCard } from '@/components/employee/EmployeeCard'
import { ProjectCard } from '@/components/project/ProjectCard'
import { EmployeeHero } from '@/components/employee/EmployeeHero'
import { CoffeeChatModal } from '@/components/employee/CoffeeChatModal'
import { JobShadowModal } from '@/components/employee/JobShadowModal'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { recordRecent } from '@/hooks/useRecentlyViewed'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import {
  getEmployeeById,
  getProjectsByEmployee,
  getRelatedEmployees,
} from '@/utils/data'
import { cn } from '@/lib/utils'

export default function Employee() {
  const { id } = useParams()
  const employee = id ? getEmployeeById(id) : undefined
  const [coffeeOpen, setCoffeeOpen] = useState(false)
  const [shadowOpen, setShadowOpen] = useState(false)

  useEffect(() => {
    if (employee) {
      recordRecent({
        id: employee.id,
        type: 'employee',
        title: employee.name,
        subtitle: employee.title,
        to: `/employee/${employee.id}`,
      })
    }
  }, [employee])

  if (!employee) {
    return (
      <PageContainer>
        <EmptyState
          icon={Users}
          title="Person not found"
          description="We couldn't find that profile. Browse the full directory instead."
          action={
            <Link
              to="/people"
              className="rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to People
            </Link>
          }
        />
      </PageContainer>
    )
  }

  const firstName = employee.name.split(' ')[0]
  const projects = getProjectsByEmployee(employee.id)
  const related = getRelatedEmployees(employee, 3)

  const availability = [
    { label: 'Mentorship', on: employee.mentor },
    { label: 'Coffee chats', on: employee.coffeeChat },
    { label: 'Job shadowing', on: employee.jobShadow },
    { label: 'Career advice', on: employee.careerAdvice },
  ]

  return (
    <PageContainer>
      <Breadcrumbs items={[{ label: 'People', to: '/people' }, { label: employee.name }]} />
      <EmployeeHero
        employee={employee}
        onCoffeeChat={() => setCoffeeOpen(true)}
        onJobShadow={() => setShadowOpen(true)}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <PageSection title="About" icon={Users} accent="teal">
            <p className="max-w-3xl text-body text-muted-foreground">{employee.bio}</p>
          </PageSection>

          <PageSection title={`Get to know ${firstName}`} icon={Sparkles} accent="purple">
            <div className="grid gap-4 sm:grid-cols-2">
              <Callout icon={Heart} accent="teal" label="Favorite part of the job">
                {employee.favoritePart}
              </Callout>
              <Callout icon={Lightbulb} accent="gold" label="Advice for interns">
                {employee.advice}
              </Callout>
              <Callout icon={Star} accent="orange" label="Favorite project">
                {employee.favoriteProject}
              </Callout>
              <Callout icon={Sparkles} accent="purple" label="Fun fact">
                {employee.funFact}
              </Callout>
            </div>
          </PageSection>

          <PageSection title="Career journey" icon={TrendingUp} accent="green">
            <Card className="p-6">
              <Timeline steps={employee.careerJourney} />
            </Card>
          </PageSection>

          <PageSection title="Projects" icon={FolderKanban} accent="orange">
            {projects.length > 0 ? (
              <ContentGrid cols={2} animate>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </ContentGrid>
            ) : (
              <EmptyState icon={FolderKanban} title="No projects listed yet" />
            )}
          </PageSection>
        </div>

        <aside className="space-y-6">
          <Card className="p-6">
            <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
              Skills
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {employee.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-small font-semibold uppercase tracking-wide text-muted-foreground">
              Available for
            </h3>
            <ul className="mt-3 space-y-2.5">
              {availability.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5 text-small">
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full',
                      item.on ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {item.on ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                  </span>
                  <span className={item.on ? 'text-foreground' : 'text-muted-foreground line-through'}>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>

      {related.length > 0 && (
        <PageSection
          title="People you might want to meet"
          description="Colleagues and mentors with related expertise."
          icon={Users}
          accent="teal"
        >
          <ContentGrid cols={3} animate>
            {related.map((person) => (
              <EmployeeCard key={person.id} employee={person} />
            ))}
          </ContentGrid>
        </PageSection>
      )}

      <CoffeeChatModal employee={employee} open={coffeeOpen} onClose={() => setCoffeeOpen(false)} />
      <JobShadowModal employee={employee} open={shadowOpen} onClose={() => setShadowOpen(false)} />
    </PageContainer>
  )
}

function Callout({
  icon: Icon,
  accent,
  label,
  children,
}: {
  icon: LucideIcon
  accent: AccentKey
  label: string
  children: ReactNode
}) {
  const accentStyle = ACCENT_STYLES[accent]
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-button',
            accentStyle.soft,
            accentStyle.icon,
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="text-small font-semibold text-heading">{label}</h3>
      </div>
      <p className="mt-2 text-small text-muted-foreground">{children}</p>
    </Card>
  )
}
