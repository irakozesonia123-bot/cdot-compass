import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQProps {
  items: FAQItem[]
}

/**
 * Accessible FAQ accordion built on native <details>/<summary> — keyboard
 * operable with no extra JS. Reusable wherever an FAQ is useful.
 */
export function FAQ({ items }: FAQProps) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-card border border-border bg-card">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-small font-semibold text-heading [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="px-5 pb-5 text-small text-muted-foreground">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}
