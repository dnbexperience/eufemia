/**
 * Web Slider Component
 * stylelint-disable
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
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
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  class: PropTypes.string,

  // range_output_visible: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.bool
  // ]),
  // range_output_input_size: PropTypes.string,
  // range_output_extra_information: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // Web Component props
  // custom_element: PropTypes.object,
  // custom_method: PropTypes.func,
  on_init: PropTypes.func,
  on_change: PropTypes.func,
  on_drag_start: PropTypes.func,
  on_drag_end: PropTypes.func,
  on_state_update: PropTypes.func
}

export const defaultProps = {
  id: null,
  min: 0,
  max: 100,
  value: null,
  step: null,
  vertical: false,
  disabled: false,
  // range_output_visible: false,
  // range_output_input_size: 'large',
  // range_output_extra_information: null,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  // custom_element: null,
  // custom_method: null,
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

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.disabled) {
      return { currentState: 'disabled' }
    }
    if (!nextProps.disabled && state.currentState === 'disabled') {
      return { currentState: 'normal' }
    }

    if (state._listenForPropChanges) {
      if (state.default_value !== nextProps.value) {
        state.value = nextProps.value
      }
    }
    state._listenForPropChanges = true

    return state
    // return null
  }

  static getValue(props) {
    if (props.value) return props.value
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._id = props.id || `dnb-slider-${Math.random()}` // cause we need an id anyway
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value !== nextProps.value) {
      const { value } = nextState
      dispatchCustomElementEvent(this, 'on_state_update', { value })
    }
    return true
  }

  // onChangeHandler = event => {
  //   const value = !this.state.value
  //   this.setState({ value, _listenForPropChanges: false })
  //   dispatchCustomElementEvent(this, 'on_change', { value, event })
  // }

  handleKeyDown = event => {
    const { value: currentValue } = this.state
    const {
      reverse,
      min,
      max
      // value: currentValue
    } = this.props

    const onePercent = Math.abs((max - min) / 100)
    const step = this.props.step || onePercent
    let value

    switch (keycode(event)) {
      case 'home':
        value = reverse ? max : min
        break
      case 'end':
        value = reverse ? min : max
        break
      case 'page up':
        value = reverse
          ? currentValue - onePercent
          : currentValue + onePercent * 10
        break
      case 'page down':
        value = reverse
          ? currentValue + onePercent
          : currentValue - onePercent * 10
        break
      case 'right':
      case 'up':
        value = reverse ? currentValue - step : currentValue + step
        break
      case 'left':
      case 'down':
        value = reverse ? currentValue + step : currentValue - step
        break
      default:
        return
    }

    event.preventDefault()

    value = clamp(value, min, max)

    this.emitChange(event, value)
  }

  handleFocus = () => {
    this.setState({ currentState: 'focused' })
  }

  handleBlur = () => {
    this.setState({ currentState: 'normal' })
  }

  handleClick = event => {
    const { min, max, vertical, reverse } = this.props
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
    this.setState({ currentState: 'activated' })

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
    this.setState({ currentState: 'activated' })

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
    this.setState({ currentState: 'normal' })

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
    const { min, max, vertical, reverse } = this.props
    const percent = calculatePercent(
      this._containerRef.current,
      event,
      vertical,
      reverse
    )
    const value = percentToValue(percent, min, max)

    this.emitChange(event, value)
  }

  emitChange(event, rawValue, callback) {
    const { value: previousValue } = this.state
    const { step, disabled } = this.props
    let value = rawValue

    if (disabled) {
      return
    }

    value = step
      ? roundToStep(rawValue, step)
      : Number(rawValue.toFixed(3))

    if (
      typeof this.props.on_change === 'function' && value !== step
        ? roundToStep(previousValue, step)
        : Number(previousValue.toFixed(3))
    ) {
      dispatchCustomElementEvent(this, 'on_change', {
        value,
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
    this.setState({ currentState: 'jumped' }, () => {
      clearTimeout(this.resetStateTimeoutId)
      this.resetStateTimeoutId = setTimeout(() => {
        this.setState({ currentState: 'normal' })
      }, 1e3)
    })
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
      const value = this.state.value
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
      className,
      class: _className,
      disabled,
      max,
      min,
      reverse,
      vertical
    } = this.props

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
      disabled:
        typeof disabled === 'string'
          ? disabled === 'true'
          : Boolean(disabled),
      onClick: this.handleClick,
      onMouseDown: this.handleMouseDown,
      onTouchStartCapture: this.handleTouchStart,
      onTouchMove: this.handleMouseMove
    }
    const buttonParams = {
      className: 'slider__thumb',
      disabled:
        typeof disabled === 'string'
          ? disabled === 'true'
          : Boolean(disabled),
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
          aria-valuenow={value}
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

function percentToValue(percent, min, max) {
  return ((max - min) * percent) / 100 + min
}

function roundToStep(number, step) {
  return Math.round(number / step) * step
}

function getOffset(node) {
  const { pageYOffset, pageXOffset } = global
  const { left, top } = node.getBoundingClientRect()

  return {
    top: top + pageYOffset,
    left: left + pageXOffset
  }
}

function getMousePosition(event) {
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

function calculatePercent(node, event, isVertical, isReverted) {
  const { width, height } = node.getBoundingClientRect()
  const { top, left } = getOffset(node)
  const { x, y } = getMousePosition(event)

  const value = isVertical ? y - top : x - left
  const onePercent = (isVertical ? height : width) / 100

  return isReverted
    ? 100 - clamp(value / onePercent)
    : clamp(value / onePercent)
}

function preventPageScrolling(event) {
  event.preventDefault()
}

function clamp(value, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max)
}
