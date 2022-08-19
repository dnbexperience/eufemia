import React from 'react'
import {
  combineDescribedBy,
  combineLabelledBy,
  validateDOMAttributes,
} from '../../shared/component-helper'
import Button from '../button/Button'
import { useSliderEvents } from './hooks/useSliderEvents'
import { useSliderProps } from './hooks/useSliderProps'
import { clamp, getHumanNumber } from './SliderHelpers'

export function SliderThumb() {
  const {
    setThumbState,
    emitChange,
    setThumbIndex,
    values,
    thumbIndex,
    isVertical,
    showStatus,
    attributes,
    allProps,
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
    number_format,
  } = allProps
  const { onThumbMouseDownHandler } = useSliderEvents()

  const onThumbFocusHandler = () => {
    setThumbState('focused')
  }
  const onThumbBlurHandler = () => {
    setThumbState('normal')
  }

  const onHelperChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const emitEvent = event as unknown
    emitChange(
      emitEvent as MouseEvent,
      parseFloat(event.currentTarget.value)
    )
  }

  const onHelperFocusHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement
    setThumbIndex(parseFloat(target.dataset.index))
  }

  const thumbParams = {
    onBlur: onThumbBlurHandler,
    onFocus: onThumbFocusHandler,
    ...(attributes as Record<string, unknown>), // Do not forwards props to button for future compatibility on multi-button slider
  }

  const helperParams = {}

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

  validateDOMAttributes(null, helperParams)
  validateDOMAttributes(allProps, thumbParams)

  return (
    <>
      {values.map((value, i) => {
        const index = thumbIndex.current
        const percent = clamp(((value - min) * 100) / (max - min))

        const style: React.CSSProperties = {
          zIndex: index === i ? 4 : 3,
          [`${isVertical ? 'top' : 'left'}`]: `${percent}%`,
        }

        const humanNumber = getHumanNumber(value, number_format)

        return (
          <React.Fragment key={i}>
            <span className="dnb-slider__thumb" style={style}>
              <input
                type="range"
                className="dnb-slider__button-helper"
                min={min}
                max={max}
                step={step}
                value={value}
                disabled={disabled}
                onChange={onHelperChangeHandler}
                onFocus={onHelperFocusHandler}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={humanNumber ? humanNumber : undefined}
                aria-orientation={isVertical ? 'vertical' : 'horizontal'}
                data-index={i}
                {...helperParams}
              />

              <Button
                element="span"
                type=""
                variant="secondary"
                disabled={disabled}
                skeleton={skeleton}
                onMouseDown={onThumbMouseDownHandler}
                data-index={i}
                {...thumbParams}
              />
            </span>
          </React.Fragment>
        )
      })}
    </>
  )
}
