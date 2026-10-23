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
import useCanUseDOM from './helpers/useCanUseDOM'
import { isWaitingForContainer } from './ResponsiveMediaQuery'

export type { MediaQueryProps }

export default function useMediaQuery(props: MediaQueryProps) {
  const context = useContext(Context)
  const canUseDOM = useCanUseDOM()
  const {
    query,
    when,
    not,
    matchOnSSR,
    disabled,
    correctRange = true,
    log,
    target,
  } = props

  const matches = useMemo(() => {
    if (disabled) {
      return false // stop here
    }

    // Use the server result while hydrating; the layout effect updates it after mount
    return matchOnSSR && (!canUseDOM || !isMatchMediaSupported())
  }, [disabled, matchOnSSR, canUseDOM])

  const mediaQueryList = useRef(
    makeMediaQueryList({ query, when, not }, context.breakpoints, {
      disabled,
      correctRange,
      log,
      responsive: context.responsive,
      target,
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
      {
        disabled,
        correctRange,
        log,
        responsive: context.responsive,
        target,
      }
    )

    // Keep the current result until the container is attached
    if (
      mediaQueryList.current &&
      !isWaitingForContainer(mediaQueryList.current)
    ) {
      matchUpdate(mediaQueryList.current.matches)
    }

    listenerRef.current = createMediaQueryListener(
      mediaQueryList.current,
      (match) => matchUpdate(match)
    )

    return listenerRef.current
  }, [
    query,
    when,
    not,
    disabled,
    correctRange,
    log,
    target,
    context.breakpoints,
    context.responsive,
    context.responsive?.target === 'container'
      ? context.responsive.containerRef.current
      : undefined,
  ]) // eslint-disable-line react-hooks/exhaustive-deps

  return Boolean(match)
}
