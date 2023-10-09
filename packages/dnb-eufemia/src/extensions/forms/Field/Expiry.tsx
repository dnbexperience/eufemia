import React, { useContext, useEffect, useRef, useState } from 'react'

import Input from '../../../components/Input'
import { makeUniqueId } from '../../../shared/component-helper'
import SharedContext from '../../../shared/Context'
import { FieldHelpProps, FieldProps, pickSpacingProps } from '../types'
import { useDataValue } from '../hooks'
import classnames from 'classnames'
import { HelpButton, InputMasked } from '../../../components'
import FieldBlock from '../FieldBlock'
import { InputMaskedProps } from '../../../components/InputMasked'
import useHandleCursorPosition from '../../../components/input-masked/hooks/useHandleCursorPosition'

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
  const placeholders =
    sharedContext?.translation.DatePicker.placeholder_characters

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
  const [internalValue, setInternalValue] = useState<ExpiryValue>({
    month: value.month ?? '',
    year: value.year ?? '',
  })

  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  const { handleKeydown } = useHandleCursorPosition({
    inputRefs: [monthRef, yearRef],
  })

  const id = useRef(propsId || makeUniqueId()).current

  const status = error ? 'error' : warning ? 'warn' : info ? 'info' : null

  useEffect(() => {
    const { month, year } = internalValue

    const isInputEmpty = month == '' && year === ''
    const isMonthFilledOut = month.length === monthRef.current.size
    const isYearFilledOut = year.length === yearRef.current.size

    if (isInputEmpty || (isMonthFilledOut && isYearFilledOut)) {
      return handleChange(internalValue)
    }
  }, [internalValue, handleChange, placeholders])

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
        className="dnb-forms-field-expiry__input"
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
          <span className="dnb-forms-field-expiry__input--wrapper">
            <ExpiryDateField
              id={id}
              type="month"
              value={internalValue.month}
              innerRef={monthRef}
              onChange={(event) =>
                setInternalValue((currentValue) => ({
                  ...currentValue,
                  month: removePlaceholder(
                    event.target.value,
                    placeholders['month']
                  ),
                }))
              }
              onKeyDown={handleKeydown}
              disabled={disabled}
            />
            <span
              className={classnames(
                'dnb-forms-field-expiry__seperator',
                (!internalValue ||
                  (!internalValue?.month && !internalValue?.year)) &&
                  'dnb-forms-field-expiry__seperator--no-highlight'
              )}
              aria-hidden
            >
              {' / '}
            </span>
            <ExpiryDateField
              id={id}
              type="year"
              value={internalValue.year}
              innerRef={yearRef}
              onChange={(event) =>
                setInternalValue((currentValue) => ({
                  ...currentValue,
                  year: removePlaceholder(
                    event.target.value,
                    placeholders['year']
                  ),
                }))
              }
              onKeyDown={handleKeydown}
              disabled={disabled}
            />
          </span>
        }
      />
    </FieldBlock>
  )

  function removePlaceholder(value: string, placeholder: string) {
    return value.replace(RegExp(placeholder, 'gm'), '')
  }
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
        className={classnames(
          'dnb-forms-field-expiry__date-field',
          value && 'dnb-forms-field-expiry__date-field--has-value'
        )}
        input_class="dnb-forms-field-expiry__date-input"
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

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
