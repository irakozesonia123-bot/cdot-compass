import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { FilterChip } from '@/components/common/FilterBar'
import { QUIZ_QUESTIONS, type QuizAnswers } from '@/utils/compassGuide'

interface CompassQuizProps {
  onComplete: (answers: QuizAnswers) => void
  onCancel: () => void
}

/**
 * Multi-step onboarding questionnaire. One practical question at a time with a
 * progress bar; answers feed the recommendation engine. Designed to feel like
 * a thoughtful intake, not a personality quiz.
 */
export function CompassQuiz({ onComplete, onCancel }: CompassQuizProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})

  const question = QUIZ_QUESTIONS[step]
  const selected = answers[question.id] ?? []
  const isLast = step === QUIZ_QUESTIONS.length - 1
  const canContinue = selected.length > 0

  const toggle = (value: string) => {
    setAnswers((prev) => {
      const current = prev[question.id] ?? []
      if (question.multi) {
        return {
          ...prev,
          [question.id]: current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value],
        }
      }
      return { ...prev, [question.id]: [value] }
    })
  }

  const next = () => {
    if (!canContinue) return
    if (isLast) onComplete(answers)
    else setStep((s) => s + 1)
  }
  const back = () => (step === 0 ? onCancel() : setStep((s) => s - 1))

  const progress = Math.round(((step + 1) / QUIZ_QUESTIONS.length) * 100)

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center justify-between text-small text-muted-foreground">
        <span className="font-medium">
          Question {step + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span>{question.multi ? 'Select all that apply' : 'Choose one'}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <h2 className="text-xl font-semibold text-heading sm:text-2xl">{question.prompt}</h2>
          <p className="mt-1 text-small text-muted-foreground">{question.helper}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {question.options.map((option) => {
              const active = selected.includes(option.value)
              return (
                <FilterChip
                  key={option.value}
                  label={option.label}
                  active={active}
                  onClick={() => toggle(option.value)}
                />
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          className="inline-flex items-center gap-1.5 rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {step === 0 ? 'Cancel' : 'Back'}
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canContinue}
          className="inline-flex items-center gap-1.5 rounded-button bg-primary px-5 py-2.5 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              See my matches
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </div>
    </Card>
  )
}
