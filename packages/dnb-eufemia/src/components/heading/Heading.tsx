/**
 * Web Heading Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  isTrue,
  validateDOMAttributes,
} from '../../shared/component-helper'
import '../../shared/helpers'
import { createSpacingClasses } from '../space/SpacingHelper'
import HeadingContext, { HeadingContextProps } from './HeadingContext'
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
  debugCounter,
  getHeadingSize,
  getHeadingElement,
} from './HeadingHelpers'
import {
  HeadingCounter,
  HeadingDebugCounter,
  initCounter,
} from './HeadingCounter'
import { SpacingProps } from '../space/types'
import { SkeletonShow } from '../Skeleton'
import { useTheme, Context } from '../../shared'
import type { DynamicElement } from '../../shared/types'

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
   * <em>(required)</em> a heading, can be text or React.Node.
   */
  text?: React.ReactNode

  /**
   * Define the typography <a href="/uilib/typography/font-size">font-size</a> by a size <em>type</em>, e.g. `x-large`. Defaults to the predefined heading sizes.
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
   * If set to `true`, the heading will not be corrected and warnings will not be shown. Warnings do not show up in "production builds" else either.
   */
  skip_correction?: boolean

  /**
   * If set to `true`, the content will have a prefix, showing the heading level.
   */
  debug?: boolean | (() => void)

  /**
   * If set to `true`, the content will have both a prefix and a JSON log attached to both headings and level contexts.
   */
  debug_counter?: HeadingDebugCounter
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
  Omit<React.HTMLProps<HTMLElement>, 'size'> &
  SpacingProps

export default function Heading(props: HeadingAllProps) {
  const context = React.useContext(Context)
  const headingContext = React.useContext(HeadingContext)
  const _ref = React.useRef()

  const {
    text,
    group: _group, // eslint-disable-line
    debug: _debug, // eslint-disable-line
    debug_counter: _debug_counter, // eslint-disable-line
    reset: _reset, // eslint-disable-line
    skip_correction: _skip_correction, // eslint-disable-line
    increase: _increase, // eslint-disable-line
    decrease: _decrease, // eslint-disable-line
    up: _up, // eslint-disable-line
    down: _down, // eslint-disable-line
    inherit: _inherit, // eslint-disable-line
    level: _level, // eslint-disable-line
    size: _size, // eslint-disable-line
    skeleton: _skeleton, // eslint-disable-line
    element: _element, // eslint-disable-line
    className,
    children,
    ...rest
  } = props

  const [state, setState] = React.useState(() => {
    type State = {
      level: InternalHeadingLevel
      prevLevel?: InternalHeadingLevel
      counter: HeadingCounter
      context: HeadingContextProps
      headingContext?: HeadingContextProps
    }
    const state: State = {
      level: null,
      counter: null,
      context,
      headingContext,
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
      ref: props, // Do that only to make sure we run the correction only if props has changed
      level: parseFloat(String(props.level)),
      inherit: isTrue(props.inherit),
      reset: props.reset,
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      bypassChecks:
        isTrue(props.skip_correction) ||
        isTrue(state.headingContext?.heading?.skip_correction),
      source: props.text || props.children, // only for debugging
      debug: props.debug || state.headingContext?.heading?.debug,
    })

    globalSyncCounter.current = state.counter

    state.level = state.counter.level
    state.prevLevel = parseFloat(String(props.level))

    return state
  })

  React.useEffect(() => {
    windupHeadings()
    state.counter.windup()

    return () => {
      teardownHeadings()
      state.counter.teardown()
    }
  }, [])

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
        isRerender: true,
        level,
        bypassChecks:
          isTrue(props.skip_correction) ||
          isTrue(state.headingContext?.heading?.skip_correction),
        source: props.text || props.children, // only for debugging
        debug: props.debug || state.headingContext?.heading?.debug,
      })
      state.level = state.prevLevel = newLevel

      setState({ ...state })
    }
  }, [props.level])

  const theme = useTheme()

  let { size, element, skeleton } = props as HeadingProps
  const { level } = state

  const debug = _debug || headingContext?.heading?.debug
  const debug_counter =
    _debug_counter || headingContext?.heading?.debug_counter

  const attributes: Record<string, unknown> = {
    ...rest,
  }

  if (element == null) {
    element = getHeadingElement(level)
    if (size == null) {
      size = getHeadingSize(theme?.name)[level]
    }
  } else {
    if (!attributes.role) {
      attributes.role = 'heading'
    }
    if (!attributes['aria-level']) {
      attributes['aria-level'] = String(level)
    }
  }

  validateDOMAttributes(props, attributes)

  if (typeof context?.skeleton !== 'undefined') {
    skeleton = context.skeleton
  }

  const Element = element as
    | string
    | React.FunctionComponent<React.HTMLProps<HTMLElement>> // typecasting to avoid typescript parser error ts(2590)

  return (
    <Element
      {...attributes}
      ref={_ref}
      className={classnames(
        'dnb-heading',
        `dnb-h--${size}`,
        createSkeletonClass('font', skeleton, headingContext),
        className,
        createSpacingClasses(props)
      )}
    >
      {debug && (
        <span className="dnb-heading__debug">
          {`[h${level || '6'}] `}
          {debug_counter && (
            <>
              {' '}
              <span className="dnb-code">
                {debugCounter(state.counter)}
              </span>
            </>
          )}
        </span>
      )}
      {text || children}
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
Heading.Reset = (props: HeadingStaticProps) => {
  globalHeadingCounter.current?.reset()
  return <HeadingProvider {...props} />
}
Heading.resetLevels = resetLevels
Heading.setNextLevel = setNextLevel

Heading._isHeadingElement = true
Heading._supportsEufemiaSpacingProps = true

// Interceptor to reset leveling
export { resetAllLevels, resetLevels, setNextLevel }
