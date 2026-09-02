/**
 * Web Heading Provider
 *
 */

import { useContext, useEffect, useId, useState } from 'react'
import type { HTMLProps } from 'react'

import HeadingContext from './HeadingContext'
import {
  globalSyncCounter,
  globalHeadingCounter,
  correctInternalHeadingLevel,
  windupHeadings,
  teardownHeadings,
  debugCounter,
  releaseHeadingLevel,
} from './HeadingHelpers'
import type { HeadingCounter } from './HeadingCounter'
import { initCounter } from './HeadingCounter'
import type { InternalHeadingLevel, HeadingProps } from './Heading'

export type HeadingProviderProps = HeadingProps
export type HeadingProviderAllProps = HeadingProviderProps &
  HTMLProps<HTMLElement>

export default function HeadingProvider(props: HeadingProviderAllProps) {
  const context = useContext(HeadingContext)
  const id = useId()
  const existingContext = context.heading
  const newProps = existingContext
    ? { ...existingContext, ...props }
    : props

  const [currentState, setState] = useState(() => {
    type State = {
      level?: InternalHeadingLevel
      prevLevel?: InternalHeadingLevel | HeadingProps['level']
      counter?: HeadingCounter
      id?: string
      ref?: HeadingProviderAllProps
    }

    const state: State = { id, ref: props }

    // Here we create a new counter, but use the last global level
    state.counter = initCounter(props) // in here we use isContext prop

    // yes, there was a prev context, but there is not level prop
    if (existingContext) {
      state.counter.setContextCounter(existingContext.counter)
    } else {
      state.counter.setContextCounter(globalHeadingCounter.current)
    }

    state.counter = correctInternalHeadingLevel({
      counter: state.counter,
      id,
      ref: props,
      level: parseFloat(String(props.level)),
      inherit: props.inherit,
      reset: props.reset,
      increase: props.increase || props.up,
      decrease: props.decrease || props.down,
      bypassChecks: newProps.skipCorrection,
      source: props.text || props.children,
      debug: newProps.debug,
    })

    globalSyncCounter.current = state.counter

    // Set the current level here, and keep it, so a heading, coming later in, will inherit it
    // This will require a new Counter "group" - not the global.
    // We basically start again counting from this one.
    state.level = state.counter.level
    state.prevLevel =
      parseFloat(String(newProps.level)) || state.counter.level
    return state
  })
  let state = currentState

  const level = parseFloat(String(props.level))
  if (
    state.prevLevel !== props.level &&
    level > 0 &&
    level !== state.level
  ) {
    const { level: newLevel } = correctInternalHeadingLevel({
      counter: state.counter,
      level,
      bypassChecks: newProps.skipCorrection,
      source: props.text || props.children,
      debug: newProps.debug,
    })
    state = { ...state, level: newLevel, prevLevel: props.level }
    setState(state)
  }

  useEffect(() => {
    windupHeadings()

    return () => {
      releaseHeadingLevel(
        currentState.ref,
        currentState.id,
        currentState.counter
      )
      teardownHeadings()
    }
  }, [currentState.counter, currentState.id, currentState.ref])

  return (
    <HeadingContext
      value={{
        heading: {
          ...newProps,
          level: state.level as HeadingProps['level'],
          counter: state.counter,
        },
      }}
    >
      {(newProps.debugCounter && (
        <span className="dnb-heading__context">
          <span className="dnb-heading__debug">
            Context:{' '}
            <span className="dnb-code">{debugCounter(state.counter)}</span>
          </span>
          {props.children}
        </span>
      )) ||
        props.children}
    </HeadingContext>
  )
}
