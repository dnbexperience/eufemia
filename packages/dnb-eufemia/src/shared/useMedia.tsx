import React from 'react'
import Context from './Context'
import {
  makeMediaQueryList,
  createMediaQueryListener,
  isMatchMediaSupported,
  MediaQueryCondition,
} from './MediaQueryUtils'
import type { MediaQueryListener } from './MediaQueryUtils'
import { toPascalCase } from './component-helper'

export type UseMediaProps = {
  /**
   * If set to true, no MediaQuery will be used.
   * Default: false
   */
  disabled?: boolean

  /**
   * For debugging
   */
  log?: boolean
}

export type UseMediaQueries = {
  small: MediaQueryCondition
  medium: MediaQueryCondition
  large: MediaQueryCondition
}

export const queries: UseMediaQueries = {
  small: { min: 0, max: 'small' },
  medium: { min: 'small', max: 'medium' },
  large: { min: 'medium' },
}

export type UseMediaResult = {
  isSmall: boolean
  isMedium: boolean
  isLarge: boolean
  isSSR: boolean
}

/**
 * Internal stuff
 */

type UseMediaItem = {
  event: MediaQueryListener
  mediaQueryList: MediaQueryList
}

type UseMediaQueryProps = {
  name: string
  when: MediaQueryCondition
}

export default function useMedia(
  props: UseMediaProps = {}
): UseMediaResult {
  const { disabled, log } = props

  const makeResult = () => {
    return Object.entries(queries).reduce(
      (acc, [key, when]) => {
        const name = `is${toPascalCase(key)}`

        if (disabled) {
          acc[name] = false
          return acc
        }

        defaults.current[name] = false

        const item = runQuery({
          name,
          when,
        })

        acc[name] = item?.mediaQueryList?.matches || false

        refs.current[key] = item

        return acc
      },
      { isSSR: !isMatchMediaSupported() }
    ) as UseMediaResult
  }

  const runQuery = ({ when, name }: UseMediaQueryProps): UseMediaItem => {
    if (!isMatchMediaSupported()) {
      return // do nothing
    }

    const mediaQueryList = makeMediaQueryList(
      {
        when,
        disabled,
        log,
      },

      context.breakpoints
    )

    const event = createMediaQueryListener(mediaQueryList, (match) => {
      if (!disabledRef.current && match) {
        const state = {
          ...defaults.current,
          isSSR: result.isSSR,
        } as UseMediaResult
        state[name] = match
        updateRerender(state)
      }
    })

    return { event, mediaQueryList }
  }

  React.useEffect(() => {
    // If it was disabled before
    if (disabledRef.current && !disabled) {
      updateRerender(makeResult())
    }
    disabledRef.current = disabled
  }, [disabled]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => removeListeners, []) // eslint-disable-line react-hooks/exhaustive-deps

  const context = React.useContext(Context)

  const refs = React.useRef({})
  const defaults = React.useRef({})
  const disabledRef = React.useRef(disabled)
  const [result, updateRerender] =
    React.useState<UseMediaResult>(makeResult)
  const removeListeners = () => {
    Object.values(refs.current).forEach(
      (item: UseMediaItem) => item?.event && item.event()
    )
  }

  return result
}
