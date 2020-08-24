/**
 * Web Slider Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  warn,
  isTrue,
  makeUniqueId,
  registerElement,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext,
  dispatchCustomElementEvent,
  isTouchDevice
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

const renderProps = {
  on_init: null,
  on_change: null,
  on_drag_start: null,
  on_drag_end: null,
  on_state_update: null
}

const propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
  label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  thump_title: PropTypes.string,
  add_title: PropTypes.string,
  subtract_title: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  reverse: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hide_buttons: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  use_scrollwheel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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

const defaultProps = {
  id: null,
  label: null,
  label_direction: null,
  label_sr_only: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  suffix: null,
  thump_title: null,
  add_title: '+',
  subtract_title: '−',
  min: 0,
  max: 100,
  value: -1,
  step: null,
  vertical: false,
  reverse: false,
  disabled: false,
  hide_buttons: false,
  use_scrollwheel: false,
  skeleton: null,
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
export default class Slider extends React.PureComponent {
  static tagName = 'dnb-slider'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

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

      if (props.value !== -1 && state.value !== props.value) {
        const value = Slider.getValue(props)
        if (value >= -1) {
          state.value = value
          if (typeof props.on_state_update === 'function') {
            dispatchCustomElementEvent({ ...props }, 'on_state_update', {
              value
            })
          }
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
    if (props.value >= -1) {
      return props.value
    }
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._trackRef = React.createRef()
    this.state = {
      _listenForPropChanges: true,
      value: Slider.getValue(props) // so on_state_update not gets called
    }
  }

  onKeyDownHandler = (event) => {
    const { min, max, reverse, vertical, value: currentValue } = this.state
    const isReverse = vertical ? !reverse : reverse

    const onePercent = Math.abs((max - min) / 100)
    const step = this.props.step || onePercent
    let value = -1

    switch (keycode(event)) {
      case 'end':
        value = isReverse ? max : min
        break

      case 'home':
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

      case 'numpad +':
      case 'right':
      case 'up':
        value = isReverse ? currentValue - step : currentValue + step
        break

      case 'numpad -':
      case 'left':
      case 'down':
        value = isReverse ? currentValue + step : currentValue - step
        break

      default:
        break
    }

    if (value !== -1) {
      event.preventDefault()
      value = clamp(value, min, max)
      this.emitChange(event, value)
    }
  }

  onFocusHandler = () => {
    this.setState({
      _listenForPropChanges: false,
      currentState: 'focused'
    })
  }

  onBlurHandler = () => {
    this.setState({ _listenForPropChanges: false, currentState: 'normal' })
  }

  onClickHandler = (event) => {
    const { min, max, reverse, vertical } = this.state
    const percent = calculatePercent(
      this._trackRef.current,
      event,
      vertical,
      reverse
    )

    const value = percentToValue(percent, min, max)
    this.emitChange(event, value, () => this.setToResetState())
  }

  onSubtractClickHandler = (event) => {
    let { step } = this.props
    let { min, max, value } = this.state
    this.emitChange(event, clamp(value - (step || 1), min, max))
  }
  onAddClickHandler = (event) => {
    let { step } = this.props
    let { min, max, value } = this.state
    this.emitChange(event, clamp(value + (step || 1), min, max))
  }

  onMouseDownHandler = (event) => {
    if (typeof document !== 'undefined') {
      try {
        document.body.addEventListener(
          'touchmove',
          this.onTouchMoveHandler
        )
        document.body.addEventListener('touchend', this.onTouchEndHandler)
        document.body.addEventListener(
          'mousemove',
          this.onMouseMoveHandler
        )
        document.body.addEventListener('mouseup', this.onMouseUpHandler)
      } catch (e) {
        warn(e)
      }
    }

    this.setState({
      _listenForPropChanges: false,
      currentState: 'activated'
    })

    if (typeof this.props.on_drag_start === 'function') {
      dispatchCustomElementEvent(this, 'on_drag_start', {
        event
      })
    }
  }

  onTouchEndHandler = (event) => this.onMouseUpHandler(event)
  onMouseUpHandler = (event) => {
    if (typeof document !== 'undefined') {
      try {
        document.body.removeEventListener(
          'touchmove',
          this.onTouchMoveHandler
        )
        document.body.removeEventListener(
          'touchend',
          this.onTouchEndHandler
        )
        document.body.removeEventListener(
          'mousemove',
          this.onMouseMoveHandler
        )
        document.body.removeEventListener('mouseup', this.onMouseUpHandler)
      } catch (e) {
        warn(e)
      }
    }

    this.setState({ _listenForPropChanges: false, currentState: 'normal' })

    if (typeof this.props.on_drag_end === 'function') {
      dispatchCustomElementEvent(this, 'on_drag_end', {
        event
      })
    }
  }

  onRangeChangeHandler = (event) => {
    const value = event.currentTarget.value
    this.setState({
      value,
      _listenForPropChanges: false
    })
  }

  onTouchMoveHandler = (event) => this.onMouseMoveHandler(event)
  onMouseMoveHandler = (event) => {
    let elem = this._trackRef.current

    // we have to mock this for jsdom.
    if (
      event &&
      event.detail &&
      typeof event.detail.height !== 'undefined'
    ) {
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

    if (
      disabled ||
      isTrue(this.props.skeleton) ||
      isTrue(this.context?.skeleton)
    ) {
      return
    }

    const value = this.roundValue(rawValue)

    if (value > -1) {
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
  }

  resetStateTimeoutId = -1
  setToResetState() {
    this.setState(
      { _listenForPropChanges: false, currentState: 'jumped' },
      () => {
        clearTimeout(this.resetStateTimeoutId)
        this.resetStateTimeoutId = setTimeout(
          () =>
            this.setState({
              _listenForPropChanges: false,
              currentState: 'normal'
            }),
          100
        )
      }
    )
  }

  componentDidMount() {
    if (this._trackRef.current) {
      if (isTrue(this.props.use_scrollwheel)) {
        const { min, max, reverse, vertical } = this.state
        this._trackRef.current.addEventListener('wheel', (event) => {
          event.preventDefault()
          // Could be handy to use: Math.sign(event.deltaY)
          this.emitChange(
            event,
            clamp(
              this.state.value +
                ((!vertical && reverse) || (vertical && !reverse)
                  ? -event.deltaY / 10
                  : event.deltaY / 10),
              min,
              max
            )
          )
        })
      }
    }

    if (typeof this.props.on_init === 'function') {
      const { value } = this.state
      dispatchCustomElementEvent(this, 'on_init', {
        value
      })
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      try {
        document.body.removeEventListener(
          'touchmove',
          this.onTouchMoveHandler
        )
        document.body.removeEventListener(
          'touchend',
          this.onTouchEndHandler
        )
        document.body.removeEventListener(
          'mousemove',
          this.onMouseMoveHandler
        )
        document.body.removeEventListener('mouseup', this.onMouseUpHandler)
      } catch (e) {
        warn(e)
      }
    }
    clearTimeout(this.resetStateTimeoutId)
  }

  render() {
    const { value } = this.state
    let { currentState } = this.state

    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.formRow,
      this.context.translation.Slider
    )

    const {
      label,
      label_direction,
      label_sr_only,
      status,
      status_state,
      status_animation,
      global_status_id,
      suffix,
      thump_title: title,
      subtract_title,
      add_title,
      hide_buttons,
      skeleton,
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
      children: _children, // eslint-disable-line
      use_scrollwheel: _use_scrollwheel, // eslint-disable-line

      ...attributes
    } = props

    // const { min, max, reverse, vertical, disabled } = this.state
    const { min, max, reverse, vertical } = this.state
    let { disabled } = this.state
    const showStatus = status && status !== 'error'
    const showButtons = !isTrue(hide_buttons)

    if (isTrue(skeleton)) {
      disabled = true
      currentState = 'disabled'
    }

    const id = this._id
    const mainParams = {
      className: classnames(
        'dnb-slider',
        reverse && 'dnb-slider--reverse',
        vertical && 'dnb-slider--vertical',
        label &&
          label_direction &&
          `dnb-slider__label--${label_direction}`,
        showStatus && 'dnb-slider__form-status',
        status && `dnb-slider__status--${status_state}`,
        'dnb-form-component',
        createSpacingClasses(props),
        className,
        _className
      )
    }

    const percent = clamp(((value - min) * 100) / (max - min))

    const inlineStyleBefore = {
      [`${vertical ? 'height' : 'width'}`]: `${percent}%`
    }

    const inlineThumbStyles = {
      [`${vertical ? 'top' : 'left'}`]: `${percent}%`
    }

    const trackParams = {
      className: classnames(
        'dnb-slider__track',
        currentState && `dnb-slider__state--${currentState}`
      ),
      onTouchStart: this.onClickHandler,
      onTouchStartCapture: this.onMouseDownHandler,
      onMouseDown: this.onClickHandler,
      onMouseDownCapture: this.onMouseDownHandler
    }

    const rangeParams = {
      title,
      disabled,
      ...attributes,
      onBlur: this.onBlurHandler,
      onKeyDown: this.onKeyDownHandler,
      onFocus: this.onFocusHandler
    }

    if (label) {
      rangeParams['aria-labelledby'] = id + '-label'
      if (isTouchDevice()) {
        trackParams['aria-labelledby'] = id + '-label'
      }
    }
    if (showStatus || suffix) {
      rangeParams['aria-describedby'] = `${
        showStatus ? id + '-status' : ''
      } ${suffix ? id + '-suffix' : ''}`
      if (isTouchDevice()) {
        trackParams['aria-describedby'] = `${
          showStatus ? id + '-status' : ''
        } ${suffix ? id + '-suffix' : ''}`
      }
    }

    if (isTouchDevice()) {
      trackParams.role = 'slider'
      trackParams['aria-valuenow'] = this.roundValue(value)
      trackParams['aria-valuemin'] = min
      trackParams['aria-valuemax'] = max
      trackParams['aria-orientation'] = vertical
        ? 'vertical'
        : 'horizontal'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, trackParams)
    validateDOMAttributes(null, rangeParams)

    const subtractButton = (
      <Button
        className="dnb-slider__button dnb-slider__button--subtract"
        variant="secondary"
        icon="subtract"
        size="small"
        aria-label={subtract_title}
        on_click={this.onSubtractClickHandler}
        disabled={disabled}
      />
    )

    const addButton = (
      <Button
        className="dnb-slider__button dnb-slider__button--add"
        variant="secondary"
        icon="add"
        size="small"
        aria-label={add_title}
        on_click={this.onAddClickHandler}
        disabled={disabled}
      />
    )

    return (
      <span {...mainParams}>
        {label && (
          // do not use "for_id" as the ID element is not a fo
          <FormLabel
            id={id + '-label'}
            text={label}
            disabled={disabled}
            label_direction={label_direction}
            sr_only={label_sr_only}
          />
        )}

        <span className="dnb-slider__wrapper">
          <AlignmentHelper />

          {showStatus && (
            <FormStatus
              id={id + '-form-status'}
              global_status_id={global_status_id}
              text_id={id + '-status'} // used for "aria-describedby"
              text={status}
              status={status_state}
              animation={status_animation}
            />
          )}

          <span className="dnb-slider__inner">
            {showButtons && (reverse ? addButton : subtractButton)}
            <span id={this._id} ref={this._trackRef} {...trackParams}>
              <span
                className="dnb-slider__thumb"
                style={inlineThumbStyles}
              >
                {/* Keep the possibility open to use a native slider inside */}
                {!isTouchDevice() && (
                  <input
                    type="range"
                    className="dnb-slider__button-helper"
                    min={min}
                    max={max}
                    step={_step}
                    value={value}
                    orientation={vertical ? 'vertical' : 'horizontal'}
                    {...rangeParams}
                    onChange={this.onRangeChangeHandler}
                  />
                )}
                <Button
                  variant="secondary"
                  tabIndex="-1"
                  onMouseDown={this.onMouseDownHandler}
                  {...(isTouchDevice()
                    ? rangeParams
                    : { 'aria-hidden': true })}
                  disabled={disabled}
                />
              </span>
              <span
                className="dnb-slider__line dnb-slider__line__before"
                style={inlineStyleBefore}
              />
              <span className="dnb-slider__line dnb-slider__line__after" />
            </span>

            {showButtons && (reverse ? subtractButton : addButton)}

            {suffix && (
              <span
                className="dnb-slider__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
              >
                <Suffix {...props}>{suffix}</Suffix>
              </span>
            )}
          </span>
        </span>
      </span>
    )
  }
}

const percentToValue = (percent, min, max) =>
  ((max - min) * percent) / 100 + min

const roundToStep = (number, step) => Math.round(number / step) * step

const getOffset = (node) => {
  const { pageYOffset, pageXOffset } = global
  const { left, top } = node.getBoundingClientRect()

  return {
    top: top + pageYOffset,
    left: left + pageXOffset
  }
}

const getMousePosition = (event) => {
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
