import { Link } from 'react-router-dom'
import { UserRound, Building2, Settings, ArrowRight, Sparkles } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageSection } from '@/components/layout/PageSection'
import { Card } from '@/components/common/Card'
import { Tag } from '@/components/common/Tag'
import { InternProgress } from '@/components/dashboard/InternProgress'
import {
  CompassGuideCard,
  SavedItemsCard,
  CoffeeActivityCard,
  RecentlyViewedCard,
} from '@/components/dashboard/DashboardWidgets'
import { INTERN_PROFILE } from '@/config/internProfile'
import { getEmployeeById, getDepartmentBySlug } from '@/utils/data'

/** The intern's personal profile and workspace. */
export default function Profile() {
  const self = getEmployeeById(INTERN_PROFILE.selfId)
  const division = getDepartmentBySlug(INTERN_PROFILE.currentDivision)

  return (
    <PageContainer>
      <PageHeader title="Your Profile" icon={UserRound} accent="teal" />

      {/* Identity card */}
      <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {self && (
            <img
              src={self.image}
              alt=""
              className="h-16 w-16 rounded-card object-cover ring-2 ring-border"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold text-heading">{INTERN_PROFILE.name} Irakoze</h2>
            <p className="text-small text-muted-foreground">{INTERN_PROFILE.role}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-muted-foreground">
              {division && (
                <Link
                  to={`/division/${division.slug}`}
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  <Building2 className="h-4 w-4" aria-hidden />
                  {division.name}
                </Link>
              )}
              <span>Week {INTERN_PROFILE.weekNumber} of {INTERN_PROFILE.programWeeks}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {self && (
            <Link
              to={`/employee/${self.id}`}
              className="inline-flex items-center gap-1.5 rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View public profile
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
          <Link
            to="/settings"
            className="inline-flex items-center gap-1.5 rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Settings className="h-4 w-4" aria-hidden />
            Settings
          </Link>
        </div>
      </Card>

      <div className="grid gap-x-8 gap-y-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <PageSection title="Career interests" icon={Sparkles} accent="indigo">
            <Card className="p-6">
              <div className="flex flex-wrap gap-1.5">
                {INTERN_PROFILE.interests.map((interest) => (
                  <Tag key={interest}>{interest}</Tag>
                ))}
              </div>
              <p className="mt-4 text-small text-muted-foreground">
                These shape your recommendations.{' '}
                <Link to="/compass-guide" className="font-medium text-primary hover:underline">
                  Take the Compass Guide
                </Link>{' '}
                to refine them.
              </p>
            </Card>
          </PageSection>

          <PageSection title="Internship progress" icon={Sparkles} accent="green">
            <InternProgress />
          </PageSection>
        </div>

        <aside className="space-y-6">
          <CompassGuideCard />
          <SavedItemsCard />
          <CoffeeActivityCard />
          <RecentlyViewedCard />
        </aside>
      </div>
    </PageContainer>
  )
}
