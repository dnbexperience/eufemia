import { useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useSharedState } from '../../shared/helpers/useSharedState'
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

  return useMemo(() => highlightText(children, search), [children, search])
}

function highlightText(text: string, search: string): ReactNode {
  if (!search || !text) {
    return text
  }

  const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  if (parts.length === 1) {
    return text
  }

  return parts.map((part, index) => {
    if (regex.test(part)) {
      // Reset lastIndex since RegExp with 'g' flag is stateful
      regex.lastIndex = 0

      return (
        <mark key={index} className="dnb-filter__highlighting">
          {part}
        </mark>
      )
    }

    return part
  })
}

export default FilterHighlighting
