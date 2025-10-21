/**
 * Web Heading Provider
 *
 */

import React from 'react'
import { isTrue } from '../../shared/component-helper'

import HeadingContext, { HeadingContextProps } from './HeadingContext'
import {
  globalSyncCounter,
  globalHeadingCounter,
  correctInternalHeadingLevel,
  windupHeadings,
  teardownHeadings,
  debugCounter,
} from './HeadingHelpers'
import { HeadingCounter, initCounter } from './HeadingCounter'
import { InternalHeadingLevel, HeadingProps } from './Heading'

export type HeadingProviderProps = HeadingProps
export type HeadingProviderAllProps = HeadingProviderProps &
  React.HTMLProps<HTMLElement>

export default function HeadingProvider(props: HeadingProviderAllProps) {
  const context = React.useContext(HeadingContext)

  const [state, setState] = React.useState(() => {
    type State = {
      level?: InternalHeadingLevel
      prevLevel?: InternalHeadingLevel
      counter?: HeadingCounter
      context: HeadingContextProps
      newProps?: HeadingProps
      _listenForPropChanges?: boolean
    }

    const state: State = {
      context,
      _listenForPropChanges: true,
    }

    const existingContext = context.heading

    // Here we create a new counter, but use the last global level
    state.counter = initCounter(props) // in here we use isContext prop

    // merge props with prev context
    state.newProps = props
    if (existingContext) {
      state.newProps = { ...existingContext, ...props }
    }

    // yes, there was a prev context, but there is not level prop
    if (existingContext) {
      state.counter.setContextCounter(existingContext.counter)
    } else {
      state.counter.setContextCounter(globalHeadingCounter.current)
    }

    state.counter = correctInternalHeadingLevel({
      counter: state.counter,
      ref: props,
      level: parseFloat(String(props.level)),
      inherit: isTrue(props.inherit),
      reset: props.reset,
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      bypassChecks: isTrue(state.newProps.skipCorrection),
      source: props.text || props.children,
      debug: state.newProps.debug,
    })

    globalSyncCounter.current = state.counter

    // Set the current level here, and keep it, so a heading, coming later in, will inherit it
    // This will require a new Counter "group" - not the global.
    // We basically start again counting from this one.
    state.level = state.counter.level
    state.prevLevel =
      parseFloat(String(state.newProps.level)) || state.counter.level
    return state
  })

  React.useEffect(() => {
    const level = parseFloat(String(props.level))
    if (
      state.prevLevel !== props.level &&
      level > 0 &&
      level !== state.level
    ) {
      // Run this again here, so we can get a recalculated "useLevel" from the counter
      const { level: newLevel } = correctInternalHeadingLevel({
        counter: state.counter,
        level,
        bypassChecks:
          isTrue(props.skipCorrection) ||
          isTrue(state.context.heading?.skipCorrection),
        source: props.text || props.children, // only for debugging
        debug: props.debug || state.context.heading?.debug,
      })
      state.level = state.prevLevel = newLevel

      setState({ ...state })
    }
  }, [props.level])

  React.useEffect(() => {
    windupHeadings()

    return () => {
      teardownHeadings()
    }
  }, [])

  return (
    <HeadingContext.Provider
      value={{
        heading: {
          ...state.newProps,
          ...(state as HeadingProps),
        },
      }}
    >
      {(state.newProps.debugCounter && (
        <span className="dnb-heading__context">
          <span className="dnb-heading__debug">
            Context:{' '}
            <span className="dnb-code">{debugCounter(state.counter)}</span>
          </span>
          {props.children}
        </span>
      )) ||
        props.children}
    </HeadingContext.Provider>
  )
}
