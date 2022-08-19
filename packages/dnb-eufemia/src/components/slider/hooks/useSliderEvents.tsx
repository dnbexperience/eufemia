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
    emitChange,
    trackRef,
    isVertical,
    isReverse,
    setJumpedState,
    setThumbState,
    setThumbIndex,
    allProps,
  } = React.useContext(SliderContext)
  const { min, max, on_drag_start, on_drag_end } = allProps

  const onTrackClickHandler = (event: MouseEvent | TouchEvent) => {
    const percent = calculatePercent(
      trackRef.current,
      event,
      isVertical,
      isReverse
    )

    emitChange(event, percentToValue(percent, min, max))
    setJumpedState()
  }

  const onThumbMouseDownHandler = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLButtonElement

    setThumbIndex(parseFloat(target.dataset.index))
    setThumbState('activated')

    if (typeof on_drag_start === 'function') {
      dispatchCustomElementEvent(allProps, 'on_drag_start', {
        event,
      })
    }

    if (typeof document !== 'undefined') {
      try {
        document.body.addEventListener(
          'touchmove',
          onTrackTouchMoveHandler
        )
        document.body.addEventListener('touchend', onTrackTouchEndHandler)
        document.body.addEventListener(
          'mousemove',
          onTrackMouseMoveHandler
        )
        document.body.addEventListener('mouseup', onTrackMouseUpHandler)
      } catch (e) {
        warn(e)
      }
    }
  }

  const onTrackTouchEndHandler = (event: TouchEvent) =>
    onTrackMouseUpHandler(event)

  const removeEvents = () => {
    if (typeof document !== 'undefined') {
      try {
        document.body.removeEventListener(
          'touchmove',
          onTrackTouchMoveHandler
        )
        document.body.removeEventListener(
          'touchend',
          onTrackTouchEndHandler
        )
        document.body.removeEventListener(
          'mousemove',
          onTrackMouseMoveHandler
        )
        document.body.removeEventListener('mouseup', onTrackMouseUpHandler)
      } catch (e) {
        warn(e)
      }
    }
  }

  const onTrackMouseUpHandler = (event: MouseEvent | TouchEvent) => {
    removeEvents()

    setThumbIndex(-1)
    setThumbState('normal')

    if (typeof on_drag_end === 'function') {
      dispatchCustomElementEvent(allProps, 'on_drag_end', {
        event,
      })
    }
  }

  const onTrackTouchMoveHandler = (event: MouseEvent) =>
    onTrackMouseMoveHandler(event)
  const onTrackMouseMoveHandler = (event: MouseEvent) => {
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
      const percent = calculatePercent(elem, event, isVertical, isReverse)
      emitChange(event, percentToValue(percent, min, max))
    }
  }

  return {
    onThumbMouseDownHandler,
    onTrackClickHandler,
    // onTrackTouchMoveHandler,
    // onTrackMouseMoveHandler,
    // onTrackTouchEndHandler,
    // onTrackMouseUpHandler,
    removeEvents,
  }
}
