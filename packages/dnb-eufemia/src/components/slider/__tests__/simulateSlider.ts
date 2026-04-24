import { act, fireEvent } from '@testing-library/react'

const mockDOMRect = (width: number, height: number): DOMRect =>
  ({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }) as DOMRect

const zeroDOMRect = () => mockDOMRect(0, 0)

export const resetMouseSimulation = () => {
  act(() => {
    document.body.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    )
  })
}

export const simulateMouseMove = ({
  pageX = 0,
  pageY = 0,
  width = 100,
  height = 10,
}: {
  pageX?: number
  pageY?: number
  width?: number
  height?: number
}) => {
  act(() => {
    const track = document.querySelector('.dnb-slider__track')

    // Fire mouseUp on body to properly trigger onBodyMouseUpHandler
    // and remove stale event listeners
    document.body.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    )

    // Reset getBoundingClientRect so mouseDown doesn't compute a valid
    // percent from a leftover mock
    track.getBoundingClientRect = zeroDOMRect

    fireEvent.mouseDown(track)

    // Mock getBoundingClientRect on the track element after mouseDown
    // so that only the mousemove event computes a valid percent
    track.getBoundingClientRect = () => mockDOMRect(width, height)

    const mouseMove = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
    })
    Object.defineProperties(mouseMove, {
      pageX: { value: pageX },
      pageY: { value: pageY },
    })
    document.body.dispatchEvent(mouseMove)

    // Reset getBoundingClientRect to zero after dispatching so that any
    // subsequent mouseDown events (e.g. from fireEvent.mouseDown on a
    // thumb) that bubble to the track don't compute a valid percent
    track.getBoundingClientRect = zeroDOMRect
  })
}
