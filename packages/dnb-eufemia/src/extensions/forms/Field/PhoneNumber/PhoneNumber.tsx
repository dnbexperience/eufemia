import React, { useMemo, useContext, useCallback } from 'react'
import { Autocomplete, Flex } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
import classnames from 'classnames'
import countries from '../../constants/countries'
import StringComponent from '../String'
import { useDataValue } from '../../hooks'
import FieldBlock from '../../FieldBlock'
import { FieldHelpProps, FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import SharedContext from '../../../../shared/Context'

export type Props = FieldHelpProps &
  FieldProps<string, undefined> & {
    countryCodeFieldClassName?: string
    numberFieldClassName?: string
    counttryCodePlaceholder?: string
    countryCodeLabel?: string
    numberMask?: InputMaskedProps['mask']
    width?: 'large' | 'stretch'
    onCountryCodeChange?: (value: string | undefined) => void
    onNumberChange?: (value: string | undefined) => void
  }

function PhoneNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const defaultProps: Partial<Props> = {
    // Important for the default value to be defined here, and not after the useDataValue call, to avoid the UI jumping
    // back to +47 once the user empty the field so handleChange send out undefined.
    value: '+47',
    errorMessages: {
      required: sharedContext?.translation.Forms.phoneNumberErrorRequired,
      ...props?.errorMessages,
    },
  }
  const preparedProps: Props = {
    ...defaultProps,
    ...props,
  }

  const {
    className,
    countryCodeFieldClassName,
    numberFieldClassName,
    layout = 'vertical',
    counttryCodePlaceholder,
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

  const countryCodeData = useMemo(
    () =>
      countries.map((country) => ({
        selectedKey: `+${country.code}`,
        selected_value: `${country.iso} (+${country.code})`,
        content: `+${country.code} ${country.name}`,
      })),
    []
  )

  const handleCountryCodeChange = useCallback(
    ({ data }: { data: { selectedKey: string } }) => {
      const countryCode = data?.selectedKey?.trim() ?? emptyValue

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
    <FieldBlock
      className={classnames('dnb-forms-field-phone-number', className)}
      width={width !== 'stretch' ? width : undefined}
      info={info}
      warning={warning}
      error={error}
    >
      <Flex.Container direction="horizontal">
        <Autocomplete
          className={classnames(
            'dnb-forms-field-phone-number__country-code',
            countryCodeFieldClassName
          )}
          placeholder={counttryCodePlaceholder ?? ' '}
          label_direction={layout}
          label={
            countryCodeLabel ??
            sharedContext?.translation.Forms.countryCodeLabel
          }
          data={countryCodeData}
          value={countryCode}
          disabled={disabled}
          on_focus={handleFocus}
          on_blur={handleBlur}
          on_change={handleCountryCodeChange}
          independent_width
          search_numbers
          {...pickSpacingProps(props)}
          stretch={width === 'stretch'}
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
      </Flex.Container>
    </FieldBlock>
  )
}

PhoneNumber._supportsSpacingProps = true
export default PhoneNumber
