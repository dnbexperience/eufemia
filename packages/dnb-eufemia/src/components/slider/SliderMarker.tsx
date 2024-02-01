import React from 'react'
import { makeUniqueId } from '../../shared/component-helper'
import { useSliderProps } from './hooks/useSliderProps'
import { clamp } from './SliderHelpers'
import Span from '../../elements/Span'
import Tooltip from '../tooltip/Tooltip'

export default function SliderMarker() {
  const { isReverse, isVertical, allProps } = useSliderProps()
  const { marker, min, max } = allProps
  if (!marker || !marker?.value) {
    return null
  }

  const { value, text } = marker
  let percent = clamp(((value - min) * 100) / (max - min))
  if (isReverse) {
    percent = 100 - percent
  }

  const style = {
    [`${isVertical ? 'top' : 'left'}`]: `${percent}%`,
  }

  if (!text) {
    return (
      <Span
        style={style}
        className="dnb-slider__marker"
        aria-label="Marker"
      />
    )
  }

  const markerId = `slider-marker-${makeUniqueId()}`
  return (
    <>
      <Span
        id={markerId}
        style={style}
        className="dnb-slider__marker"
        role="tooltip"
        aria-label={marker.text}
      />
      <Tooltip targetSelector={`#${markerId}`}>{text}</Tooltip>
    </>
  )
}
