import { useContext } from 'react'
import { useSharedState } from '../../shared/helpers/useSharedState'
import { useHighlightText } from '../../shared/helpers/highlightText'
import type { FilterState } from './FilterContext'
import { FilterContext, FilterConnectedIdContext } from './FilterContext'

export type FilterHighlightingProps = {
  children: string
  connectedTo?: string
}

function FilterHighlighting({
  children,
  connectedTo,
}: FilterHighlightingProps) {
  const context = useContext(FilterContext)
  const connectedId = useContext(FilterConnectedIdContext)
  const resolvedId = connectedTo ?? connectedId ?? context?.id
  const { data } = useSharedState<FilterState>(resolvedId)

  const search = data?.search ?? context?.state?.search ?? ''

  const highlight = useHighlightText({
    search,
    className: 'dnb-filter__highlighting',
    tag: 'mark',
  })

  return highlight(children, children)
}

export default FilterHighlighting
