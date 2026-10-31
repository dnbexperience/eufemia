import { useEffect, useRef } from 'react'

export type OutsideClickEvent = MouseEvent | TouchEvent | KeyboardEvent

export type OutsideClickOptions = {
  /**
   * Returns `true` when the target counts as inside, like a trigger or the content.
   */
  isInside: (target: Node, event: Event) => boolean

  /**
   * Called on a press, a tap or a released key outside.
   */
  onOutsideClick: (event: OutsideClickEvent) => void

  /**
   * Listen in the capture phase, so events that are stopped from propagating still count.
   * Defaults to `false`.
   */
  capture?: boolean

  /**
   * The released keys that count, like `Tab` when it moves the focus out.
   * Defaults to all keys. An empty list ignores the keyboard.
   */
  keys?: Array<string>

  /**
   * The event that counts as a mouse or pen press. Defaults to `mousedown`.
   */
  pressEvent?: 'mousedown' | 'pointerdown'

  /**
   * Gets the events that a parent stops before they reach the document.
   */
  subscribe?: (listener: (event: Event) => void) => () => void
}

// A finger often moves a few pixels during a tap. Safari then sends touchmove,
// but still counts the touch as a tap. A touch that scrolls moves further.
const TAP_MOVE_TOLERANCE = 10 // CSS pixels from where the touch started

/**
 * Calls `onOutsideClick` when the user presses outside.
 * A tap counts, but a touch that scrolls does not.
 * Returns a function that removes the listeners.
 */
export function addOutsideClickListener({
  isInside,
  onOutsideClick,
  capture = false,
  keys,
  pressEvent = 'mousedown',
  subscribe,
}: OutsideClickOptions) {
  if (typeof document === 'undefined') {
    return () => undefined
  }

  let touchStartTarget: EventTarget | null = null
  let touchStartPoint: { x: number; y: number } | null = null
  let touchMoved = false
  let tapTimeStamp = -Infinity

  const check = (event: Event, target = event.target) => {
    if (!(target instanceof Node) || isInside(target, event)) {
      return false
    }

    onOutsideClick(event as OutsideClickEvent)
    return true
  }

  const handlePress = (event: Event) => {
    // A touch counts on touchend, as a tap
    if ((event as PointerEvent).pointerType === 'touch') {
      return // stop here
    }

    // Browsers follow a tap with a mousedown, which the tap already counted for
    if (event.timeStamp - tapTimeStamp < 1000) {
      return // stop here
    }

    check(event)
  }

  // A mouse or pen press after a tap counts, as only it comes with its own pointerdown
  const handlePointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'touch') {
      tapTimeStamp = -Infinity
    }
  }

  const handleTouchStart = (event: Event) => {
    const touch = (event as TouchEvent).changedTouches?.[0]
    touchMoved = false
    touchStartTarget = event.target
    touchStartPoint = touch ? { x: touch.clientX, y: touch.clientY } : null
  }

  const handleTouchMove = (event: Event) => {
    if (touchMoved) {
      return // stop here
    }

    const start = touchStartPoint
    const touches = Array.from((event as TouchEvent).touches ?? [])

    // Without positions to compare, any move counts
    touchMoved =
      !start ||
      touches.length === 0 ||
      touches.some(
        ({ clientX, clientY }) =>
          Math.hypot(clientX - start.x, clientY - start.y) >
          TAP_MOVE_TOLERANCE
      )
  }

  const handleTouchEnd = (event: Event) => {
    const target = touchStartTarget
    const moved = touchMoved
    touchStartTarget = null
    touchStartPoint = null
    touchMoved = false

    // No touchstart was seen, e.g. it was stopped in a nested Popover
    if (moved || !target) {
      return // stop here
    }

    if (check(event, target)) {
      tapTimeStamp = event.timeStamp
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (!keys || keys.includes(event.key)) {
      check(event)
    }
  }

  const root = document
  const touchOptions = { capture, passive: true }

  root.addEventListener('pointerdown', handlePointerDown, true)
  root.addEventListener(pressEvent, handlePress, capture)
  root.addEventListener('touchstart', handleTouchStart, touchOptions)
  root.addEventListener('touchmove', handleTouchMove, touchOptions)
  root.addEventListener('touchend', handleTouchEnd, touchOptions)
  root.addEventListener('keyup', handleKeyUp, capture)

  const unsubscribe = subscribe?.((event) => {
    if (event.type === 'touchstart') {
      handleTouchStart(event)
    } else {
      handlePress(event)
    }
  })

  return () => {
    unsubscribe?.()
    root.removeEventListener('pointerdown', handlePointerDown, true)
    root.removeEventListener(pressEvent, handlePress, capture)
    root.removeEventListener('touchstart', handleTouchStart, capture)
    root.removeEventListener('touchmove', handleTouchMove, capture)
    root.removeEventListener('touchend', handleTouchEnd, capture)
    root.removeEventListener('keyup', handleKeyUp, capture)
  }
}

/**
 * Calls `onOutsideClick` while `enabled` when the user presses outside.
 */
export default function useOutsideClick({
  enabled,
  ...options
}: OutsideClickOptions & {
  enabled: boolean
}) {
  const optionsRef = useRef(options)
  optionsRef.current = options

  const { capture, pressEvent, subscribe } = options

  useEffect(() => {
    if (!enabled) {
      return undefined // stop here
    }

    return addOutsideClickListener({
      capture,
      pressEvent,
      subscribe,
      isInside: (target, event) =>
        optionsRef.current.isInside(target, event),
      onOutsideClick: (event) => {
        // Read the keys here, so changing them does not add the listeners again
        const { keys, onOutsideClick } = optionsRef.current
        if (
          event.type === 'keyup' &&
          keys &&
          !keys.includes((event as KeyboardEvent).key)
        ) {
          return // stop here
        }

        onOutsideClick(event)
      },
    })
  }, [enabled, capture, pressEvent, subscribe])
}
