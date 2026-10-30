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

  it('should call onOutsideClick when a released key is outside', () => {
    const { onOutsideClick } = renderOutsideClick()

    fireEvent.keyUp(inside, { key: 'Tab' })
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    fireEvent.keyUp(outside, { key: 'Tab' })
    expect(onOutsideClick).toHaveBeenCalledTimes(1)
  })

  it('should count presses and released keys on the document and body', () => {
    const { onOutsideClick } = renderOutsideClick()

    fireEvent.mouseDown(document)
    fireEvent.keyUp(document, { key: 'Tab' })
    fireEvent.keyUp(document.body, { key: 'Tab' })

    expect(onOutsideClick).toHaveBeenCalledTimes(3)
  })

  it('should only count the given keys', () => {
    const { onOutsideClick } = renderOutsideClick({ keys: ['Tab'] })

    fireEvent.keyUp(outside, { key: 'Enter' })
    expect(onOutsideClick).toHaveBeenCalledTimes(0)

    fireEvent.keyUp(outside, { key: 'Tab' })
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
