import { useState } from 'react'
import { Star } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageSection } from '@/components/layout/PageSection'
import { ContentGrid } from '@/components/layout/ContentGrid'
import { FeaturedSpotlight } from '@/components/dashboard/FeaturedSpotlight'
import { SpotlightCard } from '@/components/spotlights/SpotlightCard'
import { SpotlightDetailModal } from '@/components/spotlights/SpotlightDetailModal'
import { DemoDisclaimer } from '@/components/common/DemoDisclaimer'
import type { Spotlight } from '@/types'
import { spotlights } from '@/utils/data'

/** Employee Spotlights — magazine-style career stories from across CDOT. */
export default function Spotlights() {
  const [active, setActive] = useState<Spotlight | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const featured = spotlights[0]
  const rest = spotlights.slice(1)

  const openStory = (spotlight: Spotlight) => {
    setActive(spotlight)
    setModalOpen(true)
  }

  return (
    <PageContainer>
      <PageHeader
        title="Employee Spotlights"
        description="Real career stories from across CDOT — see how people got here and what they've learned."
        icon={Star}
        accent="purple"
      />

      {featured && (
        <PageSection title="Featured story" icon={Star} accent="purple">
          <FeaturedSpotlight spotlight={featured} onRead={openStory} />
        </PageSection>
      )}

      {rest.length > 0 && (
        <PageSection title="More stories">
          <ContentGrid cols={3} animate>
            {rest.map((spotlight) => (
              <SpotlightCard key={spotlight.id} spotlight={spotlight} onRead={openStory} />
            ))}
          </ContentGrid>
        </PageSection>
      )}

      <DemoDisclaimer text="Demo employee spotlight data is fictional and not an official CDOT record." />

      <SpotlightDetailModal spotlight={active} open={modalOpen} onClose={() => setModalOpen(false)} />
    </PageContainer>
  )
}
