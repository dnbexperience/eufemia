/**
 * Web Heading Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  // makeUniqueId,
  validateDOMAttributes,
  registerElement
} from '../../shared/component-helper'
import '../../shared/helpers'
import { createSpacingClasses } from '../space/SpacingHelper'
import HeadingContext from './HeadingContext'
import HeadingProvider from './HeadingProvider'
import {
  correctHeadingLevel,
  resetLevels,
  resetAllLevels,
  setNextLevel,
  globalSyncCounter,
  globalHeadingCounter,
  windupHeadings,
  teardownHeadings,
  debugCounter
} from './HeadingHelpers'
import { initCounter } from './HeadingCounter'

export const levelResolution = {
  1: 'xx-large',
  // 'x-large',
  2: 'large',
  3: 'medium',
  4: 'basis',
  5: 'small',
  6: 'x-small'
}

const renderProps = {}

const propTypes = {
  id: PropTypes.string,
  group: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  size: PropTypes.oneOf([
    'auto',
    'xx-large',
    'x-large',
    'large',
    'medium',
    'basis',
    'small',
    'x-small'
  ]),

  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  increase: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  decrease: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  up: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  down: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  skip_correction: PropTypes.bool,
  debug: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  debug_counter: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  counter: PropTypes.any,
  inherit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  reset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool
  ]),

  element: PropTypes.string,
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

const defaultProps = {
  id: null,
  group: null,
  text: null,
  size: 'auto',

  level: null, // like auto
  increase: null,
  decrease: null,
  up: null,
  down: null,

  skip_correction: null,
  debug: null,
  debug_counter: null,
  counter: null,
  reset: null,
  inherit: null,

  element: 'auto', // e.g h1
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Heading extends React.PureComponent {
  static tagName = 'dnb-heading'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = HeadingContext

  static enableWebComponent() {
    registerElement(Heading.tagName, Heading, defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      const level = parseFloat(props.level)
      if (
        (state.prevLevel !== props.level &&
          level > 0 &&
          level !== state.level) ||
        props.relevel
      ) {
        // Because we do not want to run MakeMeReady to set "this.level = 2"
        state.counter.skipMakeMeReady()

        // Run this again here, so we can get a recalculated "useLevel" from the counter
        const { level: newLevel } = correctHeadingLevel({
          counter: state.counter,
          level,
          // reset: props.reset,
          bypassChecks:
            isTrue(props.skip_correction) ||
            isTrue(state.context.heading?.skip_correction),
          source: props.text || props.children, // only for debuging
          debug: props.debug || state.context.heading?.debug
        })
        state.level = state.prevLevel = newLevel
      }
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props, context) {
    super(props)

    // this._id = props.id || makeUniqueId()

    this._ref = React.createRef()

    const state = {
      context,
      _listenForPropChanges: true
    }

    // If a heading runs inside a context, use that counter
    if (context.heading?.counter) {
      state.counter = initCounter(props)
      state.counter.setContextCounter(context.heading.counter)
      state.counter.isHeading = true
    } else {
      // else we use the global counter, or craete a new one
      state.counter = initCounter(props)
      state.counter.setContextCounter(globalHeadingCounter.current)
      state.counter.isHeading = true
    }

    const { level: newLevel } = correctHeadingLevel({
      counter: state.counter,
      level: parseFloat(props.level),
      inherit: isTrue(props.inherit),
      reset: props.reset,
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      bypassChecks:
        isTrue(props.skip_correction) ||
        isTrue(state.context.heading?.skip_correction),
      source: props.text || props.children, // only for debuging
      debug: props.debug || state.context.heading?.debug
    })

    globalSyncCounter.current = state.counter

    state.level = newLevel
    state.prevLevel = props.level

    this.state = state
  }

  componentDidMount() {
    windupHeadings()
    this.state.counter.windup()
  }
  componentWillUnmount() {
    teardownHeadings()
    this.state.counter.teardown()
  }

  render() {
    const {
      text,
      relevel: _relevel, // eslint-disable-line
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
      element: _element, // eslint-disable-line
      class: _className,
      className,
      children,
      ...rest
    } = this.props

    let { size, element } = this.props
    const { level } = this.state
    const debug = _debug || this.context.heading?.debug
    const debug_counter =
      _debug_counter || this.context.heading?.debug_counter

    const attributes = {
      // key: this._id,
      ...rest
    }

    if (element === 'auto' || element === null) {
      element = `h${level || '6'}`
      if (_size === 'auto' || _size === null) {
        size = levelResolution[level || '6']
      }
    } else {
      if (!attributes.role) {
        attributes.role = 'heading'
      }
      if (!attributes['aria-level']) {
        attributes['aria-level'] = String(level)
      }
    }

    attributes.ref = this._ref
    attributes.className = classnames(
      'dnb-heading',
      `dnb-h--${size}`,
      className,
      _className,
      createSpacingClasses(this.props)
    )

    validateDOMAttributes(this.props, attributes)

    const Element = element

    return (
      <Element {...attributes}>
        {debug && (
          <span className="dnb-heading__debug">
            {`[h${level || '6'}] `}
            {debug_counter && (
              <>
                {' '}
                <span className="dnb-code">
                  {debugCounter(this.state.counter)}
                </span>
              </>
            )}
          </span>
        )}
        {text || children}
      </Element>
    )
  }
}

Heading.Level = HeadingProvider
Heading.Increase = (props) => <HeadingProvider increase {...props} />
Heading.Decrease = (props) => <HeadingProvider decrease {...props} />
Heading.Up = (props) => <HeadingProvider increase {...props} />
Heading.Down = (props) => <HeadingProvider decrease {...props} />
Heading.Reset = () => {
  globalHeadingCounter.current?.reset()
  return <></>
}
Heading.resetLevels = resetLevels
Heading.setNextLevel = setNextLevel

// Interceptor to reset leveling
export { resetAllLevels, resetLevels, setNextLevel }
