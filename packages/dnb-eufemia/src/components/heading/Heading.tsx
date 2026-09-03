/**
 * Web Heading Component
 *
 */

import { useContext, useEffect, useId, useState } from 'react'
import type { HTMLProps, JSX, ReactNode } from 'react'
import { clsx } from 'clsx'
import { validateDOMAttributes } from '../../shared/component-helper'
import '../../shared/helpers'
import { useSpacing } from '../space/SpacingUtils'
import type { HeadingContextValue } from './HeadingContext'
import HeadingContext from './HeadingContext'
import HeadingProvider from './HeadingProvider'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import {
  correctInternalHeadingLevel,
  resetLevels,
  resetAllLevels,
  setNextLevel,
  globalSyncCounter,
  globalHeadingCounter,
  windupHeadings,
  teardownHeadings,
  debugCounter as debugCounterFn,
  getHeadingSize,
  getHeadingElement,
  releaseHeadingLevel,
} from './HeadingHelpers'
import type { HeadingCounter, HeadingDebugCounter } from './HeadingCounter'
import { initCounter } from './HeadingCounter'
import type { DynamicElement, SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'
import { useTheme, Context } from '../../shared'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useTypography } from '../../elements/typography/Typography'

export type HeadingLevelSizeResolutions = {
  1: HeadingSize
  3: HeadingSize
  2: HeadingSize
  4: HeadingSize
  5: HeadingSize
  6: HeadingSize
}

export type HeadingSize =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small'

export type HeadingLevel =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
export type InternalHeadingLevel = number

export type HeadingProps = {
  id?: string
  group?: string

  /**
   * A heading, can be text or `React.ReactNode`.
   */
  text?: ReactNode

  /**
   * Define the typography [font-size](/uilib/typography/font-size) by a size _type_, e.g. `x-large`. Defaults to the predefined heading sizes.
   */
  size?: HeadingSize
  level?: HeadingLevel

  /**
   * If set to `true`, the heading level will be incremented by 1.
   */
  increase?: boolean

  /**
   * If set to `true`, the heading level will be decremented by 1.
   */
  decrease?: boolean
  up?: boolean
  down?: boolean

  /**
   * If set to `true`, the heading will not be corrected and warnings will not be shown. Warnings do not show up in **production builds** else either.
   */
  skipCorrection?: boolean

  /**
   * Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.
   */
  proseMaxWidth?: number | boolean

  /**
   * If set to `true`, the content will have a prefix, showing the heading level.
   */
  debug?: boolean | (() => void)

  /**
   * If set to `true`, the content will have both a prefix and a JSON log attached to both headings and level contexts.
   */
  debugCounter?: HeadingDebugCounter
  counter?: HeadingCounter

  /**
   * If set to `true`, the heading last used level will be inherited. Also from inside a level context.
   */
  inherit?: boolean

  /**
   * If set to `true`, the heading level will be reset to 2. You can give it a custom level if you need to, e.g. `reset(1)`.
   */
  reset?: number | boolean

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  /**
   * Define what HTML element should be used. If you use, e.g. a `span`, then `role="heading"` and `aria-level` gets set. Defaults to semantic heading element.
   */
  element?: DynamicElement
}

export type HeadingAllProps = HeadingProps &
  Omit<HTMLProps<HTMLElement>, 'size'> &
  SpacingProps

