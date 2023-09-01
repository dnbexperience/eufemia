import React, { useContext, useCallback } from 'react'
import { Div } from '../../../elements'
import { InputMaskedProps } from '../../../components/InputMasked'
import classnames from 'classnames'
import CountryCode from './CountryCode'
import StringComponent from './String'
import { forwardSpaceProps } from '../utils'
import { useField } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps } from '../field-types'
import SharedContext from '../../../shared/Context'

export type Props = ComponentProps &
  FieldProps<string, undefined> & {
    countryCodeFieldClassName?: string
    numberFieldClassName?: string
    countryCodeLabel?: string
    numberMask?: InputMaskedProps['mask']
    width?: 'large' | 'stretch'
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
    onFocus,
    onBlur,
    onChange,
  } = useField(preparedProps)

  const [, countryCode, phoneNumber] =
    value === undefined
      ? [undefined, '+47', '']
      : value?.match(/^(\+[^ ]+)? ?(.*)$/) ?? []

  const handleCountryCodeChange = useCallback(
    (countryCode: string) => {
      if (!countryCode && !phoneNumber) {
        onChange?.(emptyValue)
        return
      }

      onChange?.([countryCode, phoneNumber].filter(Boolean).join(' '))
    },
    [phoneNumber, emptyValue, onChange],
  )

  const handleNumberChange = useCallback(
    (phoneNumber: string) => {
      if (!countryCode && !phoneNumber) {
        onChange?.(emptyValue)
        return
      }

      onChange?.([countryCode, phoneNumber].filter(Boolean).join(' '))
    },
    [countryCode, emptyValue, onChange],
  )

  return (
    <Div
      className={classnames(
        'dnb-forms-field-phone-number',
        width !== undefined &&
          `dnb-forms-field-phone-number--width-${width}`,
        className,
      )}
      {...forwardSpaceProps(preparedProps)}
    >
      <CountryCode
        className={classnames(
          'dnb-forms-field-phone-number__country-code',
          countryCodeFieldClassName,
        )}
        label={countryCodeLabel}
        value={countryCode ?? '+47'}
        disabled={disabled}
        onChange={handleCountryCodeChange}
      />

      <StringComponent
        className={classnames(
          'dnb-forms-field-phone-number__number',
          numberFieldClassName,
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
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleNumberChange}
        value={phoneNumber}
        info={info}
        warning={warning}
        error={error}
        disabled={disabled}
        width="stretch"
      />
    </Div>
  )
}

PhoneNumber._supportsEufemiaSpacingProps = true
export default PhoneNumber
