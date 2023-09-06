import React from 'react'
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

export type { MediaQueryProps }

export default function useMediaQuery(props: MediaQueryProps) {
  const context = React.useContext(Context)
  const { query, when, not, matchOnSSR, disabled } = props

  let matches = React.useMemo(() => {
    if (disabled) {
      return false // stop here
    }

    return isTrue(matchOnSSR) && !isMatchMediaSupported()
  }, [disabled, matchOnSSR])

  const mediaQueryList = React.useRef(
    makeMediaQueryList(props, context.breakpoints)
  )
  if (mediaQueryList.current?.matches) {
    matches = true
  }

  const [match, matchUpdate] = React.useState(matches)

  const listenerRef = React.useRef<MediaQueryListener>()
  React.useLayoutEffect(() => {
    if (disabled) {
      return // stop here
    }

    if (typeof listenerRef.current === 'function') {
      listenerRef.current()

      mediaQueryList.current = makeMediaQueryList(
        props,
        context.breakpoints
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
