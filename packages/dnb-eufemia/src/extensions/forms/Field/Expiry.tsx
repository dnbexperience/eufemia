import React, { useEffect, useRef } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import classnames from 'classnames'

type ExpiryPlaceholderType = 'dashes' | 'spaces' | 'letters' | 'none'

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
   * The placeholder which shows up once the field is empty. Can be set to `dashes`, `spaces`, `letters` or `none`
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
  none: '',
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

    const isFocusingOnPreviousElement =
      selectionStart === 0 && selectionEnd === 0
    const isFocusingOnNextElement =
      selectionStart === value.length && selectionEnd === value.length
    const fullTextSelected =
      selectionStart === 0 && selectionEnd === value.length

    // Fire default tab behaviour if user is tabbing forwards or backwards at the start or end of text in input field
    if (
      fullTextSelected ||
      (hasPressedShiftKey && isFocusingOnPreviousElement) ||
      (!hasPressedShiftKey && isFocusingOnNextElement)
    ) {
      return
    }

    // Preventing default here to make it possible to focus move between the numbers inside input
    event.preventDefault()

    const { start, end } = getSelectionRange({
      value,
      selectionStart,
      selectionEnd,
      hasPressedShiftKey,
    })

    input.setSelectionRange(start, end)
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

type ExpirySelectionRangeParams = {
  value?: string
  selectionStart: number
  selectionEnd: number
  hasPressedShiftKey: boolean
}

type ExpirySelectionRange = {
  start: number
  end: number
}

function getSelectionRange({
  value,
  selectionStart,
  selectionEnd,
  hasPressedShiftKey,
}: ExpirySelectionRangeParams): ExpirySelectionRange {
  const { start, end } = updateSelectionRange({
    selectionStart,
    selectionEnd,
    hasPressedShiftKey,
  })
  const selectedValue = value.substring(start, end)
  const hasSelectedDelimiter = checkIfDelimiterIsSelected(selectedValue)

  if (hasSelectedDelimiter) {
    return skipDivider({
      value,
      selectionStart,
      selectionEnd,
      hasPressedShiftKey,
    })
  }

  return { start, end }
}

function updateSelectionRange({
  selectionStart,
  selectionEnd,
  hasPressedShiftKey,
}: ExpirySelectionRangeParams): ExpirySelectionRange {
  if (hasPressedShiftKey) {
    return { start: selectionStart - 1, end: selectionStart }
  }

  if (selectionStart === 0 && selectionEnd === 0) {
    return { start: selectionStart, end: selectionStart + 1 }
  }

  return { start: selectionStart + 1, end: selectionStart + 2 }
}

function checkIfDelimiterIsSelected(selectedValue: string): boolean {
  return selectedValue === ' ' || selectedValue === '/'
}

function skipDivider({
  value,
  selectionStart,
  selectionEnd,
  hasPressedShiftKey,
}: ExpirySelectionRangeParams) {
  let start = selectionStart
  let end = selectionEnd
  let isDelimiterSelected = true

  while (isDelimiterSelected) {
    const newRange = updateSelectionRange({
      selectionStart: start,
      selectionEnd: end,
      hasPressedShiftKey,
    })

    const newSelectedValue = value.substring(newRange.start, newRange.end)

    start = newRange.start
    end = newRange.end

    isDelimiterSelected = checkIfDelimiterIsSelected(newSelectedValue)
  }

  return { start, end }
}

export default Expiry
