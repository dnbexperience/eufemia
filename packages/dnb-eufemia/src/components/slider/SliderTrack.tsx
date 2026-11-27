import { useEffect } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { useSliderEvents } from './hooks/useSliderEvents'
import { useSliderProps } from './hooks/useSliderProps'
import { clamp } from './SliderHelpers'
import useMountEffect from '../../shared/helpers/useMountEffect'

export function SliderMainTrack({
  children,
}: {
  children: ReactNode | ReactNode[]
}) {
  const { allProps, trackRef, dragRef, animationTimeout } =
    useSliderProps()
  const { id, disabled, skeleton } = allProps
  const {
    onTrackMouseDownHandler,
    onTrackPointerDownHandler,
    removeEvents,
  } = useSliderEvents()

  // When disabled during a drag, the value stops changing, and the release still ends the drag
  useEffect(() => {
    dragRef.current.isDisabled = Boolean(disabled || skeleton)
  }, [dragRef, disabled, skeleton])

  useMountEffect(() => {
    return () => {
      removeEvents()
      clearTimeout(animationTimeout.current)
    }
  })

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- keyboard interaction is handled by the slider's button helpers
    <span
      id={id}
      ref={trackRef}
      className="dnb-slider__track"
      onPointerDown={onTrackPointerDownHandler}
      onTouchStart={onTrackMouseDownHandler}
      onMouseDown={onTrackMouseDownHandler}
    >
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
    isReverse,
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

  const style: CSSProperties = {}
  style[units[isReverse ? 1 : 0]] = `${lowerPercent}%`
  style[units[isReverse ? 0 : 1]] = `${upperPercent}%`

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
