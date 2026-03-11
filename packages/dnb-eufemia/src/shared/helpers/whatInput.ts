/**
 * Internal input detection helper.
 *
 * Replaces the `what-input` package. Tracks the current input method
 * (keyboard, mouse, or touch) and sets `data-whatinput` and
 * `data-whatintent` attributes on `<html>` so CSS can style based on
 * the users input type.
 */

type InputType = 'initial' | 'keyboard' | 'mouse' | 'touch'

let currentInput: InputType = 'initial'
let currentIntent: InputType = 'initial'

let currentTimestamp = Date.now()

/** Keys to ignore – modifier keys that accompany pointer interactions. */
const ignoreMap = [
  16, // shift
  17, // control
  18, // alt
  91, // left ⌘ / Windows key
  93, // right ⌘ / Windows menu
]

/** When non-empty only these keys trigger "keyboard" input detection. */
let specificMap: number[] = []

let isScrolling = false
const mousePos = { x: 0, y: 0 }

const formInputs = ['input', 'select', 'textarea']

let isSetUp = false

function setUp() {
  if (isSetUp) {
    return // stop here
  }
  isSetUp = true

  const passiveCapture = { passive: true, capture: true }

  if (window.PointerEvent) {
    window.addEventListener('pointerdown', setInput, true)
    window.addEventListener('pointermove', setIntent, passiveCapture)
  } else {
    window.addEventListener('mousedown', setInput, true)
    window.addEventListener('mousemove', setIntent, passiveCapture)

    if ('ontouchstart' in window) {
      window.addEventListener('touchstart', setInput, passiveCapture)
      window.addEventListener('touchend', setInput, true)
    }
  }

  window.addEventListener('wheel', setIntent, passiveCapture)
  window.addEventListener('keydown', setInput, true)
  window.addEventListener('keyup', setInput, true)

  doUpdate('input')
  doUpdate('intent')
}

function resolvePointerType(event: PointerEvent): InputType {
  if (event.pointerType === 'pen' || event.pointerType === 'touch') {
    return 'touch'
  }
  return 'mouse'
}

function resolveInputType(event: Event): InputType {
  const type = event.type
  if (type === 'keydown' || type === 'keyup') {
    return 'keyboard'
  }
  if (type === 'mousedown') {
    return 'mouse'
  }
  if (type === 'touchstart' || type === 'touchend') {
    return 'touch'
  }
  if (type === 'pointerdown') {
    return resolvePointerType(event as PointerEvent)
  }
  if (type === 'pointermove') {
    return resolvePointerType(event as PointerEvent)
  }
  if (type === 'mousemove' || type === 'wheel') {
    return 'mouse'
  }
  return 'mouse'
}

/**
 * Prevent touch from being overridden by mouse events that fire
 * shortly after a touch event (within 200 ms).
 */
function validateTouch(value: InputType): boolean {
  const now = Date.now()
  const isFalsePositive =
    value === 'mouse' &&
    currentInput === 'touch' &&
    now - currentTimestamp < 200

  currentTimestamp = now
  return isFalsePositive
}

function setInput(event: Event) {
  const value = resolveInputType(event)
  const eventKey = (event as KeyboardEvent).which

  if (value === 'keyboard' && eventKey) {
    const ignoreMatch =
      specificMap.length === 0 && !ignoreMap.includes(eventKey)
    const specificMatch =
      specificMap.length > 0 && specificMap.includes(eventKey)

    if (!ignoreMatch && !specificMatch) {
      return // stop here
    }
  }

  if (validateTouch(value)) {
    return // stop here
  }

  if (currentInput !== value) {
    currentInput = value
    doUpdate('input')
  }

  if (currentIntent !== value) {
    // Preserve intent for keyboard interaction with form fields
    const activeElem = document.activeElement
    if (
      activeElem?.nodeName &&
      (!formInputs.includes(activeElem.nodeName.toLowerCase()) ||
        (activeElem.nodeName.toLowerCase() === 'button' &&
          !activeElem.closest('form')))
    ) {
      currentIntent = value
      doUpdate('intent')
    }
  }
}

function detectScrolling(event: MouseEvent) {
  if (mousePos.x !== event.screenX || mousePos.y !== event.screenY) {
    isScrolling = false
    mousePos.x = event.screenX
    mousePos.y = event.screenY
  } else {
    isScrolling = true
  }
}

function setIntent(event: Event) {
  const value = resolveInputType(event)

  if (event.type === 'pointermove' || event.type === 'mousemove') {
    detectScrolling(event as MouseEvent)
  }

  const isWheelEvent =
    event.type === 'wheel' ||
    event.type === 'mousewheel' ||
    event.type === 'DOMMouseScroll'

  if (
    ((!isScrolling && !validateTouch(value)) ||
      (isScrolling && isWheelEvent)) &&
    currentIntent !== value
  ) {
    currentIntent = value
    doUpdate('intent')
  }
}

function doUpdate(which: 'input' | 'intent') {
  document.documentElement.setAttribute(
    `data-what${which}`,
    which === 'input' ? currentInput : currentIntent
  )
}

// -- Public API -------------------------------------------------------

/**
 * Set which specific keys should trigger "keyboard" input detection.
 * When set, only matching key codes count as keyboard input.
 * Pass e.g. `[9]` for Tab-only, or `[9, 37, 39]` for Tab + arrow keys.
 */
function specificKeys(arr: number[]) {
  specificMap = arr
}

/** Returns the current input type. */
function ask(opt?: 'intent' | 'input'): InputType {
  return opt === 'intent' ? currentIntent : currentInput
}

// -- Init -------------------------------------------------------------

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  setUp()
}

const whatInput = { specificKeys, ask }

export default whatInput
