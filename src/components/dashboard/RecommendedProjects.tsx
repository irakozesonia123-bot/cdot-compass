import { ContentGrid } from '@/components/layout/ContentGrid'
import { ProjectCard } from '@/components/project/ProjectCard'
import { INTERN_PROFILE } from '@/config/internProfile'
import { recommendProjects } from '@/utils/recommendations'

/** Projects that align with the intern's interests. */
export function RecommendedProjects() {
  const recs = recommendProjects(INTERN_PROFILE.interests, 3)
  return (
    <ContentGrid cols={3} animate>
      {recs.map((rec) => (
        <ProjectCard key={rec.project.id} project={rec.project} />
      ))}
    </ContentGrid>
  )
}
