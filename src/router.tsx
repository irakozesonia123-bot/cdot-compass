import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

/**
 * Route table.
 *
 * Every page is lazy-loaded for fast initial paint and clean code-splitting.
 * React Router resolves the `Component` from each module's default export.
 */
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Explore = lazy(() => import('@/pages/Explore'))
const Division = lazy(() => import('@/pages/Division'))
const Projects = lazy(() => import('@/pages/Projects'))
const Project = lazy(() => import('@/pages/Project'))
const People = lazy(() => import('@/pages/People'))
const Employee = lazy(() => import('@/pages/Employee'))
const CompassGuide = lazy(() => import('@/pages/CompassGuide'))
const Resources = lazy(() => import('@/pages/Resources'))
const Events = lazy(() => import('@/pages/Events'))
const Spotlights = lazy(() => import('@/pages/Spotlights'))
const Settings = lazy(() => import('@/pages/Settings'))
const Saved = lazy(() => import('@/pages/Saved'))
const Profile = lazy(() => import('@/pages/Profile'))
const Impact = lazy(() => import('@/pages/Impact'))
const DevShowcase = lazy(() => import('@/pages/DevShowcase'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, Component: Dashboard },
      { path: 'explore', Component: Explore },
      { path: 'division/:slug', Component: Division },
      { path: 'projects', Component: Projects },
      { path: 'project/:id', Component: Project },
      { path: 'people', Component: People },
      { path: 'employee/:id', Component: Employee },
      { path: 'compass-guide', Component: CompassGuide },
      { path: 'resources', Component: Resources },
      { path: 'events', Component: Events },
      { path: 'spotlights', Component: Spotlights },
      { path: 'settings', Component: Settings },
      { path: 'saved', Component: Saved },
      { path: 'profile', Component: Profile },
      { path: 'impact', Component: Impact },
      // Dev-only component showcase (not in the sidebar).
      { path: 'dev', Component: DevShowcase },
      { path: '*', Component: NotFound },
    ],
  },
])
