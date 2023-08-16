import React, { useContext, useCallback, useMemo } from 'react'
import { Div } from '../../../elements'
import { Autocomplete, Input } from '../../../components'
import classnames from 'classnames'
import countries from '../constants/countries'
import { forwardSpaceProps } from '../utils'
import { useField } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps } from '../field-types'
import SharedContext from '../../../shared/Context'

export type Props = ComponentProps &
  FieldProps<string> & {
    countryCodeFieldClassName?: string
    numberFieldClassName?: string
    // Styling
    width?: false | 'medium' | 'large'
  }

export default function FieldPhoneNumber(props: Props) {
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
    label = sharedContext?.translation.Forms.phoneNumberLabel,
    value,
    emptyValue,
    error,
    disabled,
    width = 'large',
    onFocus,
    onBlur,
    onChange,
  } = useField(preparedProps)

  // Split the value into country code and phone number correctly, even if one of them is not
  // filled in (avoiding number ending up in country code etc)
  const [, countryCode = '+47', phoneNumber = ''] =
    (value ?? '')?.match(/^(\+[^ ]+)? ?(.*)$/) ?? []

  const countriesDropdownData = useMemo(
    () =>
      countries.map((country) => ({
        selected_key: `+${country.code}`,
        selected_value: `${country.iso} (+${country.code})`,
        content: `+${country.code} ${country.name}`,
      })),
    []
  )

  const handleCountryCodeChange = useCallback(
    ({ data: changedData }: { data: { selected_key: string } }) => {
      if (
        (!changedData || !changedData.selected_key.trim()) &&
        !phoneNumber.trim()
      ) {
        onChange?.(emptyValue)
        return
      }

      onChange?.(`${changedData?.selected_key || ''} ${phoneNumber}`)
    },
    [phoneNumber, emptyValue, onChange]
  )

  const handleNumberChange = useCallback(
    ({ value }: { value: string }) => {
      if (!value.trim() && !countryCode.trim()) {
        onChange?.(emptyValue)
        return
      }

      onChange?.([countryCode, value].filter(Boolean).join(' '))
    },
    [countryCode, emptyValue, onChange]
  )

  return (
    <Div
      className={classnames(
        'dnb-forms-field-phone-number',
        width !== false && `dnb-forms-field-phone-number--width-${width}`,
        className
      )}
      {...forwardSpaceProps(preparedProps)}
    >
      <Autocomplete
        className={classnames(
          'dnb-forms-field-phone-number__country-code',
          countryCodeFieldClassName
        )}
        label_direction="vertical"
        label={sharedContext?.translation.Forms.countryCodeLabel}
        data={countriesDropdownData}
        value={countryCode ?? '+47'}
        disabled={disabled}
        on_change={handleCountryCodeChange}
        independent_width
      />
      <Input
        className={classnames(
          'dnb-forms-field-phone-number__number',
          numberFieldClassName
        )}
        label_direction="vertical"
        label={label ?? ' '}
        placeholder={placeholder ?? '00 00 00 00'}
        on_change={handleNumberChange}
        on_focus={onFocus}
        on_blur={onBlur}
        value={phoneNumber}
        status={error?.message}
        disabled={disabled}
        type="tel"
      />
    </Div>
  )
}
