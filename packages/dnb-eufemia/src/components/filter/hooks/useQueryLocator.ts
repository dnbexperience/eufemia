import { useCallback, useRef } from 'react'
import { useFilter } from './useFilter'
import type { FilterValue, FilterState } from '../FilterContext'
import { useSharedState } from '../../../shared/helpers/useSharedState'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../shared/helpers/useIsomorphicLayoutEffect'
import { sanitizeUrlFilters } from '../utils/sanitizeUrlFilters'

const emptyState: FilterState = {
  search: '',
  filters: {},
}

export type FilterQueryLocatorOptions = {
  /** When true, the search string is not synced to or from the URL. */
  excludeSearch?: boolean
}

/**
 * Syncs filter state with URL query parameters using the History API.
 * Works without any router dependency.
 */
export default function useFilterQueryLocator(
  id: string,
  options?: FilterQueryLocatorOptions
) {
  const { excludeSearch = false } = options ?? {}

  const searchParam = `${id}-search`
  const filtersParam = `${id}-filters`

  const { extend } = useSharedState<FilterState>(id, emptyState)
  const { filters, search } = useFilter(id)

  const isRestoringRef = useRef(false)

  const writeToUrl = useCallback(
    (
      currentSearch: string,
      currentFilters: Record<string, FilterValue>
    ) => {
      if (isRestoringRef.current) {
        return // stop here
      }

      const url = new URL(window.location.href)

      if (!excludeSearch) {
        if (currentSearch) {
          url.searchParams.set(searchParam, currentSearch)
        } else {
          url.searchParams.delete(searchParam)
        }
      }

      const filterKeys = Object.keys(currentFilters)
      if (filterKeys.length > 0) {
        url.searchParams.set(filtersParam, JSON.stringify(currentFilters))
      } else {
        url.searchParams.delete(filtersParam)
      }

      window.history.replaceState({}, '', url.toString())
    },
    [searchParam, filtersParam, excludeSearch]
  )

  const readFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search)
    const urlSearch = excludeSearch ? '' : (params.get(searchParam) ?? '')
    let urlFilters: Record<string, FilterValue> = {}

    const filtersRaw = params.get(filtersParam)
    if (filtersRaw) {
      try {
        urlFilters = sanitizeUrlFilters(JSON.parse(filtersRaw))
      } catch {
        // Ignore malformed JSON in URL
      }
    }

    return { search: urlSearch, filters: urlFilters }
  }, [searchParam, filtersParam, excludeSearch])

  const restoreFromUrl = useCallback(() => {
    const { search: urlSearch, filters: urlFilters } = readFromUrl()
    const hasState = urlSearch || Object.keys(urlFilters).length > 0

    if (hasState) {
      isRestoringRef.current = true
      extend({ search: urlSearch, filters: urlFilters })
      isRestoringRef.current = false
    }
  }, [readFromUrl, extend])

  // Restore state from URL on mount
  useLayoutEffect(() => {
    restoreFromUrl()

    const handlePopstate = () => {
      restoreFromUrl()
    }

    window.addEventListener('popstate', handlePopstate)
    return () => window.removeEventListener('popstate', handlePopstate)
  }, [restoreFromUrl])

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
