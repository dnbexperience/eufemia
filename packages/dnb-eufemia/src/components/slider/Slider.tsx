/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Web Slider Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  warn,
  isTrue,
  makeUniqueId,
  registerElement,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext,
  getStatusState,
  combineLabelledBy,
  combineDescribedBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { classWithCamelCaseProps } from '../../shared/helpers/withCamelCaseProps'
import { createSpacingClasses } from '../space/SpacingHelper'
import { format } from '../number-format/NumberUtils'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

import type { ToCamelCasePartial } from '../../shared/helpers/withCamelCaseProps'
import type { ISpacingProps } from '../../shared/interfaces'
import type { SuffixChildren } from '../../shared/helpers/Suffix'
import type {
  formatReturnType,
  formatReturnValue,
  formatOptionParams,
  formatValue,
} from '../number-format/NumberUtils'

type onChangeEventProps = {
  value: number
  rawValue: number
  number?: formatReturnType | null
  event?: Event

  /** @deprecated use rawValue instead */
  raw_value?: number
}

export type SliderPropTypes = {
  id?: string
  label?: React.ReactNode
  label_direction?: 'horizontal' | 'vertical'
  label_sr_only?: boolean
  status?: string | boolean
  status_state?: 'error' | 'info'
  status_props?: Record<string, unknown>
  status_no_animation?: boolean
  global_status_id?: string
  suffix?: SuffixChildren
  thumb_title?: string
  add_title?: string
  subtract_title?: string
  min?: number | string
  max?: number | string
  value?: number | string
  step?: number | string
  vertical?: boolean
  reverse?: boolean
  stretch?: boolean
  number_format?: formatOptionParams
  disabled?: boolean
  hide_buttons?: boolean
  use_scrollwheel?: boolean
  skeleton?: boolean

  class?: string
  className?: string
  children?: React.ReactNode

  on_init?: (props: Omit<onChangeEventProps, 'rawValue'>) => void
  on_change?: (props: onChangeEventProps) => void
  on_drag_start?: (props: {
    event: MouseEvent | TouchEvent | WheelEvent
  }) => void
  on_drag_end?: (props: {
    event: MouseEvent | TouchEvent | WheelEvent
  }) => void
} & ISpacingProps

type SliderState = {
  currentState?: 'initial' | 'normal' | 'activated' | 'focused' | 'jumped'
  value: number
  _value?: number
  __value?: number
  _listenForPropChanges?: boolean
  min?: number
  max?: number
  reverse?: boolean
  vertical?: boolean
  disabled?: boolean
}

/**
 * The slider component is our enhancement of the classic radio button. It acts like a slider. Example: On/off, yes/no.
 */
class Slider extends React.PureComponent<
  SliderPropTypes & ToCamelCasePartial<SliderPropTypes>,
  SliderState
