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
  defaultCounter,
  resetLevels,
  setNextLevel
} from './HeadingProvider'

let countHeadings = 0

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

  skip_checks: PropTypes.bool,
  debug: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  counter: PropTypes.any,
  reset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  element: PropTypes.string,
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

const defaultProps = {
  text: null,
  size: 'auto',

  level: null, // like auto
  increase: null,
  decrease: null,
  up: null,
  down: null,

  skip_checks: null,
  debug: null,
  counter: null,
  reset: null,

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
      const newLevel = parseFloat(props.level)
      // console.log('newLevel', newLevel, props.children)
      if (
        state.prevLevel !== props.level &&
        newLevel > 0 &&
        newLevel !== state.level
      ) {
        // Run this again here, so we can get a recalculated "getLevel" from the counter
        HeadingProvider.handleCounter({
          counter: state.counter,
          level: newLevel,
          bypassChecks:
            isTrue(props.skip_checks) ||
            isTrue(state.context.heading?.skip_checks),
          source: props.text || props.children, // only for debuging
          debug: props.debug || state.context.heading?.debug
        })
        state.level = state.counter.getLevel()
      }
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props, context) {
    super(props)

    this._ref = React.createRef()

    const state = {
      context,
      _listenForPropChanges: true
    }

    // const counter = context.heading?.counter || HeadingProvider.initCounter(props.counter)
    state.counter = HeadingProvider.initCounter(
      props.counter,
      isTrue(props.reset)
    )

    HeadingProvider.handleCounter({
      counter: state.counter,
      level: props.level, //  || state.context.heading?.level
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      bypassChecks:
        isTrue(props.skip_checks) ||
        isTrue(state.context.heading?.skip_checks),
      source: props.text || props.children, // only for debuging
      debug: props.debug || state.context.heading?.debug
    })
    state.level = state.counter.getLevel()
    state.prevLevel = props.level

    this.state = state
  }

  componentDidMount() {
    countHeadings++
    this._isMounted = true
  }
  componentWillUnmount() {
    countHeadings--
    if (countHeadings === 0) {
      defaultCounter.current = null
    }
  }

  render() {
    const {
      text,
      debug: _debug, // eslint-disable-line
      reset: _reset, // eslint-disable-line
      skip_checks: _skip_checks, // eslint-disable-line
      increase: _increase, // eslint-disable-line
      decrease: _decrease, // eslint-disable-line
      up: _up, // eslint-disable-line
      down: _down, // eslint-disable-line
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

    const attributes = {
      ...rest
    }

    if (element === 'auto' || element === null) {
      element = `h${level}`
      if (_size === 'auto' || _size === null) {
        size = levelResolution[level]
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
        {debug && `[${level}] `}
        {text || children}
      </Element>
    )
  }
}

Heading.Level = HeadingProvider

// Interceptor to reset leveling
export { resetLevels, setNextLevel }
