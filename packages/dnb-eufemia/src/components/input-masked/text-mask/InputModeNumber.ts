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
  _type: string
  _value: string
  _width: number
  _cssText: string
  _placeholder: string
  _selectionStart: number
  _selectionEnd: number

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
    this.reset()

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
      return // stop here
    }

    this.hasFocus = true

    const currentType = this.inputElement.type
    this._type =
      currentType && currentType !== 'undefined' ? currentType : 'text'

    if (this._type === 'number') {
      return // stop here
    }

    this._value = this.inputElement.value
    this._width = this.inputElement.offsetWidth
    this._cssText = this.inputElement.style.cssText
    this._placeholder = this.inputElement.placeholder
    this._selectionStart = this.inputElement.selectionStart
    this._selectionEnd = this.inputElement.selectionEnd

    // To prevent flickering, show the placeholder, while the input value is "empty".
    this.inputElement.placeholder = this._value

    // Changing the type, will remove the current input value to show as "empty".
    this.inputElement.type = 'number'

    // Hide steppers with pseudo-elements using CSS injection
    this.inputElement.classList.add('dnb-input-masked--hide-controls')

    // Keep the width the same as the input element
    this.inputElement.style.width = `${this._width}px`

    // Reset the input again
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.reset()
    }, 10) // Delay before changing the type back again.
  }
  reset = () => {
    if (!this.inputElement) {
      return // stop here
    }
    try {
      // Ensure we never set type to undefined
      const typeToRestore =
        this._type && this._type !== 'undefined' ? this._type : 'text'
      this.inputElement.type = typeToRestore
      this.inputElement.style.cssText = this._cssText // Because we did set a width, we need to reset the cssText
      this.inputElement.classList.remove('dnb-input-masked--hide-controls')
      // Only restore the previous value if no new value was entered
      if (
        this.inputElement.value === '' ||
        this.inputElement.value == null
      ) {
        this.inputElement.value = this._value
      }
      this.inputElement.placeholder = this._placeholder
      if (this._selectionStart > 0) {
        this.inputElement.selectionStart = this._selectionStart
        this.inputElement.selectionEnd = this._selectionEnd
      }
      this.inputElement['runCorrectCaretPosition']?.()
    } catch (error) {
      console.error(error)
    }
  }
}
