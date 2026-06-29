import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/** Base card surface — white, soft border, gentle elevation. */
export const cardClass = 'rounded-card border border-border bg-card shadow-card'

/** Add to interactive cards for a hover elevation increase. */
export const cardInteractiveClass =
  'transition-shadow duration-200 hover:shadow-card-hover'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Apply the interactive hover treatment. */
  interactive?: boolean
}

/**
 * Generic card container. Compose richer cards on top of this, or use the
 * exported class constants directly on motion elements.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardClass, interactive && cardInteractiveClass, className)}
      {...props}
    />
  ),
)
Card.displayName = 'Card'
