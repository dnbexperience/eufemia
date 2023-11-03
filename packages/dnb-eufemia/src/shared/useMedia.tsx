import React from 'react'
import Context from './Context'
import {
  makeMediaQueryList,
  createMediaQueryListener,
  isMatchMediaSupported,
} from './MediaQueryUtils'
import type {
  MediaQueryListener,
  MediaQueryCondition,
  MediaQueryBreakpoints,
} from './MediaQueryUtils'
import { toPascalCase } from './component-helper'

const makeLayoutEffect = () => {
  // SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
  return typeof window === 'undefined'
    ? React.useEffect
    : window['__SSR_TEST__'] // To be able to test this hook like we are in SSR land
    ? () => null
    : React.useLayoutEffect
}

export type UseMediaProps = {
  /**
   * Give a initial value, that is used during SSR as well.
   * Default: null
   */
  initialValue?: Partial<UseMediaResult>

  /**
   * If set to true, no MediaQuery will be used.
   * Default: false
   */
  disabled?: boolean

  /**
   * Provide a custom breakpoint
   * Default: defaultBreakpoints
   */
  breakpoints?: MediaQueryBreakpoints

  /**
   * Provide a custom query
   * Default: defaultQueries
   */
  queries?: Record<string, MediaQueryCondition>

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

export const defaultQueries: UseMediaQueries = {
  small: { min: 0, max: 'small' },
  medium: { min: 'small', max: 'medium' },
  large: { min: 'medium' },
}

export type UseMediaResult = {
  isSmall: boolean
  isMedium: boolean
  isLarge: boolean
  isSSR: boolean
  key: Keys
}

/**
 * Internal stuff
 */

type Keys = keyof UseMediaQueries
type Names = 'isSmall' | 'isMedium' | 'isLarge'

type UseMediaItem = {
  event: MediaQueryListener
  mediaQueryList: MediaQueryList
}

type UseMediaQueryProps = {
  when: MediaQueryCondition
  name: Names
  key: Keys
}

export default function useMedia(
  props: UseMediaProps = {}
): UseMediaResult {
  const {
    initialValue = null,
    disabled,
    breakpoints,
    queries = defaultQueries,
    log,
  } = props

  const context = React.useContext(Context)

  const refs = React.useRef({})
  const defaults = React.useRef({})
  const isMounted = React.useRef(false)
  const isDisabled = React.useRef(disabled)
  const [result, updateRerender] =
    React.useState<UseMediaResult>(makeResult)

  const useLayoutEffect = React.useMemo(makeLayoutEffect, [])

  useLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      updateRerender(makeResult())
    }

    return removeListeners
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    // If it was disabled before
    if (isDisabled.current && !disabled) {
      updateRerender(makeResult())
    }
    isDisabled.current = disabled
  }, [disabled]) // eslint-disable-line react-hooks/exhaustive-deps

  return result

  function removeListeners() {
    Object.entries(refs.current).forEach(
      ([key, item]: [Keys, UseMediaItem]) => {
        item?.event?.()
        delete refs.current[key]
      }
    )
  }

  function makeResult() {
    return Object.entries(queries).reduce(
      (acc, [k, when]) => {
        const key = k as Keys
        const name = `is${toPascalCase(key)}` as Names

        if (disabled) {
          acc[name] = false
          return acc
        }

        defaults.current[name] = false

        const item = runQuery({
          when,
          name,
          key,
        })

        const hasMatch = !isMounted.current
          ? typeof initialValue?.[name] !== 'undefined'
            ? initialValue[name]
            : false
          : item?.mediaQueryList?.matches || false
        acc[name] = hasMatch
        if (hasMatch) {
          acc.key = key
        }

        refs.current[key] = item

        return acc
      },
      { isSSR: !isMatchMediaSupported(), key: null } as UseMediaResult
    ) as UseMediaResult
  }

  function runQuery({
    when,
    name,
    key,
  }: UseMediaQueryProps): UseMediaItem {
    if (!isMatchMediaSupported()) {
      return // do nothing
    }

    const mediaQueryList = makeMediaQueryList(
      {
        when,
        disabled,
        log,
      },

      breakpoints || context.breakpoints
    )

    const event = createMediaQueryListener(mediaQueryList, (match) => {
      if (!isDisabled.current && match) {
        const state = {
          ...defaults.current,
          key,
          isSSR: result.isSSR,
        } as UseMediaResult
        state[name] = match
        updateRerender(state)
      }
    })

    return { event, mediaQueryList }
  }
}
