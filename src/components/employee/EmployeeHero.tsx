import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Coffee, Eye, Bookmark, MapPin, Briefcase, Building2 } from 'lucide-react'
import type { Employee } from '@/types'
import { cardClass } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { reveal } from '@/animations/variants'
import { getDepartmentBySlug } from '@/utils/data'
import { useBookmarks } from '@/hooks/useBookmarks'
import { cn } from '@/lib/utils'

interface EmployeeHeroProps {
  employee: Employee
  onCoffeeChat: () => void
  onJobShadow: () => void
}

/** Employee profile header: portrait, identity, availability, and CTAs. */
export function EmployeeHero({ employee, onCoffeeChat, onJobShadow }: EmployeeHeroProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const division = getDepartmentBySlug(employee.division)
  const bookmarked = isBookmarked(employee.id)

  return (
    <motion.section
      variants={reveal}
      initial="hidden"
      animate="visible"
      className={cn(cardClass, 'p-6 sm:p-8')}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <img
          src={employee.image}
          alt={`Portrait of ${employee.name}`}
          className="h-28 w-28 shrink-0 rounded-card object-cover ring-2 ring-border"
        />

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            {employee.name}
          </h1>
          <p className="mt-0.5 text-body text-muted-foreground">{employee.title}</p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-small text-muted-foreground">
            {division && (
              <Link
                to={`/division/${division.slug}`}
                className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
              >
                <Building2 className="h-4 w-4" aria-hidden />
                {division.name}
              </Link>
            )}
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden />
              {employee.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" aria-hidden />
              {employee.yearsExperience} yrs experience
            </span>
            <span className="text-muted-foreground/80">{employee.pronouns}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {employee.coffeeChat && <Badge tone="success" dot>Coffee chats</Badge>}
            {employee.mentor && <Badge tone="primary" dot>Mentoring</Badge>}
            {employee.jobShadow && <Badge tone="info" dot>Job shadows</Badge>}
            {employee.careerAdvice && <Badge tone="neutral" dot>Career advice</Badge>}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onCoffeeChat}
          className="inline-flex items-center justify-center gap-1.5 rounded-button bg-primary px-5 py-2.5 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Coffee className="h-4 w-4" aria-hidden />
          Request coffee chat
        </button>
        <button
          type="button"
          onClick={onJobShadow}
          className="inline-flex items-center justify-center gap-1.5 rounded-button border border-border bg-card px-5 py-2.5 text-small font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <Eye className="h-4 w-4" aria-hidden />
          Request job shadow
        </button>
        <button
          type="button"
          onClick={() => toggleBookmark(employee.id, employee.name)}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this person'}
          className={cn(
            'inline-flex items-center justify-center gap-1.5 rounded-button border px-4 py-2.5 text-small font-semibold transition-colors',
            bookmarked
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-card text-foreground hover:bg-muted',
          )}
        >
          <Bookmark className={cn('h-4 w-4', bookmarked && 'fill-current')} aria-hidden />
          {bookmarked ? 'Saved' : 'Save'}
        </button>
      </div>
    </motion.section>
  )
}
