import { useContext } from 'react'
import { clsx } from 'clsx'
import SharedContext from '../../shared/Context'
import { FilterContext, FilterConnectedIdContext } from './FilterContext'
import type { FilterState } from './FilterContext'
import { useSharedState } from '../../shared/helpers/useSharedState'
import { useSpacing } from '../space/SpacingUtils'
import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import P from '../../elements/P'
import HeightAnimation from '../HeightAnimation'

export type FilterResultCountProps = {
  connectedTo?: string
  resultCount?: number
  alwaysVisible?: boolean
  children?: string
  className?: string
} & SpacingProps

function FilterResultCount({
  connectedTo,
  resultCount: resultCountProp,
  alwaysVisible,
  children,
  className,
  ...spacingRest
}: FilterResultCountProps) {
  const sharedContext = useContext(SharedContext)
  const { resultCountMessage } = sharedContext.getTranslation({}).Filter
  const context = useContext(FilterContext)
  const connectedId = useContext(FilterConnectedIdContext)
  const resolvedId = connectedTo ?? connectedId ?? context?.id
  const { data: sharedData } = useSharedState<FilterState>(resolvedId)

  const resultCount =
    resultCountProp ?? sharedData?.resultCount ?? context?.resultCount

  const hasActiveFilters =
    context?.hasActiveFilters ??
    Boolean(
      sharedData?.search ||
      (sharedData?.filters && Object.keys(sharedData.filters).length > 0)
    )

  const spacingProps = useSpacing(spacingRest, {
    className: clsx('dnb-filter__result-count', className),
  })

  const isVisible =
    resultCount !== undefined && (alwaysVisible || hasActiveFilters)

  const message =
    children || resultCountMessage.replace('%s', String(resultCount))

  return (
    <HeightAnimation className="dnb-filter__result-count-wrapper">
      {isVisible && (
        <P top="small" {...spacingProps}>
          {message}
        </P>
      )}
    </HeightAnimation>
  )
}

withComponentMarkers(FilterResultCount, {
  _supportsSpacingProps: true,
})

export default FilterResultCount
