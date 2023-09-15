import { useEffect, useRef } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'

type ExpiryPlaceholderType = 'dashes' | 'spaces' | 'letters'

export type ExpiryValue = {
  month: string
  year: string
  raw: string
  formatted: string
}

type ExpiryProps = Omit<
  StringComponentProps,
  'placeholder' | 'onChange'
> & {
  placeholder?: ExpiryPlaceholderType
  onChange?: ({ month, year, raw, formatted }: ExpiryValue) => void
}

const placeholders: Record<ExpiryPlaceholderType, string> = {
  dashes: '-- / --',
  spaces: '   /   ',
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
    if (value.length < 4) return

    const month = `${value.charAt(0)}${value.charAt(1)}`
    const year = `${value.charAt(2)}${value.charAt(3)}`
    const formatted = `${month} / ${year}`

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
      width="stretch"
      mask={[/[0-1]/, /[1-2]/, ' ', '/', ' ', /\d/, /\d/]}
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
  const hasSelectedDivider = checkIfDividerIsSelected(selectedValue)

  if (hasSelectedDivider) {
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

function checkIfDividerIsSelected(selectedValue: string): boolean {
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
  let hasStillSelectedDivider = true

  while (hasStillSelectedDivider) {
    const newRange = updateSelectionRange({
      selectionStart: start,
      selectionEnd: end,
      hasPressedShiftKey,
    })

    const newSelectedValue = value.substring(newRange.start, newRange.end)

    start = newRange.start
    end = newRange.end

    hasStillSelectedDivider = checkIfDividerIsSelected(newSelectedValue)
  }

  return { start, end }
}

export default Expiry
