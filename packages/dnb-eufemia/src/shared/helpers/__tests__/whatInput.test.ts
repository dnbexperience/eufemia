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

  it('should treat all non-modifier keys as keyboard input by default', () => {
    whatInput.specificKeys([])

    dispatchMouse()

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    )
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'keyboard'
    )

    dispatchMouse()

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'a', bubbles: true })
    )
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'keyboard'
    )
  })

  describe('touch and mouse switching', () => {
    const dispatchPointer = (
      type: 'pointerdown' | 'pointermove' | 'pointerup',
      pointerType: 'touch' | 'mouse' | 'pen',
      screenX = 0
    ) =>
      window.dispatchEvent(
        new PointerEvent(type, { bubbles: true, pointerType, screenX })
      )

    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-01-01'))
      dispatchKeyboard()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('restores mouse hover intent after continuous mouse movement following touch', () => {
      dispatchPointer('pointerdown', 'touch')

      for (let screenX = 1; screenX <= 3; screenX++) {
        vi.advanceTimersByTime(50)
        dispatchPointer('pointermove', 'mouse', screenX)

        expect(
          document.documentElement.getAttribute('data-whatintent')
        ).toBe('touch')
      }

      vi.advanceTimersByTime(50)
      dispatchPointer('pointermove', 'mouse', 4)

      expect(
        document.documentElement.getAttribute('data-whatintent')
      ).toBe('mouse')

      dispatchPointer('pointerdown', 'touch')

      expect(
        document.documentElement.getAttribute('data-whatintent')
      ).toBe('touch')
    })

    it('ignores compatibility mouse events without extending the touch delay', () => {
      dispatchPointer('pointerdown', 'touch')
      vi.advanceTimersByTime(100)
      dispatchMouse()

      expect(document.documentElement.getAttribute('data-whatinput')).toBe(
        'touch'
      )
      expect(
        document.documentElement.getAttribute('data-whatintent')
      ).toBe('touch')

      vi.advanceTimersByTime(100)
      dispatchMouse()

      expect(document.documentElement.getAttribute('data-whatinput')).toBe(
        'mouse'
      )
      expect(
        document.documentElement.getAttribute('data-whatintent')
      ).toBe('mouse')

      dispatchPointer('pointerdown', 'touch')

      expect(document.documentElement.getAttribute('data-whatinput')).toBe(
        'touch'
      )
      expect(
        document.documentElement.getAttribute('data-whatintent')
      ).toBe('touch')
    })

    it('restarts the delay when touch movement continues', () => {
      dispatchPointer('pointerdown', 'touch')
      vi.advanceTimersByTime(150)
      dispatchPointer('pointermove', 'touch', 10)
      vi.advanceTimersByTime(50)
      dispatchPointer('pointermove', 'mouse', 20)

      expect(
        document.documentElement.getAttribute('data-whatintent')
      ).toBe('touch')

      vi.advanceTimersByTime(150)
      dispatchPointer('pointermove', 'mouse', 30)

      expect(
        document.documentElement.getAttribute('data-whatintent')
      ).toBe('mouse')
    })

    it.each(['touch', 'pen'] as const)(
      'ignores compatibility mouse events after a held %s is released',
      (pointerType) => {
        dispatchPointer('pointerdown', pointerType)
        vi.advanceTimersByTime(300)
        dispatchPointer('pointerup', pointerType)

        for (const delay of [0, 100]) {
          vi.advanceTimersByTime(delay)
          dispatchMouse()

          expect(
            document.documentElement.getAttribute('data-whatinput')
          ).toBe('touch')
          expect(
            document.documentElement.getAttribute('data-whatintent')
          ).toBe('touch')
        }

        vi.advanceTimersByTime(100)
        dispatchMouse()

        expect(
          document.documentElement.getAttribute('data-whatinput')
        ).toBe('mouse')
        expect(
          document.documentElement.getAttribute('data-whatintent')
        ).toBe('mouse')
      }
    )
  })
})

describe('whatInput with a focused form field', () => {
  const dispatchPointer = (pointerType: 'touch' | 'mouse') =>
    window.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, pointerType })
    )
  const dispatchKey = (key: string) =>
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true })
    )
  const intent = () =>
    document.documentElement.getAttribute('data-whatintent')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01'))
    document.body.innerHTML =
      '<input id="field" /><textarea></textarea><select><option /></select>'
  })

  afterEach(() => {
    whatInput.specificKeys([])
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('keeps the intent while typing in the field', () => {
    dispatchPointer('mouse')
    document.getElementById('field').focus()

    dispatchKey('a')
    dispatchKey('ArrowLeft')

    expect(intent()).toBe('mouse')
  })

  it.each(['input', 'textarea', 'select'])(
    'follows a touch pointer while the %s still has focus',
    (selector) => {
      dispatchPointer('mouse')
      ;(document.querySelector(selector) as HTMLElement).focus()
      dispatchKey('a')

      dispatchPointer('touch')

      expect(intent()).toBe('touch')
    }
  )

  it('follows a mouse pointer while the field still has focus', () => {
    dispatchPointer('touch')
    document.getElementById('field').focus()
    vi.advanceTimersByTime(300)

    dispatchPointer('mouse')

    expect(intent()).toBe('mouse')
  })

  it('follows Tab from the field to show keyboard focus', () => {
    dispatchPointer('mouse')
    document.getElementById('field').focus()
    dispatchKey('a')

    dispatchKey('Tab')

    expect(intent()).toBe('keyboard')
  })

  it('follows Shift+Tab from the field to show keyboard focus', () => {
    dispatchPointer('mouse')
    document.getElementById('field').focus()
    dispatchKey('a')

    dispatchKey('Shift')
    expect(intent()).toBe('mouse')

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
      })
    )

    expect(intent()).toBe('keyboard')
  })

  it('ignores Tab when specificKeys excludes it', () => {
    whatInput.specificKeys(['Enter'])
    dispatchPointer('mouse')
    document.getElementById('field').focus()

    dispatchKey('Tab')

    expect(intent()).toBe('mouse')
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
