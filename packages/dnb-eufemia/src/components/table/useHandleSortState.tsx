import React from 'react'

export type useHandleSortStateOptions = {
  /**
   * Defines if the current column should be active or not.
   * Defaults to false.
   */
  active?: boolean

  /**
   * Define the sorting direction. Can be "asc" or "desc".
   * Defaults to "asc".
   */
  direction?: useHandleSortStateDirection

  /**
   * Define the possible modes.
   * Defaults to ["asc", "desc", "off"].
   */
  modes?: Array<useHandleSortStateMode>
}
export type useHandleSortStateDirection = 'asc' | 'desc'
export type useHandleSortStateMode = 'asc' | 'desc' | 'off'
export type useHandleSortStateName = string
export type useHandleSortStateConfig = Record<
  useHandleSortStateName,
  useHandleSortStateOptions
>
export type SortState = Record<
  useHandleSortStateName,
  {
    active: boolean
    reversed: boolean
    direction: useHandleSortStateDirection | 'off'
  }
>
export type SortEventHandler = () => void
export type SortHandler = Record<useHandleSortStateName, SortEventHandler>

type SortStateInternalStateOptions = Omit<
  useHandleSortStateOptions,
  'direction'
> & { direction: useHandleSortStateDirection | 'off' }
type SortStateInternalState = SortStateInternalStateOptions & {
  reversed: boolean
  lastDirection: useHandleSortStateDirection
}
type SortStateInternalEntry = Record<
  useHandleSortStateName,
  SortStateInternalStateOptions
>
type GetNextMode = {
  state: SortStateInternalState
  opts: SortStateInternalStateOptions
  defaults: useHandleSortStateOptions
}

export function useHandleSortState(
  config: useHandleSortStateConfig,
  defaults: useHandleSortStateOptions = {
    direction: 'asc',
    modes: ['asc', 'desc', 'off'],
  }
) {
  const initialState = React.useMemo(() => {
    return Object.entries(config).reduce((acc, [name, opts]) => {
      acc[name] = { ...defaults, ...opts }
      if (!acc[name].active && !acc[name].lastDirection) {
        acc[name].lastDirection = acc[name].direction
      }
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
        } else {
          state.direction = getNextMode({ state, opts, defaults })
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

  const sortState: SortState = Object.entries(internalState).reduce(
    (acc, [name, { active, direction }]) => {
      const reversed =
        direction === 'off' ? undefined : direction === 'desc'

      acc[name] = { active, direction, reversed }
      return acc
    },
    {}
  )

  return { sortState, sortHandler }

  function getNextMode({ state, opts, defaults }: GetNextMode) {
    const modes = defaults.modes.filter((mode) => {
      return opts.modes.includes(mode)
    })

    for (let i = 0, l = modes.length; i < l; i++) {
      const mode = modes[i]

      if (mode === state.direction) {
        let c = i + 1
        if (c >= l) {
          c = 0
        }
        state.direction = modes[c]
        break
      }
    }

    return state.direction
  }
}

export default useHandleSortState
