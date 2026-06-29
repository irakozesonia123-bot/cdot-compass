import { MotionConfig } from 'framer-motion'
import { RouterProvider } from 'react-router-dom'
import { ToastProvider } from '@/contexts/ToastContext'
import { router } from '@/router'

/**
 * Root application component.
 *
 * Wraps the router in global providers:
 *  - MotionConfig honors the user's reduced-motion preference everywhere.
 *  - ToastProvider powers all demo-action notifications.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </MotionConfig>
  )
}
