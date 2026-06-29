import {
  LayoutDashboard,
  Compass,
  FolderKanban,
  Users,
  Navigation,
  BookOpen,
  Calendar,
  Star,
  Settings,
  Bookmark,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'
import type { AccentKey } from '@/config/accents'

/**
 * Single source of truth for the primary sidebar navigation.
 * Both the router and the sidebar consume this list so routes and
 * navigation links can never drift apart.
 */
export interface NavItem {
  /** Display label shown in the sidebar */
  label: string
  /** Absolute route path */
  path: string
  /** Lucide icon component */
  icon: LucideIcon
  /** Short description used for tooltips / accessibility */
  description: string
  /** Intentional accent color for this page's icon */
  accent: AccentKey
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    description: 'Your starting point across CDOT Compass',
    accent: 'blue',
  },
  {
    label: 'Explore',
    path: '/explore',
    icon: Compass,
    description: 'Browse every division at CDOT',
    accent: 'green',
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: FolderKanban,
    description: 'See how disciplines collaborate on real projects',
    accent: 'orange',
  },
  {
    label: 'People',
    path: '/people',
    icon: Users,
    description: 'Find employees, mentors, and coffee chats',
    accent: 'teal',
  },
  {
    label: 'Compass Guide',
    path: '/compass-guide',
    icon: Navigation,
    description: 'A guided way to navigate your career interests',
    accent: 'indigo',
  },
  {
    label: 'Resources',
    path: '/resources',
    icon: BookOpen,
    description: 'Professional development and learning',
    accent: 'blue',
  },
  {
    label: 'Events',
    path: '/events',
    icon: Calendar,
    description: 'Upcoming sessions, talks, and meetups',
    accent: 'gold',
  },
  {
    label: 'Spotlights',
    path: '/spotlights',
    icon: Star,
    description: 'Employee stories and career journeys',
    accent: 'purple',
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    description: 'Preferences and demo options',
    accent: 'gray',
  },
]

/** Secondary nav group ("Your space") shown beneath the primary items. */
export const SECONDARY_NAV_ITEMS: NavItem[] = [
  {
    label: 'Saved',
    path: '/saved',
    icon: Bookmark,
    description: 'People, projects, resources, and events you saved',
    accent: 'gray',
  },
  {
    label: 'Impact',
    path: '/impact',
    icon: BarChart3,
    description: 'The case for CDOT Compass — for leadership',
    accent: 'blue',
  },
]
