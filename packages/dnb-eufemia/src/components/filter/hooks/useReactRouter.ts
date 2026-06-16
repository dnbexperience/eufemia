import { useCallback, useRef } from 'react'
import { useFilter } from './useFilter'
import type { FilterState, FilterValue } from '../FilterContext'
import { useSharedState } from '../../../shared/helpers/useSharedState'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../shared/helpers/useIsomorphicLayoutEffect'

import type { FilterQueryLocatorOptions } from './useQueryLocator'
import { sanitizeUrlFilters } from '../utils/sanitizeUrlFilters'

const emptyState: FilterState = {
  search: '',
  filters: {},
}

/**
 * Syncs filter state with URL query parameters using React Router's useSearchParams.
 */
export default function useFilterReactRouter(
  id: string,
  {
    useSearchParams,
    excludeSearch = false,
  }: {
    useSearchParams: () => [
      URLSearchParams,
      (params: URLSearchParams, options?: { replace?: boolean }) => void,
    ]
  } & FilterQueryLocatorOptions
) {
  const searchParam = `${id}-search`
  const filtersParam = `${id}-filters`

  const { extend } = useSharedState<FilterState>(id, emptyState)
  const { filters, search } = useFilter(id)
  const [searchParams, setSearchParams] = useSearchParams()

  const isRestoringRef = useRef(false)

  const searchParamsRef = useRef(searchParams)
  searchParamsRef.current = searchParams

  const writeToUrl = useCallback(
    (
      currentSearch: string,
      currentFilters: Record<string, FilterValue>
    ) => {
      if (isRestoringRef.current) {
        return // stop here
      }

      const params = new URLSearchParams(searchParamsRef.current)

      if (!excludeSearch) {
        if (currentSearch) {
          params.set(searchParam, currentSearch)
        } else {
          params.delete(searchParam)
        }
      }

      const filterKeys = Object.keys(currentFilters)
      if (filterKeys.length > 0) {
        params.set(filtersParam, JSON.stringify(currentFilters))
      } else {
        params.delete(filtersParam)
      }

      setSearchParams(params, { replace: true })
    },
    [searchParam, filtersParam, setSearchParams, excludeSearch]
  )

  const readFromUrl = useCallback(() => {
    const urlSearch = excludeSearch
      ? ''
      : (searchParams.get(searchParam) ?? '')
    let urlFilters: Record<string, FilterValue> = {}

    const filtersRaw = searchParams.get(filtersParam)
    if (filtersRaw) {
      try {
        urlFilters = sanitizeUrlFilters(JSON.parse(filtersRaw))
      } catch {
        // Ignore malformed JSON in URL
      }
    }

    return { search: urlSearch, filters: urlFilters }
  }, [searchParams, searchParam, filtersParam, excludeSearch])

  // Restore state from URL on mount and when searchParams change (back/forward)
  useLayoutEffect(() => {
    const { search: urlSearch, filters: urlFilters } = readFromUrl()
    const hasState = urlSearch || Object.keys(urlFilters).length > 0

    if (hasState) {
      isRestoringRef.current = true
      extend({ search: urlSearch, filters: urlFilters })
      isRestoringRef.current = false
    }
  }, [readFromUrl, extend])

  // Write state to URL when filters or search change
  const prevRef = useRef<{
    search: string
    filters: Record<string, FilterValue>
  }>({
    search: '',
    filters: {},
  })
  useLayoutEffect(() => {
    const prev = prevRef.current
    const filtersChanged =
      JSON.stringify(prev.filters) !== JSON.stringify(filters)
    const searchChanged = prev.search !== search

    if (filtersChanged || searchChanged) {
      prevRef.current = { search, filters }
      writeToUrl(search, filters)
    }
  }, [search, filters, writeToUrl])

  return { readFromUrl }
}
