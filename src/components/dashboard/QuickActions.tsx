import { Compass, FolderKanban, Coffee, Navigation, Calendar } from 'lucide-react'
import { QuickActionCard } from '@/components/common/QuickActionCard'
import type { AccentKey } from '@/config/accents'
import type { LucideIcon } from 'lucide-react'

interface Action {
  title: string
  description: string
  icon: LucideIcon
  to: string
  accent: AccentKey
}

const ACTIONS: Action[] = [
  { title: 'Explore Divisions', description: 'Browse every division at CDOT.', icon: Compass, to: '/explore', accent: 'green' },
  { title: 'Browse Projects', description: 'See cross-division work in action.', icon: FolderKanban, to: '/projects', accent: 'orange' },
  { title: 'Find a Mentor', description: 'Connect over a coffee chat.', icon: Coffee, to: '/people', accent: 'teal' },
  { title: 'Compass Guide', description: 'Find divisions that fit you.', icon: Navigation, to: '/compass-guide', accent: 'indigo' },
  { title: 'Upcoming Events', description: 'Talks, tours, and meetups.', icon: Calendar, to: '/events', accent: 'gold' },
]

/** Primary action cards for the dashboard. */
export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
      {ACTIONS.map((action) => (
        <QuickActionCard key={action.to} {...action} />
      ))}
    </div>
  )
}
