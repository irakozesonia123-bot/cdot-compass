import { Users, FolderKanban, BookOpen } from 'lucide-react'
import { QuickActionCard } from '@/components/common/QuickActionCard'

/** Closing prompts that encourage deeper exploration. */
export function ContinueExploring() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <QuickActionCard
        title="People"
        description="Meet engineers and mentors across CDOT."
        icon={Users}
        to="/people"
        accent="teal"
      />
      <QuickActionCard
        title="Projects"
        description="Explore cross-division transportation work."
        icon={FolderKanban}
        to="/projects"
        accent="orange"
      />
      <QuickActionCard
        title="Resources"
        description="Find training, ERGs, and career planning."
        icon={BookOpen}
        to="/resources"
        accent="blue"
      />
    </div>
  )
}
