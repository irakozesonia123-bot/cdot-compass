import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckListProps {
  items: string[]
  className?: string
}

/** A list of items each marked with a soft green check. */
export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn('space-y-2.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-small text-foreground">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <Check className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
