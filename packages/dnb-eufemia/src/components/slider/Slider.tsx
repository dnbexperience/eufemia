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
  validateDOMAttributes,
  getStatusState,
  combineLabelledBy,
  combineDescribedBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { includeValidProps } from '../../components/form-row/FormRowHelpers'
import { usePropsWithContext } from '../../shared/hooks'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { withCamelCaseProps } from '../../shared/helpers/withCamelCaseProps'
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

import type { IncludeCamelCase } from '../../shared/helpers/withCamelCaseProps'
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

export type SliderProps = {
  id?: string
  label?: React.ReactNode
  label_direction?: 'vertical' | 'horizontal'
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
  min?: number
  max?: number
  value?: number
  step?: number
  vertical?: boolean
  reverse?: boolean
  stretch?: boolean
  number_format?: formatOptionParams
  disabled?: boolean
  hide_buttons?: boolean
  skeleton?: boolean

  class?: string
  className?: string

  on_change?: (props: onChangeEventProps) => void
  on_drag_start?: (props: { event: MouseEvent | TouchEvent }) => void
  on_drag_end?: (props: { event: MouseEvent | TouchEvent }) => void

  /** @deprecated */
  on_init?: (props: Omit<onChangeEventProps, 'rawValue'>) => void

  /** @deprecated The Slider does not support mouse wheel  */
  use_scrollwheel?: boolean
} & ISpacingProps

const defaultProps = {
  status_state: 'error',
  add_title: '+',
  subtract_title: '−',
  min: 0,
  max: 100,
  value: -1,
}

