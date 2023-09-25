import React, { useEffect, useRef, useState } from 'react'
import { Props as StringComponentProps } from './String'
import TextMask from '../../../components/input-masked/TextMask'
import Input from '../../../components/Input'
import { correctCaretPosition } from '../../../components/input-masked/InputMaskedUtils'
import { clearConfigCache } from 'prettier'

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

const NUMBER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function Expiry({
  placeholder = 'dashes',
  keep_placeholder = true,
  ...props
}: ExpiryProps) {
  const [month, setMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')

  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const monthInput = monthRef.current
    const yearInput = yearRef.current

    monthInput.addEventListener('keydown', onKeydown)
    yearInput.addEventListener('keydown', onKeydown)

    return () => {
      monthInput.removeEventListener('keydown', onKeydown)
      yearInput.removeEventListener('keydown', onKeydown)
    }
  }, [])

  // Use effect to synchronise the two value states, instead of firing with an onChange bound to both inputs.
  // Not sure of this is a better solution though
  useEffect(() => {
    if ((!month || month.length > 2) && (year || year.length > 2)) {
      return
    }

    if (props?.onChange) {
      props.onChange({
        month,
        year,
        raw: `${month}${year}`,
        formatted: `${month}/${year}`,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year])

  async function onKeydown(event: KeyboardEvent) {
    const input = event.currentTarget as HTMLInputElement

    const pressedKey = event.key
    const hasPressedShiftKey = event.shiftKey
    const hasPressedTab = pressedKey === 'Tab'

    const endPosition = Number(input.getAttribute('size'))
    const startPosition = 0

    const selectionStart = input.selectionStart
    const selectionEnd = input.selectionEnd

    const isAtFirstCaretPosition =
      selectionStart === startPosition && selectionEnd === startPosition

    const isAtLastCaretPosition =
      selectionStart === endPosition && selectionEnd === endPosition

    const monthInput = monthRef.current
    const isMonthInputInFocus = monthInput === document.activeElement

    const yearInput = yearRef.current
    const isYearInputInFocus = yearInput === document.activeElement

    // If user is at end or start of input and presses either tab or shift + tab, then the whole input should be selected
    if (
      (hasPressedTab && !hasPressedShiftKey && isAtFirstCaretPosition) ||
      (hasPressedShiftKey && hasPressedTab && isAtLastCaretPosition)
    ) {
      event.preventDefault()
      input.setSelectionRange(startPosition, endPosition)
    }

    // If user is at the end of month input, and presses either a number key or ArrowRight, then year input should be in focus
    if (
      isMonthInputInFocus &&
      isAtLastCaretPosition &&
      (pressedKey === 'ArrowRight' || NUMBER_KEYS.includes(pressedKey))
    ) {
      await wait(1)
      yearInput.focus()
      yearInput.setSelectionRange(startPosition, startPosition)
      return
    }

    // If user is at the end of year input, and presses either Backspace or ArrowLeft, then month input should be in focus
    if (
      isYearInputInFocus &&
      isAtFirstCaretPosition &&
      (pressedKey == 'ArrowLeft' || pressedKey === 'Backspace')
    ) {
      await wait(1)
      monthInput.focus()
      monthInput.setSelectionRange(endPosition, endPosition)
      return
    }
  }

  return (
    <Input
      className="dnb-date-picker dnb-date-picker--show-input dnb-forms-field-expiry"
      input_element={
        <span className="dnb-date-picker__input__wrapper">
          <ExpiryDateField
            type="month"
            value={month}
            onChange={(e) => setMonth(e.currentTarget.value)}
            innerRef={monthRef}
          />
          <span className="dnb-date-picker--separator" aria-hidden>
            {' / '}
          </span>
          <ExpiryDateField
            type="year"
            value={year}
            onChange={(e) => setYear(e.currentTarget.value)}
            innerRef={yearRef}
          />
        </span>
      }
    />
  )
}

type ExpiryDateFieldProps = {
  type: 'month' | 'year'
  value: string
  onChange: (event: React.KeyboardEvent<HTMLInputElement>) => void
  innerRef: React.MutableRefObject<HTMLInputElement>
}

type ExpiryDateFieldConfig = {
  placeholder: string
  mask: RegExp[]
}

const dateFields: Record<
  ExpiryDateFieldProps['type'],
  ExpiryDateFieldConfig
> = {
  month: {
    placeholder: 'm',
    mask: [/[0-1]/, /[0-9]/],
  },
  year: {
    placeholder: 'y',
    mask: [/[0-9]/, /[0-9]/],
  },
}

function ExpiryDateField({
  type,
  value,
  onChange,
  innerRef,
}: ExpiryDateFieldProps) {
  return (
    <TextMask
      className="dnb-date-picker__input"
      value={value}
      onChange={onChange}
      mask={dateFields[type].mask}
      placeholderChar={dateFields[type].placeholder}
      guide={true}
      showMask={true}
      keepCharPositions={false} // so we can overwrite next value, if it already exists
      autoComplete="off"
      autoCapitalize="none"
      spellCheck={false}
      autoCorrect="off"
      size={2}
      // Icky casting hack
      inputRef={innerRef as unknown as Record<string, unknown>}
    />
  )
}

export default Expiry

function wait(t) {
  return new Promise((r) => setTimeout(r, t))
}
