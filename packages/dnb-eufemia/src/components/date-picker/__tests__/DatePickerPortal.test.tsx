/**
 * DatePickerPortal Tests
 *
 * Verifies the debounce fix: the debounced position handler must be
 * created once and reused across resize/scroll events, not recreated on
 * each invocation (which would reset the debounce timer and break cleanup).
 */

import { useRef } from 'react'
import { render, act } from '@testing-library/react'
import DatePickerPortal from '../DatePickerPortal'

describe('DatePickerPortal', () => {
  let targetElement: HTMLElement
  let getBoundingClientRectSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    targetElement = document.createElement('div')
    document.body.appendChild(targetElement)

    getBoundingClientRectSpy = vi
      .spyOn(targetElement, 'getBoundingClientRect')
      .mockReturnValue({
        top: 100,
        left: 50,
        width: 200,
        height: 40,
        right: 250,
        bottom: 140,
        x: 50,
        y: 100,
        toJSON: () => ({}),
      } as DOMRect)
  })

  afterEach(() => {
    document.body.removeChild(targetElement)
    vi.restoreAllMocks()
  })

  function Wrapper({
    skipPortal = false,
    alignment = undefined as 'left' | 'center' | 'right' | undefined,
  } = {}) {
    const ref = useRef<HTMLElement>(targetElement)
    return (
      <DatePickerPortal
        skipPortal={skipPortal}
        alignment={alignment}
        targetElementRef={ref}
      >
        <div data-testid="portal-content">content</div>
      </DatePickerPortal>
    )
  }

  it('registers resize and scroll listeners on mount', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')

    render(<Wrapper />)

    const resizeCalls = addSpy.mock.calls.filter(
      ([type]) => type === 'resize'
    )
    const scrollCalls = addSpy.mock.calls.filter(
      ([type]) => type === 'scroll'
    )

    expect(resizeCalls).toHaveLength(1)
    expect(scrollCalls).toHaveLength(1)
  })

  it('removes event listeners on unmount using the same reference that was added', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(<Wrapper />)

    const addedResizeListener = addSpy.mock.calls.find(
      ([type]) => type === 'resize'
    )?.[1]
    const addedScrollListener = addSpy.mock.calls.find(
      ([type]) => type === 'scroll'
    )?.[1]

    unmount()

    const removedResizeListener = removeSpy.mock.calls.find(
      ([type]) => type === 'resize'
    )?.[1]
    const removedScrollListener = removeSpy.mock.calls.find(
      ([type]) => type === 'scroll'
    )?.[1]

    expect(addedResizeListener).toBeDefined()
    expect(addedScrollListener).toBeDefined()
    expect(addedResizeListener).toBe(removedResizeListener)
    expect(addedScrollListener).toBe(removedScrollListener)
  })

  it('keeps the same listener reference after re-renders', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const { rerender, unmount } = render(<Wrapper alignment="left" />)

    const addedListener = addSpy.mock.calls.find(
      ([type]) => type === 'resize'
    )?.[1]

    rerender(<Wrapper alignment="right" />)
    rerender(<Wrapper alignment="left" />)

    unmount()

    const removedListeners = removeSpy.mock.calls
      .filter(([type]) => type === 'resize')
      .map(([, fn]) => fn)

    // Exactly one removeEventListener call for resize
    expect(removedListeners).toHaveLength(1)

    // Same reference as what was originally added — proves debounce was not recreated
    expect(removedListeners[0]).toBe(addedListener)
  })

  it('does not register listeners when skipPortal is true', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')

    render(<Wrapper skipPortal />)

    const resizeCalls = addSpy.mock.calls.filter(
      ([type]) => type === 'resize'
    )
    const scrollCalls = addSpy.mock.calls.filter(
      ([type]) => type === 'scroll'
    )

    expect(resizeCalls).toHaveLength(0)
    expect(scrollCalls).toHaveLength(0)
  })

  it('updates portal position after the debounce delay on resize', () => {
    vi.useFakeTimers()

    render(<Wrapper />)

    const portal = document.querySelector(
      '.dnb-date-picker__portal'
    ) as HTMLElement

    // Initial position from getBoundingClientRect mock (scrollY/scrollX = 0)
    expect(portal).toHaveStyle({ top: '100px', left: '50px' })

    // Simulate element moving to a new position
    getBoundingClientRectSpy.mockReturnValue({
      top: 200,
      left: 100,
      width: 200,
      height: 40,
      right: 300,
      bottom: 240,
      x: 100,
      y: 200,
      toJSON: () => ({}),
    } as DOMRect)

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    // Position must not update immediately — debounce is pending
    expect(portal).toHaveStyle({ top: '100px', left: '50px' })

    act(() => {
      vi.advanceTimersByTime(200)
    })

    // Position updates after the debounce delay
    expect(portal).toHaveStyle({ top: '200px', left: '100px' })

    vi.useRealTimers()
  })

  it('updates portal position after the debounce delay on scroll', () => {
    vi.useFakeTimers()

    render(<Wrapper />)

    const portal = document.querySelector(
      '.dnb-date-picker__portal'
    ) as HTMLElement

    expect(portal).toHaveStyle({ top: '100px' })

    getBoundingClientRectSpy.mockReturnValue({
      top: 300,
      left: 80,
      width: 200,
      height: 40,
      right: 280,
      bottom: 340,
      x: 80,
      y: 300,
      toJSON: () => ({}),
    } as DOMRect)

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(portal).toHaveStyle({ top: '100px' })

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(portal).toHaveStyle({ top: '300px' })

    vi.useRealTimers()
  })

  it('reflects updated alignment after re-render when a resize fires', () => {
    vi.useFakeTimers()

    const { rerender } = render(<Wrapper alignment="left" />)

    // Switch alignment to right before the resize event
    rerender(<Wrapper alignment="right" />)

    act(() => {
      window.dispatchEvent(new Event('resize'))
      vi.advanceTimersByTime(200)
    })

    const portal = document.querySelector(
      '.dnb-date-picker__portal'
    ) as HTMLElement

    // alignment='right': left = rect.left + rect.width + scrollX = 50 + 200 + 0 = 250
    expect(portal).toHaveStyle({ left: '250px' })

    vi.useRealTimers()
  })
})
