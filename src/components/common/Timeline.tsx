import { GraduationCap, Sparkles, Briefcase, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CareerStep } from '@/types'
import { staggerContainer, staggerItem } from '@/animations/variants'
import { cn } from '@/lib/utils'

const STEP_ICON: Record<CareerStep['type'], LucideIcon> = {
  education: GraduationCap,
  internship: Sparkles,
  role: Briefcase,
}

interface TimelineProps {
  steps: CareerStep[]
  className?: string
}

/**
 * Vertical career-journey timeline. Each step shows an icon by type, with the
 * current role emphasized. Steps reveal in a gentle stagger on scroll-in.
 */
export function Timeline({ steps, className }: TimelineProps) {
  return (
    <motion.ol
      className={cn('relative', className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {steps.map((step, i) => {
        const Icon = STEP_ICON[step.type]
        const isLast = i === steps.length - 1
        return (
          <motion.li key={`${step.title}-${i}`} variants={staggerItem} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Connector line */}
            {!isLast && (
              <span
                className="absolute left-[19px] top-10 h-[calc(100%-1.75rem)] w-px bg-border"
                aria-hidden
              />
            )}
            {/* Node */}
            <span
              className={cn(
                'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border',
                step.current
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground',
              )}
            >
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            {/* Content */}
            <div className="pt-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-small font-semibold text-heading">{step.title}</h4>
                {step.current && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    Current
                  </span>
                )}
              </div>
              <p className="text-small text-muted-foreground">{step.subtitle}</p>
              <p className="mt-0.5 text-xs text-muted-foreground/80">{step.period}</p>
            </div>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}
