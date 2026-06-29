import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Optionally resolve an official CDOT/Colorado logo dropped at
 * `src/assets/images/cdot-logo-placeholder.png`. Using `import.meta.glob`
 * means the build never fails when the image is absent — we fall back to the
 * CDOT-styled roundel mark below.
 */
const logoAssets = import.meta.glob(
  '../../assets/images/cdot-logo-placeholder.png',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const LOGO_SRC: string | undefined = Object.values(logoAssets)[0]

interface BrandLogoProps {
  className?: string
}

/**
 * CDOT brand mark. Renders the official logo if present, otherwise a clean
 * CDOT-styled roundel (navy disc, white mountains + road, plane, and an
 * orange "CDOT" band) that echoes the department's identity.
 */
export function BrandLogo({ className }: BrandLogoProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(LOGO_SRC) && !failed

  if (showImage) {
    return (
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-button shadow-soft',
          className,
        )}
      >
        <img
          src={LOGO_SRC}
          alt="Colorado Department of Transportation"
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      </span>
    )
  }

  return (
    <span className={cn('block h-10 w-10 shrink-0', className)} role="img" aria-label="CDOT Compass">
      <svg viewBox="0 0 48 48" className="h-full w-full drop-shadow-sm">
        <defs>
          <clipPath id="cdot-disc">
            <circle cx="24" cy="24" r="24" />
          </clipPath>
        </defs>
        <g clipPath="url(#cdot-disc)">
          {/* Navy disc */}
          <rect width="48" height="48" fill="hsl(var(--cdot-navy))" />
          {/* Orange base band */}
          <rect y="34" width="48" height="14" fill="hsl(var(--cdot-orange))" />
          {/* Mountain range */}
          <path d="M2 34 L13 17 L20 26 L28 13 L36 24 L46 34 Z" fill="#ffffff" />
          {/* Road sweeping up the valley */}
          <path d="M19.5 34 L28.5 34 L25.5 24 L22.5 24 Z" fill="#cdddee" />
          {/* Plane */}
          <path
            d="M40 9 L30.5 13 L33.5 14 L33.5 17 L35.5 14.4 L39 15.4 Z"
            fill="#ffffff"
          />
          {/* Wordmark on the orange band */}
          <text
            x="24"
            y="44.5"
            textAnchor="middle"
            fontSize="8.5"
            fontWeight="800"
            letterSpacing="0.5"
            fill="#ffffff"
            fontFamily="Inter, system-ui, sans-serif"
          >
            CDOT
          </text>
        </g>
        <circle cx="24" cy="24" r="23" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      </svg>
    </span>
  )
}
