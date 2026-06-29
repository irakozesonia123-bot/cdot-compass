import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { ContentGrid } from '@/components/layout/ContentGrid'
import { EmptyState } from '@/components/common/EmptyState'
import { SkeletonCardGrid } from '@/components/common/LoadingSkeleton'

interface CollectionViewProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  getKey: (item: T) => string
  cols?: 2 | 3 | 4
  /** Show skeletons instead of items. */
  isLoading?: boolean
  skeletonCount?: number
  /** Stagger items into view. */
  animate?: boolean
  /** Empty-state configuration shown when there are no items. */
  empty: {
    icon: LucideIcon
    title: string
    description?: string
    action?: ReactNode
  }
}

/**
 * Stateful collection renderer integrating loading, empty, and loaded states.
 * Directory pages pass their (already filtered) items and a render function;
 * this handles the three states consistently so no page reimplements them.
 */
export function CollectionView<T>({
  items,
  renderItem,
  getKey,
  cols = 3,
  isLoading = false,
  skeletonCount = 6,
  animate = true,
  empty,
}: CollectionViewProps<T>) {
  if (isLoading) {
    return <SkeletonCardGrid count={skeletonCount} />
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={empty.icon}
        title={empty.title}
        description={empty.description}
        action={empty.action}
      />
    )
  }

  return (
    <ContentGrid cols={cols} animate={animate}>
      {items.map((item) => (
        <div key={getKey(item)} className="h-full">
          {renderItem(item)}
        </div>
      ))}
    </ContentGrid>
  )
}
