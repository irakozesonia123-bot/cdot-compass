import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export interface Crumb {
  label: string
  to?: string
}

/** Accessible breadcrumb trail. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-small text-muted-foreground">
      <Link to="/" className="flex items-center gap-1 hover:text-foreground" aria-label="Dashboard">
        <Home className="h-4 w-4" aria-hidden />
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <Fragment key={`${item.label}-${i}`}>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden />
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="truncate font-medium text-foreground" aria-current="page">
                {item.label}
              </span>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
