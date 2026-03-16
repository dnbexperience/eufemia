import React from 'react'

export type UseHandleSortStateOptions = {
  /**
   * Defines if the current column should be active or not.
   * Defaults to false.
   */
  active?: boolean

  /**
   * Define the sorting direction. Can be "asc", "desc" or "off".
   * Defaults to "off".
   */
  direction?: UseHandleSortStateDirection

  /**
   * Define the possible modes.
   * Defaults to ["asc", "desc", "off"].
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
export type SortState = Record<
  UseHandleSortStateName,
  {
    active: boolean
    reversed: boolean
    direction: UseHandleSortStateDirection | 'off'
  }
>
export type SortEventHandler = () => void
export type SortHandler = Record<UseHandleSortStateName, SortEventHandler>

type SortStateInternalStateOptions = Omit<
  UseHandleSortStateOptions,
  'direction'
> & { direction: UseHandleSortStateDirection | 'off' }
type SortStateInternalState = SortStateInternalStateOptions & {
  reversed: boolean
  lastDirection: UseHandleSortStateDirection
}
type SortStateInternalEntry = Record<
  UseHandleSortStateName,
  SortStateInternalStateOptions
>
type GetNextMode = {
  direction: UseHandleSortStateDirection
  opts: SortStateInternalStateOptions
  defaults: UseHandleSortStateOptions
}

export function useHandleSortState(
  config: UseHandleSortStateConfig,
  defaults: UseHandleSortStateOptions = {
    direction: 'off',
    modes: ['asc', 'desc', 'off'],
  }
) {
  const initialState = React.useMemo(() => {
    return Object.entries(config).reduce((acc, [name, opts]) => {
      acc[name] = { ...defaults, ...opts }

      return acc
    }, {})
  }, [config, defaults])

  const [internalState, setState] = React.useState<SortState>(initialState)

  const sortHandler: SortHandler = React.useMemo(() => {
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
          state.direction = getNextMode({
            direction: state.direction,
            opts,
            defaults,
          })
          state.active = state.direction !== 'off'
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
  }, [internalState]) // eslint-disable-line react-hooks/exhaustive-deps

  let activeSortName = null
  const sortState: SortState = Object.entries(internalState).reduce(
    (acc, [name, { active, direction }]) => {
      const reversed =
        direction === 'off' ? undefined : direction === 'desc'

      if (active) {
        activeSortName = name
      } else {
        active = false
      }

      acc[name] = { active, direction, reversed }

      return acc
    },
    {}
  )

  return { sortState, sortHandler, activeSortName }

  function getNextMode({ direction, opts, defaults }: GetNextMode) {
    const modes = defaults.modes.filter((mode) => {
      return opts.modes.includes(mode)
    })

    if (!modes.includes(direction)) {
      direction = modes[0]
    }

    let next = direction

    for (let i = 0, l = modes.length; i < l; i++) {
      const mode = modes[i]

      if (direction === mode) {
        let c = i + 1
        if (c >= l) {
          c = 0
        }
        next = modes[c]
        break
      }
    }

    return next
  }
}

export default useHandleSortState
