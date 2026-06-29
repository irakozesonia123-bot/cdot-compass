import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ViewAllLinkProps {
  to: string
  label?: string
}

/** Small "View all →" link used in section headers across pages. */
export function ViewAllLink({ to, label = 'View all' }: ViewAllLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-small font-semibold text-primary hover:underline"
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  )
}
