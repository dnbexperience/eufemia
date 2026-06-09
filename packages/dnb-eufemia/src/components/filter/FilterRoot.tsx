import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { clsx } from 'clsx'
import { useSharedState } from '../../shared/helpers/useSharedState'
import SharedContext from '../../shared/Context'
import type {
  FilterChangeState,
  FilterState,
  FilterValue,
} from './FilterContext'
import { FilterContext } from './FilterContext'
import { useSpacing } from '../space/SpacingUtils'
import type { SpacingProps } from '../../shared/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type FilterRootProps = {
  id: string
  behavior?: 'realtime' | 'manual'
  defaultFilters?: Record<string, FilterValue>
  defaultPanelOpen?: boolean
  resultCount?: number
  resultLoading?: boolean
  onChange?: (state: FilterChangeState) => void
  className?: string
  style?: CSSProperties
  children?: ReactNode
} & SpacingProps

const initialState: FilterState = {
  search: '',
  filters: {},
}

function toChangeState({
  search,
  filters,
}: FilterChangeState): FilterChangeState {
  return { search, filters }
}

function deriveAccordionState(
  filters: Record<string, FilterValue>
): Record<string, boolean> {
  const keys = new Set<string>()

  for (const key of Object.keys(filters)) {
    const lastSlash = key.lastIndexOf('/')
    if (lastSlash > 0) {
      keys.add(key.slice(0, lastSlash))
    }
  }

  const state: Record<string, boolean> = {}
  for (const k of Array.from(keys)) {
    state[k] = true
  }

  return state
}

