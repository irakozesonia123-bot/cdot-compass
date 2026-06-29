import { useEffect, useState } from 'react'
import { Clock, Copy, Send } from 'lucide-react'
import type { Employee } from '@/types'
import { Modal } from '@/components/common/Modal'
import { getDepartmentBySlug } from '@/utils/data'
import { INTERN_PROFILE } from '@/config/internProfile'
import { useDemoAction } from '@/hooks/useDemoAction'

interface CoffeeChatModalProps {
  employee: Employee
  open: boolean
  onClose: () => void
}

/** Build a polished, natural outreach message from the intern to an employee. */
function buildMessage(employee: Employee): string {
  const first = employee.name.split(' ')[0]
  const divisionName = getDepartmentBySlug(employee.division)?.name ?? employee.division
  const topSkill = employee.skills[0]
  return [
    `Hi ${first},`,
    '',
    `I'm ${INTERN_PROFILE.name}, a ${INTERN_PROFILE.role.toLowerCase()} at CDOT. I came across your profile and I'm really interested in your work in ${divisionName} — especially ${topSkill}. Would you be open to a short 20-minute coffee chat sometime in the next couple of weeks?`,
    '',
    `I'd love to hear about your career path and what you enjoy most about the work. Thank you so much for considering — I appreciate your time!`,
    '',
    'Best,',
    INTERN_PROFILE.name,
  ].join('\n')
}

/**
 * Coffee chat dialog: shows the person, a suggested 20-minute meeting, and an
 * editable outreach message the intern can copy or send (demo).
 */
export function CoffeeChatModal({ employee, open, onClose }: CoffeeChatModalProps) {
  const { requestCoffeeChat, copyMessage } = useDemoAction()
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (open) setMessage(buildMessage(employee))
  }, [open, employee])

  const firstName = employee.name.split(' ')[0]

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Request a coffee chat"
      description="A relaxed, 20-minute conversation to learn from a colleague."
      footer={
        <>
          <button
            type="button"
            onClick={() => copyMessage(message)}
            className="inline-flex items-center gap-1.5 rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Copy className="h-4 w-4" aria-hidden />
            Copy message
          </button>
          <button
            type="button"
            onClick={() => {
              requestCoffeeChat(firstName)
              onClose()
            }}
            className="inline-flex items-center gap-1.5 rounded-button bg-primary px-4 py-2 text-small font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Send className="h-4 w-4" aria-hidden />
            Send request
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
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          20 min
        </span>
      </div>

      <label htmlFor="coffee-message" className="text-small font-medium text-foreground">
        Suggested message
      </label>
      <textarea
        id="coffee-message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={9}
        className="mt-1.5 w-full resize-none rounded-card border border-border bg-background p-3 text-small text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Feel free to edit this before copying — make it your own.
      </p>
    </Modal>
  )
}
