import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-card bg-primary/10 text-primary">
        <Compass className="h-8 w-8" aria-hidden />
      </div>
      <h1 className="mt-6 text-section text-heading">Page not found</h1>
      <p className="mt-3 text-body text-muted-foreground">
        This part of CDOT Compass doesn&apos;t exist yet. Let&apos;s get you back on course.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-button bg-primary px-5 py-2.5 text-small font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
      >
        Back to Dashboard
      </Link>
    </section>
  )
}
