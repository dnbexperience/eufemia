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
  /** Deadline in milliseconds for the fetcher, measured from the change that triggered it, so it also covers `debounce`. When it is reached, the loading state is cleared, `error` is set, and a later settle from that fetch is ignored. Defaults to `30000` (30 seconds). */
  timeout?: number
}

/**
 * The fetcher is what clears `resultLoading`, which shows a skeleton on
 * Filter.Content and hides the result count. Nothing else clears it, so a
 * Promise that never settles would leave the filter loading forever. Use the
 * same deadline Form.Handler applies to its own async submit.
 */
const DEFAULT_FILTER_ASYNC_TIMEOUT = 30000

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
  const timeoutMs = options?.timeout ?? DEFAULT_FILTER_ASYNC_TIMEOUT

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

    // Only returns true for whichever outcome arrives first, so a fetch
    // settling after its deadline is ignored rather than overwriting results
    // the filter has already moved on from
    let settled = false
    const claimRequest = () => {
      if (settled || cancelled || requestId !== requestRef.current) {
        return false
      }

      settled = true

      return true
    }

    const timeoutId = setTimeout(() => {
      if (claimRequest()) {
        setError(
          new Error(
            `Filter.useFilterAsync(): the fetcher did not settle within ${timeoutMs}ms.`
          )
        )
        extend({ resultLoading: false })
      }
    }, timeoutMs)

    fetchFn({ filters, search })
      .then((data) => {
        if (claimRequest()) {
          clearTimeout(timeoutId)
          setResult(data)
          extend({
            resultLoading: false,
            resultCount: Array.isArray(data) ? data.length : undefined,
          })
        }
      })
      .catch((err) => {
        if (claimRequest()) {
          clearTimeout(timeoutId)
          setError(err instanceof Error ? err : new Error(String(err)))
          extend({ resultLoading: false })
        }
      })

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
      if (shouldDebounce) {
        debouncedFetcherRef.current?.cancel()
      }
    }
  }, [filtersKey, search, extend, debounceMs, timeoutMs])

  return {
    data: result,
    loading: state.resultLoading ?? false,
    error,
  }
}
