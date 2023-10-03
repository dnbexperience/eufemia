import React, { useContext, useRef } from 'react'

import Input from '../../../components/Input'
import { makeUniqueId } from '../../../shared/component-helper'
import SharedContext from '../../../shared/Context'
import { FieldHelpProps, FieldProps, pickSpacingProps } from '../types'
import { useDataValue } from '../hooks'
import classnames from 'classnames'
import { HelpButton, InputMasked } from '../../../components'
import FieldBlock from '../FieldBlock'
import { InputMaskedProps } from '../../../components/InputMasked'

export type ExpiryValue = {
  /**
   * Month value from input
   */
  month: string
  /**
   * Year value from input
   */
  year: string
}

type ExpiryProps = FieldProps<ExpiryValue, undefined> & FieldHelpProps

function Expiry({ ...props }: ExpiryProps) {
  const sharedContext = useContext(SharedContext)

  const {
    id: propsId,
    className,
    label = sharedContext?.translation.Forms.expiryLabel,
    error,
    info,
    warning,
    help,
    disabled,
    value,
    labelDescription,
    labelSecondary,
    layout,
    required,
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue(props)

  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  const { handleKeydown } = useHandleCursorPosition({ monthRef, yearRef })

  const id = useRef(propsId || makeUniqueId()).current

  const status = error ? 'error' : warning ? 'warn' : info ? 'info' : null

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-expiry', className)}
      forId={id}
      layout={layout}
      label={label}
      labelSecondary={labelSecondary}
      labelDescription={labelDescription}
      info={info}
      warning={warning}
      error={error}
      {...pickSpacingProps(props)}
    >
      <Input
        id={`${id}__input`}
        status={status}
        input_state={disabled ? 'disabled' : undefined}
        disabled={disabled}
        on_blur={handleBlur}
        on_focus={handleFocus}
        required={required}
        suffix={
          help ? (
            <HelpButton title={help.title}>{help.contents}</HelpButton>
          ) : undefined
        }
        input_element={
          <span className="dnb-date-picker__input__wrapper">
            <ExpiryDateField
              id={id}
              type="month"
              value={value?.month}
              innerRef={monthRef}
              onChange={(event) =>
                handleChange({
                  month: event.target.value,
                  year: value?.year,
                })
              }
              onKeyDown={handleKeydown}
              disabled={disabled}
            />
            <span className="dnb-date-picker--separator" aria-hidden>
              {' / '}
            </span>
            <ExpiryDateField
              id={id}
              type="year"
              value={value?.year}
              innerRef={yearRef}
              onChange={(event) =>
                handleChange({
                  month: value?.month,
                  year: event.target.value,
                })
              }
              onKeyDown={handleKeydown}
              disabled={disabled}
            />
          </span>
        }
      />
    </FieldBlock>
  )
}

type ExpiryDateFieldProps = {
  id: string
  type: 'month' | 'year'
  value: string
  onChange: (event: React.KeyboardEvent<HTMLInputElement>) => void
  innerRef: React.MutableRefObject<HTMLInputElement>
} & Partial<InputMaskedProps>

function ExpiryDateField({
  id,
  type,
  value,
  onChange,
  innerRef,
  ...rest
}: ExpiryDateFieldProps) {
  const sharedContext = useContext(SharedContext)

  const placeholderCharacter =
    sharedContext?.translation.DatePicker.placeholder_characters[type]

  const masks: Record<ExpiryDateFieldProps['type'], RegExp[]> = {
    month: [/[0-1]/, /[0-9]/],
    year: [/[0-9]/, /[0-9]/],
  }

  return (
    <>
      <InputMasked
        id={`${id}-${type}`}
        value={value}
        onChange={onChange}
        mask={masks[type]}
        placeholder_char={placeholderCharacter}
        show_guide={true}
        show_mask={true}
        keep_char_positions={false} // so we can overwrite next value, if it already exists
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        autoCorrect="off"
        size={2}
        onFocus={handleFocus}
        inner_ref={innerRef}
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
