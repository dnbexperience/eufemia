import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useSharedState } from '../../../shared/helpers/useSharedState'
import { debounceAsync } from '../../../shared/helpers/debounce'
import type { FilterState, FilterValue } from '../FilterContext'
import { FilterContext } from '../FilterContext'

const emptyState: FilterState = {
  search: '',
  filters: {},
}

/**
 * Hook to consume filter state from anywhere in the component tree.
 * Linked to a Filter.Root by id via useSharedState.
 */
export function useFilter(id: string) {
  const { data, get, extend } = useSharedState<FilterState>(id, emptyState)

  const state = data ?? emptyState

  const resetFilters = useCallback(() => {
    extend({ search: '', filters: {} })
  }, [extend])

  const removeFilter = useCallback(
    (filterKey: string) => {
      const latest = get() ?? emptyState
      const next = { ...latest.filters }
      delete next[filterKey]
      extend({ filters: next })
    },
    [extend, get]
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
 * Hook for use inside the Filter.Root tree.
 * Gives direct access to the filter context for building custom filters.
 */
export function useFilterContext() {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.useFilterContext() must be used inside a Filter.Root.'
    )
  }

  return {
    setFilter: context.setFilter,
    getFilter: context.getFilter,
    removeFilter: context.removeFilter,
    resetFilters: context.resetFilters,
    commitFilters: context.commitFilters,
    revertFilters: context.revertFilters,
    filters: context.state.filters,
    search: context.state.search,
    hasActiveFilters: context.hasActiveFilters,
  }
}

export type FilterAsyncOptions<T> = {
  /** Seed data used for the initial render before the first fetch completes. */
  initialData?: T
  /** Delay in milliseconds before executing the fetcher after a state change. Useful for reducing API calls while the user is typing. */
  debounce?: number
}

/**
 * Hook for async data fetching linked to a Filter.Root.
 * Handles loading state, race conditions, and syncs resultLoading/resultCount
 * to the shared filter state so Filter.Content picks them up.
 */
export function useFilterAsync<T>(
  id: string,
  fetcher: (params: {
    filters: Record<string, FilterValue>
    search: string
  }) => Promise<T>,
  options?: FilterAsyncOptions<T>
): { data: T | undefined; loading: boolean; error: Error | undefined } {
  const { data: filterData, extend } = useSharedState<FilterState>(
    id,
    emptyState
  )

  const state = filterData ?? emptyState

  const [result, setResult] = useState<T | undefined>(options?.initialData)
  const [error, setError] = useState<Error | undefined>(undefined)
  const requestRef = useRef(0)

  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  const initialDataRef = useRef(options?.initialData)
  initialDataRef.current = options?.initialData

  const debounceMs = options?.debounce ?? 0

  type FetcherParams = {
    filters: Record<string, FilterValue>
    search: string
  }
  type DebouncedFetcher = ((params: FetcherParams) => Promise<T>) & {
    cancel: () => void
  }

  const debouncedFetcherRef = useRef<DebouncedFetcher | undefined>(
    undefined
  )

  if (debounceMs > 0 && !debouncedFetcherRef.current) {
    debouncedFetcherRef.current = debounceAsync(
      (params: FetcherParams) => fetcherRef.current(params),
      debounceMs
    ) as DebouncedFetcher
  }

  const filtersKey = JSON.stringify(state.filters)
  const search = state.search

  useEffect(() => {
    const filters = JSON.parse(filtersKey) as Record<string, FilterValue>
    const requestId = ++requestRef.current
    const isFirstRun = requestId === 1
    let cancelled = false

    if (!isFirstRun || !initialDataRef.current) {
      extend({ resultLoading: true })
    }
    setError(undefined)

    const shouldDebounce = debounceMs > 0 && !isFirstRun
    const fetchFn = shouldDebounce
      ? debouncedFetcherRef.current
      : fetcherRef.current

    fetchFn({ filters, search })
      .then((data) => {
        if (!cancelled && requestId === requestRef.current) {
          setResult(data)
          extend({
            resultLoading: false,
            resultCount: Array.isArray(data) ? data.length : undefined,
          })
        }
      })
      .catch((err) => {
        if (!cancelled && requestId === requestRef.current) {
          setError(err instanceof Error ? err : new Error(String(err)))
          extend({ resultLoading: false })
        }
      })

    return () => {
      cancelled = true
      if (shouldDebounce) {
        debouncedFetcherRef.current?.cancel()
      }
    }
  }, [filtersKey, search, extend, debounceMs])

  return {
    data: result,
    loading: state.resultLoading ?? false,
    error,
  }
}
