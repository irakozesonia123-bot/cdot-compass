import { Link } from 'react-router-dom'
import {
  BarChart3,
  AlertCircle,
  Lightbulb,
  Compass,
  Users,
  FolderKanban,
  Navigation,
  Rocket,
  Network,
  HeartHandshake,
  Sparkles,
  Share2,
  UserCheck,
  ShieldCheck,
  Route,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageSection } from '@/components/layout/PageSection'
import { StatsRow } from '@/components/layout/StatsRow'
import { StatCard } from '@/components/common/StatCard'
import { Card } from '@/components/common/Card'
import { CheckList } from '@/components/common/CheckList'
import { DemoDisclaimer } from '@/components/common/DemoDisclaimer'
import { MountainBackdrop } from '@/components/common/MountainBackdrop'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import { getStats } from '@/utils/data'
import { cn } from '@/lib/utils'

const OUTCOMES: { icon: LucideIcon; accent: AccentKey; title: string; text: string }[] = [
  { icon: Rocket, accent: 'blue', title: 'Faster onboarding', text: 'New interns find divisions, projects, and people in minutes instead of weeks.' },
  { icon: Network, accent: 'purple', title: 'Cross-division collaboration', text: 'Surfacing shared projects helps interns see how disciplines connect.' },
  { icon: HeartHandshake, accent: 'teal', title: 'Stronger mentorship', text: 'Clear availability makes it easier to start a coffee chat or job shadow.' },
  { icon: Sparkles, accent: 'gold', title: 'Better engagement', text: 'A guided, personalized experience encourages interns to explore further.' },
  { icon: Share2, accent: 'green', title: 'Knowledge transfer', text: 'Employee expertise and project history become discoverable, not hidden.' },
  { icon: UserCheck, accent: 'orange', title: 'Talent retention', text: 'Interns who connect early and feel supported are more likely to return.' },
]

const SOLUTION_FEATURES: { icon: LucideIcon; accent: AccentKey; title: string; text: string }[] = [
  { icon: Compass, accent: 'green', title: 'Explore divisions', text: 'Understand what each division does and the projects they run.' },
  { icon: FolderKanban, accent: 'orange', title: 'Discover projects', text: 'See real, cross-division work and who collaborates on it.' },
  { icon: Users, accent: 'teal', title: 'Connect with people', text: 'Find mentors and request coffee chats or job shadows.' },
  { icon: Navigation, accent: 'indigo', title: 'Compass Guide', text: 'A guided questionnaire that recommends a personalized starting point.' },
]

const DEMO_STEPS: { text: string; to?: string }[] = [
  { text: 'Start on the personalized Dashboard', to: '/' },
  { text: 'Open global search (⌘K) and search “Bridge”' },
  { text: 'Explore the Floyd Hill project and its participating divisions', to: '/project/prj-01' },
  { text: 'Meet the engineers on the project and open a profile' },
  { text: 'Request a coffee chat and copy a polished outreach message' },
  { text: 'Take the Compass Guide career discovery quiz', to: '/compass-guide' },
  { text: 'Review personalized recommendations with clear reasoning' },
  { text: 'Finish on this Executive Impact page', to: '/impact' },
]

