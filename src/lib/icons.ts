import {
  Users,
  MessageSquare,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Laptop,
  Wrench,
  Award,
  Sparkles,
  Target,
  Map,
  BadgeCheck,
  TrendingUp,
  PlayCircle,
  Library,
  Network,
  type LucideIcon,
} from 'lucide-react'

/**
 * Resolves the Lucide icon name stored in JSON data (e.g. resources) to its
 * component. Falls back to a neutral icon so unknown names never crash a render.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  MessageSquare,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Laptop,
  Wrench,
  Award,
  Sparkles,
  Target,
  Map,
  BadgeCheck,
  TrendingUp,
  PlayCircle,
  Library,
  Network,
}

export function getLucideIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? BookOpen
}
