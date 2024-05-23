import React, { useContext, useMemo, useRef, useState } from 'react'
import { isTrue } from './component-helper'
import Context from './Context'
import {
  makeMediaQueryList,
  createMediaQueryListener,
  isMatchMediaSupported,
} from './MediaQueryUtils'
import type {
  MediaQueryProps,
  MediaQueryListener,
} from './MediaQueryUtils'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type { MediaQueryProps }

export default function useMediaQuery(props: MediaQueryProps) {
  const context = useContext(Context)
  const {
    query,
    when,
    not,
    matchOnSSR,
    disabled,
    correctRange = true,
    log,
  } = props

  let matches = useMemo(() => {
    if (disabled) {
      return false // stop here
    }

    return isTrue(matchOnSSR) && !isMatchMediaSupported()
  }, [disabled, matchOnSSR])

  const mediaQueryList = useRef(
    makeMediaQueryList({ query, when, not }, context.breakpoints, {
      disabled,
      correctRange,
      log,
    })
  )
  if (mediaQueryList.current?.matches) {
    matches = true
  }

  const [match, matchUpdate] = useState(matches)

  const listenerRef = useRef<MediaQueryListener>()
  useLayoutEffect(() => {
    if (disabled) {
      return // stop here
    }

    if (typeof listenerRef.current === 'function') {
      listenerRef.current()

      mediaQueryList.current = makeMediaQueryList(
        { query, when, not },
        context.breakpoints,
        { disabled, correctRange, log }
      )
      matchUpdate(mediaQueryList.current?.matches)
    }

    listenerRef.current = createMediaQueryListener(
      mediaQueryList.current,
      (match) => matchUpdate(match)
    )

    return listenerRef.current
  }, [query, when, not, disabled]) // eslint-disable-line react-hooks/exhaustive-deps

  return Boolean(match)
}
