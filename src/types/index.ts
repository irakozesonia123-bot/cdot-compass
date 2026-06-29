/**
 * CDOT Compass — domain model.
 *
 * These interfaces are the single source of truth for the shape of every
 * record in the app. All JSON datasets in `src/data` conform to them, and
 * every loader / component imports types from here.
 *
 * Relationship conventions:
 *  - Departments are referenced by `slug` (used in routes and cross-links).
 *  - Employees, projects, resources, events, and spotlights are referenced by `id`.
 */

/** A single step in an employee's career timeline. */
export interface CareerStep {
  /** Role or milestone title, e.g. "Bridge Engineer I" */
  title: string
  /** Supporting line, e.g. organization or school name */
  subtitle: string
  /** Human-readable period, e.g. "2018 – 2020" */
  period: string
  /** Category of the step (drives the timeline icon) */
  type: 'education' | 'internship' | 'role'
  /** Whether this is the employee's current position */
  current?: boolean
}

/** A CDOT division / department. */
export interface Department {
  id: string
  /** Display name, e.g. "Bridge Asset Management" */
  name: string
  /** Short name / abbreviation for compact UI, e.g. "Bridge" */
  shortName: string
  /** URL-safe identifier used in routes and cross-references */
  slug: string
  /** One-paragraph description of what the division does */
  description: string
  /** Short mission statement shown on cards */
  mission: string
  /** Hero / card image URL */
  image: string
  /** Up to three focus tags shown on the division card */
  tags: string[]
  /** Engineering skills practiced in this division */
  skills: string[]
  /** Software and tools commonly used */
  software: string[]
  /** Representative career paths within the division */
  careerPaths: string[]
  /** Typical tasks an intern would work on */
  internTasks: string[]
  /** Slugs of related divisions */
  relatedDepartments: string[]
  /** Short narrative about growth opportunities */
  careerGrowth: string
  /** Employee ids in this division (derived; baked for convenience) */
  employees: string[]
  /** Project ids this division participates in (derived; baked for convenience) */
  projects: string[]
}

/** An employee profile. */
export interface Employee {
  id: string
  name: string
  /** Job title, e.g. "Senior Hydraulics Engineer" */
  title: string
  /** Slug of the employee's home division */
  division: string
  /** Short professional bio */
  bio: string
  yearsExperience: number
  /** Office / work location (a Colorado city) */
  location: string
  pronouns: string
  /** Engineering and professional skills */
  skills: string[]
  /** Project ids the employee works on (derived from project rosters) */
  projects: string[]
  /** Career timeline from education to current role */
  careerJourney: CareerStep[]
  /** Title of a project the employee is proud of */
  favoriteProject: string
  /** What they enjoy most about the work */
  favoritePart: string
  /** A piece of advice for students / interns */
  advice: string
  /** A light, humanizing fun fact */
  funFact: string
  /** Portrait image URL */
  image: string

  // Availability & directory flags (drive People directory filters)
  /** Open to mentoring */
  mentor: boolean
  /** Open to coffee chats */
  coffeeChat: boolean
  /** Open to hosting job shadows */
  jobShadow: boolean
  /** Open to giving career advice */
  careerAdvice: boolean
  /** Holds a leadership / supervisory role */
  leadership: boolean
  /** Regularly performs field work */
  fieldWork: boolean
  /** Works remotely at least part of the time */
  remote: boolean
}

/** Lifecycle status of a project. */
export type ProjectStatus = 'Active' | 'Completed' | 'Planned' | 'On Hold'

/** Current delivery phase of a project. */
export type ProjectPhase =
  | 'Planning'
  | 'Environmental Review'
  | 'Design'
  | 'Construction'
  | 'Maintenance'
  | 'Research'
  | 'Completed'

/** A transportation project, typically spanning multiple divisions. */
export interface Project {
  id: string
  title: string
  /** One-line summary for cards */
  summary: string
  /** Full project description */
  description: string
  /** Slug of the division leading the project */
  leadDivision: string
  /** Slugs of all participating divisions (includes the lead) */
  divisions: string[]
  /** Employee ids of engineers on the project team */
  engineers: string[]
  status: ProjectStatus
  phase: ProjectPhase
  /** Discipline / theme tags */
  tags: string[]
  /** Software and tools used on the project */
  software: string[]
  /** Slugs of related divisions (beyond direct participants) */
  relatedDepartments: string[]
  /** Human-readable duration, e.g. "2022 – 2026" */
  duration: string
  /** Project location (corridor / city / region) */
  location: string
  /** Year work began */
  startYear: number
  /** Hero / card image URL */
  image: string
}

/** Category buckets for professional resources. */
export type ResourceCategory =
  | 'Professional Development'
  | 'Training'
  | 'Employee Resource Groups'
  | 'Career Planning'
  | 'Leadership'
  | 'Learning'
  | 'Benefits'
  | 'Organization'

/** A professional development / learning resource. */
export interface Resource {
  id: string
  title: string
  category: ResourceCategory
  description: string
  /** Demo link (not a live URL) */
  link: string
  /** Lucide icon name used to render the resource icon */
  icon: string
}

/** Category buckets for events. */
export type EventCategory =
  | 'Workshop'
  | 'Networking'
  | 'Tech Talk'
  | 'Career'
  | 'Training'
  | 'Social'
  | 'Info Session'

/** A scheduled event. */
export interface Event {
  id: string
  title: string
  /** ISO date (YYYY-MM-DD) */
  date: string
  /** Human-readable time range, e.g. "12:00 – 1:00 PM" */
  time: string
  location: string
  description: string
  category: EventCategory
  /** Hosting team or person */
  host: string
}

/** An employee spotlight (magazine-style feature). */
export interface Spotlight {
  id: string
  /** Employee id this spotlight features */
  employeeId: string
  /** Headline for the feature */
  headline: string
  /** Long-form story */
  story: string
  /** Narrative about a favorite project */
  favoriteProject: string
  /** Narrative about their career journey */
  careerJourney: string
  /** Pull quote */
  quote: string
}
