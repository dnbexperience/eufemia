/**
 * Web Slider Component
 * stylelint-disable
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
// import './style/dnb-slider.scss' // no good solution to import the style here

const renderProps = {
  on_init: null,
  on_change: null,
  on_drag_start: null,
  on_drag_end: null,
  on_state_update: null
}

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  button_title: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  reverse: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  class: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // Web Component props
  on_init: PropTypes.func,
  on_change: PropTypes.func,
  on_drag_start: PropTypes.func,
  on_drag_end: PropTypes.func,
  on_state_update: PropTypes.func
}

export const defaultProps = {
  id: null,
  label: null,
  button_title: 'Slider',
  min: 0,
  max: 100,
  value: null,
  step: null,
  vertical: false,
  reverse: false,
  disabled: false,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

/**
 * The slider component is our enhancement of the classic radio button. It acts like a slider. Example: On/off, yes/no.
 */
export default class Slider extends PureComponent {
  static tagName = 'dnb-slider'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  state = { currentState: 'initial', value: null }

  static enableWebComponent() {
    registerElement(Slider.tagName, Slider, defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (state.reverse !== props.reverse) {
        state.reverse = isTrue(props.reverse)
        if (isTrue(props.vertical)) {
          state.reverse = !state.reverse
        }
      }
      if (state.vertical !== props.vertical) {
        state.vertical = isTrue(props.vertical)
      }
      if (state.disabled !== props.disabled) {
        state.disabled = isTrue(props.disabled)
      }
      if (state.min !== props.min) {
        state.min = parseFloat(props.min)
      }
      if (state.max !== props.max) {
        state.max = parseFloat(props.max)
      }

      // if (state.default_value !== props.value) {
      if (state.value !== props.value) {
        state.value = props.value
        if (typeof props.on_state_update === 'function') {
          dispatchCustomElementEvent({ ...props }, 'on_state_update', {
            value: state.value
          })
        }
      }
    }
    if (state.disabled) {
      return { currentState: 'disabled' }
    } else if (state.currentState === 'disabled') {
      return { currentState: 'normal' }
    }
    state._listenForPropChanges = true

    return state
  }

