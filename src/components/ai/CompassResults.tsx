import type { ReactNode } from 'react'
import { Compass, Users, FolderKanban, BookOpen, Calendar, Star, RotateCcw, Navigation } from 'lucide-react'
import { PageSection } from '@/components/layout/PageSection'
import { ContentGrid } from '@/components/layout/ContentGrid'
import { Tag } from '@/components/common/Tag'
import { RecommendationCard } from '@/components/ai/RecommendationCard'
import { EmployeeCard } from '@/components/employee/EmployeeCard'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ResourceCard } from '@/components/resources/ResourceCard'
import { EventCard } from '@/components/events/EventCard'
import { SpotlightCard } from '@/components/spotlights/SpotlightCard'
import type { CompassRecommendations } from '@/utils/compassGuide'

interface CompassResultsProps {
  recommendations: CompassRecommendations
  onRetake: () => void
}

/** "Why" caption shown beneath a recommended card. */
function Why({ reason, children }: { reason: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex-1">{children}</div>
      <p className="text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Why: </span>
        {reason}
      </p>
    </div>
  )
}

/** Personalized recommendations with clear reasoning for each suggestion. */
export function CompassResults({ recommendations, onRetake }: CompassResultsProps) {
  const { divisions, people, projects, resources, events, spotlights, interests } = recommendations

  return (
    <div className="space-y-12">
      <div className="rounded-card border border-border bg-gradient-to-br from-primary/5 to-cdot-indigo/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-card bg-primary/10 text-primary">
              <Navigation className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-heading sm:text-2xl">Your Compass matches</h2>
              <p className="text-small text-muted-foreground">
                Personalized from your answers — here’s where to start and why.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Retake
          </button>
        </div>
        {interests.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="text-small text-muted-foreground">Based on:</span>
            {interests.slice(0, 6).map((interest) => (
              <Tag key={interest}>{interest}</Tag>
            ))}
          </div>
        )}
      </div>

      <PageSection title="Best-fit divisions" icon={Compass} accent="green">
        <ContentGrid cols={3} animate>
          {divisions.map((rec) => (
            <RecommendationCard
              key={rec.department.id}
              department={rec.department}
              score={rec.score}
              reason={rec.reason}
            />
          ))}
        </ContentGrid>
      </PageSection>

      {people.length > 0 && (
        <PageSection title="People to connect with" icon={Users} accent="teal">
          <ContentGrid cols={3} animate>
            {people.map((rec) => (
              <Why key={rec.item.id} reason={rec.reason}>
                <EmployeeCard employee={rec.item} />
              </Why>
            ))}
          </ContentGrid>
        </PageSection>
      )}

      {projects.length > 0 && (
        <PageSection title="Projects to explore" icon={FolderKanban} accent="orange">
          <ContentGrid cols={3} animate>
            {projects.map((rec) => (
              <Why key={rec.item.id} reason={rec.reason}>
                <ProjectCard project={rec.item} />
              </Why>
            ))}
          </ContentGrid>
        </PageSection>
      )}

      {resources.length > 0 && (
        <PageSection title="Resources for you" icon={BookOpen} accent="blue">
          <ContentGrid cols={3} animate>
            {resources.map((rec) => (
              <Why key={rec.item.id} reason={rec.reason}>
                <ResourceCard resource={rec.item} />
              </Why>
            ))}
          </ContentGrid>
        </PageSection>
      )}

      {events.length > 0 && (
        <PageSection title="Events to attend" icon={Calendar} accent="gold">
          <ContentGrid cols={2} animate>
            {events.map((rec) => (
              <Why key={rec.item.id} reason={rec.reason}>
                <EventCard event={rec.item} />
              </Why>
            ))}
          </ContentGrid>
        </PageSection>
      )}

      {spotlights.length > 0 && (
        <PageSection title="A story to learn from" icon={Star} accent="purple">
          <ContentGrid cols={3} animate>
            {spotlights.map((rec) => (
              <Why key={rec.item.id} reason={rec.reason}>
                <SpotlightCard spotlight={rec.item} />
              </Why>
            ))}
          </ContentGrid>
        </PageSection>
      )}
    </div>
  )
}
