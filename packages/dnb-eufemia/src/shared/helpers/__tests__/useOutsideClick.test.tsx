import { fireEvent, renderHook } from '@testing-library/react'
import useOutsideClick, {
  addOutsideClickListener,
} from '../useOutsideClick'
import type { OutsideClickOptions } from '../useOutsideClick'

describe('useOutsideClick', () => {
  let inside: HTMLElement
  let outside: HTMLElement

  beforeEach(() => {
    inside = document.createElement('button')
    outside = document.createElement('div')
    document.body.append(inside, outside)
  })

  afterEach(() => {
    inside.remove()
    outside.remove()
  })

  const renderOutsideClick = (
    options: Partial<OutsideClickOptions & { enabled: boolean }> = {}
  ) => {
    const onOutsideClick = vi.fn()
    const result = renderHook(
      (props: Partial<OutsideClickOptions & { enabled: boolean }>) =>
        useOutsideClick({
          enabled: true,
          isInside: (target) => inside.contains(target),
          onOutsideClick,
          ...props,
        }),
      { initialProps: options }
    )

    return { onOutsideClick, ...result }
  }

  const touchAt = (clientX: number, clientY: number) => {
    const touches = [{ clientX, clientY }]
    return { touches, changedTouches: touches }
  }

  const pressAt = (
    target: Element,
    {
      type = 'mousedown',
      ...position
    }: {
      type?: 'mousedown' | 'pointerdown'
      offsetX?: number
      offsetY?: number
      clientX?: number
      clientY?: number
    }
  ) => {
    const event = new MouseEvent(type, {
      bubbles: true,
      clientX: position.clientX,
      clientY: position.clientY,
    })
    Object.defineProperties(event, {
      offsetX: { value: position.offsetX ?? 0 },
      offsetY: { value: position.offsetY ?? 0 },
    })
    target.dispatchEvent(event)
  }

  // A 300 × 150 box with 15 px scrollbars and no borders
  const mockScrollbars = (
    element: HTMLElement,
    { scrollbarOnTheLeft = false } = {}
  ) => {
    element.style.overflowX = 'auto'
    element.style.overflowY = 'auto'

    const values = {
      offsetWidth: 300,
      offsetHeight: 150,
      clientWidth: 285,
      clientHeight: 135,
      clientLeft: scrollbarOnTheLeft ? 15 : 0,
    }
    for (const [key, value] of Object.entries(values)) {
      Object.defineProperty(element, key, { configurable: true, value })
    }
  }

  it('should call onOutsideClick on a mousedown outside', () => {
    const { onOutsideClick } = renderOutsideClick()

    fireEvent.mouseDown(inside)
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    fireEvent.mouseDown(outside)
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
    expect(onOutsideClick).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'mousedown' })
    )
  })

  it('should call onOutsideClick on a tap outside, but not when the touch scrolls', () => {
    const { onOutsideClick } = renderOutsideClick()

    fireEvent.touchStart(outside)
    fireEvent.touchMove(outside)
    fireEvent.touchEnd(outside)
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    fireEvent.touchStart(inside)
    fireEvent.touchEnd(inside)
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    fireEvent.touchStart(outside)
    fireEvent.touchEnd(outside)
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
    expect(onOutsideClick).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'touchend' })
    )
  })

  it('should call onOutsideClick on a tap outside where the finger moves a few pixels', () => {
    const { onOutsideClick } = renderOutsideClick()

    // Safari sends touchmove for this, but still counts it as a tap
    fireEvent.touchStart(outside, touchAt(100, 100))
    fireEvent.touchMove(outside, touchAt(103, 104))
    fireEvent.touchEnd(outside)

    expect(onOutsideClick).toHaveBeenCalledTimes(1)
    expect(onOutsideClick).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'touchend' })
    )
  })

  it('should not call onOutsideClick once the finger has moved more than 10 px from where the touch started', () => {
    const { onOutsideClick } = renderOutsideClick()

    // A slow scroll moves a few pixels per event, then the finger moves back
    fireEvent.touchStart(outside, touchAt(100, 100))
    for (const clientY of [104, 108, 112, 108, 104, 100]) {
      fireEvent.touchMove(outside, touchAt(100, clientY))
    }
    fireEvent.touchEnd(outside)

    expect(onOutsideClick).toHaveBeenCalledTimes(0)
  })

  it('should use the element where the touch started', () => {
    const { onOutsideClick } = renderOutsideClick()

    fireEvent.touchStart(inside)
    fireEvent.touchEnd(outside)

    expect(onOutsideClick).toHaveBeenCalledTimes(0)
  })

  it('should not count the mousedown that follows a tap outside', () => {
    vi.useFakeTimers()

    try {
      const { onOutsideClick } = renderOutsideClick()

      fireEvent.touchStart(outside)
      fireEvent.touchEnd(outside)
      fireEvent.mouseDown(outside)
      expect(onOutsideClick).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(1000)
      fireEvent.mouseDown(outside)
      expect(onOutsideClick).toHaveBeenCalledTimes(2)
    } finally {
      vi.useRealTimers()
    }
  })

  it.each(['mousedown', 'pointerdown'] as const)(
    'should count a mouse press right after a tap outside, with pressEvent %s',
    (pressEvent) => {
      const { onOutsideClick } = renderOutsideClick({ pressEvent })

      fireEvent.touchStart(outside)
      fireEvent.touchEnd(outside)
      expect(onOutsideClick).toHaveBeenCalledTimes(1)

      fireEvent.pointerDown(outside, { pointerType: 'mouse' })
      fireEvent.mouseDown(outside)
      expect(onOutsideClick).toHaveBeenCalledTimes(2)
    }
  )

  it('should call onOutsideClick when a released key is outside', () => {
    const { onOutsideClick } = renderOutsideClick()

    fireEvent.keyUp(inside, { key: 'Tab' })
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    fireEvent.keyUp(outside, { key: 'Tab' })
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
  })

  it('should count presses and released keys on the document and body when capture is true', () => {
    const { onOutsideClick } = renderOutsideClick({ capture: true })

    fireEvent.mouseDown(document)
    fireEvent.keyUp(document, { key: 'Tab' })
    fireEvent.keyUp(document.body, { key: 'Tab' })

    expect(onOutsideClick).toHaveBeenCalledTimes(3)
  })

  it('should check a bubbling press before listeners on the document, like React rendering into the document', () => {
    const child = document.createElement('span')
    inside.append(child)
    const replaceChild = () => child.remove()
    document.addEventListener('mousedown', replaceChild)

    try {
      const { onOutsideClick } = renderOutsideClick()

      fireEvent.mouseDown(child)

      expect(onOutsideClick).toHaveBeenCalledTimes(0)
    } finally {
      document.removeEventListener('mousedown', replaceChild)
    }
  })

  it('should only count the given keys', () => {
    const { onOutsideClick } = renderOutsideClick({ keys: ['Tab'] })

    fireEvent.keyUp(outside, { key: 'Enter' })
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    fireEvent.keyUp(outside, { key: 'Tab' })
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
  })

  it('should use the latest keys', () => {
    const { onOutsideClick, rerender } = renderOutsideClick({
      keys: ['Tab'],
    })

    rerender({ keys: ['Enter'] })

    fireEvent.keyUp(outside, { key: 'Tab' })
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    fireEvent.keyUp(outside, { key: 'Enter' })
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
  })

  it('should ignore the keyboard when keys is empty', () => {
    const { onOutsideClick } = renderOutsideClick({ keys: [] })

    fireEvent.keyUp(outside, { key: 'Tab' })

    expect(onOutsideClick).toHaveBeenCalledTimes(0)
  })

  it('should count a mouse pointerdown instead of a mousedown when pressEvent is pointerdown', () => {
    const { onOutsideClick } = renderOutsideClick({
      pressEvent: 'pointerdown',
    })

    fireEvent.mouseDown(outside)
    fireEvent.pointerDown(outside, { pointerType: 'touch' })
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    fireEvent.pointerDown(outside, { pointerType: 'mouse' })
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
  })

  it.each(['mousedown', 'pointerdown'] as const)(
    'should not count a press on a scrollbar of an element outside, but on its padding, with pressEvent %s',
    (pressEvent) => {
      const { onOutsideClick } = renderOutsideClick({ pressEvent })
      mockScrollbars(outside)

      pressAt(outside, { type: pressEvent, offsetX: 290, offsetY: 10 })
      pressAt(outside, { type: pressEvent, offsetX: 10, offsetY: 140 })
      expect(onOutsideClick).toHaveBeenCalledTimes(0)

      pressAt(outside, { type: pressEvent, offsetX: 10, offsetY: 10 })
      expect(onOutsideClick).toHaveBeenCalledTimes(1)
    }
  )

  it('should count a press on a text input outside, which reports a client size like a scrollbar', () => {
    const { onOutsideClick } = renderOutsideClick()

    // Measured in Chrome on a text input, which clips its content instead of scrolling
    const input = document.createElement('input')
    input.style.overflowX = 'clip'
    input.style.overflowY = 'clip'
    const values = {
      offsetWidth: 128,
      offsetHeight: 40,
      clientWidth: 32,
      clientHeight: 40,
      clientLeft: 40,
    }
    for (const [key, value] of Object.entries(values)) {
      Object.defineProperty(input, key, { configurable: true, value })
    }
    document.body.append(input)

    try {
      pressAt(input, { offsetX: 9, offsetY: 15 })
      pressAt(input, { offsetX: 100, offsetY: 15 })
      expect(onOutsideClick).toHaveBeenCalledTimes(2)
    } finally {
      input.remove()
    }
  })

  it('should not count a press on a scrollbar on the left side, like in a right-to-left element', () => {
    const { onOutsideClick } = renderOutsideClick()
    mockScrollbars(outside, { scrollbarOnTheLeft: true })

    pressAt(outside, { offsetX: 7, offsetY: 10 })
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    pressAt(outside, { offsetX: 290, offsetY: 10 })
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
  })

  it('should not count a press on the page scrollbar', () => {
    const html = document.documentElement
    const clientWidth = vi
      .spyOn(html, 'clientWidth', 'get')
      .mockReturnValue(window.innerWidth - 15)
    const clientHeight = vi
      .spyOn(html, 'clientHeight', 'get')
      .mockReturnValue(window.innerHeight - 15)

    try {
      const { onOutsideClick } = renderOutsideClick()

      pressAt(html, { clientX: window.innerWidth - 5, clientY: 100 })
      pressAt(html, { clientX: 100, clientY: window.innerHeight - 5 })
      expect(onOutsideClick).toHaveBeenCalledTimes(0)

      pressAt(html, { clientX: 100, clientY: 100 })
      expect(onOutsideClick).toHaveBeenCalledTimes(1)
    } finally {
      clientWidth.mockRestore()
      clientHeight.mockRestore()
    }
  })

  it('should only see stopped events when capture is true', () => {
    outside.addEventListener('mousedown', (event) =>
      event.stopPropagation()
    )

    const bubbling = renderOutsideClick()
    const capturing = renderOutsideClick({ capture: true })

    fireEvent.mouseDown(outside)

    expect(bubbling.onOutsideClick).toHaveBeenCalledTimes(0)
    expect(capturing.onOutsideClick).toHaveBeenCalledTimes(1)
  })

  it('should handle the events given by subscribe', () => {
    let relay: (event: Event) => void
    const unsubscribe = vi.fn()
    const subscribe = vi.fn((listener: (event: Event) => void) => {
      relay = listener
      return unsubscribe
    })

    const { onOutsideClick, unmount } = renderOutsideClick({ subscribe })

    const event = new MouseEvent('mousedown')
    Object.defineProperty(event, 'target', { value: outside })
    relay(event)

    expect(onOutsideClick).toHaveBeenCalledTimes(1)
    expect(onOutsideClick).toHaveBeenLastCalledWith(event)

    unmount()

    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })

  it('should stop listening when disabled or unmounted', () => {
    const { onOutsideClick, rerender, unmount } = renderOutsideClick()

    rerender({ enabled: false })
    fireEvent.mouseDown(outside)
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    rerender({ enabled: true })
    fireEvent.mouseDown(outside)
    expect(onOutsideClick).toHaveBeenCalledTimes(1)

    unmount()
    fireEvent.mouseDown(outside)
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
  })

  it('should use the latest callbacks without adding the listeners again', () => {
    const addEventListener = vi.spyOn(
      document.documentElement,
      'addEventListener'
    )
    const first = vi.fn()
    const second = vi.fn()

    const { rerender } = renderHook(
      ({ onOutsideClick }) =>
        useOutsideClick({
          enabled: true,
          isInside: () => false,
          onOutsideClick,
        }),
      { initialProps: { onOutsideClick: first } }
    )

    const callCount = addEventListener.mock.calls.length
    expect(addEventListener).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
      false
    )

    rerender({ onOutsideClick: second })
    fireEvent.mouseDown(outside)

    expect(addEventListener).toHaveBeenCalledTimes(callCount)
    expect(first).toHaveBeenCalledTimes(0)
    expect(second).toHaveBeenCalledTimes(1)

    addEventListener.mockRestore()
  })
})

describe('addOutsideClickListener', () => {
  it('should return a function that removes the listeners', () => {
    const onOutsideClick = vi.fn()
    const remove = addOutsideClickListener({
      isInside: () => false,
      onOutsideClick,
    })

    fireEvent.mouseDown(document.body)
    expect(onOutsideClick).toHaveBeenCalledTimes(1)

    remove()

    fireEvent.mouseDown(document.body)
    fireEvent.touchStart(document.body)
    fireEvent.touchEnd(document.body)
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
  })
})
