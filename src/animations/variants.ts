import type { Variants, Transition } from 'framer-motion'

/**
 * Shared Framer Motion variants.
 *
 * Motion is deliberately restrained — short durations, gentle easing, small
 * offsets — so the product reads as calm and enterprise-grade. Reduced-motion
 * preferences are honored globally via <MotionConfig reducedMotion="user">.
 */

/** Smooth ease-out curve used across the app. */
const EASE_OUT: number[] = [0.22, 1, 0.36, 1]

const DURATION = {
  fast: 0.2,
  base: 0.32,
  slow: 0.5,
} as const

/** Slightly larger reveal for hero / result moments. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
}

/** Container that staggers its children's entrances. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

/** Child entrance to pair with {@link staggerContainer}. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
}

/** Apply to a motion element's `whileHover` for a gentle, restrained lift. */
export const hoverLift: { y: number; transition: Transition } = {
  y: -3,
  transition: { duration: DURATION.fast, ease: EASE_OUT },
}
