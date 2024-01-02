import React, { useContext, useRef } from 'react'
import { makeUniqueId } from '../../../../shared/component-helper'
import SharedContext from '../../../../shared/Context'
import { FieldHelpProps, FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useDataValue } from '../../hooks'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { MultiInputMask } from '../../../../components/input-masked'
import type { MultiInputMaskValue } from '../../../../components/input-masked'
import { HelpButton } from '../../../../components'

type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

export type ExpiryProps = FieldProps<string> & FieldHelpProps

function Expiry(props: ExpiryProps) {
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
    value = '',
    labelDescription,
    labelSecondary,
    layout = 'vertical',
    required,
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue({
    ...props,
    emptyValue: '',
  })

  const expiry: ExpiryValue = {
    month: ensureValidMonth(value?.substring(0, 2)),
    year: value?.substring(2, 4) ?? '',
  }

  const idRef = useRef(propsId || makeUniqueId()).current

  const status = error ? 'error' : warning ? 'warn' : info ? 'info' : null

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-expiry', className)}
      labelSecondary={labelSecondary}
      labelDescription={labelDescription}
      info={info}
      warning={warning}
      error={error}
      {...pickSpacingProps(props)}
    >
      <MultiInputMask
        stretch
        id={`${idRef}__input`}
        label={label}
        labelDirection={layout}
        values={expiry}
        status={status}
        statusState={disabled ? 'disabled' : undefined}
        disabled={disabled}
        required={required}
        onChange={(expiry) => handleChange(expiryToString(expiry))}
        onBlur={handleBlur}
        onFocus={handleFocus}
        delimiter="/"
        inputMode="numeric"
        inputs={[
          {
            id: 'month',
            label: sharedContext?.translation.DatePicker['month'],
            mask: getMonthMask(expiry?.month),
            placeholderCharacter: placeholders['month'],
            autoComplete: 'cc-exp-month',
          },
          {
            id: 'year',
            label: sharedContext?.translation.DatePicker['year'],
            mask: [/[0-9]/, /[0-9]/],
            placeholderCharacter: placeholders['year'],
            autoComplete: 'cc-exp-year',
          },
        ]}
        suffix={
          help ? (
            <HelpButton title={help.title}>{help.contents}</HelpButton>
          ) : undefined
        }
      />
    </FieldBlock>
  )

  function expiryToString(values: ExpiryValue) {
    return Object.values(values).join('')
  }

  function ensureValidMonth(month: string) {
    // Return empty value if no month is given
    if (!month) {
      return ''
    }

    const [firstMask, secondMask] = getMonthMask(month)

    const firstDigit = month?.charAt(0)
    const isFirstDigitValid = firstMask.test(firstDigit)

    if (firstDigit && !isFirstDigitValid) {
      // Return empty value if the first digit is invalid
      return ''
    }

    const seconDigit = month?.charAt(1)
    const isSecondDigitValid = secondMask.test(seconDigit)

    if (seconDigit && !isSecondDigitValid) {
      // Return empty value if the second digit is invalid
      return ''
    }

    // Return given month of month value is valid
    return month
  }

  function getMonthMask(month: string) {
    const firstDigit = month?.charAt(0)

    return [
      /[0-1]/,
      firstDigit === '0' || firstDigit === '' ? /[1-9]/ : /[0-2]/,
    ]
  }
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
