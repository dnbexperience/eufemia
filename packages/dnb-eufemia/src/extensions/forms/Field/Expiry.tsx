import React, { useEffect, useRef } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import classnames from 'classnames'

type ExpiryPlaceholderType = 'dashes' | 'spaces' | 'letters'

export type ExpiryValue = {
  /**
   * Month value from input
   * Example: 08
   */
  month: string
  /**
   * Year value from input
   * Example: 24
   */
  year: string
  /**
   * The raw unchanged input value
   * Example: 0824
   */
  raw: string
  /**
   * Formatted input value that includes delimiter shown in placeholder
   * Example: 08/24
   */
  formatted: string
}

type ExpiryProps = Omit<
  StringComponentProps,
  'placeholder' | 'onChange'
> & {
  /**
   * The placeholder which shows up once the field is empty. Can be set to `dashes`, `spaces` or `letters`
   * Default: `dashes`
   */
  placeholder?: ExpiryPlaceholderType
  /**
   * Set to `true` in case the `placeholder` has to be kept during focus.
   * Default: `true`.
   */
  keep_placeholder?: boolean
  /**
   * Fires when input is fully filled out. Has an object as parameter, consisting of `month`, `year`, `raw` and `formatted` values.
   */
  onChange?: ({ month, year, raw, formatted }: ExpiryValue) => void
}

const placeholders: Record<ExpiryPlaceholderType, string> = {
  dashes: '-- / --',
  spaces: '   /   ',
  letters: 'mm / yy',
}

function Expiry({
  placeholder = 'dashes',
  keep_placeholder = true,
  ...props
}: ExpiryProps) {
  const inputRef = useRef(null)

  // Probably better to replace this with an onKey prop for StringComponent?
  useEffect(() => {
    const inputElement = inputRef.current as HTMLInputElement

    if (!inputElement) {
      return
    }

    inputElement.addEventListener('keydown', onTab)

    return () => {
      inputElement.removeEventListener('keydown', onTab)
    }
  }, [])

  function onChange(value: string) {
    if (!value || value.length < 4) {
      return
    }

    const month = `${value.charAt(0)}${value.charAt(1)}`
    const year = `${value.charAt(2)}${value.charAt(3)}`
    const formatted = `${month}/${year}`

    if (props?.onChange) {
      props.onChange({ month, year, raw: value, formatted })
    }
  }

  function onTab(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
      return
    }

    const input = event.target as HTMLInputElement
    const hasPressedShiftKey = event.shiftKey
    const { value, selectionStart, selectionEnd } = input

    const isCaretAtStart = selectionStart === 0 && selectionEnd === 0

    const isCaretAtEnd =
      selectionStart === value.length && selectionEnd === value.length

    const hasSelectedFullValue =
      selectionStart === 0 && selectionEnd === value.length

    // Month is the first two characters of the value
    const monthRange = { start: 0, end: 2 }
    // Year is the last two characters of the value
    const yearRange = { start: value.length - 2, end: value.length }

    const hasSelectedMonth =
      selectionStart === monthRange.start &&
      selectionEnd === monthRange.end

    const hasSelectedYear =
      selectionStart === yearRange.start && selectionEnd === yearRange.end

    const isTabbingForward =
      !hasPressedShiftKey && (isCaretAtEnd || hasSelectedYear)
    const isTabbingBackwards =
      hasPressedShiftKey && (isCaretAtStart || hasSelectedMonth)

    // Fire default tab behaviour if user is tabbing forwards or backwards at the start or end of text in input field
    if (isTabbingForward || isTabbingBackwards) {
      return
    }

    // Preventing default here to make it possible to focus move between the numbers inside input
    event.preventDefault()

    // Select the month value if user is tabbing while full value is selected
    if (hasSelectedFullValue) {
      return input.setSelectionRange(monthRange.start, monthRange.end)
    }

    // Select year value if user is tabbing backwards while caret is at the end of input
    if (hasPressedShiftKey && isCaretAtEnd) {
      return input.setSelectionRange(yearRange.start, yearRange.end)
    }

    // Select month value if user is tabbing backwards while year value is selected
    if (hasPressedShiftKey && hasSelectedYear) {
      return input.setSelectionRange(monthRange.start, monthRange.end)
    }

    // Select year value if user is tabbing forward while month value is selected
    if (hasSelectedMonth) {
      return input.setSelectionRange(yearRange.start, yearRange.end)
    }

    // Select month value if user is tabbing forward while caret is at the start of input
    if (isCaretAtStart) {
      return input.setSelectionRange(monthRange.start, monthRange.end)
    }
  }

  return (
    <StringComponent
      {...props}
      className={classnames('dnb-forms-field-expiry', props.className)}
      width="stretch"
      mask={[/[0-1]/, /[1-9]/, ' ', '/', ' ', /\d/, /\d/]}
      placeholder={placeholders[placeholder]}
      keep_placeholder={keep_placeholder}
      onChange={onChange}
      innerRef={inputRef}
    />
  )
}

export default Expiry
