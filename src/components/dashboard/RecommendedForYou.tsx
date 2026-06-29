import { ContentGrid } from '@/components/layout/ContentGrid'
import { RecommendationCard } from '@/components/ai/RecommendationCard'
import { INTERN_PROFILE } from '@/config/internProfile'
import { getRecommendedDepartments } from '@/utils/recommendations'

/** Interest-based division recommendations for the current intern. */
export function RecommendedForYou() {
  const recommendations = getRecommendedDepartments(INTERN_PROFILE.interests, {
    excludeSlug: INTERN_PROFILE.currentDivision,
    limit: 4,
  })

  return (
    <ContentGrid cols={2} animate>
      {recommendations.map((rec) => (
        <RecommendationCard
          key={rec.department.id}
          department={rec.department}
          score={rec.score}
          reason={rec.reason}
        />
      ))}
    </ContentGrid>
  )
}
