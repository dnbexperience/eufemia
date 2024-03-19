import React from 'react'
import {
  combineDescribedBy,
  combineLabelledBy,
  validateDOMAttributes,
  warn,
} from '../../shared/component-helper'
import Button from '../button/Button'
import Tooltip from '../tooltip/Tooltip'
import { useSliderEvents } from './hooks/useSliderEvents'
import { useSliderProps } from './hooks/useSliderProps'
import { clamp, getFormattedNumber } from './SliderHelpers'

export function SliderThumb() {
  const { values } = useSliderProps()

  return (
    <>
      {values.map((value, i) => {
        return <Thumb key={i} value={value} currentIndex={i} />
      })}
    </>
  )
}

type ThumbProps = {
  value: number
  currentIndex: number
}

function Thumb({ value, currentIndex }: ThumbProps) {
  const {
    thumbIndex,
    isVertical,
    isReverse,
    showStatus,
    attributes,
    allProps,
    shouldAnimate,
  } = useSliderProps()

  const {
    id,
    label,
    min,
    max,
    step,
    skeleton,
    disabled,
    suffix,
    numberFormat,
    tooltip,
    alwaysShowTooltip,
  } = allProps

  const index = thumbIndex.current
  let percent = clamp(((value - min) * 100) / (max - min))

  if (isReverse) {
    percent = 100 - percent
  }

  const style = {
    zIndex: index === currentIndex ? 4 : 3,
    [`${isVertical ? 'top' : 'left'}`]: `${percent}%`,
  } as React.CSSProperties

  const { number, aria } = getFormattedNumber(value, numberFormat)

  const [showTooltip, setShowTooltip] = React.useState(false)
  const onMouseEnterHandler = () => {
    setShowTooltip(true)
  }
  const onMouseLeaveHandler = () => {
    setShowTooltip(false)
    try {
      elemRef.current.dispatchEvent(new Event('mouseleave'))
    } catch (e) {
      warn(e)
    }
  }

  const {
    onThumbMouseDownHandler,
    onThumbMouseUpHandler,
    onHelperChangeHandler,
    onHelperFocusHandler,
  } = useSliderEvents()

  const helperParams: Record<string, unknown> = {}

  if (label) {
    helperParams['aria-labelledby'] = combineLabelledBy(
      helperParams,
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

  const thumbParams = attributes as Record<string, unknown>

  if (tooltip) {
    thumbParams.onMouseEnter = onMouseEnterHandler
    thumbParams.onMouseLeave = onMouseLeaveHandler
    thumbParams.onTouchStart = onMouseEnterHandler
    thumbParams.onTouchEnd = onMouseLeaveHandler
    helperParams.onBlur = onMouseLeaveHandler
    helperParams.onFocus = (event) => {
      onHelperFocusHandler(event)
      onMouseEnterHandler()
      try {
        elemRef.current.dispatchEvent(new Event('mouseenter'))
      } catch (e) {
        warn(e)
      }
    }
  }
  validateDOMAttributes(allProps, thumbParams) // because we send along rest attributes

  const elemRef = React.useRef<HTMLElement>()

  return (
    <span className="dnb-slider__thumb" style={style}>
      <input
        id={`${id}-thumb-${currentIndex}`}
        type="range"
        className="dnb-slider__button-helper"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={onHelperChangeHandler}
        onFocus={onHelperFocusHandler}
        onMouseDown={onThumbMouseDownHandler}
        onMouseUp={onThumbMouseUpHandler}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={aria ? aria : undefined}
        aria-orientation={isVertical ? 'vertical' : 'horizontal'}
        data-index={currentIndex}
        {...helperParams}
      />

      <Button
        id={`${id}-button-${currentIndex}`}
        element="span"
        type="" // avoid getting type="button"
        variant="secondary"
        disabled={disabled}
        skeleton={skeleton}
        innerRef={elemRef}
        {...thumbParams}
      />

      {tooltip && (
        <Tooltip
          key={`group-${currentIndex}`}
          targetElement={elemRef}
          active={Boolean(showTooltip || alwaysShowTooltip)}
          showDelay={1}
          hideDelay={300}
        >
          {number || value}
          {
            shouldAnimate /* Use "shouldAnimate" only in order to update the position after the thumb animation */
          }
        </Tooltip>
      )}
    </span>
  )
}
