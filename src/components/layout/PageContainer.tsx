import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Outer wrapper for every page. Owns the centered max width and the vertical
 * rhythm between top-level page sections, so individual pages never re-declare
 * their own page-level layout.
 */
export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl space-y-10 md:space-y-12', className)}>
      {children}
    </div>
  )
}
