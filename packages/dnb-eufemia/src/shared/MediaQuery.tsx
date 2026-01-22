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

  const [state, setState] = React.useState<MediaQueryState>(getInitialState)

  const bindListener = React.useCallback(() => {
    // Cleanup existing listener
    if (listenerRef.current) {
      listenerRef.current()
      listenerRef.current = null
    }
    
    if (state.mediaQueryList) {
      listenerRef.current = createMediaQueryListener(
        state.mediaQueryList,
        (match) => {
          setState((prev) => ({ ...prev, match }))
        }
      )
    }
  }, [state.mediaQueryList])

  // Initial mount
  React.useEffect(() => {
    if (isMatchMediaSupported()) {
      bindListener()
    }

    return () => {
      if (listenerRef.current) {
        listenerRef.current()
        listenerRef.current = null
      }
    }
  }, [bindListener])

  // Handle prop changes
  React.useEffect(() => {
    const { query, when, not } = props
    const mediaQueryList = makeMediaQueryList(
      { query, when, not },
      context?.breakpoints
    )
    setState(
      {
        match: mediaQueryList?.matches,
        mediaQueryList,
      }
    )
  }, [props.query, props.when, props.not, context?.breakpoints])

  // Re-bind listener when mediaQueryList changes
  React.useEffect(() => {
    bindListener()
  }, [bindListener])

  return <>{state.match ? props.children : null}</>
}

export default MediaQuery
