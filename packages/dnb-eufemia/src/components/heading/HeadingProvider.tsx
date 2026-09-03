/**
 * Web Heading Provider
 *
 */

import { useContext, useEffect, useId, useReducer, useState } from 'react'
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
  const [scopeRevision, recalculate] = useReducer(
    (revision) => revision + 1,
    0
  )

  type State = {
    level?: InternalHeadingLevel
    counter?: HeadingCounter
    contextRevision?: number
    notifyParentRevision?: number
    preserveLevels: boolean
    prevLevel?: InternalHeadingLevel
    recalculate?: () => void
    revision: number
    scopeRevision: number
    id?: string
    ref?: HeadingProviderAllProps
  }

  const [currentState, setState] = useState(() => {
    const state: State = {
      preserveLevels: false,
      contextRevision: existingContext?.revision,
      recalculate: existingContext?.recalculate,
      revision: 0,
      scopeRevision,
      id,
      ref: props,
    }

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
  const levelChanged =
    state.prevLevel !== level && level > 0 && level !== state.level
  const contextChanged =
    state.contextRevision !== existingContext?.revision

  if (state.scopeRevision !== scopeRevision || contextChanged) {
    const preserveLevels =
      state.scopeRevision !== scopeRevision ||
      existingContext?.preserveLevels
    state.counter.restartContext()
    if (contextChanged && !existingContext?.preserveLevels) {
      state.counter = correctInternalHeadingLevel({
        counter: state.counter,
        level: parseFloat(String(props.level)),
        inherit: props.inherit,
        reset: props.reset,
        increase: props.increase || props.up,
        decrease: props.decrease || props.down,
        bypassChecks: newProps.skipCorrection,
        source: props.text || props.children,
        debug: newProps.debug,
      })
    }
    globalSyncCounter.current = state.counter
    state = {
      ...state,
      contextRevision: existingContext?.revision,
      level: state.counter.level,
      preserveLevels,
      prevLevel: level || state.counter.level,
      recalculate: existingContext?.recalculate,
      revision: state.revision + 1,
      scopeRevision,
    }
    setState(state)
  } else if (levelChanged) {
    const { level: newLevel } = correctInternalHeadingLevel({
      counter: state.counter,
      level,
      bypassChecks: newProps.skipCorrection,
      source: props.text || props.children,
      debug: newProps.debug,
    })
    state = {
      ...state,
      level: newLevel,
      notifyParentRevision: (state.notifyParentRevision || 0) + 1,
      preserveLevels: false,
      prevLevel: level,
      revision: state.revision + 1,
    }
    setState(state)
  }

  const {
    counter,
    id: counterId,
    notifyParentRevision,
    recalculate: recalculateParent,
    ref: counterRef,
  } = currentState

  useEffect(() => {
    if (notifyParentRevision) {
      recalculateParent?.()
    }
  }, [notifyParentRevision, recalculateParent])

  useEffect(() => {
    windupHeadings()

    return () => {
      releaseHeadingLevel(counterRef, counterId, counter)
      teardownHeadings()
      recalculateParent?.()
    }
  }, [counter, counterId, counterRef, recalculateParent])

  return (
    <HeadingContext
      value={{
        heading: {
          ...newProps,
          level: state.level as HeadingProps['level'],
          counter: state.counter,
          preserveLevels: state.preserveLevels,
          revision: state.revision,
          recalculate,
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
