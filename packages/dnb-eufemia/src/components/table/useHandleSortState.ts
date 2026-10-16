import { useMemo, useState } from 'react'

export type UseHandleSortStateOptions = {
  /**
   * Defines the sortable column as the currently sorted column.
   * Default: `false`
   */
  active?: boolean

  /**
   * Define the sorting direction. Can be `asc`, `desc` or `off`.
   * Defaults to `off`.
   */
  direction?: UseHandleSortStateDirection

  /**
   * Define the possible modes, in the order they are cycled through.
   * Defaults to `["asc", "desc", "off"]`.
   */
  modes?: Array<UseHandleSortStateMode>
}
export type UseHandleSortStateDirection = 'asc' | 'desc' | 'off'
export type UseHandleSortStateMode = 'asc' | 'desc' | 'off'
export type UseHandleSortStateName = string
export type UseHandleSortStateConfig = Record<
  UseHandleSortStateName,
  UseHandleSortStateOptions
>
export type TableSortState = Record<
  UseHandleSortStateName,
  {
    active: boolean
    reversed: boolean
    direction: UseHandleSortStateDirection | 'off'
    sortedBefore?: boolean
  }
>
export type TableSortEventHandler = () => void
export type TableSortHandler = Record<
  UseHandleSortStateName,
  TableSortEventHandler
>

type SortStateInternalStateOptions = Omit<
  UseHandleSortStateOptions,
  'direction'
> & { direction: UseHandleSortStateDirection | 'off' }
type SortStateInternalState = SortStateInternalStateOptions & {
  reversed: boolean
  lastDirection: UseHandleSortStateDirection
  sortedBefore?: boolean
}
type SortStateInternalEntry = Record<
  UseHandleSortStateName,
  SortStateInternalStateOptions
>

const defaultOptions: UseHandleSortStateOptions = {
  direction: 'off',
  modes: ['asc', 'desc', 'off'],
}

export function useHandleSortState(
  config: UseHandleSortStateConfig,
  defaults?: UseHandleSortStateOptions
) {
  const initialState = useMemo(() => {
    return Object.entries(config).reduce((acc, [name, opts]) => {
      acc[name] = { ...defaultOptions, ...defaults, ...opts }

      return acc
    }, {})
  }, [config, defaults])

  const [internalState, setState] = useState<TableSortState>(initialState)

  const sortHandler: TableSortHandler = useMemo(() => {
    const list = Object.entries(internalState as SortStateInternalEntry)

    return list.reduce((acc, [name, opts]) => {
      acc[name] = () => {
        const state = { ...internalState[name] } as SortStateInternalState

        if (!state.active && state.lastDirection) {
          state.direction = state.lastDirection
          state.active = true
          state.lastDirection = null
        } else if (!state.active && state.direction !== 'off') {
          state.active = true
        } else {
          state.direction = getNextMode(state.direction, opts.modes)
          state.active = state.direction !== 'off'
        }

        if (!state.active) {
          state.sortedBefore = true
        } else {
          state.sortedBefore = undefined
        }

        setState({
          ...list.reduce((acc, [name, opts]) => {
            acc[name] = opts
            acc[name].active = false
            if (opts.direction !== 'off') {
              acc[name].lastDirection = opts.direction
            }
            return acc
          }, {}),
          [name]: state,
        })
      }

      return acc
    }, {})
  }, [internalState])

  let activeSortName = null
  const sortState: TableSortState = Object.entries(internalState).reduce(
    (acc, [name, { active, direction, sortedBefore }]) => {
      const reversed =
        direction === 'off' ? undefined : direction === 'desc'

      if (active) {
        activeSortName = name
      } else {
        active = false
      }

      acc[name] = { active, direction, reversed }

      if (sortedBefore && !active) {
        acc[name].sortedBefore = true
      }

      return acc
    },
    {}
  )

  return { sortState, sortHandler, activeSortName }
}

function getNextMode(
  direction: UseHandleSortStateDirection,
  modes: Array<UseHandleSortStateMode>
) {
  const index = modes.indexOf(direction)

  if (index === -1) {
    return modes[0]
  }

  return modes[(index + 1) % modes.length]
}

export default useHandleSortState
