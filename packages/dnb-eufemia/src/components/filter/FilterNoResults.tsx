import { useContext } from 'react'
import { clsx } from 'clsx'
import SharedContext from '../../shared/Context'
import { FilterContext, FilterConnectedIdContext } from './FilterContext'
import type { FilterState } from './FilterContext'
import { useSharedState } from '../../shared/helpers/useSharedState'
import { useSpacing } from '../space/SpacingUtils'
import type { SpacingProps } from '../../shared/types'
import { ListContext } from '../list/ListContext'
import ListItemBasic from '../list/ItemBasic'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import P from '../../elements/P'

export type FilterNoResultsProps = {
  connectedTo?: string
  resultCount?: number
  children?: string
  className?: string
} & SpacingProps

function FilterNoResults({
  connectedTo,
  resultCount: resultCountProp,
  children,
  className,
  ...spacingRest
}: FilterNoResultsProps) {
  const sharedContext = useContext(SharedContext)
  const { noResultsMessage } = sharedContext.getTranslation({}).Filter
  const context = useContext(FilterContext)
  const connectedId = useContext(FilterConnectedIdContext)
  const resolvedId = connectedTo ?? connectedId ?? context?.id
  const { data: sharedData } = useSharedState<FilterState>(resolvedId)
  const listContext = useContext(ListContext)

  const resultCount =
    resultCountProp ?? sharedData?.resultCount ?? context?.resultCount

  const spacingProps = useSpacing(spacingRest, {
    className: clsx('dnb-filter__no-results', className),
  })

  if (resultCount === undefined || resultCount > 0) {
    return null
  }

  const message = children || noResultsMessage

  if (listContext) {
    return <ListItemBasic {...spacingProps} title={message} />
  }

  return <P {...spacingProps}>{message}</P>
}

withComponentMarkers(FilterNoResults, {
  _supportsSpacingProps: true,
})

export default FilterNoResults
