import { Navigation, FolderKanban, Calendar, Star, TrendingUp, Sparkles, Users, Compass } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageSection } from '@/components/layout/PageSection'
import { ViewAllLink } from '@/components/common/ViewAllLink'
import { WelcomeHero } from '@/components/dashboard/WelcomeHero'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RecommendedForYou } from '@/components/dashboard/RecommendedForYou'
import { RecommendedPeople } from '@/components/dashboard/RecommendedPeople'
import { RecommendedProjects } from '@/components/dashboard/RecommendedProjects'
import { UpcomingEventsSection } from '@/components/dashboard/UpcomingEventsSection'
import { FeaturedSpotlight } from '@/components/dashboard/FeaturedSpotlight'
import { InternProgress } from '@/components/dashboard/InternProgress'
import { ContinueExploring } from '@/components/dashboard/ContinueExploring'
import {
  CompassGuideCard,
  RecentlyViewedCard,
  SavedItemsCard,
  CoffeeActivityCard,
} from '@/components/dashboard/DashboardWidgets'

/**
 * Dashboard — the intern's personalized home base. A welcome hero and quick
 * actions up top, then a two-column workspace: interest-based recommendations
 * in the main column and personal widgets (Compass Guide, recently viewed,
 * saved, coffee activity) in the sidebar.
 */
export default function Dashboard() {
  return (
    <PageContainer>
      <WelcomeHero />

      <PageSection title="Quick actions" icon={Sparkles} accent="blue">
        <QuickActions />
      </PageSection>

      <div className="grid gap-x-8 gap-y-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <PageSection
            title="Recommended for you"
            description="Divisions that match your interests."
            icon={Navigation}
            accent="indigo"
            action={<ViewAllLink to="/compass-guide" label="Compass Guide" />}
          >
            <RecommendedForYou />
          </PageSection>

          <PageSection
            title="People to meet"
            icon={Users}
            accent="teal"
            action={<ViewAllLink to="/people" />}
          >
            <RecommendedPeople />
          </PageSection>

          <PageSection
            title="Projects for you"
            icon={FolderKanban}
            accent="orange"
            action={<ViewAllLink to="/projects" />}
          >
            <RecommendedProjects />
          </PageSection>

          <PageSection
            title="Upcoming events"
            icon={Calendar}
            accent="gold"
            action={<ViewAllLink to="/events" />}
          >
            <UpcomingEventsSection />
          </PageSection>
        </div>

        <aside className="space-y-6">
          <CompassGuideCard />
          <RecentlyViewedCard />
          <SavedItemsCard />
          <CoffeeActivityCard />
        </aside>
      </div>

      <PageSection title="Featured spotlight" icon={Star} accent="purple" action={<ViewAllLink to="/spotlights" />}>
        <FeaturedSpotlight />
      </PageSection>

      <PageSection
        title="Internship progress"
        description="Your onboarding journey so far."
        icon={TrendingUp}
        accent="green"
      >
        <InternProgress />
      </PageSection>

      <PageSection title="Continue exploring" icon={Compass} accent="green">
        <ContinueExploring />
      </PageSection>
    </PageContainer>
  )
}
