import React from 'react'
import { isTrue } from './component-helper'
import Context from './Context'
import {
  makeMediaQueryList,
  createMediaQueryListener,
  isMatchMediaSupported,
} from './MediaQueryUtils'

export default function useMediaQuery(props) {
  const context = React.useContext(Context)
  const { query, when, not, ssr } = props
  let [matches] = React.useState(() =>
    !isMatchMediaSupported() && isTrue(ssr) ? true : false
  )

  const mediaQueryList = React.useRef(
    makeMediaQueryList(props, context.breakpoints)
  )
  if (mediaQueryList.current?.matches) {
    matches = true
  }

  const [match, matchUpdate] = React.useState(matches)

  const listenerRef = React.useRef()
  React.useEffect(() => {
    if (typeof listenerRef.current === 'function') {
      listenerRef.current()

      mediaQueryList.current = makeMediaQueryList(
        props,
        context.breakpoints
      )
      matchUpdate(mediaQueryList.current.matches)
    }

    listenerRef.current = createMediaQueryListener(
      mediaQueryList.current,
      (match) => matchUpdate(match)
    )

    return listenerRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, when, not])

  return match
}