export default function Heading(props: HeadingAllProps) {
  const context = useContext(Context)
  const headingContext = useContext(HeadingContext)
  const id = useId()

  const {
    text,
    group: _group,
    debug: _debug,
    debugCounter: _debugCounter,
    reset: _reset,
    skipCorrection: _skipCorrection,
    increase: _increase,
    decrease: _decrease,
    up: _up,
    down: _down,
    inherit: _inherit,
    level: _level,
    size: _size,
    skeleton: _skeleton,
    element: _element,
    className,
    children,
    ...rest
  } = useTypography(props)

  type State = {
    level: InternalHeadingLevel
    counter: HeadingCounter
    context: HeadingContextValue
    contextRevision?: number
    headingContext?: HeadingContextValue
    id: string
    notifyScopeRevision?: number
    prevLevel?: InternalHeadingLevel
    recalculate?: () => void
    ref: HeadingAllProps
  }

  const [currentState, setState] = useState(() => {
    const state: State = {
      level: null,
      counter: null,
      context,
      contextRevision: headingContext.heading?.revision,
      headingContext,
      id,
      recalculate: headingContext.heading?.recalculate,
      ref: props,
    }

    state.counter = initCounter(props)

    // If a heading runs inside a context, use that counter
    // else we use the global counter, or create a new one
    const counter = headingContext.heading?.counter
      ? headingContext.heading.counter
      : globalHeadingCounter.current

    state.counter.setContextCounter(counter)
    state.counter.isHeading = true

    state.counter = correctInternalHeadingLevel({
      counter: state.counter,
      id,
      ref: props,
      level: parseFloat(String(props.level)),
      inherit: props.inherit,
      reset: props.reset,
      increase: props.increase || props.up,
      decrease: props.decrease || props.down,
      bypassChecks:
        props.skipCorrection ||
        state.headingContext?.heading?.skipCorrection,
      source: props.text || props.children, // only for debugging
      debug: props.debug || state.headingContext?.heading?.debug,
    })

    globalSyncCounter.current = state.counter

    state.level = state.counter.level
    state.prevLevel = parseFloat(String(props.level))

    return state
  })

  let state = currentState

  const level = parseFloat(String(props.level))
  const contextRevision = headingContext.heading?.revision

  const recalculateLevel = (level: InternalHeadingLevel) => {
    state.counter.restart()
    const { level: newLevel } = correctInternalHeadingLevel({
      counter: state.counter,
      level,
      inherit: props.inherit,
      reset: props.reset,
      increase: props.increase || props.up,
      decrease: props.decrease || props.down,
      bypassChecks:
        props.skipCorrection || headingContext.heading?.skipCorrection,
      source: props.text || props.children,
      debug: props.debug || headingContext.heading?.debug,
    })
    globalSyncCounter.current = state.counter
    return newLevel
  }

  if (state.contextRevision !== contextRevision) {
    state = {
      ...state,
      level: recalculateLevel(
        Number.isNaN(level) && headingContext.heading?.preserveLevels
          ? state.level
          : level
      ),
      contextRevision,
      headingContext,
      prevLevel: level,
      recalculate: headingContext.heading?.recalculate,
    }
    setState(state)
  } else if (
    state.prevLevel !== level &&
    level > 0 &&
    level !== state.level
  ) {
    const { level: newLevel } = correctInternalHeadingLevel({
      counter: state.counter,
      isRerender: true,
      level,
      bypassChecks:
        props.skipCorrection || headingContext.heading?.skipCorrection,
      source: props.text || props.children,
      debug: props.debug || headingContext.heading?.debug,
    })
    state = {
      ...state,
      level: newLevel,
      notifyScopeRevision: (state.notifyScopeRevision || 0) + 1,
      prevLevel: level,
    }
    setState(state)
  }

  const {
    counter,
    id: counterId,
    notifyScopeRevision,
    recalculate,
    ref: counterRef,
  } = currentState

  useEffect(() => {
    if (notifyScopeRevision) {
      recalculate?.()
    }
  }, [notifyScopeRevision, recalculate])

  useEffect(() => {
    windupHeadings()
    counter.windup()

    return () => {
      releaseHeadingLevel(counterRef, counterId, counter)
      teardownHeadings()
      counter.teardown()
      recalculate?.()
    }
  }, [counter, counterId, counterRef, recalculate])

  const theme = useTheme()

  let { size, element, skeleton } = props as HeadingProps
  const { level: headingLevel } = state

  const debug = _debug || headingContext?.heading?.debug
  const debugCounter =
    _debugCounter || headingContext?.heading?.debugCounter

  const attributes: Record<string, unknown> = {
    'data-flex-item-type': 'heading',
    ...rest,
  }

  if (size == null) {
    size = getHeadingSize(theme?.name)[headingLevel]
  }

  if (element == null) {
    element = getHeadingElement(headingLevel)
  } else {
    if (!attributes.role) {
      attributes.role = 'heading'
    }
    if (!attributes['aria-level']) {
      attributes['aria-level'] = String(headingLevel)
    }
  }

  validateDOMAttributes(props, attributes)

  if (typeof context?.skeleton !== 'undefined') {
    skeleton = context.skeleton
  }

  const Element = element as
    | string
    | ((props: HTMLProps<HTMLElement>) => JSX.Element) // typecasting to avoid typescript parser error ts(2590)

  const elementProps = useSpacing(props, {
    ...attributes,
    className: clsx(
      'dnb-heading',
      context?.theme?.surface === 'dark' && 'dnb-t--surface-dark',
      `dnb-h--${size}`,
      createSkeletonClass('font', skeleton, headingContext),
      className
    ),
  })

  return (
    <Element {...elementProps}>
      {debug && (
        <span className="dnb-heading__debug">
          {`[h${headingLevel || '6'}] `}
          {debugCounter && (
            <>
              {' '}
              <span className="dnb-code">
                {debugCounterFn(state.counter)}
              </span>
            </>
          )}
        </span>
      )}
      {text || text === 0 ? text : children}
    </Element>
  )
}

type HeadingStaticProps = Omit<HeadingAllProps, 'ref' | 'size'>

Heading.Level = HeadingProvider
Heading.Increase = (props: HeadingStaticProps) => (
  <HeadingProvider increase {...props} />
)
Heading.Decrease = (props: HeadingStaticProps) => (
  <HeadingProvider decrease {...props} />
)
Heading.Up = (props: HeadingStaticProps) => (
  <HeadingProvider increase {...props} />
)
Heading.Down = (props: HeadingStaticProps) => (
  <HeadingProvider decrease {...props} />
)
Heading.Reset = (props: HeadingStaticProps) => (
  <HeadingProvider reset {...props} />
)
Heading.resetLevels = resetLevels
Heading.setNextLevel = setNextLevel

withComponentMarkers(Heading, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})

// Interceptor to reset leveling
export { resetAllLevels, resetLevels, setNextLevel }
