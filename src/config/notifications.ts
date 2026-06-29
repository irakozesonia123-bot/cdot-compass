import type { AccentKey } from '@/config/accents'

/**
 * Demo notifications for the notification center. Static and fictional — no
 * backend. Each maps to a destination in the app so the center feels live.
 */
export interface AppNotification {
  id: string
  /** Lucide icon name resolved via getLucideIcon. */
  icon: string
  title: string
  description: string
  /** Relative time label. */
  time: string
  /** In-app destination. */
  to: string
  accent: AccentKey
}

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'ntf-1',
    icon: 'Coffee',
    title: 'Coffee chat confirmed',
    description: 'Maya Patel accepted your coffee chat request.',
    time: '2h ago',
    to: '/employee/emp-30',
    accent: 'teal',
  },
  {
    id: 'ntf-2',
    icon: 'Calendar',
    title: 'New event: Field Tour — I-25 South Gap',
    description: 'A construction site tour was just added for August.',
    time: 'Yesterday',
    to: '/events',
    accent: 'gold',
  },
  {
    id: 'ntf-3',
    icon: 'Star',
    title: 'New spotlight published',
    description: '“Building CDOT Compass from an intern’s perspective.”',
    time: '2 days ago',
    to: '/spotlights',
    accent: 'purple',
  },
  {
    id: 'ntf-4',
    icon: 'BookOpen',
    title: 'Resource recommended for you',
    description: 'Mentorship Matching Program — based on your interests.',
    time: '3 days ago',
    to: '/resources',
    accent: 'blue',
  },
  {
    id: 'ntf-5',
    icon: 'Navigation',
    title: 'Finish your Compass Guide',
    description: 'Answer a few questions to get personalized recommendations.',
    time: '4 days ago',
    to: '/compass-guide',
    accent: 'indigo',
  },
]
