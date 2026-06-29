import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation, Route, Compass, Users, FolderKanban, BookOpen, Calendar } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageSection } from '@/components/layout/PageSection'
import { DemoDisclaimer } from '@/components/common/DemoDisclaimer'
import { HeroPattern } from '@/components/common/HeroPattern'
import { CompassQuiz } from '@/components/ai/CompassQuiz'
import { CompassResults } from '@/components/ai/CompassResults'
import { CareerPathExplorer } from '@/components/ai/CareerPathExplorer'
import { AiPreviewCard } from '@/components/ai/AiPreviewCard'
import {
  computeRecommendations,
  type QuizAnswers,
  type CompassRecommendations,
} from '@/utils/compassGuide'

type Phase = 'intro' | 'quiz' | 'analyzing' | 'results'

/** Compass Guide — onboarding & career discovery assistant for new interns. */
export default function CompassGuide() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [recommendations, setRecommendations] = useState<CompassRecommendations | null>(null)

  const handleComplete = (answers: QuizAnswers) => {
    setPhase('analyzing')
    const today = new Date().toISOString().slice(0, 10)
    window.setTimeout(() => {
      setRecommendations(computeRecommendations(answers, today))
      setPhase('results')
    }, 1400)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Compass Guide"
        description="Your onboarding assistant — answer a few questions and get pointed toward divisions, projects, people, resources, and events that fit."
        icon={Navigation}
        accent="indigo"
      />

      <section>
        {phase === 'intro' && <IntroCard onStart={() => setPhase('quiz')} />}
        {phase === 'quiz' && (
          <CompassQuiz onComplete={handleComplete} onCancel={() => setPhase('intro')} />
        )}
        {phase === 'analyzing' && <Analyzing />}
        {phase === 'results' && recommendations && (
          <CompassResults
            recommendations={recommendations}
            onRetake={() => {
              setRecommendations(null)
              setPhase('quiz')
            }}
          />
        )}
      </section>

      <PageSection
        title="Career Path Explorer"
        description="Browse engineering paths at CDOT and see what each one actually involves."
        icon={Route}
        accent="green"
      >
        <CareerPathExplorer />
      </PageSection>

      <AiPreviewCard />

      <DemoDisclaimer text="Demo recommendations are generated from fictional CDOT data." />
    </PageContainer>
  )
}

function IntroCard({ onStart }: { onStart: () => void }) {
  const items = [
    { icon: Compass, label: 'Best-fit divisions' },
    { icon: FolderKanban, label: 'Projects to explore' },
    { icon: Users, label: 'People to meet' },
    { icon: BookOpen, label: 'Helpful resources' },
    { icon: Calendar, label: 'Events to attend' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate overflow-hidden rounded-card bg-gradient-to-br from-primary to-cdot-navy p-8 text-white shadow-card sm:p-10"
    >
      <HeroPattern className="absolute inset-0 -z-10 text-white" />
      <span className="flex h-12 w-12 items-center justify-center rounded-card bg-white/15">
        <Navigation className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Find your fit at CDOT</h2>
      <p className="mt-2 max-w-xl text-white/90">
        Answer a few practical questions about your interests and goals. Compass Guide recommends
        where to start — and explains the reasoning behind every suggestion.
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="inline-flex items-center gap-2 text-small text-white/90">
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onStart}
        className="mt-6 inline-flex items-center gap-2 rounded-button bg-white px-5 py-2.5 text-small font-semibold text-primary transition-colors hover:bg-white/90"
      >
        <Navigation className="h-4 w-4" aria-hidden />
        Start career discovery
      </button>
      <p className="mt-3 text-xs text-white/70">About a minute · 7 questions · No sign-in needed</p>
    </motion.div>
  )
}

const ANALYZING_MESSAGES = [
  'Reading your answers…',
  'Matching divisions…',
  'Finding people & projects…',
  'Picking resources & events…',
]

function Analyzing() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % ANALYZING_MESSAGES.length),
      400,
    )
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-card border border-border bg-card p-8 text-center shadow-card">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <Compass className="h-8 w-8" aria-hidden />
      </motion.div>
      <p className="mt-5 text-body font-medium text-heading" aria-live="polite">
        {ANALYZING_MESSAGES[index]}
      </p>
      <p className="mt-1 text-small text-muted-foreground">Building your personalized matches</p>
    </div>
  )
}
