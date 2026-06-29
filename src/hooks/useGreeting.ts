/**
 * Returns a time-of-day greeting based on the local clock.
 * Recomputed on each render — fine for a value that only needs to be correct
 * at mount for the dashboard hero.
 */
export function useGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}
