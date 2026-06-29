import { useMemo } from 'react'
import { useToast } from '@/contexts/ToastContext'

/**
 * Demo action handlers.
 *
 * The prototype has no backend, so these simulate realistic outcomes with
 * believable success toasts. Every interactive button in the app routes
 * through here for consistent behavior.
 */
export function useDemoAction() {
  const { toast } = useToast()

  return useMemo(
    () => ({
      /** Simulate sending a coffee chat request to an employee. */
      requestCoffeeChat: (name: string) =>
        toast({
          variant: 'success',
          title: 'Coffee chat request sent',
          description: `We let ${name} know you'd like to connect over coffee.`,
        }),

      /** Simulate submitting a job shadow request. */
      requestJobShadow: (name: string) =>
        toast({
          variant: 'success',
          title: 'Job shadow requested',
          description: `Your request to shadow ${name} has been submitted.`,
        }),

      /** Simulate registering for an event. */
      register: (title: string) =>
        toast({
          variant: 'success',
          title: "You're registered",
          description: `You're on the list for “${title}”.`,
        }),

      /** Copy text to the clipboard and confirm. */
      copyMessage: async (text: string) => {
        try {
          await navigator.clipboard.writeText(text)
          toast({ variant: 'info', title: 'Copied to clipboard' })
        } catch {
          toast({
            variant: 'error',
            title: 'Could not copy',
            description: 'Your browser blocked clipboard access.',
          })
        }
      },
    }),
    [toast],
  )
}
