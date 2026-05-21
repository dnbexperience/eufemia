import { createContext } from 'react'

export type FilterValue = {
  value: unknown
  label: string
  filterLabel?: string
}

export type FilterState = {
  search: string
  filters: Record<string, FilterValue>
  resultLoading?: boolean
  resultCount?: number
}

export type FilterContextValue = {
  id: string
  state: FilterState
  setSearch: (search: string) => void
  setFilter: (filterKey: string, value: FilterValue | undefined) => void
  getFilter: (filterKey: string) => FilterValue | undefined
  removeFilter: (filterKey: string) => void
  resetFilters: () => void
  hasActiveFilters: boolean
  resultCount?: number
  resultLoading?: boolean
  getAccordionOpen: (filterKey: string) => boolean | undefined
  setAccordionOpen: (filterKey: string, open: boolean) => void
}

export const FilterContext = createContext<FilterContextValue | undefined>(
  undefined
)