function Slider(localProps: IncludeCamelCase<SliderProps>) {
  const context = React.useContext(Context)
  const allProps = usePropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context?.getTranslation(localProps).Slider,
    includeValidProps(
      context?.FormRow,

      /**
       * Exclude some props
       */
      {
        vertical: null,
      }
    ),
    context?.Slider
  )

  const [_id] = React.useState(makeUniqueId)
  if (!allProps.id) {
    allProps.id = _id
  }

  const {
    step,
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
    number_format,
    skeleton,
    max,
    min,
    disabled,
    className,
    id,
    on_init,
    on_change,
    on_drag_start,
    on_drag_end,
    vertical: _vertical,
    reverse: _reverse,
    class: _className,
    value: _value,

    ...attributes // Find a DOM element to forwards props too when multi buttons are supported
  } = allProps

  const trackRef = React.useRef<HTMLElement>()

  const [value, setValue] = React.useState(_value)
  const [currentState, setCurrentState] = React.useState('initial')
  const [vertical] = React.useState(isTrue(_vertical))
  const [reverse] = React.useState(
    vertical ? !isTrue(_reverse) : isTrue(_reverse)
  )

  /**
   * Deprecated
   */
  if (allProps.use_scrollwheel) {
    warn('use_scrollwheel is not supported anymore!')
  }

  const onFocusHandler = () => {
    setCurrentState('focused')
  }

  const onBlurHandler = () => {
    setCurrentState('normal')
  }

  const onClickHandler = (event: MouseEvent | TouchEvent) => {
    const percent = calculatePercent(
      trackRef.current,
      event,
      vertical,
      reverse
    )

    const value = percentToValue(percent, min, max)
    emitChange(event, value)
    setJumpedState()
  }

  const onSubtractClickHandler = (event: MouseEvent | TouchEvent) => {
    emitChange(event, clamp(value - (step || 1), min, max))
  }
  const onAddClickHandler = (event: MouseEvent | TouchEvent) => {
    emitChange(event, clamp(value + (step || 1), min, max))
  }

  const onTouchEndHandler = (event: TouchEvent) => onMouseUpHandler(event)
  const onMouseDownHandler = (event: React.SyntheticEvent) => {
    if (typeof document !== 'undefined') {
      try {
        document.body.addEventListener('touchmove', onTouchMoveHandler)
        document.body.addEventListener('touchend', onTouchEndHandler)
        document.body.addEventListener('mousemove', onMouseMoveHandler)
        document.body.addEventListener('mouseup', onMouseUpHandler)
      } catch (e) {
        warn(e)
      }
    }

    setCurrentState('activated')

    if (typeof on_drag_start === 'function') {
      dispatchCustomElementEvent(allProps, 'on_drag_start', {
        event,
      })
    }
  }
  const onMouseUpHandler = (event: MouseEvent | TouchEvent) => {
    if (typeof document !== 'undefined') {
      try {
        document.body.removeEventListener('touchmove', onTouchMoveHandler)
        document.body.removeEventListener('touchend', onTouchEndHandler)
        document.body.removeEventListener('mousemove', onMouseMoveHandler)
        document.body.removeEventListener('mouseup', onMouseUpHandler)
      } catch (e) {
        warn(e)
      }
    }

    setCurrentState('normal')

    if (typeof on_drag_end === 'function') {
      dispatchCustomElementEvent(allProps, 'on_drag_end', {
        event,
      })
    }
  }

  const onRangeChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.currentTarget.value)
    setValue(value)
    const emitEvent = event as unknown
    emitChange(emitEvent as MouseEvent, value)
  }

  const onTouchMoveHandler = (event: MouseEvent) =>
    onMouseMoveHandler(event)
  const onMouseMoveHandler = (event: MouseEvent) => {
    let elem = trackRef.current

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

    if (elem) {
      const percent = calculatePercent(elem, event, vertical, reverse)
      const value = percentToValue(percent, min, max)

      emitChange(event, value)
    }
  }

  const emitChange = (
    event: MouseEvent | TouchEvent,
    rawValue: number
  ) => {
    if (disabled || isTrue(skeleton)) {
      return
    }

    const currentValue = roundValue(rawValue, step)

    if (currentValue > -1 && rawValue !== value) {
      if (typeof on_change === 'function') {
        const obj: onChangeEventProps = {
          value: currentValue,
          rawValue,
          raw_value: rawValue, // deprecated
          event,
          number: null,
        }
        if (number_format) {
          obj.number = formatNumber(currentValue, number_format)
        }

        dispatchCustomElementEvent(allProps, 'on_change', obj)
      }

      setValue(rawValue)
    }
  }

  const jumpedTimeout = React.useRef<NodeJS.Timeout>()
  const setJumpedState = () => {
    setCurrentState('jumped')
    clearTimeout(jumpedTimeout.current)
    jumpedTimeout.current = setTimeout(
      () => setCurrentState('normal'),
      100
    )
  }

  React.useEffect(() => {
    setValue(_value)
  }, [_value])

  React.useEffect(() => {
    // on_init is deprecated
    if (typeof on_init === 'function') {
      const obj = {
        value,
        number: null,
      }
      if (number_format) {
        obj.number = formatNumber(value, number_format)
      }
      dispatchCustomElementEvent(allProps, 'on_init', obj)
    }

    return () => {
      if (typeof document !== 'undefined') {
        try {
          document.body.removeEventListener(
            'touchmove',
            onTouchMoveHandler
          )
          document.body.removeEventListener('touchend', onTouchEndHandler)
          document.body.removeEventListener(
            'mousemove',
            onMouseMoveHandler
          )
          document.body.removeEventListener('mouseup', onMouseUpHandler)
        } catch (e) {
          warn(e)
        }
      }
      clearTimeout(jumpedTimeout.current)
    }
  }, [])

  const percent = clamp(((value - min) * 100) / (max - min))

  const inlineStyleBefore = {
    [`${vertical ? 'height' : 'width'}`]: `${percent}%`,
  }
  const inlineThumbStyles = {
    [`${vertical ? 'top' : 'left'}`]: `${percent}%`,
  }

  const { aria: humanNumber } = (
    number_format
      ? formatNumber(value, {
          ...(number_format || {}),
          returnAria: true,
        })
      : { aria: null }
  ) as formatReturnValue
  const hasHumanNumber = Boolean(humanNumber)

  const showStatus = getStatusState(status)
  const showButtons = !isTrue(hide_buttons)

  const mainParams = {
    className: classnames(
      'dnb-slider',
      reverse && 'dnb-slider--reverse',
      vertical && 'dnb-slider--vertical',
      isTrue(stretch) && 'dnb-slider--stretch',
      label && label_direction && `dnb-slider__label--${label_direction}`,
      showStatus && 'dnb-slider__form-status',
      status && `dnb-slider__status--${status_state}`,
      'dnb-form-component',
      createSkeletonClass(null, skeleton),
      createSpacingClasses(allProps),
      className,
      _className
    ),
  }

  const helperParams = {}
  const subtractParams = {}
  const addParams = {}

  const trackParams = {
    className: classnames(
      'dnb-slider__track',
      currentState && `dnb-slider__state--${currentState}`
    ),
    onTouchStart: onClickHandler,
    onTouchStartCapture: onMouseDownHandler,
    onMouseDown: onClickHandler,
    onMouseDownCapture: onMouseDownHandler,
  }

  const thumbParams = {
    title,
    onBlur: onBlurHandler,
    onFocus: onFocusHandler,
    ...(attributes as Record<string, unknown>), // Do not forwards props to button for future compatibility on multi-button slider
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

  if (typeof thumbParams['aria-hidden'] !== 'undefined') {
    helperParams['aria-hidden'] =
      addParams['aria-hidden'] =
      subtractParams['aria-hidden'] =
        thumbParams['aria-hidden']
  }

  // also used for code markup simulation
  validateDOMAttributes(allProps, thumbParams)
  validateDOMAttributes(null, trackParams)
  validateDOMAttributes(null, helperParams)

  skeletonDOMAttributes(mainParams, skeleton, context)

  const subtractButton = showButtons && (
    <Button
      className="dnb-slider__button dnb-slider__button--subtract"
      variant="secondary"
      icon="subtract"
      size="small"
      aria-label={subtract_title?.replace('%s', humanNumber)}
      on_click={onSubtractClickHandler}
      disabled={disabled}
      skeleton={skeleton}
      {...subtractParams}
    />
  )

  const addButton = showButtons && (
    <Button
      className="dnb-slider__button dnb-slider__button--add"
      variant="secondary"
      icon="add"
      size="small"
      aria-label={add_title?.replace('%s', humanNumber)}
      on_click={onAddClickHandler}
      disabled={disabled}
      skeleton={skeleton}
      {...addParams}
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
          <span id={id} ref={trackRef} {...trackParams}>
            <span className="dnb-slider__thumb" style={inlineThumbStyles}>
              <input
                type="range"
                className="dnb-slider__button-helper"
                min={min}
                max={max}
                step={step}
                value={value}
                disabled={disabled}
                // @ts-ignore orientation
                orientation={vertical ? 'vertical' : 'horizontal'}
                onChange={onRangeChangeHandler}
                {...helperParams}
              />

              <Button
                tabIndex={-1}
                aria-hidden
                variant="secondary"
                disabled={disabled}
                skeleton={skeleton}
                onMouseDown={onMouseDownHandler}
                {...thumbParams}
              />
            </span>

            <span
              className="dnb-slider__line dnb-slider__line__before"
              style={inlineStyleBefore}
            />

            <span className="dnb-slider__line dnb-slider__line__after" />

            {hasHumanNumber && (
              <span id={id + '-human'} className="dnb-sr-only" aria-hidden>
                {humanNumber}
              </span>
            )}
          </span>

          {showButtons && (reverse ? subtractButton : addButton)}

          {suffix && (
            <Suffix
              className="dnb-slider__suffix"
              id={id + '-suffix'} // used for "aria-describedby"
              context={allProps}
            >
              {suffix}
            </Suffix>
          )}
        </span>
      </span>
    </span>
  )
}

const percentToValue = (percent: number, min: number, max: number) => {
  if (typeof min === 'string') {
    min = parseFloat(min)
  }
  if (typeof max === 'string') {
    max = parseFloat(max)
  }
  return ((max - min) * percent) / 100 + min
}

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
  event: MouseEvent | TouchEvent,
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

const roundValue = (value: number, step: number) => {
  return step > 0
    ? roundToStep(value, step)
    : parseFloat(parseFloat(String(value)).toFixed(3))
}

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
export default withCamelCaseProps(Slider)
