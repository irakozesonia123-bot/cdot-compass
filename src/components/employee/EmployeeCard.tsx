import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Coffee, MapPin } from 'lucide-react'
import type { Employee } from '@/types'
import { cardClass } from '@/components/common/Card'
import { SaveButton } from '@/components/common/SaveButton'
import { Tag } from '@/components/common/Tag'
import { Badge } from '@/components/common/Badge'
import { hoverLift } from '@/animations/variants'
import { getDepartmentBySlug } from '@/utils/data'
import { useDemoAction } from '@/hooks/useDemoAction'
import { cn } from '@/lib/utils'

interface EmployeeCardProps {
  employee: Employee
  className?: string
}

/**
 * Directory card for an employee: portrait, role, division, location,
 * availability, a few skills, and quick actions (coffee chat + view profile).
 */
export function EmployeeCard({ employee, className }: EmployeeCardProps) {
  const { requestCoffeeChat } = useDemoAction()
  const divisionName = getDepartmentBySlug(employee.division)?.name ?? employee.division

  return (
    <motion.article
      whileHover={hoverLift}
      className={cn(cardClass, 'relative flex h-full flex-col p-5', className)}
    >
      <SaveButton id={employee.id} label={employee.name} className="absolute right-3 top-3" />
      <div className="flex items-start gap-4 pr-8">
        <img
          src={employee.image}
          alt=""
          loading="lazy"
          className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-border"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-heading">{employee.name}</h3>
          <p className="truncate text-small text-muted-foreground">{employee.title}</p>
          <p className="mt-0.5 truncate text-small font-medium text-primary">{divisionName}</p>
        </div>
      </div>

      <p className="mt-3 inline-flex items-center gap-1.5 text-small text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" aria-hidden />
        {employee.location}
        <span aria-hidden>·</span>
        {employee.yearsExperience} yrs
      </p>

      <p className="mt-2 line-clamp-2 text-small text-muted-foreground">{employee.bio}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {employee.skills.slice(0, 3).map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {employee.coffeeChat && (
          <Badge tone="success" dot>
            Coffee chats
          </Badge>
        )}
        {employee.mentor && (
          <Badge tone="primary" dot>
            Mentoring
          </Badge>
        )}
        {employee.jobShadow && (
          <Badge tone="info" dot>
            Shadowing
          </Badge>
        )}
      </div>

      <div className="mt-auto flex gap-2 pt-4">
        <button
          type="button"
          onClick={() => requestCoffeeChat(employee.name.split(' ')[0])}
          disabled={!employee.coffeeChat}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-button bg-primary px-3 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Coffee className="h-4 w-4" aria-hidden />
          Coffee chat
        </button>
        <Link
          to={`/employee/${employee.id}`}
          className="inline-flex flex-1 items-center justify-center rounded-button border border-border bg-card px-3 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
        >
          View profile
        </Link>
      </div>
    </motion.article>
  )
}
