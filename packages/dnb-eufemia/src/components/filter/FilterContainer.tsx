import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { clsx } from 'clsx'
import { useSharedState } from '../../shared/helpers/useSharedState'
import SharedContext from '../../shared/Context'
import type { FilterState, FilterValue } from './FilterContext'
import { FilterContext } from './FilterContext'

export type FilterContainerProps = {
  id: string
  resultCount?: number
  resultLoading?: boolean
  onChange?: (state: FilterState) => void
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

const initialState: FilterState = {
  search: '',
  filters: {},
}

const accordionStateStore = new Map<string, Record<string, boolean>>()

function FilterContainer({
  id,
  resultCount,
  resultLoading,
  onChange,
  className,
  style,
  children,
}: FilterContainerProps) {
  const sharedContext = useContext(SharedContext)
  const { ariaLabel } = sharedContext.getTranslation({}).Filter

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const accordionStateRef = useRef<Record<string, boolean>>(
    accordionStateStore.get(id) ?? {}
  )

  const { data, extend } = useSharedState<FilterState>(id, initialState)

  useEffect(() => {
    const updates: Partial<FilterState> = {}

    if (resultLoading !== undefined) {
      updates.resultLoading = resultLoading
    }

    if (resultCount !== undefined) {
      updates.resultCount = resultCount
    }

    if (Object.keys(updates).length > 0) {
      extend(updates)
    }
  }, [extend, resultLoading, resultCount])

  const state = data ?? initialState

  const setSearch = useCallback(
    (search: string) => {
      extend({ search })
      onChangeRef.current?.({ ...state, search })
    },
    [extend, state]
  )

  const setFilter = useCallback(
    (filterKey: string, value: FilterValue | undefined) => {
      const current = state.filters
      const next = { ...current }

      if (value === undefined) {
        delete next[filterKey]
      } else {
        next[filterKey] = value
      }

      extend({ filters: next })
      onChangeRef.current?.({ ...state, filters: next })
    },
    [extend, state]
  )

  const getFilter = useCallback(
    (filterKey: string) => {
      return state.filters[filterKey]
    },
    [state.filters]
  )

  const removeFilter = useCallback(
    (filterKey: string) => {
      setFilter(filterKey, undefined)
    },
    [setFilter]
  )

  const resetFilters = useCallback(() => {
    const next = { search: '', filters: {} }
    extend(next)
    onChangeRef.current?.(next)
  }, [extend])

  const hasActiveFilters =
    state.search.length > 0 || Object.keys(state.filters).length > 0

  const getAccordionOpen = useCallback((filterKey: string) => {
    return accordionStateRef.current[filterKey]
  }, [])

  const setAccordionOpen = useCallback(
    (filterKey: string, open: boolean) => {
      accordionStateRef.current[filterKey] = open
      accordionStateStore.set(id, { ...accordionStateRef.current })
    },
    [id]
  )

  const resolvedResultCount = resultCount ?? state.resultCount
  const resolvedResultLoading = resultLoading ?? state.resultLoading

  const contextValue = useMemo(
    () => ({
      id,
      state,
      setSearch,
      setFilter,
      getFilter,
      removeFilter,
      resetFilters,
      hasActiveFilters,
      resultCount: resolvedResultCount,
      resultLoading: resolvedResultLoading,
      getAccordionOpen,
      setAccordionOpen,
    }),
    [
      id,
      state,
      setSearch,
      setFilter,
      getFilter,
      removeFilter,
      resetFilters,
      hasActiveFilters,
      resolvedResultCount,
      resolvedResultLoading,
      getAccordionOpen,
      setAccordionOpen,
    ]
  )

  return (
    <FilterContext value={contextValue}>
      <div
        className={clsx('dnb-filter', className)}
        style={style}
        role="search"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </FilterContext>
  )
}

export default FilterContainer