function FilterRoot({
  id,
  behavior = 'realtime',
  defaultFilters,
  defaultPanelOpen,
  resultCount,
  resultLoading,
  onChange,
  className,
  style,
  children,
  ...spacingRest
}: FilterRootProps) {
  const sharedContext = useContext(SharedContext)
  const { ariaLabel } = sharedContext.getTranslation({}).Filter

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const hasDefaultFilters =
    defaultFilters && Object.keys(defaultFilters).length > 0

  const defaultAccordionState = useMemo(() => {
    if (!hasDefaultFilters) {
      return {}
    }

    return deriveAccordionState(defaultFilters)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const { data: savedAccordionState, extend: extendAccordionState } =
    useSharedState<Record<string, boolean>>(
      `${id}__accordion`,
      defaultAccordionState
    )

  const accordionStateRef = useRef<Record<string, boolean>>(
    savedAccordionState ?? defaultAccordionState
  )

  const defaultState: FilterState = defaultFilters
    ? { search: '', filters: defaultFilters }
    : initialState

  const { data, get, extend } = useSharedState<FilterState>(
    id,
    defaultState
  )

  const isManual = behavior === 'manual'

  const [draftState, setDraftState] = useState<FilterState>(
    () => data ?? defaultState
  )
  const draftRef = useRef(draftState)
  draftRef.current = draftState

  // Apply defaultFilters on mount — ensures they are set even when
  // useFilter initializes the shared state to empty before FilterRoot renders.
  useEffect(() => {
    if (hasDefaultFilters) {
      extend({ filters: defaultFilters })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  const state = isManual ? draftState : (data ?? initialState)

  const setSearch = useCallback(
    (search: string) => {
      if (isManual) {
        const filters = (get() ?? initialState).filters

        setDraftState((prev) => ({ ...prev, search }))
        extend({ search })
        onChangeRef.current?.({ search, filters })
      } else {
        extend({ search })
        const filters = (get() ?? initialState).filters
        onChangeRef.current?.({ search, filters })
      }
    },
    [isManual, extend, get]
  )

  const setFilter = useCallback(
    (filterKey: string, value: FilterValue | undefined) => {
      if (isManual) {
        setDraftState((prev) => {
          const next = { ...prev.filters }

          if (value === undefined) {
            delete next[filterKey]
          } else {
            next[filterKey] = value
          }

          return { ...prev, filters: next }
        })
      } else {
        const latest = get() ?? initialState
        const next = { ...latest.filters }

        if (value === undefined) {
          delete next[filterKey]
        } else {
          next[filterKey] = value
        }

        extend({ filters: next })
        onChangeRef.current?.(toChangeState({ ...latest, filters: next }))
      }
    },
    [isManual, extend, get]
  )

  const getFilter = useCallback(
    (filterKey: string) => {
      return state.filters[filterKey]
    },
    [state.filters]
  )

  const submitFilterRemoval = useCallback(
    (filterKey: string) => {
      const committed = get() ?? initialState
      const nextAppliedFilters = { ...committed.filters }
      delete nextAppliedFilters[filterKey]

      const draft = draftRef.current
      const nextDraftFilters = { ...draft.filters }
      delete nextDraftFilters[filterKey]

      const nextDraftState = {
        ...draft,
        filters: nextDraftFilters,
      }

      const nextAppliedState = {
        search: committed.search,
        filters: nextAppliedFilters,
      }

      setDraftState(nextDraftState)
      extend(nextAppliedState)
      onChangeRef.current?.(toChangeState(nextAppliedState))
    },
    [extend, get]
  )

  const removeFilter = useCallback(
    (filterKey: string) => {
      if (isManual) {
        const appliedFilters = (get() ?? initialState).filters

        if (Object.hasOwn(appliedFilters, filterKey)) {
          submitFilterRemoval(filterKey)
        } else {
          setFilter(filterKey, undefined)
        }
      } else {
        setFilter(filterKey, undefined)
      }
    },
    [get, isManual, setFilter, submitFilterRemoval]
  )

  const removeAppliedFilter = useCallback(
    (filterKey: string) => {
      if (isManual) {
        submitFilterRemoval(filterKey)
      } else {
        removeFilter(filterKey)
      }
    },
    [isManual, removeFilter, submitFilterRemoval]
  )

  const clearFilters = useCallback(() => {
    const latest = isManual ? draftRef.current : (get() ?? initialState)
    const nextState = { ...latest, filters: {} }

    if (isManual) {
      setDraftState(nextState)
    }

    extend({ search: nextState.search, filters: nextState.filters })
    onChangeRef.current?.(toChangeState(nextState))
  }, [extend, get, isManual])

  const replaceFilters = useCallback(
    (filters: Record<string, FilterValue>) => {
      if (isManual) {
        setDraftState((prev) => ({ ...prev, filters }))
      } else {
        extend({ filters })
        const latest = get() ?? initialState
        onChangeRef.current?.(toChangeState({ ...latest, filters }))
      }
    },
    [isManual, extend, get]
  )

  const resetFilters = useCallback(() => {
    const next = { search: '', filters: {} }

    if (isManual) {
      setDraftState(next)
      extend(next)
    } else {
      extend(next)
    }

    onChangeRef.current?.(next)
  }, [isManual, extend])

  const commitFilters = useCallback(() => {
    const draft = draftRef.current
    extend({ search: draft.search, filters: draft.filters })
    onChangeRef.current?.(toChangeState(draft))
  }, [extend])

  const revertFilters = useCallback(() => {
    const committed = get() ?? initialState
    setDraftState({
      search: committed.search,
      filters: committed.filters,
    })
  }, [get])

  const hasActiveFilters =
    state.search.length > 0 || Object.keys(state.filters).length > 0

  const [panelOpen, setPanelOpen] = useState(
    defaultPanelOpen ?? !!hasDefaultFilters
  )
  const panelButtonRef = useRef<HTMLButtonElement | null>(null)

  // When filters are already present on mount (e.g. restored from URL by
  // useQueryLocator), open the panel and the affected accordions.
  useEffect(() => {
    if (defaultPanelOpen !== undefined || hasDefaultFilters) {
      return // stop here — explicit defaultPanelOpen or defaultFilters already handles this
    }

    const current = get()
    const filters = current?.filters ?? {}

    if (Object.keys(filters).length > 0) {
      setPanelOpen(true)

      const accordionState = deriveAccordionState(filters)
      accordionStateRef.current = {
        ...accordionStateRef.current,
        ...accordionState,
      }
      extendAccordionState(accordionState)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getAccordionOpen = useCallback((filterKey: string) => {
    return accordionStateRef.current[filterKey]
  }, [])

  const setAccordionOpen = useCallback(
    (filterKey: string, open: boolean) => {
      accordionStateRef.current[filterKey] = open
      extendAccordionState({ [filterKey]: open })
    },
    [extendAccordionState]
  )

  const sharedState = data ?? initialState

  // The applied state is the committed shared state, separate from the local draft in manual mode
  const appliedState = sharedState
  const resolvedResultCount = resultCount ?? sharedState.resultCount
  const resolvedResultLoading = resultLoading ?? sharedState.resultLoading

  const contextValue = useMemo(
    () => ({
      id,
      behavior,
      state,
      appliedState,
      setSearch,
      setFilter,
      getFilter,
      removeFilter,
      removeAppliedFilter,
      clearFilters,
      replaceFilters,
      resetFilters,
      commitFilters,
      revertFilters,
      hasActiveFilters,
      resultCount: resolvedResultCount,
      resultLoading: resolvedResultLoading,
      panelOpen,
      setPanelOpen,
      panelButtonRef,
      getAccordionOpen,
      setAccordionOpen,
    }),
    [
      id,
      behavior,
      state,
      appliedState,
      setSearch,
      setFilter,
      getFilter,
      removeFilter,
      removeAppliedFilter,
      clearFilters,
      replaceFilters,
      resetFilters,
      commitFilters,
      revertFilters,
      hasActiveFilters,
      resolvedResultCount,
      resolvedResultLoading,
      panelOpen,
      setPanelOpen,
      panelButtonRef,
      getAccordionOpen,
      setAccordionOpen,
    ]
  )

  const spacingProps = useSpacing(spacingRest, {
    className: clsx('dnb-filter', className),
    style,
  })

  return (
    <FilterContext value={contextValue}>
      <div {...spacingProps} role="search" aria-label={ariaLabel}>
        {children}
      </div>
    </FilterContext>
  )
}

withComponentMarkers(FilterRoot, { _supportsSpacingProps: true })

export default FilterRoot
