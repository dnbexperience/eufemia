/**
 * Web Heading Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  // warn,
  isTrue,
  // makeUniqueId,
  validateDOMAttributes,
  registerElement
} from '../../shared/component-helper'
import '../../shared/helpers'
import { createSpacingClasses } from '../space/SpacingHelper'
import HeadingContext from './HeadingContext'
import HeadingProvider from './HeadingProvider'
import { defaultCounter } from './HeadingProvider'

let countHeadings = 0

export const headingResolution = {
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

  debug: PropTypes.bool,
  bypass_checks: PropTypes.bool,
  counter: PropTypes.any,

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

  debug: null,
  bypass_checks: null,
  counter: null,

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
  static contextType = HeadingContext // only used for the hasProvide check

  static enableWebComponent() {
    registerElement(Heading.tagName, Heading, defaultProps)
  }

  render() {
    const hasProvider = this.context?.heading

    if (hasProvider) {
      return <HeadingInstance {...this.props} />
    }

    return (
      <HeadingProvider {...this.props}>
        <HeadingInstance {...this.props} />
      </HeadingProvider>
    )
  }
}
Heading.Level = HeadingProvider

class HeadingInstance extends React.PureComponent {
  // static tagName = 'dnb-heading'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = HeadingContext

  // static enableWebComponent() {
  //   registerElement(Heading.tagName, HeadingInstance, defaultProps)
  // }

  constructor(props, context) {
    super(props)

    this._ref = React.createRef()

    // console.log('context.heading.', context.heading.counter)

    // const counter = context.heading.counter || HeadingProvider.initCounter(props.counter)
    const counter = HeadingProvider.initCounter(props.counter)

    HeadingProvider.handleCounter({
      // counter: this.counter,
      counter,
      level: props.level || context.heading.level,
      increase: isTrue(props.increase) || isTrue(props.up),
      decrease: isTrue(props.decrease) || isTrue(props.down),
      bypassChecks: isTrue(context.heading.bypass_checks),
      source: props.text || props.children // only for debuging
    })

    const level = counter.getLevel()
    // const level = this.counter.getLevel()
    this.state = {
      level
    }
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
      bypass_checks: _bypass_checks, // eslint-disable-line
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
    const { debug } = this.context.heading

    const attributes = {
      ...rest
    }

    if (element === 'auto') {
      element = `h${level}`
      size = headingResolution[level]
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
    // is={element}

    return (
      <Element {...attributes}>
        {debug && `(${level}) `}
        {text || children}
      </Element>
    )
  }
}

// const Element = React.forwardRef(
//   ({ is: Element, children, ...rest }, ref) => (
//     <Element {...rest} ref={ref}>
//       {children}
//     </Element>
//   )
// )
// Element.propTypes = {
//   is: PropTypes.string.isRequired,
//   children: PropTypes.node
// }
// Element.defaultProps = {
//   children: null
// }
