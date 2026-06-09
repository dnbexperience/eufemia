import { createContext } from 'react'
import type { RefObject } from 'react'

export type FilterValue = {
  value: string | number | boolean | Record<string, unknown>
  label: string
  categoryLabel?: string
}

export type FilterChangeState = {
  search: string
  filters: Record<string, FilterValue>
}

export type FilterState = FilterChangeState & {
  resultLoading?: boolean
  resultCount?: number
}

export type FilterContextValue = {
  id: string
  behavior: 'realtime' | 'manual'
  state: FilterState
  appliedState: FilterState
  setSearch: (search: string) => void
  setFilter: (filterKey: string, value: FilterValue | undefined) => void
  getFilter: (filterKey: string) => FilterValue | undefined
  removeFilter: (filterKey: string) => void
  removeAppliedFilter: (filterKey: string) => void
  clearFilters: () => void
  replaceFilters: (filters: Record<string, FilterValue>) => void
  resetFilters: () => void
  commitFilters: () => void
  revertFilters: () => void
  hasActiveFilters: boolean
  resultCount?: number
  resultLoading?: boolean
  panelOpen: boolean
  setPanelOpen: (open: boolean) => void
  panelButtonRef: RefObject<HTMLButtonElement | null>
  getAccordionOpen: (filterKey: string) => boolean | undefined
  setAccordionOpen: (filterKey: string, open: boolean) => void
}

export const FilterContext = createContext<FilterContextValue | undefined>(
  undefined
)

/**
 * Provides the connectedTo id from a parent Results
 * so child components like NoResults can inherit it.
 */
export const FilterConnectedIdContext = createContext<string | undefined>(
  undefined
)

export type FilterItemContextValue = {
  panelRef: RefObject<HTMLDivElement | null>
}

/**
 * Provides panel-level data to child filter components
 * rendered inside a filter panel.
 */
export const FilterItemContext =
  createContext<FilterItemContextValue | null>(null)
