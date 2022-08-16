/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  format,
  formatOptionParams,
  formatValue,
  formatReturnType,
  formatReturnValue,
} from '../number-format/NumberUtils'

import type { ValueTypes } from './types'

export const percentToValue = (
  percent: number,
  min: number,
  max: number
) => {
  if (typeof min === 'string') {
    min = parseFloat(min)
  }
  if (typeof max === 'string') {
    max = parseFloat(max)
  }
  return ((max - min) * percent) / 100 + min
}

export const roundToStep = (number: number, step: number) =>
  Math.round(number / step) * step

export const getOffset = (node: HTMLElement) => {
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

export const getMousePosition = (event: MouseEvent & TouchEvent) => {
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

export const calculatePercent = (
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

  return Math.abs((isReverted ? 100 : 0) - clamp(value / onePercent))
}

export const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max)

export const roundValue = (value: number, step: number) => {
  return step > 0
    ? roundToStep(value, step)
    : parseFloat(parseFloat(String(value)).toFixed(3))
}

export const createMockDiv = ({ width, height }) => {
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

export const getUpdatedValues = (
  value: Array<number>,
  index: number,
  newValue: number
): ValueTypes => {
  return value.map((val, i) => {
    if (i === index) {
      val = newValue
    }
    return val
  })
}

export const closestIndex = (goal: number, array: Array<number>) => {
  const res = [...array].sort(
    (a, b) => Math.abs(goal - a) - Math.abs(goal - b)
  )[0]
  return array.findIndex((num) => num === res)
}

export const formatNumber = (
  value: formatValue,
  opts: formatOptionParams = null
): formatReturnType => {
  if (opts) {
    return format(value, opts)
  }
  return value
}

export const getHumanNumber = (
  value: number,
  number_format: formatOptionParams
) => {
  const num = value as number
  const { aria: humanNumber } = (
    number_format
      ? formatNumber(num, {
          ...(number_format || {}),
          returnAria: true,
        })
      : { aria: null }
  ) as formatReturnValue

  return String(humanNumber || value)
}
