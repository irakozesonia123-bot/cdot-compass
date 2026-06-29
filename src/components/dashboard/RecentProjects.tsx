import { ContentGrid } from '@/components/layout/ContentGrid'
import { ProjectCard } from '@/components/project/ProjectCard'
import { getRecentProjects } from '@/utils/data'

/** Most recently started projects, surfaced on the dashboard. */
export function RecentProjects() {
  const projects = getRecentProjects(3)

  return (
    <ContentGrid cols={3} animate>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ContentGrid>
  )
}
