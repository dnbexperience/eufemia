import { useMemo } from 'react'
import type { ReactNode } from 'react'
import useId from '../../shared/helpers/useId'
import { useSliderProps } from './hooks/useSliderProps'
import { clamp, getFormattedNumber } from './SliderHelpers'
import Tooltip from '../tooltip/Tooltip'

type SliderMarkerProps = {
  value: number
  text: ReactNode
}

export default function SliderMarker({ value, text }: SliderMarkerProps) {
  const { isReverse, isVertical, allProps } = useSliderProps()
  const { min, max, numberFormat } = allProps
  const markerId = useId()

  const params = useMemo(() => {
    const { number, aria } = getFormattedNumber(value, numberFormat || {})

    let percent = clamp(((value - min) * 100) / (max - min))
    if (isReverse) {
      percent = 100 - percent
    }

    return {
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
  }, [
    isReverse,
    isVertical,
    markerId,
    max,
    min,
    numberFormat,
    text,
    value,
  ])

  if (!value) {
    return null
  }

  return <mark className="dnb-slider__marker" {...params} />
}