> {
  static tagName = 'dnb-slider'
  static contextType = Context

  static defaultProps = {
    id: null,
    label: null,
    label_direction: null,
    label_sr_only: null,
    status: null,
    status_state: 'error',
    status_props: null,
    status_no_animation: null,
    global_status_id: null,
    suffix: null,
    thumb_title: null,
    add_title: '+',
    subtract_title: '−',
    min: 0,
    max: 100,
    value: -1,
    step: null,
    vertical: false,
    reverse: false,
    stretch: false,
    number_format: null,
    disabled: false,
    hide_buttons: false,
    use_scrollwheel: false,
    skeleton: null,
    class: null,

    className: null,
    children: null,

    on_init: null,
    on_change: null,
    on_drag_start: null,
    on_drag_end: null,
  }

  state: SliderState = { currentState: 'initial', value: null }

  _id: string
  _trackRef: React.RefObject<HTMLElement>
  jumpedTimeout: NodeJS.Timeout

  static enableWebComponent() {
    registerElement(Slider?.tagName, Slider, Slider.defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      state.reverse = isTrue(props.reverse)
      if (isTrue(props.vertical)) {
        state.reverse = !state.reverse
      }

      state.vertical = isTrue(props.vertical)
      state.min = parseFloat(props.min)
      state.max = parseFloat(props.max)

      const value = Slider.getValue(props)
      if (value !== state._value && value >= -1) {
        state.value = value
      }

      state._value = value
    }
    state._listenForPropChanges = true

    state.disabled = isTrue(props.disabled)

    if (isTrue(props.skeleton)) {
      state.disabled = true
    }

    if (state.disabled) {
      state.currentState = 'disabled'
    } else if (state.currentState === 'disabled') {
      state.currentState = 'normal'
    }

    return state
  }

  static getValue(props: SliderPropTypes): number {
    const num = parseFloat(String(props.value))
    if (num >= -1) {
      return num
    }
    return processChildren(props)
  }

  constructor(props: SliderPropTypes) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._trackRef = React.createRef()

    const value = Slider.getValue(props)
    this.state = {
      _listenForPropChanges: true,
      value,
      _value: value,
      __value: value,
    }
  }

  onFocusHandler = () => {
    this.setState({
      _listenForPropChanges: false,
      currentState: 'focused',
    })
  }

  onBlurHandler = () => {
    this.setState({ _listenForPropChanges: false, currentState: 'normal' })
  }

  onClickHandler = (event: MouseEvent | TouchEvent | WheelEvent) => {
    const { min, max, reverse, vertical } = this.state
    const percent = calculatePercent(
      this._trackRef.current,
      event,
      vertical,
      reverse
    )

    const value = percentToValue(percent, min, max)
    this.emitChange(event, value)
    this.setJumpedState()
  }

  onSubtractClickHandler = (
    event: MouseEvent | TouchEvent | WheelEvent
  ) => {
    const step = parseFloat(String(this.props.step))
    const { min, max, value } = this.state
    this.emitChange(event, clamp(value - (step || 1), min, max))
  }
  onAddClickHandler = (event: MouseEvent | TouchEvent | WheelEvent) => {
    const step = parseFloat(String(this.props.step))
    const { min, max, value } = this.state
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
      currentState: 'activated',
    })

    if (typeof this.props.on_drag_start === 'function') {
      dispatchCustomElementEvent(this, 'on_drag_start', {
        event,
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
        event,
      })
    }
  }

  onRangeChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const value = parseFloat(event.currentTarget.value)
    this.setState({
      value,
      _listenForPropChanges: false,
    })
    const emitEvent = event as unknown
    this.emitChange(emitEvent as MouseEvent, value)
  }

  onTouchMoveHandler = (event: MouseEvent) =>
    this.onMouseMoveHandler(event)
  onMouseMoveHandler = (event: MouseEvent) => {
    let elem = this._trackRef.current

    // we have to mock this for jsdom.
    if (
      // @ts-ignore
      typeof event?.detail?.height !== 'undefined'
    ) {
      // @ts-ignore
      elem = createMockDiv(event.detail)
      // @ts-ignore
      event = event.detail
    }

    const { min, max, vertical, reverse } = this.state
    const percent = calculatePercent(elem, event, vertical, reverse)

    const value = percentToValue(percent, min, max)

    this.emitChange(event, value)
  }

  roundValue(value: number) {
    const step = parseFloat(String(this.props.step))

    return step > 0
      ? roundToStep(value, step)
      : parseFloat(parseFloat(String(value)).toFixed(3))
  }

  emitChange(
    event: MouseEvent | TouchEvent | WheelEvent,
    rawValue: number,
    callback = null
  ) {
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
        const obj: onChangeEventProps = {
          value,
          rawValue,
          raw_value: rawValue,
          event,
          number: null,
        }
        if (this.props.number_format) {
          obj.number = formatNumber(value, this.props.number_format)
        }
        dispatchCustomElementEvent(this, 'on_change', obj)

        if (typeof callback === 'function') {
          callback()
        }
      }

      this.setState({ value: rawValue, _listenForPropChanges: false })
    }
  }

  setJumpedState() {
    this.setState(
      { currentState: 'jumped', _listenForPropChanges: false },
      () => {
        clearTimeout(this.jumpedTimeout)
        this.jumpedTimeout = setTimeout(
          () =>
            this.setState({
              currentState: 'normal',
              _listenForPropChanges: false,
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
      const obj = {
        value,
        number: null,
      }
      if (this.props.number_format) {
        obj.number = formatNumber(value, this.props.number_format)
      }
      dispatchCustomElementEvent(this, 'on_init', obj)
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
    clearTimeout(this.jumpedTimeout)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      Slider.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).Slider,
      this.context.FormRow,
      this.context.Slider
    )

    const {
      label,
      label_direction,
      label_sr_only,
      status,
      status_state,
      status_props,
      status_no_animation,
      global_status_id,
      stretch,
      suffix,
      thumb_title: title,
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

    const { min, max, reverse, vertical, value, currentState, disabled } =
      this.state

    const showStatus = getStatusState(status)
    const showButtons = !isTrue(hide_buttons)

    const id = this._id
    const mainParams = {
      className: classnames(
        'dnb-slider',
        reverse && 'dnb-slider--reverse',
        vertical && 'dnb-slider--vertical',
        isTrue(stretch) && 'dnb-slider--stretch',
        label &&
          label_direction &&
          `dnb-slider__label--${label_direction}`,
        showStatus && 'dnb-slider__form-status',
        status && `dnb-slider__status--${status_state}`,
        'dnb-form-component',
        createSkeletonClass(null, skeleton),
        createSpacingClasses(props),
        className,
        _className
      ),
    }

    const percent = clamp(((value - min) * 100) / (max - min))
    const options = {
      ...(this.props.number_format || {}),
      returnAria: true,
    }
    const { aria: humanNumber } = formatNumber(
      value,
      options
    ) as formatReturnValue
    const hasHumanNumber = Boolean(this.props.number_format && humanNumber)

    const inlineStyleBefore = {
      [`${vertical ? 'height' : 'width'}`]: `${percent}%`,
    }

    const inlineThumbStyles = {
      [`${vertical ? 'top' : 'left'}`]: `${percent}%`,
    }

    skeletonDOMAttributes(mainParams, skeleton, this.context)

    const helperParams = {}

    const trackParams = {
      className: classnames(
        'dnb-slider__track',
        currentState && `dnb-slider__state--${currentState}`
      ),
      onTouchStart: this.onClickHandler,
      onTouchStartCapture: this.onMouseDownHandler,
      onMouseDown: this.onClickHandler,
      onMouseDownCapture: this.onMouseDownHandler,
    }

    const thumbParams = {
      title,
      ...attributes,
      onBlur: this.onBlurHandler,
      onFocus: this.onFocusHandler,
    }

    if (label || hasHumanNumber) {
      helperParams['aria-labelledby'] = combineLabelledBy(
        helperParams,
        hasHumanNumber ? id + '-human' : null,
        label ? id + '-label' : null
      )
    }
    if (showStatus || suffix) {
      helperParams['aria-describedby'] = combineDescribedBy(
        helperParams,
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      )
    }

    const subtractParams = {}
    const addParams = {}

    if (typeof thumbParams['aria-hidden'] !== 'undefined') {
      helperParams['aria-hidden'] =
        addParams['aria-hidden'] =
        subtractParams['aria-hidden'] =
          thumbParams['aria-hidden']
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, thumbParams)
    validateDOMAttributes(null, trackParams)
    validateDOMAttributes(null, helperParams)

    const subtractButton = (
      <Button
        className="dnb-slider__button dnb-slider__button--subtract"
        variant="secondary"
        icon="subtract"
        size="small"
        aria-label={subtract_title.replace('%s', humanNumber)}
        on_click={this.onSubtractClickHandler}
        disabled={disabled}
        skeleton={skeleton}
      />
    )

    const addButton = (
      <Button
        className="dnb-slider__button dnb-slider__button--add"
        variant="secondary"
        icon="add"
        size="small"
        aria-label={add_title.replace('%s', humanNumber)}
        on_click={this.onAddClickHandler}
        disabled={disabled}
        skeleton={skeleton}
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
            skeleton={skeleton}
            label_direction={label_direction}
            sr_only={label_sr_only}
          />
        )}

        <span className="dnb-slider__wrapper">
          <AlignmentHelper />

          <FormStatus
            show={showStatus}
            id={id + '-form-status'}
            global_status_id={global_status_id}
            label={label}
            text_id={id + '-status'} // used for "aria-describedby"
            text={status}
            status={status_state}
            no_animation={status_no_animation}
            skeleton={skeleton}
            {...status_props}
          />

          <span className="dnb-slider__inner">
            {showButtons && (reverse ? addButton : subtractButton)}
            {/* @ts-ignore because of onTouchStart and onMouseDownCapture */}
            <span id={this._id} ref={this._trackRef} {...trackParams}>
              <span
                className="dnb-slider__thumb"
                style={inlineThumbStyles}
              >
                <input
                  type="range"
                  className="dnb-slider__button-helper"
                  min={min}
                  max={max}
                  step={_step}
                  value={value}
                  disabled={disabled}
                  // @ts-ignore orientation
                  orientation={vertical ? 'vertical' : 'horizontal'}
                  onChange={this.onRangeChangeHandler}
                  {...helperParams}
                />
                <Button
                  tabIndex="-1"
                  aria-hidden
                  variant="secondary"
                  disabled={disabled}
                  skeleton={skeleton}
                  onMouseDown={this.onMouseDownHandler}
                  {...thumbParams}
                />
              </span>
              <span
                className="dnb-slider__line dnb-slider__line__before"
                style={inlineStyleBefore}
              />
              <span className="dnb-slider__line dnb-slider__line__after" />
              {hasHumanNumber && (
                <span
                  id={id + '-human'}
                  className="dnb-sr-only"
                  aria-hidden
                >
                  {humanNumber}
                </span>
              )}
            </span>

            {showButtons && (reverse ? subtractButton : addButton)}

            {suffix && (
              <Suffix
                className="dnb-slider__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
                context={props}
              >
                {suffix}
              </Suffix>
            )}
          </span>
        </span>
      </span>
    )
  }
}

const percentToValue = (percent: number, min: number, max: number) =>
  ((max - min) * percent) / 100 + min

const roundToStep = (number: number, step: number) =>
  Math.round(number / step) * step

const getOffset = (node: HTMLElement) => {
  const { pageYOffset, pageXOffset } =
    typeof window !== 'undefined'
      ? window
      : { pageYOffset: 0, pageXOffset: 0 }
  const { left, top } = node.getBoundingClientRect()

  return {
    top: top + pageYOffset,
    left: left + pageXOffset,
  }
}

const getMousePosition = (event: MouseEvent & TouchEvent) => {
  if (event.changedTouches && event.changedTouches[0]) {
    return {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY,
    }
  }

  return {
    x: event.pageX,
    y: event.pageY,
  }
}

const calculatePercent = (
  node: HTMLElement,
  event: MouseEvent | TouchEvent | WheelEvent,
  isVertical: boolean,
  isReverted: boolean
) => {
  const { width, height } = node.getBoundingClientRect()
  const { top, left } = getOffset(node)
  const { x, y } = getMousePosition(event as MouseEvent & TouchEvent)

  const value = isVertical ? y - top : x - left
  const onePercent = (isVertical ? height : width) / 100

  return isReverted
    ? 100 - clamp(value / onePercent)
    : clamp(value / onePercent)
}

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max)

const createMockDiv = ({ width, height }) => {
  const div = document.createElement('div')
  Object.assign(div.style, {
    width: `${width}px`,
    height: `${height}px`,
  })
  // @ts-ignore
  div.getBoundingClientRect = () => ({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
  })
  return div
}

const formatNumber = (
  value: formatValue,
  opts: formatOptionParams = null
): formatReturnType => {
  if (opts) {
    return format(value, opts)
  }
  return value
}

export { Slider as OriginalComponent }
export default classWithCamelCaseProps(Slider)
