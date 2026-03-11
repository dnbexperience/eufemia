import whatInput from '../whatInput'

const dispatchMouse = () =>
  window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

const dispatchKeyboard = (which = 9) =>
  window.dispatchEvent(
    new KeyboardEvent('keydown', { which, bubbles: true })
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

    // Shift key (16) should be ignored
    window.dispatchEvent(
      new KeyboardEvent('keydown', { which: 16, bubbles: true })
    )
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'mouse'
    )
  })

  it('should respect specificKeys setting', () => {
    whatInput.specificKeys([9])

    // Set to keyboard first so mouse transition is detected
    dispatchKeyboard()
    dispatchMouse()
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'mouse'
    )

    // Key 65 ("a") should not trigger keyboard because only 9 is in specificKeys
    window.dispatchEvent(
      new KeyboardEvent('keydown', { which: 65, bubbles: true })
    )
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'mouse'
    )

    // Tab (9) should trigger keyboard
    dispatchKeyboard()
    expect(document.documentElement.getAttribute('data-whatinput')).toBe(
      'keyboard'
    )

    // Reset
    whatInput.specificKeys([])
  })

  it('should return current input via ask()', () => {
    dispatchKeyboard()
    expect(whatInput.ask()).toBe('keyboard')

    dispatchMouse()
    expect(whatInput.ask()).toBe('mouse')
  })

  it('should return current intent via ask("intent")', () => {
    // Set keyboard first so mouse transition is detected for intent
    dispatchKeyboard()
    dispatchMouse()
    expect(whatInput.ask('intent')).toBe('mouse')
  })
})
