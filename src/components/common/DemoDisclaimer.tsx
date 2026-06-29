import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DemoDisclaimerProps {
  /** Override the default disclaimer text. */
  text?: string
  className?: string
}

/** Small, unobtrusive reminder that the prototype's data is fictional. */
export function DemoDisclaimer({ text, className }: DemoDisclaimerProps) {
  return (
    <p className={cn('flex items-center gap-1.5 text-xs text-muted-foreground', className)}>
      <Info className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {text ?? 'Demo project and employee data is fictional and not an official CDOT record.'}
    </p>
  )
}
