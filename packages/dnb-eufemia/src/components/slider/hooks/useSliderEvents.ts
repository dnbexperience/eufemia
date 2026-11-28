import { useContext } from 'react'
import type {
  FormEvent,
  SyntheticEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from 'react'
import {
  dispatchCustomElementEvent,
  warn,
} from '../../../shared/component-helper'
import { calculatePercent, percentToValue } from '../SliderHelpers'
import { SliderContext } from '../SliderProvider'

export function useSliderEvents() {
  const {
    isReverse,
    isMulti,
    emitChange,
    trackRef,
    isVertical,
    setShouldAnimate,
    setThumbState,
    setThumbIndex,
    allProps,
    dragRef,
  } = useContext(SliderContext)
  const { min, max, disabled, skeleton, onDragStart, onDragEnd } = allProps

  const onTrackPointerDownHandler = () => {
    dragRef.current.isTouch = false
  }

  const onTrackMouseDownHandler = (
    event: MouseEvent | TouchEvent | ReactMouseEvent | ReactTouchEvent
  ) => {
    if (!onThumbMouseDownHandler(event)) {
      return // stop here
    }

    const nativeEvent = 'nativeEvent' in event ? event.nativeEvent : event
    const percent = calculatePercent(
      trackRef.current,
      nativeEvent as MouseEvent | TouchEvent,
      isVertical
    )

    emitChange(
      nativeEvent as MouseEvent | TouchEvent,
      percentToValue(percent, min, max, isReverse)
    )
    setShouldAnimate(true)
  }

  const onThumbMouseDownHandler = (
    event: MouseEvent | TouchEvent | SyntheticEvent
  ) => {
    const drag = dragRef.current

    if (disabled || skeleton) {
      return false
    }

    // Browsers follow a tap with mouse events, which must not start a second drag.
    // The next pointerdown, or the ignored mousedown, clears the flag for a real mouse.
    if (event.type === 'touchstart') {
      drag.isTouch = true
    } else if (drag.isTouch) {
      drag.isTouch = false
      return false
    }

    const target = event.target as HTMLButtonElement

    setThumbIndex(parseFloat(target.dataset.index))
    setThumbState('activated')

    // A press during a drag, like one that bubbles from a thumb to the track, continues it
    const isNewDrag = !drag.removeEvents
    removeEvents()

    if (isNewDrag && typeof onDragStart === 'function') {
      dispatchCustomElementEvent(allProps, 'onDragStart', {
        event,
      })
    }

    // Listen on the window, so a release outside the body also ends the drag
    if (typeof window !== 'undefined') {
      try {
        window.addEventListener('touchmove', onBodyMouseMoveHandler)
        window.addEventListener('touchend', onBodyMouseUpHandler)
        window.addEventListener('touchcancel', onBodyMouseUpHandler)
        window.addEventListener('mousemove', onBodyMouseMoveHandler)
        window.addEventListener('mouseup', onBodyMouseUpHandler)

        drag.removeEvents = () => {
          window.removeEventListener('touchmove', onBodyMouseMoveHandler)
          window.removeEventListener('touchend', onBodyMouseUpHandler)
          window.removeEventListener('touchcancel', onBodyMouseUpHandler)
          window.removeEventListener('mousemove', onBodyMouseMoveHandler)
          window.removeEventListener('mouseup', onBodyMouseUpHandler)
        }
      } catch (e) {
        warn('Slider: Failed to add drag event listeners:', e)
      }
    }

    return true
  }

  const onThumbMouseUpHandler = () => {
    setThumbState('released')
  }

  const removeEvents = () => {
    const drag = dragRef.current

    try {
      drag.removeEvents?.()
    } catch (e) {
      warn('Slider: Failed to remove drag event listeners:', e)
    }

    drag.removeEvents = undefined
    drag.hasPressedButton = false
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

  const onBodyMouseMoveHandler = (event: MouseEvent | TouchEvent) => {
    const drag = dragRef.current

    // A release over an iframe or outside the window may never reach the page
    if (event.type === 'mousemove') {
      if ((event as MouseEvent).buttons) {
        drag.hasPressedButton = true
      } else if (drag.hasPressedButton) {
        onBodyMouseUpHandler(event)
        return // stop here
      }
    }

    if (drag.isDisabled) {
      return // stop here
    }

    event.preventDefault() // ensures correct cursor in Safari (desktop)

    const elem = trackRef.current

    if (elem) {
      const percent = calculatePercent(elem, event, isVertical)
      emitChange(event, percentToValue(percent, min, max, isReverse))
    }

    setShouldAnimate(false)
  }

  const onHelperChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const emitEvent = event as unknown
    const currentValue = parseFloat(event.currentTarget.value)
    const currentIndex = parseFloat(event.currentTarget.dataset.index)

    emitChange(emitEvent as MouseEvent, currentValue)

    if (isMulti) {
      const thumbs: NodeListOf<HTMLInputElement> =
        trackRef.current.querySelectorAll(
          'input.dnb-slider__button-helper'
        )

      Array.from(thumbs).some((element, indexA) => {
        if (indexA !== currentIndex) {
          const value = parseFloat(element.value)
          if (
            (indexA > currentIndex && currentValue >= value) ||
            (indexA < currentIndex && currentValue <= value)
          ) {
            element.focus()
            return true
          }
        }

        return false
      })
    }
  }

  const onHelperFocusHandler = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    setThumbIndex(parseFloat(target.dataset.index))
  }

  return {
    onThumbMouseDownHandler,
    onThumbMouseUpHandler,
    onTrackMouseDownHandler,
    onTrackPointerDownHandler,
    onHelperChangeHandler,
    onHelperFocusHandler,
    removeEvents,
  }
}