  static getValue(props) {
    if (props.value) return props.value
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._id = props.id || `dnb-slider-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    this._containerRef = React.createRef()
    const value = Slider.getValue(props)
    this.state = {
      _listenForPropChanges: true,
      default_value: value,
      value
      // hasDefaultState: props.default_state !== null
      // checked: (props.default_state || props.checked)
    }
  }

  handleKeyDown = event => {
    const { min, max, reverse, vertical, value: currentValue } = this.state
    const isReverse = vertical ? !reverse : reverse

    const onePercent = Math.abs((max - min) / 100)
    const step = this.props.step || onePercent
    let value

    switch (keycode(event)) {
      case 'home':
        value = isReverse ? max : min
        break
      case 'end':
        value = isReverse ? min : max
        break
      case 'page up':
        value = isReverse
          ? currentValue - onePercent
          : currentValue + onePercent * 10
        break
      case 'page down':
        value = isReverse
          ? currentValue + onePercent
          : currentValue - onePercent * 10
        break
      case 'right':
      case 'up':
        value = isReverse ? currentValue - step : currentValue + step
        break
      case 'left':
      case 'down':
        value = isReverse ? currentValue + step : currentValue - step
        break
      default:
        return
    }

    event.preventDefault()

    value = clamp(value, min, max)

    this.emitChange(event, value)
  }

  handleFocus = () => {
    this.setState({
      _listenForPropChanges: false,
      currentState: 'focused'
    })
  }

  handleBlur = () => {
    this.setState({ _listenForPropChanges: false, currentState: 'normal' })
  }

  handleClick = event => {
    const { min, max, reverse, vertical } = this.state
    const percent = calculatePercent(
      this._containerRef.current,
      event,
      vertical,
      reverse
    )
    const value = percentToValue(percent, min, max)

    this.emitChange(event, value, () => {
      this.setToResetState()
    })
  }

  handleTouchStart = event => {
    event.preventDefault()
    this.setState({
      _listenForPropChanges: false,
      currentState: 'activated'
    })

    if (typeof document !== 'undefined') {
      document.body.addEventListener('touchend', this.handleMouseUp)
    }

    if (typeof this.props.on_drag_start === 'function') {
      dispatchCustomElementEvent(this, 'on_drag_start', {
        event
      })
    }
  }

  handleMouseDown = event => {
    event.preventDefault()
    this.setState({
      _listenForPropChanges: false,
      currentState: 'activated'
    })

    if (typeof document !== 'undefined') {
      document.body.addEventListener('mousemove', this.handleMouseMove)
      document.body.addEventListener('mouseup', this.handleMouseUp)
    }

    if (typeof this.props.on_drag_start === 'function') {
      dispatchCustomElementEvent(this, 'on_drag_start', {
        event
      })
    }
  }

  handleMouseUp = event => {
    this.setState({ _listenForPropChanges: false, currentState: 'normal' })

    if (typeof document !== 'undefined') {
      document.body.removeEventListener('mousemove', this.handleMouseMove)
      document.body.removeEventListener('mouseup', this.handleMouseUp)
    }

    if (typeof this.props.on_drag_end === 'function') {
      dispatchCustomElementEvent(this, 'on_drag_end', {
        event
      })
    }
  }

  handleMouseMove = event => {
    let elem = this._containerRef.current
    if (event.detail) {
      // we have to mock this for jsdom.
      elem = createMockDiv(event.detail)
      event = event.detail
    }

    const { min, max, vertical, reverse } = this.state
    const percent = calculatePercent(elem, event, vertical, reverse)
    const value = percentToValue(percent, min, max)

    this.emitChange(event, value)
  }

  roundValue(value) {
    const { step } = this.props

    return parseFloat(step) > 0
      ? roundToStep(value, step)
      : parseFloat(value).toFixed(3)
  }

  emitChange(event, rawValue, callback) {
    const { value: previousValue, disabled } = this.state

    if (disabled) {
      return
    }

    const value = this.roundValue(rawValue)

    if (
      typeof this.props.on_change === 'function' &&
      value !== this.roundValue(previousValue)
    ) {
      dispatchCustomElementEvent(this, 'on_change', {
        value,
        raw_value: rawValue,
        event
      })

      if (typeof callback === 'function') {
        callback()
      }
    }

    this.setState({ value: rawValue, _listenForPropChanges: false })
  }

  resetStateTimeoutId = -1
  setToResetState() {
    this.setState(
      { _listenForPropChanges: false, currentState: 'jumped' },
      () => {
        clearTimeout(this.resetStateTimeoutId)
        this.resetStateTimeoutId = setTimeout(() => {
          this.setState({
            _listenForPropChanges: false,
            currentState: 'normal'
          })
        }, 1e3)
      }
    )
  }

  calculateLineAfterStyles(percent) {
    const { currentState } = this.state

    switch (currentState) {
      case 'activated':
        return `calc(100% - ${percent === 0 ? 7 : 5}px)`
      case 'disabled':
        return `calc(${100 - percent}% - 6px)`
      default:
        return 'calc(100% - 5px)'
    }
  }

  calculateLineBeforeStyles(percent) {
    const { currentState } = this.state

    switch (currentState) {
      case 'disabled':
        return `calc(${percent}% - 6px)`
      default:
        return `${percent}%`
    }
  }

  componentDidMount() {
    if (this._containerRef.current) {
      this._containerRef.current.addEventListener(
        'touchstart',
        preventPageScrolling,
        { passive: false }
      )
    }
    if (typeof this.props.on_init === 'function') {
      const { value } = this.state
      dispatchCustomElementEvent(this, 'on_init', {
        value
      })
    }
  }

  componentWillUnmount() {
    if (this._containerRef.current) {
      this._containerRef.current.removeEventListener(
        'touchstart',
        preventPageScrolling,
        { passive: false }
      )
    }
    if (typeof document !== 'undefined') {
      document.body.removeEventListener('mousemove', this.handleMouseMove)
      document.body.removeEventListener('mouseup', this.handleMouseUp)
    }
    clearTimeout(this.resetStateTimeoutId)
  }

  render() {
    const { currentState, value } = this.state

    const {
      label, // eslint-disable-line
      button_title,
      className,
      class: _className,

      max: _max, // eslint-disable-line
      min: _min, // eslint-disable-line
      disabled: _disabled, // eslint-disable-line
      reverse: _reverse, // eslint-disable-line
      vertical: _vertical, // eslint-disable-line
      id: _id, // eslint-disable-line
      step: _step, // eslint-disable-line
      value: _value, // eslint-disable-line

      ...attributes
    } = this.props

    const { min, max, reverse, vertical, disabled } = this.state

    const classes = classnames(
      'dnb-slider',
      className,
      _className,
      reverse && 'slider__reverse',
      vertical && 'slider__vertical'
    )

    const percent = clamp(((value - min) * 100) / (max - min))

    const lineProperty = vertical ? 'height' : 'width'
    const thumbProperty = vertical ? 'top' : 'left'
    const inlineLineBeforeStyles = {
      [lineProperty]: this.calculateLineBeforeStyles(percent)
    }
    const inlineLineAfterStyles = {
      [lineProperty]: this.calculateLineAfterStyles(percent)
    }
    const inlineThumbStyles = { [thumbProperty]: `${percent}%` }

    const params = {
      className: classnames(
        'slider__root',
        currentState && `slider__state--${currentState}`
      ),
      disabled,
      ...attributes,
      onClick: this.handleClick,
      onMouseDown: this.handleMouseDown,
      onTouchStartCapture: this.handleTouchStart,
      onTouchMove: this.handleMouseMove
    }
    const buttonParams = {
      className: 'slider__thumb',
      disabled,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown,
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleMouseMove,
      onFocus: this.handleFocus
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)
    validateDOMAttributes(null, buttonParams)

    return (
      <div className={classes}>
        <div
          id={this._id}
          role="slider"
          aria-valuenow={this.roundValue(value)}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          ref={this._containerRef}
          {...params}
        >
          <div
            className="slider__line slider__line__before"
            style={inlineLineBeforeStyles}
          />
          <button
            tabIndex="0"
            aria-label={button_title}
            type="button"
            className="slider__thumb"
            style={inlineThumbStyles}
            {...buttonParams}
          />
          <div
            className="slider__line slider__line__after"
            style={inlineLineAfterStyles}
          />
        </div>
      </div>
    )
  }
}

const percentToValue = (percent, min, max) =>
  ((max - min) * percent) / 100 + min

const roundToStep = (number, step) => Math.round(number / step) * step

const getOffset = node => {
  const { pageYOffset, pageXOffset } = global
  const { left, top } = node.getBoundingClientRect()

  return {
    top: top + pageYOffset,
    left: left + pageXOffset
  }
}

const getMousePosition = event => {
  if (event.changedTouches && event.changedTouches[0]) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY
    }
  }

  return {
    x: event.pageX,
    y: event.pageY
  }
}

const calculatePercent = (node, event, isVertical, isReverted) => {
  const { width, height } = node.getBoundingClientRect()
  const { top, left } = getOffset(node)
  const { x, y } = getMousePosition(event)

  const value = isVertical ? y - top : x - left
  const onePercent = (isVertical ? height : width) / 100

  return isReverted
    ? 100 - clamp(value / onePercent)
    : clamp(value / onePercent)
}

const preventPageScrolling = event => event.preventDefault()

const clamp = (value, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max)

const createMockDiv = ({ width, height }) => {
  const div = document.createElement('div')
  Object.assign(div.style, {
    width: `${width}px`,
    height: `${height}px`
  })
  div.getBoundingClientRect = () => ({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height
  })
  return div
}