/** Executive Impact — the case for CDOT Compass, framed for leadership. */
export default function Impact() {
  const stats = getStats()

  return (
    <PageContainer>
      <PageHeader
        title="Executive Impact"
        description="The case for CDOT Compass — what problem it solves and the value it could deliver."
        icon={BarChart3}
        accent="blue"
      />

      {/* Value proposition */}
      <div className="relative isolate overflow-hidden rounded-card bg-gradient-to-br from-primary via-primary to-cdot-navy p-7 text-white shadow-card sm:p-9">
        <MountainBackdrop className="absolute inset-x-0 bottom-0 -z-10 h-28 text-white" />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
          Innovation Challenge Prototype
        </span>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
          Career discovery, centralized — so interns spend less time searching and more time learning.
        </h2>
        <p className="mt-2 max-w-2xl text-white/85">
          CDOT Compass turns career exploration from accidental to intentional by making the people,
          projects, and opportunities that already exist easy to find in one place.
        </p>
      </div>

      <DemoDisclaimer text="CDOT Compass is a demonstration prototype built for the Innovation Challenge using fictional data. It is not an officially adopted CDOT system." />

      {/* Problem */}
      <PageSection title="The problem" icon={AlertCircle} accent="orange">
        <Card className="p-6">
          <p className="max-w-3xl text-body text-muted-foreground">
            The most valuable parts of an internship often happen outside assigned work — coffee
            chats, shadowing teams, and discovering divisions. But those opportunities are
            fragmented and depend heavily on initiative and luck. New interns struggle to discover:
          </p>
          <CheckList
            className="mt-4 max-w-2xl"
            items={[
              'Which divisions exist and what they actually do',
              'The projects teams are working on across the state',
              'Which employees enjoy mentoring — and how to reach them',
              'Networking opportunities, events, and resources',
              'What career pathways match their interests',
            ]}
          />
        </Card>
      </PageSection>

      {/* Solution */}
      <PageSection title="The solution" icon={Lightbulb} accent="green">
        <p className="max-w-3xl text-body text-muted-foreground">
          CDOT Compass is a centralized career discovery platform. It doesn't create new programs —
          it makes the opportunities that already exist visible, searchable, and easy to act on.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTION_FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </PageSection>

      {/* Scope by the numbers */}
      <PageSection title="Prototype scope" icon={BarChart3} accent="blue">
        <StatsRow>
          <StatCard label="Divisions" value={stats.departments} icon={Compass} accent="green" />
          <StatCard label="Employees" value={stats.employees} icon={Users} accent="teal" />
          <StatCard label="Projects" value={stats.projects} icon={FolderKanban} accent="orange" />
          <StatCard label="Resources & events" value={stats.resources + stats.events} icon={Sparkles} accent="gold" />
        </StatsRow>
      </PageSection>

      {/* Expected outcomes */}
      <PageSection
        title="Expected outcomes"
        description="Potential impact if developed further — directional, not yet measured."
        icon={Rocket}
        accent="indigo"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((o) => (
            <FeatureCard key={o.title} {...o} />
          ))}
        </div>
      </PageSection>

      {/* Demo flow */}
      <PageSection
        title="Suggested demo flow"
        description="How CDOT Compass tells the story of an intern discovering opportunities."
        icon={Route}
        accent="purple"
      >
        <Card className="p-6">
          <ol className="space-y-3">
            {DEMO_STEPS.map((step, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-small font-semibold text-primary">
                  {i + 1}
                </span>
                {step.to ? (
                  <Link to={step.to} className="text-small font-medium text-primary hover:underline">
                    {step.text}
                  </Link>
                ) : (
                  <span className="text-small text-foreground">{step.text}</span>
                )}
              </li>
            ))}
          </ol>
        </Card>
      </PageSection>

      {/* Scope statement */}
      <PageSection title="What this is — and isn't" icon={ShieldCheck} accent="gray">
        <Card className="space-y-3 p-6">
          <p className="text-body text-foreground">
            CDOT Compass is a working front-end <strong>prototype</strong> created during a summer
            internship as part of the CDOT Innovation Challenge.
          </p>
          <ul className="space-y-2 text-small text-muted-foreground">
            <li>• All employees, projects, and data shown are fictional.</li>
            <li>• It is a demonstration of the concept, not a production system.</li>
            <li>• It has not been officially adopted or deployed by CDOT.</li>
            <li>• The goal is to show what's possible and start a conversation.</li>
          </ul>
          <Link
            to="/spotlights"
            className="inline-flex items-center gap-1.5 pt-1 text-small font-semibold text-primary hover:underline"
          >
            Read the story behind this prototype
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Card>
      </PageSection>
    </PageContainer>
  )
}

function FeatureCard({
  icon: Icon,
  accent,
  title,
  text,
}: {
  icon: LucideIcon
  accent: AccentKey
  title: string
  text: string
}) {
  const accentStyle = ACCENT_STYLES[accent]
  return (
    <Card className="p-5">
      <span className={cn('flex h-11 w-11 items-center justify-center rounded-card', accentStyle.soft, accentStyle.icon)}>
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h3 className="mt-3 text-base font-semibold text-heading">{title}</h3>
      <p className="mt-1 text-small text-muted-foreground">{text}</p>
    </Card>
  )
}
