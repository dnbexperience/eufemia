import { useContext, useEffect, useRef, useState } from 'react'
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
import useCanUseDOM from './helpers/useCanUseDOM'

export type { MediaQueryProps }

export { onMediaQueryChange }

function MediaQuery(props: MediaQueryProps) {
  const context = useContext(Context)
  const listenerRef = useRef<MediaQueryListener | null>(null)
  const canUseDOM = useCanUseDOM()

  const getInitialState = (): MediaQueryState => {
    const state: MediaQueryState = {
      match: null,
      mediaQueryList: null,
    }

    // Use the server result while hydrating; the effect updates it after mount
    const canMatch = canUseDOM && isMatchMediaSupported()

    if (!canMatch && props.matchOnSSR) {
      state.match = true
    }

    if (canMatch) {
      const { query, when, not } = props
      const { disabled, correctRange = true, log, target } = props
      state.mediaQueryList = makeMediaQueryList(
        { query, when, not },
        context?.breakpoints,
        {
          disabled,
          correctRange,
          log,
          target,
          responsive: context.responsive,
        }
      )

      if (state.mediaQueryList?.matches) {
        state.match = true
      }
    }

    return state
  }

  const [state, setState] = useState<MediaQueryState>(getInitialState)

  // Handle mount, updates, and cleanup
  useEffect(() => {
    // Cleanup existing listener
    if (listenerRef.current) {
      listenerRef.current()
      listenerRef.current = null
    }

    if (!isMatchMediaSupported()) {
      return undefined
    }

    const {
      query,
      when,
      not,
      disabled,
      correctRange = true,
      log,
      target,
    } = props
    const mediaQueryList = makeMediaQueryList(
      { query, when, not },
      context?.breakpoints,
      {
        disabled,
        correctRange,
        log,
        target,
        responsive: context.responsive,
      }
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
    context.responsive,
    context.responsive?.target === 'container'
      ? context.responsive.containerRef.current
      : undefined,
    props.target,
  ])

  return <>{state.match ? props.children : null}</>
}

export default MediaQuery
