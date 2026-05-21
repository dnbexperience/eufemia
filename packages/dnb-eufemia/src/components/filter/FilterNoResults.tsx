import { useContext } from 'react'
import { clsx } from 'clsx'
import SharedContext from '../../shared/Context'
import { FilterContext } from './FilterContext'
import type { FilterState } from './FilterContext'
import { useSharedState } from '../../shared/helpers/useSharedState'
import P from '../../elements/P'

export type FilterNoResultsProps = {
  connectedTo?: string
  resultCount?: number
  children?: string
  className?: string
}

function FilterNoResults({
  connectedTo,
  resultCount: resultCountProp,
  children,
  className,
}: FilterNoResultsProps) {
  const sharedContext = useContext(SharedContext)
  const { noResultsMessage } = sharedContext.getTranslation({}).Filter
  const context = useContext(FilterContext)
  const { data: sharedData } = useSharedState<FilterState>(
    connectedTo ?? context?.id
  )

  const resultCount =
    resultCountProp ?? sharedData?.resultCount ?? context?.resultCount

  if (resultCount === undefined || resultCount > 0) {
    return null
  }

  return (
    <P className={clsx('dnb-filter__no-results', className)} top="small">
      {children || noResultsMessage}
    </P>
  )
}

export default FilterNoResults
