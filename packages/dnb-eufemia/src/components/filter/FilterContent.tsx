import { useContext, useRef } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import Skeleton from '../skeleton/Skeleton'
import { useSharedState } from '../../shared/helpers/useSharedState'
import type { FilterState } from './FilterContext'
import { FilterConnectedIdContext, FilterContext } from './FilterContext'
import HeightAnimation from '../height-animation/HeightAnimation'
import { useSpacing } from '../space/SpacingUtils'
import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import AriaLive from '../aria-live/AriaLive'
import SharedContext from '../../shared/Context'

export type FilterContentProps = {
  connectedTo?: string
  className?: string
  children?: ReactNode
} & SpacingProps

function FilterContent({
  connectedTo,
  className,
  children,
  ...spacingRest
}: FilterContentProps) {
  const context = useContext(FilterContext)
  const sharedContext = useContext(SharedContext)
  const { resultCountMessage, noResultsMessage } =
    sharedContext.getTranslation({}).Filter
  const resolvedId = connectedTo ?? context?.id

  if (!resolvedId && !context) {
    throw new Error(
      'Filter.Content requires a connectedTo prop or must be used inside a Filter.Root.'
    )
  }

  const { data } = useSharedState<FilterState>(resolvedId)

  const isLoading = data?.resultLoading ?? context?.resultLoading ?? false
  const resultCount = data?.resultCount ?? context?.resultCount

  const hadLoading = useRef(false)
  if (isLoading) {
    hadLoading.current = true
  }

  const ariaLiveAnnouncement = (() => {
    if (isLoading || resultCount === undefined) {
      return ''
    }

    if (resultCount === 0) {
      return noResultsMessage
    }

    return resultCountMessage.replace('%s', String(resultCount))
  })()

  const spacingProps = useSpacing(spacingRest, {
    className: clsx('dnb-filter__content', className),
  })

  return (
    <FilterConnectedIdContext value={resolvedId}>
      <Skeleton show={isLoading} {...spacingProps}>
        {hadLoading.current ? (
          <HeightAnimation>{children}</HeightAnimation>
        ) : (
          children
        )}
      </Skeleton>

      <AriaLive priority="high" delay={1000}>
        {ariaLiveAnnouncement}
      </AriaLive>
    </FilterConnectedIdContext>
  )
}

withComponentMarkers(FilterContent, {
  _supportsSpacingProps: true,
})

export default FilterContent
