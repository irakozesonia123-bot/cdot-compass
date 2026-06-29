/**
 * Intentional per-page icon accent system.
 *
 * Each major page carries one accent color, applied to its icon (a soft
 * tinted background + a sufficiently dark icon color for contrast). Class
 * strings are written out in full — never composed dynamically — so Tailwind
 * can detect and keep them during purge.
 */
export type AccentKey =
  | 'blue'
  | 'green'
  | 'orange'
  | 'teal'
  | 'indigo'
  | 'gold'
  | 'purple'
  | 'gray'

export interface AccentStyle {
  /** Icon foreground color class */
  icon: string
  /** Soft tinted background class for the icon container */
  soft: string
  /** Solid background class (e.g. for small dots / indicators) */
  dot: string
}

export const ACCENT_STYLES: Record<AccentKey, AccentStyle> = {
  blue: { icon: 'text-primary', soft: 'bg-primary/10', dot: 'bg-primary' },
  green: { icon: 'text-secondary', soft: 'bg-secondary/10', dot: 'bg-secondary' },
  orange: { icon: 'text-cdot-orange', soft: 'bg-cdot-orange/10', dot: 'bg-cdot-orange' },
  teal: { icon: 'text-cdot-teal', soft: 'bg-cdot-teal/10', dot: 'bg-cdot-teal' },
  indigo: { icon: 'text-cdot-indigo', soft: 'bg-cdot-indigo/10', dot: 'bg-cdot-indigo' },
  gold: { icon: 'text-cdot-gold', soft: 'bg-cdot-gold/10', dot: 'bg-cdot-gold' },
  purple: { icon: 'text-cdot-purple', soft: 'bg-cdot-purple/10', dot: 'bg-cdot-purple' },
  gray: { icon: 'text-muted-foreground', soft: 'bg-muted', dot: 'bg-muted-foreground' },
}
