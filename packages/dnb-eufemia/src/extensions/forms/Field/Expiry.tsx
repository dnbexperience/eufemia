import React, { useContext, useEffect, useRef, useState } from 'react'

import TextMask, {
  TextMaskProps,
} from '../../../components/input-masked/TextMask'
import Input from '../../../components/Input'
import { makeUniqueId } from '../../../shared/component-helper'
import SharedContext from '../../../shared/Context'
import { FieldHelpProps, FieldProps } from '../types'
import { useDataValue } from '../hooks'
import classnames from 'classnames'

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
}

type ExpiryProps = FieldHelpProps &
  FieldProps<string> & {
    /**
     * Fires when input is fully filled out. Has an object as parameter, consisting of `month`, `year`, `raw` and `formatted` values.
     */
    onChange?: ({ month, year }: ExpiryValue) => void
  }

function Expiry({ ...props }: ExpiryProps) {
  const [month, setMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')

  const id = useRef(props.id || makeUniqueId()).current
  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  const { handleKeydown } = useHandleCursorPosition({ monthRef, yearRef })

  const {
    className,
    label,
    error,
    disabled,
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue(props)

  // Use effect to synchronise the two value states, instead of firing with an onChange bound to both inputs.
  // Not sure of this is a better solution though
  useEffect(() => {
    if (!(month?.length === 2 && year?.length === 2)) {
      return
    }

    if (handleChange) {
      handleChange({
        month,
        year,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year])

  return (
    <Input
      id={`${id}__input`}
      className={classnames(
        'dnb-date-picker',
        'dnb-date-picker--show-input',
        'dnb-forms-field-expiry',
        className
      )}
      label={label}
      disabled={disabled}
      status={error?.message}
      on_blur={handleBlur}
      on_focus={handleFocus}
      input_element={
        <span className="dnb-date-picker__input__wrapper">
          <ExpiryDateField
            id={id}
            type="month"
            value={month}
            innerRef={monthRef}
            onChange={(event) => setMonth(event.currentTarget.value)}
            onKeyDown={handleKeydown}
          />
          <span className="dnb-date-picker--separator" aria-hidden>
            {' / '}
          </span>
          <ExpiryDateField
            id={id}
            type="year"
            value={year}
            innerRef={yearRef}
            onChange={(event) => setYear(event.currentTarget.value)}
            onKeyDown={handleKeydown}
          />
        </span>
      }
    />
  )
}

type ExpiryDateFieldProps = {
  id: string
  type: 'month' | 'year'
  value: string
  onChange: (event: React.KeyboardEvent<HTMLInputElement>) => void
  innerRef: React.MutableRefObject<HTMLInputElement>
} & Partial<Omit<TextMaskProps, 'ref'>>

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
  id,
  type,
  value,
  onChange,
  innerRef,
  ...rest
}: ExpiryDateFieldProps) {
  const sharedContext = useContext(SharedContext)

  return (
    <>
      <TextMask
        id={`${id}-${type}`}
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
        onFocus={handleFocus}
        // Icky casting hack
        inputRef={innerRef as unknown as Record<string, unknown>}
        {...rest}
      />
      <label id={`${id}-month-label`} htmlFor={`${id}-${type}`} hidden>
        {sharedContext?.translation.DatePicker[type]}
      </label>
    </>
  )

  function handleFocus({ target }) {
    target.focus()
    target.select()
  }
}

function useHandleCursorPosition({ monthRef, yearRef }) {
  function handleKeydown(event: React.KeyboardEvent) {
    const input = event.currentTarget as HTMLInputElement

    const pressedKey = event.key
    const hasPressedNumberKey = /[0-9]/.test(pressedKey)

    const startPosition = 0
    const endPosition = Number(input.size)

    const currentSelectionStart = input.selectionStart

    window.requestAnimationFrame(() => {
      const selectionStart = input.selectionStart
      const selectionEnd = input.selectionEnd

      const isAtFirstCaretPosition =
        selectionStart === startPosition && selectionEnd === startPosition

      const isAtLastCaretPosition =
        selectionStart === endPosition && selectionEnd === endPosition

      const isMonthInputInFocus = input === monthRef.current
      const isYearInputInFocus = input === yearRef.current

      // Return if user has pressed any key that does require special handling
      if (
        !(
          hasPressedNumberKey ||
          pressedKey === 'ArrowRight' ||
          pressedKey === 'ArrowLeft' ||
          pressedKey === 'Backspace'
        )
      ) {
        return // stop here
      }

      // If user is at the end of month input, and presses either a number key or ArrowRight, then year input should be in focus
      if (
        isMonthInputInFocus &&
        isAtLastCaretPosition &&
        !(currentSelectionStart === 1 && pressedKey === 'ArrowRight')
      ) {
        yearRef.current.focus()
        yearRef.current.setSelectionRange(startPosition, startPosition)

        return // stop here
      }

      // If user is at the end of year input, and presses either Backspace or ArrowLeft, then month input should be in focus
      if (
        isYearInputInFocus &&
        isAtFirstCaretPosition &&
        !(
          currentSelectionStart === 1 &&
          (pressedKey == 'ArrowLeft' || pressedKey === 'Backspace')
        )
      ) {
        monthRef.current.focus()
        monthRef.current.setSelectionRange(endPosition, endPosition)

        return // stop here
      }
    })
  }

  return { handleKeydown }
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
