import { useState } from 'react'
import {
  Building2,
  Waves,
  Plane,
  TrafficCone,
  Map,
  Leaf,
  HardHat,
  Layers,
  FlaskConical,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cardClass } from '@/components/common/Card'
import { Tag } from '@/components/common/Tag'
import { CareerPathModal } from '@/components/ai/CareerPathModal'
import { ACCENT_STYLES, type AccentKey } from '@/config/accents'
import { CAREER_PATHS, type CareerPath } from '@/utils/compassGuide'
import { getDepartmentBySlug } from '@/utils/data'
import { hoverLift } from '@/animations/variants'
import { cn } from '@/lib/utils'

/** Icon + accent per path (keyed by division slug). */
const PATH_STYLE: Record<string, { icon: LucideIcon; accent: AccentKey }> = {
  'bridge-asset-management': { icon: Building2, accent: 'blue' },
  hydraulics: { icon: Waves, accent: 'teal' },
  aviation: { icon: Plane, accent: 'indigo' },
  'traffic-safety': { icon: TrafficCone, accent: 'gold' },
  planning: { icon: Map, accent: 'green' },
  environmental: { icon: Leaf, accent: 'green' },
  construction: { icon: HardHat, accent: 'orange' },
  materials: { icon: Layers, accent: 'purple' },
  'applied-research': { icon: FlaskConical, accent: 'indigo' },
}

/** Browse engineering career paths; each opens a detail modal. */
export function CareerPathExplorer() {
  const [activePath, setActivePath] = useState<CareerPath | null>(null)
  const [open, setOpen] = useState(false)

  const openPath = (path: CareerPath) => {
    setActivePath(path)
    setOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAREER_PATHS.map((path) => {
          const department = getDepartmentBySlug(path.slug)
          if (!department) return null
          const style = PATH_STYLE[path.slug] ?? { icon: Building2, accent: 'blue' as AccentKey }
          const accent = ACCENT_STYLES[style.accent]
          const Icon = style.icon

          return (
            <motion.div key={path.slug} whileHover={hoverLift} className="group h-full">
              <button
                type="button"
                onClick={() => openPath(path)}
                className={cn(
                  cardClass,
                  'flex h-full w-full flex-col p-5 text-left transition-shadow duration-200 hover:shadow-card-hover',
                )}
              >
                <span className={cn('flex h-11 w-11 items-center justify-center rounded-card', accent.soft, accent.icon)}>
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-3 text-card-title font-semibold text-heading">{path.label}</h3>
                <p className="mt-1 line-clamp-2 text-small text-muted-foreground">{department.mission}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {department.skills.slice(0, 3).map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-small font-semibold text-primary">
                  Explore this path
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </button>
            </motion.div>
          )
        })}
      </div>

      <CareerPathModal path={activePath} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
