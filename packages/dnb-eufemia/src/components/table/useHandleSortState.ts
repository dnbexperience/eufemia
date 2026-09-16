import { useMemo, useState } from 'react'

export type TableHandleSortStateOptions = {
  /**
   * Defines the sortable column as the currently sorted column.
   * Default: `false`
   */
  active?: boolean

  /**
   * Define the sorting direction. Can be `asc`, `desc` or `off`.
   * Defaults to `off`.
   */
  direction?: TableHandleSortStateDirection

  /**
   * Define the possible modes, in the order they are cycled through.
   * Defaults to `["asc", "desc", "off"]`.
   */
  modes?: Array<TableHandleSortStateMode>
}
export type TableHandleSortStateDirection = 'asc' | 'desc' | 'off'
export type TableHandleSortStateMode = 'asc' | 'desc' | 'off'
export type TableHandleSortStateName = string
export type TableHandleSortStateConfig = Record<
  TableHandleSortStateName,
  TableHandleSortStateOptions
>
export type TableSortState = Record<
  TableHandleSortStateName,
  {
    active: boolean
    reversed: boolean
    direction: TableHandleSortStateDirection | 'off'
    sortedBefore?: boolean
  }
>
export type TableSortEventHandler = () => void
export type TableSortHandler = Record<
  TableHandleSortStateName,
  TableSortEventHandler
>

type SortStateInternalStateOptions = Omit<
  TableHandleSortStateOptions,
  'direction'
> & { direction: TableHandleSortStateDirection | 'off' }
type SortStateInternalState = SortStateInternalStateOptions & {
  reversed: boolean
  lastDirection: TableHandleSortStateDirection
  sortedBefore?: boolean
}
type SortStateInternalEntry = Record<
  TableHandleSortStateName,
  SortStateInternalStateOptions
>

const defaultOptions: TableHandleSortStateOptions = {
  direction: 'off',
  modes: ['asc', 'desc', 'off'],
}

export function useHandleSortState(
  config: TableHandleSortStateConfig,
  defaults?: TableHandleSortStateOptions
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
  direction: TableHandleSortStateDirection,
  modes: Array<TableHandleSortStateMode>
) {
  const index = modes.indexOf(direction)

  if (index === -1) {
    return modes[0]
  }

  return modes[(index + 1) % modes.length]
}

export default useHandleSortState
