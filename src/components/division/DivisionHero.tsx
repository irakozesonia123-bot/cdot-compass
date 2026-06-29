import { motion } from 'framer-motion'
import { Users, FolderKanban, Building2 } from 'lucide-react'
import type { Department } from '@/types'
import { MediaImage } from '@/components/common/MediaImage'
import { reveal } from '@/animations/variants'

interface DivisionHeroProps {
  department: Department
}

/**
 * Full-width division hero: transportation image with a dark gradient,
 * focus tags, name, mission, and in-page navigation buttons.
 */
export function DivisionHero({ department }: DivisionHeroProps) {
  return (
    <motion.section
      variants={reveal}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-card shadow-card"
    >
      <div className="absolute inset-0 bg-muted">
        <MediaImage src={department.image} alt="" icon={Building2} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-cdot-navy/95 via-cdot-navy/60 to-cdot-navy/25" />

      <div className="relative flex min-h-[320px] flex-col justify-end p-7 text-white sm:p-9">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {department.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{department.name}</h1>
        <p className="mt-2 max-w-2xl text-white/90">{department.mission}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#team"
            className="inline-flex items-center gap-2 rounded-button bg-white px-5 py-2.5 text-small font-semibold text-cdot-navy transition-colors hover:bg-white/90"
          >
            <Users className="h-4 w-4" aria-hidden />
            Meet the Team
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-button border border-white/40 px-5 py-2.5 text-small font-semibold text-white transition-colors hover:bg-white/10"
          >
            <FolderKanban className="h-4 w-4" aria-hidden />
            View Projects
          </a>
        </div>
      </div>
    </motion.section>
  )
}
