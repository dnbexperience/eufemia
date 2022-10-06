/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import {
  dispatchCustomElementEvent,
  warn,
} from '../../../shared/component-helper'
import {
  calculatePercent,
  createMockDiv,
  percentToValue,
} from '../SliderHelpers'
import { SliderContext } from '../SliderProvider'

export function useSliderEvents() {
  const {
    isReverse,
    emitChange,
    trackRef,
    isVertical,
    setShouldAnimate,
    setThumbState,
    setThumbIndex,
    allProps,
  } = React.useContext(SliderContext)
  const { min, max, onDragStart, onDragEnd } = allProps

  const onTrackMouseDownHandler = (event: MouseEvent | TouchEvent) => {
    onThumbMouseDownHandler(event)

    const percent = calculatePercent(trackRef.current, event, isVertical)

    emitChange(event, percentToValue(percent, min, max, isReverse))
    setShouldAnimate(true)
  }

  const onThumbMouseDownHandler = (
    event: MouseEvent | TouchEvent | React.SyntheticEvent
  ) => {
    const target = event.target as HTMLButtonElement

    setThumbIndex(parseFloat(target.dataset.index))
    setThumbState('activated')

    if (typeof onDragStart === 'function') {
      dispatchCustomElementEvent(allProps, 'onDragStart', {
        event,
      })
    }

    if (typeof document !== 'undefined') {
      try {
        document.body.addEventListener('touchmove', onBodyMouseMoveHandler)
        document.body.addEventListener('touchend', onBodyMouseUpHandler)
        document.body.addEventListener('mousemove', onBodyMouseMoveHandler)
        document.body.addEventListener('mouseup', onBodyMouseUpHandler)
      } catch (e) {
        warn(e)
      }
    }
  }

  const onThumbMouseUpHandler = () => {
    setThumbState('released')
  }

  const removeEvents = () => {
    if (typeof document !== 'undefined') {
      try {
        document.body.removeEventListener(
          'touchmove',
          onBodyMouseMoveHandler
        )
        document.body.removeEventListener('touchend', onBodyMouseUpHandler)
        document.body.removeEventListener(
          'mousemove',
          onBodyMouseMoveHandler
        )
        document.body.removeEventListener('mouseup', onBodyMouseUpHandler)
      } catch (e) {
        warn(e)
      }
    }
  }

  const onBodyMouseUpHandler = (event: MouseEvent | TouchEvent) => {
    removeEvents()

    setThumbIndex(-1)
    setThumbState('normal')

    if (typeof onDragEnd === 'function') {
      dispatchCustomElementEvent(allProps, 'onDragEnd', {
        event,
      })
    }
  }

  const onBodyMouseMoveHandler = (event: MouseEvent) => {
    event.preventDefault() // ensures correct cursor in Safari (dekstop)

    let elem = trackRef.current

    // we have to mock this for jsdom.
    if (process.env.NODE_ENV === 'test') {
      // @ts-ignore
      elem = createMockDiv(event.detail)
      // @ts-ignore
      event = event.detail
    }

    if (elem) {
      const percent = calculatePercent(elem, event, isVertical)
      emitChange(event, percentToValue(percent, min, max, isReverse))
    }

    setShouldAnimate(false)
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

  return {
    onThumbMouseDownHandler,
    onThumbMouseUpHandler,
    onTrackMouseDownHandler,
    onHelperChangeHandler,
    onHelperFocusHandler,
    removeEvents,
  }
}
