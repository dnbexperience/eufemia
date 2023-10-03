import React, { useContext, useCallback } from 'react'
import { Div } from '../../../elements'
import { InputMaskedProps } from '../../../components/InputMasked'
import classnames from 'classnames'
import CountryCode from './CountryCode'
import StringComponent from './String'
import { useDataValue } from '../hooks'
import { FieldHelpProps, FieldProps, pickSpacingProps } from '../types'
import SharedContext from '../../../shared/Context'

export type Props = FieldHelpProps &
  FieldProps<string, undefined> & {
    countryCodeFieldClassName?: string
    numberFieldClassName?: string
    countryCodeLabel?: string
    numberMask?: InputMaskedProps['mask']
    width?: 'large' | 'stretch'
    onCountryCodeChange?: (value: string | undefined) => void
    onNumberChange?: (value: string | undefined) => void
  }

function PhoneNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const preparedProps: Props = {
    ...props,
    errorMessages: {
      required: sharedContext?.translation.Forms.phoneNumberErrorRequired,
      ...props?.errorMessages,
    },
  }

  const {
    className,
    countryCodeFieldClassName,
    numberFieldClassName,
    placeholder,
    countryCodeLabel,
    label = sharedContext?.translation.Forms.phoneNumberLabel,
    value,
    numberMask,
    emptyValue,
    info,
    warning,
    error,
    disabled,
    width = 'large',
    help,
    handleFocus,
    handleBlur,
    handleChange,
    onCountryCodeChange,
    onNumberChange,
  } = useDataValue(preparedProps)

  const [, countryCode, phoneNumber] =
    value !== undefined
      ? value.match(/^(\+[^ ]+)? ?(.*)$/)
      : [undefined, '', '']

  const handleCountryCodeChange = useCallback(
    (countryCode: string) => {
      if (!countryCode && !phoneNumber) {
        handleChange?.(emptyValue)
        onCountryCodeChange?.(emptyValue)
        return
      }

      handleChange?.([countryCode, phoneNumber].filter(Boolean).join(' '))
      onCountryCodeChange?.(countryCode)
    },
    [phoneNumber, emptyValue, handleChange, onCountryCodeChange]
  )

  const handleNumberChange = useCallback(
    (phoneNumber: string) => {
      if (!countryCode && !phoneNumber) {
        handleChange?.(emptyValue)
        onNumberChange?.(emptyValue)
        return
      }

      handleChange?.([countryCode, phoneNumber].filter(Boolean).join(' '))
      onNumberChange?.(phoneNumber)
    },
    [countryCode, emptyValue, handleChange, onNumberChange]
  )

  return (
    <Div
      className={classnames(
        'dnb-forms-field-phone-number',
        width !== undefined &&
          `dnb-forms-field-phone-number--width-${width}`,
        className
      )}
      {...pickSpacingProps(preparedProps)}
    >
      <CountryCode
        className={classnames(
          'dnb-forms-field-phone-number__country-code',
          countryCodeFieldClassName
        )}
        label={countryCodeLabel}
        value={countryCode}
        disabled={disabled}
        onChange={handleCountryCodeChange}
      />

      <StringComponent
        className={classnames(
          'dnb-forms-field-phone-number__number',
          numberFieldClassName
        )}
        type="tel"
        emptyValue=""
        layout="vertical"
        label={label ?? ' '}
        placeholder={placeholder ?? '00 00 00 00'}
        mask={
          numberMask ?? [
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
          ]
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleNumberChange}
        value={phoneNumber}
        info={info}
        warning={warning}
        error={error}
        disabled={disabled}
        width="stretch"
        help={help}
      />
    </Div>
  )
}

PhoneNumber._supportsEufemiaSpacingProps = true
export default PhoneNumber
