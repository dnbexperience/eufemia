import { IS_IOS } from '../../../shared/helpers'

/**
 * This is a helper function (hack),
 * that will evoke a good numeric keyboard (on iOS) that supports decimals and minus keys.
 */
export default class InputModeNumber {
  inputElement: HTMLInputElement
  labelElement: HTMLLabelElement
  timeout: NodeJS.Timer
  hasFocus: boolean
  focusEventName: string
  blurEventName: string

  setElement(element: HTMLInputElement) {
    if (!IS_IOS) {
      return // stop here
    }

    /**
     * Why use "mouseenter" and not "focus", "mousedown" or "touchstart"?
     * - Because "touchstart" has unexpected behavior when holding the finger down before releasing.
     * - And because "focus" and "mousedown" is too late, we then can't change the type anymore.
     */
    this.focusEventName = 'mouseenter'
    this.blurEventName = 'blur'

    if (!this.inputElement) {
      this.inputElement = element
      this.add()
      this.handleLabel()
    }
  }
  handleLabel() {
    const id = this.inputElement?.id
    if (!id) {
      return
    }

    this.labelElement = document.querySelector(
      `[for="${id}"]`
    ) as HTMLLabelElement

    if (this.labelElement) {
      this.labelElement.addEventListener('mousedown', this.onFocus)
    }
  }
  add() {
    const fnId = '__getCorrectCaretPosition'
    if (this.inputElement && !this.inputElement?.[fnId]) {
      this.inputElement[fnId] = true

      this.inputElement.addEventListener(this.focusEventName, this.onFocus)
      this.inputElement.addEventListener(this.blurEventName, this.onBlur)
    }
  }
  removeEvent(element: HTMLInputElement | HTMLLabelElement) {
    if (element) {
      element.removeEventListener(this.focusEventName, this.onFocus)
      element.removeEventListener(this.blurEventName, this.onBlur)
      element.removeEventListener('mousedown', this.onFocus)
    }
  }
  remove() {
    clearTimeout(this.timeout)

    this.removeEvent(this.inputElement)
    this.removeEvent(this.labelElement)

    delete this.inputElement
    delete this.labelElement
  }
  onBlur = () => {
    this.hasFocus = false
  }
  onFocus = () => {
    if (this.hasFocus || !this.inputElement) {
      return
    }

    this.hasFocus = true

    const type = this.inputElement.type

    if (type === 'number') {
      return // stop here
    }

    const value = this.inputElement.value
    const placeholder = this.inputElement.placeholder

    // To prevent flickering, show the placeholder, while the input value is "empty".
    this.inputElement.placeholder = value

    // Changing the type, will remove the current input value to show as "empty".
    this.inputElement.type = 'number'

    // Reset the input again
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.inputElement.type = type
      this.inputElement.value = value // set the input value
      this.inputElement.placeholder = placeholder
      this.inputElement['runCorrectCaretPosition']?.()
    }, 5)
  }
}
