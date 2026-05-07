import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import whatInput from '../whatInput'

const dispatchMouse = () =>
  window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

const dispatchKeyboard = (key = 'Tab') =>
  window.dispatchEvent(
    new KeyboardEvent('keydown', { key, bubbles: true })
  )

describe('whatInput', () => {
  it('should set data-whatinput to keyboard on keydown', () => {
    dispatchKeyboard()

    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'keyboard'
    )
  })

  it('should set data-whatinput to mouse on mousedown', () => {
    dispatchMouse()

    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'mouse'
    )
  })

  it('should not change to keyboard for ignored modifier keys', () => {
    dispatchMouse()
    // First go to keyboard so mouse transition is detected
    dispatchKeyboard()
    dispatchMouse()
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'mouse'
    )

    // Shift key should be ignored
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Shift', bubbles: true })
    )
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'mouse'
    )
  })

  it('should respect specificKeys setting', () => {
    whatInput.specificKeys(['Tab'])

    // Set to keyboard first so mouse transition is detected
    dispatchKeyboard()
    dispatchMouse()
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'mouse'
    )

    // Key "a" should not trigger keyboard because only "Tab" is in specificKeys
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', bubbles: true })
    )
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'mouse'
    )

    // Tab should trigger keyboard
    dispatchKeyboard()
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'keyboard'
    )

    // Reset
    whatInput.specificKeys([])
  })
})

describe('whatInput deferred setup', () => {
  const originalNodeEnv = process.env.NODE_ENV

  beforeEach(() => {
    vi.resetModules()
    document.documentElement.removeAttribute('data-whatinput')
    document.documentElement.removeAttribute('data-whatintent')
  })

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('defers setup via requestIdleCallback when not in test mode', async () => {
    process.env.NODE_ENV = 'production'

    const ric = vi.fn()
    vi.stubGlobal('requestIdleCallback', ric)

    await import('../whatInput')

    expect(ric).toHaveBeenCalledTimes(1)
    expect(
      document.documentElement.getAttribute('data-whatinput')
    ).toBeNull()

    // Fire the deferred callback
    ric.mock.calls[0][0]()

    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'initial'
    )
  })

  it('falls back to setTimeout when requestIdleCallback is unavailable', async () => {
    process.env.NODE_ENV = 'production'

    vi.stubGlobal('requestIdleCallback', undefined)
    vi.useFakeTimers()

    await import('../whatInput')

    expect(
      document.documentElement.getAttribute('data-whatinput')
    ).toBeNull()

    vi.runAllTimers()

    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'initial'
    )
  })

  it('sets up synchronously in test mode', async () => {
    await import('../whatInput')

    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'initial'
    )
  })
})
