import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
  MediaQueryOptions,
} from './MediaQueryUtils'
import { toPascalCase } from './component-helper'

const makeLayoutEffect = () => {
  // SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
  return typeof window === 'undefined'
    ? useEffect
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
  disabled?: MediaQueryOptions['disabled']

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

  /**
   * Not documented as of now. For internal use only.
   * Default: true
   */
  correctRange?: MediaQueryOptions['correctRange']
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
    correctRange = true,
    breakpoints,
    queries = defaultQueries,
    log,
  } = props

  const context = useContext(Context)

  const refs = useRef({})
  const defaultsRef = useRef({})
  const resultRef = useRef<Partial<UseMediaResult>>({})
  const isMountedRef = useRef(false)
  const isDisabledRef = useRef(disabled)

  const removeListeners = useCallback(() => {
    Object.entries(refs.current).forEach(
      ([key, item]: [Keys, UseMediaItem]) => {
        item?.event?.()
        delete refs.current[key]
      }
    )
  }, [])

  const runQuery = useCallback(
    ({ when, name, key }: UseMediaQueryProps): UseMediaItem => {
      if (!isMatchMediaSupported()) {
        return // do nothing
      }

      const mediaQueryList = makeMediaQueryList(
        { when },
        breakpoints || context.breakpoints,
        { disabled, correctRange, log }
      )

      const event = createMediaQueryListener(mediaQueryList, (match) => {
        if (!isDisabledRef.current && match) {
          const state = {
            ...defaultsRef.current,
            key,
            isSSR: resultRef.current.isSSR,
          } as UseMediaResult
          state[name] = match
          updateRerender(state)
        }
      })

      return { event, mediaQueryList }
    },
    [breakpoints, context.breakpoints, correctRange, disabled, log]
  )

  const makeResult = useCallback(() => {
    return Object.entries(queries).reduce(
      (acc, [k, when]) => {
        const key = k as Keys
        const name = `is${toPascalCase(key)}` as Names

        if (disabled) {
          acc[name] = false
          return acc
        }

        defaultsRef.current[name] = false

        const item = runQuery({
          when,
          name,
          key,
        })

        let hasMatch = undefined

        if (
          typeof initialValue?.[name] !== 'undefined' &&
          !isMountedRef.current
        ) {
          hasMatch = initialValue[name]
        } else {
          hasMatch = item?.mediaQueryList?.matches || false
        }

        acc[name] = hasMatch
        if (hasMatch) {
          acc.key = key
        }

        refs.current[key] = item

        return acc
      },
      { isSSR: !isMatchMediaSupported(), key: null } as UseMediaResult
    ) as UseMediaResult
  }, [disabled, initialValue, queries, runQuery])

  const [result, updateRerender] = useState<UseMediaResult>(makeResult)
  resultRef.current = result

  const useLayoutEffect = useMemo(makeLayoutEffect, [])

  useLayoutEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true

      const result = makeResult()

      // Cache Object.keys() result for performance
      const resultKeys = Object.keys(result)
      const hasChanged = resultKeys.some(
        (key) => resultRef.current[key] !== result[key]
      )
      if (hasChanged) {
        updateRerender(result)
      }
    }

    return removeListeners
  }, [makeResult, removeListeners])

  useLayoutEffect(() => {
    // If it was disabled before
    if (isDisabledRef.current && !disabled) {
      updateRerender(makeResult())
    }
    isDisabledRef.current = disabled
  }, [disabled, makeResult])

  return result
}
