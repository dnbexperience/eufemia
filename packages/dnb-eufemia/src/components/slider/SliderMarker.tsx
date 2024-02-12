import React, { useCallback } from 'react'
import { makeUniqueId } from '../../shared/component-helper'
import { useSliderProps } from './hooks/useSliderProps'
import { clamp, getFormattedNumber } from './SliderHelpers'
import Tooltip from '../tooltip/Tooltip'

export default function SliderMarker() {
  const { isReverse, isVertical, allProps } = useSliderProps()
  const { marker, min, max, numberFormat } = allProps

  const { value, text } = marker
  const getParams = useCallback(() => {
    const markerId = `slider-marker-${makeUniqueId()}`
    const { number, aria } = getFormattedNumber(value, numberFormat || {})

    let percent = clamp(((value - min) * 100) / (max - min))
    if (isReverse) {
      percent = 100 - percent
    }

    const params = {
      id: markerId,
      'aria-label': aria,
      tabIndex: 0,
      style: {
        [`${isVertical ? 'top' : 'left'}`]: `${percent}%`,
      },
      children: (
        <Tooltip targetSelector={`#${markerId}`}>{text || number}</Tooltip>
      ),
    }

    return params
  }, [isReverse, isVertical, max, min, numberFormat, text, value])

  if (!marker || !marker?.value) {
    return null
  }

  const params = getParams()

  return <mark className="dnb-slider__marker" {...params} />
}
