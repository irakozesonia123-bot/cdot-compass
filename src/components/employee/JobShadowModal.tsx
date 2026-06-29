import { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import type { Employee } from '@/types'
import { Modal } from '@/components/common/Modal'
import { FilterChip } from '@/components/common/FilterBar'
import { useDemoAction } from '@/hooks/useDemoAction'

interface JobShadowModalProps {
  employee: Employee
  open: boolean
  onClose: () => void
}

const DURATIONS = ['2 hours', 'Half day', 'Full day']
const PURPOSES = [
  'Observe day-to-day work',
  'Career exploration',
  'Hands-on learning',
  'A specific engineering task',
]

/** Job shadow dialog: choose a duration and purpose, then submit (demo). */
export function JobShadowModal({ employee, open, onClose }: JobShadowModalProps) {
  const { requestJobShadow } = useDemoAction()
  const [duration, setDuration] = useState(DURATIONS[1])
  const [purpose, setPurpose] = useState(PURPOSES[1])

  useEffect(() => {
    if (open) {
      setDuration(DURATIONS[1])
      setPurpose(PURPOSES[1])
    }
  }, [open])

  const firstName = employee.name.split(' ')[0]

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Request a job shadow"
      description="Spend time alongside an engineer to see the work up close."
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              requestJobShadow(firstName)
              onClose()
            }}
            className="inline-flex items-center gap-1.5 rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Send className="h-4 w-4" aria-hidden />
            Submit request
          </button>
        </>
      }
    >
      <div className="mb-4 flex items-center gap-3">
        <img
          src={employee.image}
          alt=""
          className="h-12 w-12 rounded-full object-cover ring-2 ring-border"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-heading">{employee.name}</p>
          <p className="truncate text-small text-muted-foreground">{employee.title}</p>
        </div>
      </div>

      <fieldset>
        <legend className="text-small font-medium text-foreground">Duration</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <FilterChip key={d} label={d} active={duration === d} onClick={() => setDuration(d)} />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="text-small font-medium text-foreground">Purpose</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PURPOSES.map((p) => (
            <FilterChip key={p} label={p} active={purpose === p} onClick={() => setPurpose(p)} />
          ))}
        </div>
      </fieldset>
    </Modal>
  )
}
