import { useState } from 'react'
import { ImageIcon, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaImageProps {
  src: string
  alt: string
  /** Icon shown in the branded fallback when the image is missing or fails. */
  icon?: LucideIcon
  /** Classes applied to the <img> (e.g. hover zoom). */
  imgClassName?: string
  className?: string
}

/**
 * Image with a consistent, on-brand fallback. If the source is empty or fails
 * to load, it renders a subtle CDOT-blue gradient with an icon instead of an
 * empty box — so imagery degrades gracefully and never looks broken.
 * Fills its (positioned) parent.
 */
export function MediaImage({ src, alt, icon: Icon = ImageIcon, imgClassName, className }: MediaImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-cdot-navy/20 text-primary/40',
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <Icon className="h-10 w-10" aria-hidden />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', imgClassName, className)}
    />
  )
}
