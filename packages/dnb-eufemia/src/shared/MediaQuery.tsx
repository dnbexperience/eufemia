import React from 'react'
import { isTrue } from './component-helper'
import Context from './Context'
import {
  makeMediaQueryList,
  createMediaQueryListener,
  onMediaQueryChange,
  isMatchMediaSupported,
} from './MediaQueryUtils'
import type {
  MediaQueryProps,
  MediaQueryState,
  MediaQueryListener,
} from './MediaQueryUtils'

export type { MediaQueryProps }

export { onMediaQueryChange }

const MediaQuery: React.FC<MediaQueryProps> = (props) => {
  const context = React.useContext(Context)
  const listenerRef = React.useRef<MediaQueryListener>(null)

  const getInitialState = (): MediaQueryState => {
    const state: MediaQueryState = {
      match: null,
      mediaQueryList: null,
    }

    if (!isMatchMediaSupported() && isTrue(props.matchOnSSR)) {
      state.match = true
    }

    if (isMatchMediaSupported()) {
      const { query, when, not } = props
      const { disabled, correctRange = true, log } = props
      state.mediaQueryList = makeMediaQueryList(
        { query, when, not },
        context?.breakpoints,
        { disabled, correctRange, log }
      )

      if (state.mediaQueryList?.matches) {
        state.match = true
      }
    }

    return state
  }

  const [state, setState] =
    React.useState<MediaQueryState>(getInitialState)

  // Handle mount, updates, and cleanup
  React.useEffect(() => {
    // Cleanup existing listener
    if (listenerRef.current) {
      listenerRef.current()
      listenerRef.current = null
    }

    if (!isMatchMediaSupported()) {
      return
    }

    const { query, when, not, disabled, correctRange = true, log } = props
    const mediaQueryList = makeMediaQueryList(
      { query, when, not },
      context?.breakpoints,
      { disabled, correctRange, log }
    )

    setState({
      match: mediaQueryList?.matches,
      mediaQueryList,
    })

    // Bind listener
    if (mediaQueryList) {
      listenerRef.current = createMediaQueryListener(
        mediaQueryList,
        (match) => {
          setState((prev) => ({ ...prev, match }))
        }
      )
    }

    return () => {
      if (listenerRef.current) {
        listenerRef.current()
        listenerRef.current = null
      }
    }
  }, [
    props.query,
    props.when,
    props.not,
    props.disabled,
    props.correctRange,
    props.log,
    context?.breakpoints,
  ])

  return <>{state.match ? props.children : null}</>
}

export default MediaQuery
