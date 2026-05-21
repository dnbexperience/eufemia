import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSharedState } from '../../shared/helpers/useSharedState'
import type { FilterState, FilterValue } from './FilterContext'
import { FilterContext } from './FilterContext'

const emptyState: FilterState = {
  search: '',
  filters: {},
}

/**
 * Hook to consume filter state from anywhere in the component tree.
 * Linked to a Filter.Container by id via useSharedState.
 */
export function useFilter(id: string) {
  const { data, extend } = useSharedState<FilterState>(id, emptyState)

  const state = data ?? emptyState

  const resetFilters = useCallback(() => {
    extend({ search: '', filters: {} })
  }, [extend])

  const removeFilter = useCallback(
    (filterKey: string) => {
      const next = { ...state.filters }
      delete next[filterKey]
      extend({ filters: next })
    },
    [extend, state.filters]
  )

  return {
    filters: state.filters,
    search: state.search,
    hasActiveFilters:
      state.search.length > 0 || Object.keys(state.filters).length > 0,
    resetFilters,
    removeFilter,
  }
}

/**
 * Hook for use inside the Filter.Container tree.
 * Gives direct access to the filter context for building custom filters.
 */
export function useFilterContext() {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.useFilterContext() must be used inside a Filter.Container.'
    )
  }

  return {
    setFilter: context.setFilter,
    getFilter: context.getFilter,
    removeFilter: context.removeFilter,
    resetFilters: context.resetFilters,
    filters: context.state.filters,
    search: context.state.search,
    hasActiveFilters: context.hasActiveFilters,
  } as {
    setFilter: (filterKey: string, value: FilterValue | undefined) => void
    getFilter: (filterKey: string) => FilterValue | undefined
    removeFilter: (filterKey: string) => void
    resetFilters: () => void
    filters: Record<string, FilterValue>
    search: string
    hasActiveFilters: boolean
  }
}

/**
 * Hook for async data fetching linked to a Filter.Container.
 * Handles loading state, race conditions, and syncs resultLoading/resultCount
 * to the shared filter state so Filter.ResultsContainer and Filter.More pick them up.
 */
export function useFilterAsync<T>(
  id: string,
  fetcher: (params: {
    filters: Record<string, FilterValue>
    search: string
  }) => Promise<T>,
  options?: { initialData?: T }
): { data: T | undefined; loading: boolean } {
  const { data: filterData, extend } = useSharedState<FilterState>(
    id,
    emptyState
  )

  const state = filterData ?? emptyState

  const [result, setResult] = useState<T | undefined>(options?.initialData)
  const requestRef = useRef(0)

  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  useEffect(() => {
    const requestId = ++requestRef.current

    extend({ resultLoading: true })

    fetcherRef
      .current({ filters: state.filters, search: state.search })
      .then((data) => {
        if (requestId === requestRef.current) {
          setResult(data)
          extend({
            resultLoading: false,
            resultCount: Array.isArray(data) ? data.length : undefined,
          })
        }
      })
      .catch(() => {
        if (requestId === requestRef.current) {
          extend({ resultLoading: false })
        }
      })
  }, [state.filters, state.search, extend])

  return {
    data: result,
    loading: state.resultLoading ?? false,
  }
}
