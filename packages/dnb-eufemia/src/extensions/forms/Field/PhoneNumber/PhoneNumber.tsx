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
    countryCodePlaceholder?: string
    countryCodeLabel?: string
    numberMask?: InputMaskedProps['mask']
    width?: 'large' | 'stretch'
    onCountryCodeChange?: (value: string | undefined) => void
    onNumberChange?: (value: string | undefined) => void
  } & {
    /**
     * For internal testing purposes
     */
    noAnimation?: boolean
  }

function PhoneNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const errorMessages = useMemo(
    () => ({
      required: tr.phoneNumberErrorRequired,
      ...props?.errorMessages,
    }),
    [tr, props.errorMessages]
  )

  const defaultProps: Partial<Props> = {
    // Important for the default value to be defined here, and not after the useDataValue call, to avoid the UI jumping
    // back to +47 once the user empty the field so handleChange send out undefined.
    value: '+47',
    errorMessages,
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
    countryCodePlaceholder,
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

  const getCountryData = ({ filter = null } = {}) => {
    const lang = sharedContext.locale?.split('-')[0]
    return countries
      .filter(({ cdc }) => !filter || `+${cdc}` === filter)
      .sort(({ i18n: a }, { i18n: b }) => (a[lang] > b[lang] ? 1 : -1))
      .map((country) => makeObject(country, lang))
  }

  const singleCountryCodeData = useMemo(() => {
    return getCountryData({ filter: countryCode })
  }, [])

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

  const onFocusHandler = ({ dataList, updateData }) => {
    // because there can be more than one country with same cdc
    if (dataList.length < 10) {
      updateData(getCountryData())
    }
    handleFocus()
  }

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-phone-number', className)}
      width={width !== 'stretch' ? width : undefined}
      info={info}
      warning={warning}
      error={error}
      {...pickSpacingProps(props)}
    >
      <Flex.Horizontal>
        <Autocomplete
          className={classnames(
            'dnb-forms-field-phone-number__country-code',
            countryCodeFieldClassName
          )}
          placeholder={countryCodePlaceholder ?? ' '}
          label_direction={layout}
          label={
            countryCodeLabel ??
            sharedContext?.translation.Forms.countryCodeLabel
          }
          mode="async"
          data={singleCountryCodeData}
          value={countryCode}
          disabled={disabled}
          on_focus={onFocusHandler}
          on_blur={handleBlur}
          on_change={handleCountryCodeChange}
          independent_width
          search_numbers
          no_animation={props.noAnimation}
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
      </Flex.Horizontal>
    </FieldBlock>
  )
}

type CountryType = {
  cdc: string
  iso: string
  i18n: {
    en: string
  }
}

function makeObject(country: CountryType, lang: string) {
  return {
    selectedKey: `+${country.cdc}`,
    selected_value: `${country.iso} (+${country.cdc})`,
    content: `+${country.cdc} ${country.i18n[lang] ?? country.i18n.en}`,
  }
}

PhoneNumber._supportsSpacingProps = true
export default PhoneNumber
