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
