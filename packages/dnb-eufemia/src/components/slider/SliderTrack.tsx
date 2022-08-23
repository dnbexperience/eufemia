/* eslint-disable @typescript-eslint/ban-ts-comment */
import classnames from 'classnames'
import React from 'react'
import {
  dispatchCustomElementEvent,
  validateDOMAttributes,
} from '../../shared/component-helper'
import { useSliderEvents } from './hooks/useSliderEvents'
import { useSliderProps } from './hooks/useSliderProps'
import { clamp, formatNumber } from './SliderHelpers'

export function SliderMainTrack({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const { isMulti, value, allProps, trackRef, jumpedTimeout, thumbState } =
    useSliderProps()
  const { id, numberFormat, onInit } = allProps
  const { onTrackClickHandler, onThumbMouseDownHandler, removeEvents } =
    useSliderEvents()

  React.useEffect(() => {
    // onInit is deprecated
    if (typeof onInit === 'function' && !isMulti) {
      const obj = {
        value,
        number: null,
      }
      if (numberFormat) {
        obj.number = formatNumber(value as number, numberFormat)
      }
      dispatchCustomElementEvent(allProps, 'onInit', obj)
    }

    return () => {
      removeEvents()
      clearTimeout(jumpedTimeout.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const trackParams = {
    className: classnames(
      'dnb-slider__track',
      thumbState && `dnb-slider__state--${thumbState}`
    ),
    onTouchStart: onTrackClickHandler,
    onTouchStartCapture: onThumbMouseDownHandler,
    onMouseDown: onTrackClickHandler,
    onMouseDownCapture: onThumbMouseDownHandler,
  }

  validateDOMAttributes(null, trackParams)

  return (
    // @ts-ignore
    <span id={id} ref={trackRef} {...trackParams}>
      {children}
    </span>
  )
}

const trackObj = [
  ['right', 'left'],
  ['bottom', 'top'],
]

export function SliderTrackBefore() {
  const {
    values: origValues,
    isVertical,
    thumbIndex,
    allProps: { min, max },
  } = useSliderProps()

  const values = origValues.sort((a, b) => a - b)
  const isBetween = values.length >= 2

  if (isBetween && values[0] > values[values.length - 1]) {
    values.reverse()
  }

  const index = thumbIndex.current
  const upperValue = values[isBetween ? 0 : index > -1 ? index : 0]
  const upperPercent = isBetween
    ? clamp(((upperValue - min) * 100) / (max - min))
    : 0

  const lowerValue =
    values[isBetween ? values.length - 1 : index > -1 ? index : 0]
  const lowerPercent =
    100 - clamp(((lowerValue - min) * 100) / (max - min))

  const units = [
    trackObj[isVertical ? 1 : 0][0],
    trackObj[isVertical ? 1 : 0][1],
  ]

  const style: React.CSSProperties = {}
  style[units[0]] = `${lowerPercent}%`
  style[units[1]] = `${upperPercent}%`

  return (
    <span
      className="dnb-slider__line dnb-slider__line__before"
      style={style}
    />
  )
}

export function SliderTrackAfter() {
  return <span className="dnb-slider__line dnb-slider__line__after" />
}
