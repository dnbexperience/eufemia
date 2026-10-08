import { useContext, useMemo, useRef, useState } from 'react'
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
import { useIsomorphicLayoutEffect as useLayoutEffect } from './helpers/useIsomorphicLayoutEffect'
import useHydrated from './helpers/useHydrated'

export type { MediaQueryProps }

export default function useMediaQuery(props: MediaQueryProps) {
  const context = useContext(Context)
  const isHydrated = useHydrated()
  const {
    query,
    when,
    not,
    matchOnSSR,
    disabled,
    correctRange = true,
    log,
  } = props

  const matches = useMemo(() => {
    if (disabled) {
      return false // stop here
    }

    // Use the server result while hydrating; the layout effect updates it after mount
    return matchOnSSR && (!isHydrated || !isMatchMediaSupported())
  }, [disabled, matchOnSSR, isHydrated])

  const mediaQueryList = useRef(
    makeMediaQueryList({ query, when, not }, context.breakpoints, {
      disabled,
      correctRange,
      log,
    })
  )

  const [match, matchUpdate] = useState(matches)

  const listenerRef = useRef<MediaQueryListener>(undefined)
  useLayoutEffect(() => {
    if (disabled) {
      return undefined // stop here
    }

    if (typeof listenerRef.current === 'function') {
      listenerRef.current()
    }

    mediaQueryList.current = makeMediaQueryList(
      { query, when, not },
      context.breakpoints,
      { disabled, correctRange, log }
    )

    if (mediaQueryList.current) {
      matchUpdate(mediaQueryList.current.matches)
    }

    listenerRef.current = createMediaQueryListener(
      mediaQueryList.current,
      (match) => matchUpdate(match)
    )

    return listenerRef.current
  }, [query, when, not, disabled]) // eslint-disable-line react-hooks/exhaustive-deps

  return Boolean(match)
}
