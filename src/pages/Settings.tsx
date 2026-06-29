import { useState } from 'react'
import { Settings as SettingsIcon, Bell, Coffee, Eye, Trash2, Building2 } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageSection } from '@/components/layout/PageSection'
import { Card } from '@/components/common/Card'
import { DemoDisclaimer } from '@/components/common/DemoDisclaimer'
import { INTERN_PROFILE } from '@/config/internProfile'
import { getDepartmentBySlug } from '@/utils/data'
import { useBookmarks } from '@/hooks/useBookmarks'
import { clearRecent } from '@/hooks/useRecentlyViewed'
import { useToast } from '@/contexts/ToastContext'
import { cn } from '@/lib/utils'

/** Settings — lightweight preferences and demo controls. */
export default function Settings() {
  const division = getDepartmentBySlug(INTERN_PROFILE.currentDivision)
  const { clearBookmarks } = useBookmarks()
  const { toast } = useToast()

  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    eventReminders: true,
    showAvailability: true,
  })

  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Preferences and demo options for the CDOT Compass prototype."
        icon={SettingsIcon}
        accent="gray"
      />

      <PageSection
        title="Demo profile"
        description="The sample intern this prototype is shown through. In a full version, employees would sign in with their own CDOT account."
      >
        <Card className="divide-y divide-border">
          <Row label="Name" value={`${INTERN_PROFILE.name} Irakoze`} />
          <Row label="Role" value={INTERN_PROFILE.role} />
          <Row label="Division" value={division?.name ?? '—'} icon={Building2} />
        </Card>
      </PageSection>

      <PageSection title="Notifications">
        <Card className="divide-y divide-border">
          <ToggleRow
            icon={Bell}
            label="Email notifications"
            description="Receive a summary of new opportunities."
            checked={prefs.emailNotifications}
            onChange={(v) => setPrefs((p) => ({ ...p, emailNotifications: v }))}
          />
          <ToggleRow
            icon={Coffee}
            label="Event reminders"
            description="Get reminded before events you've saved."
            checked={prefs.eventReminders}
            onChange={(v) => setPrefs((p) => ({ ...p, eventReminders: v }))}
          />
          <ToggleRow
            icon={Eye}
            label="Show my availability"
            description="Let others see you're open to coffee chats."
            checked={prefs.showAvailability}
            onChange={(v) => setPrefs((p) => ({ ...p, showAvailability: v }))}
          />
        </Card>
      </PageSection>

      <PageSection title="Demo data">
        <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-small font-semibold text-heading">Reset your activity</p>
            <p className="text-small text-muted-foreground">
              Clear saved items and recently viewed history on this device.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearBookmarks}
              className="inline-flex items-center gap-1.5 rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Clear saved
            </button>
            <button
              type="button"
              onClick={() => {
                clearRecent()
                toast({ variant: 'info', title: 'Cleared recently viewed' })
              }}
              className="inline-flex items-center gap-1.5 rounded-button border border-border bg-card px-4 py-2 text-small font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Clear history
            </button>
          </div>
        </Card>
      </PageSection>

      <DemoDisclaimer text="Settings are part of the demo and reset on reload. This is an Innovation Challenge prototype." />
    </PageContainer>
  )
}

function Row({ label, value, icon: Icon }: { label: string; value: string; icon?: typeof Building2 }) {
  return (
    <div className="flex items-center justify-between p-5">
      <span className="text-small text-muted-foreground">{label}</span>
      <span className="inline-flex items-center gap-1.5 text-small font-medium text-foreground">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />}
        {value}
      </span>
    </div>
  )
}

function ToggleRow({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: typeof Bell
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
        <div>
          <p className="text-small font-medium text-foreground">{label}</p>
          <p className="text-small text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-muted',
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  )
}
