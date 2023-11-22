import React, { useMemo, useContext, useCallback, useEffect } from 'react'
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
  FieldProps<string, undefined | string> & {
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

// Important for the default value to be defined here, and not after the useDataValue call, to avoid the UI jumping
// back to +47 once the user empty the field so handleChange send out undefined.
const defaultCountryCode = '+47'

function PhoneNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms
  const lang = sharedContext.locale?.split('-')[0]

  const errorMessages = useMemo(
    () => ({
      required: tr.phoneNumberErrorRequired,
      ...props?.errorMessages,
    }),
    [tr, props.errorMessages]
  )

  const defaultProps: Partial<Props> = {
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
    countryCodePlaceholder,
    placeholder,
    countryCodeLabel,
    label = sharedContext?.translation.Forms.phoneNumberLabel,
    numberMask,
    emptyValue,
    value,
    info,
    warning,
    error,
    disabled,
    width = 'large',
    help,
    required,
    validateInitially,
    continuousValidation,
    validateUnchanged,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    onCountryCodeChange,
    onNumberChange,
  } = useDataValue(preparedProps)

  const countryCodeRef = React.useRef(null)
  const phoneNumberRef = React.useRef(null)
  const dataRef = React.useRef(null)
  const langRef = React.useRef(lang)

  /**
   * Update countryCode and phoneNumber when value from outside changes.
   * Use memo to update refs in sync
   */
  useMemo(() => {
    const [countryCode, phoneNumber] = splitValue(props.value)
    phoneNumberRef.current = phoneNumber

    if (
      (countryCode && countryCodeRef.current !== countryCode) ||
      !countryCodeRef.current
    ) {
      countryCodeRef.current = countryCode || defaultCountryCode

      if (lang === langRef.current) {
        dataRef.current = getCountryData({
          lang,
          filter: countryCodeRef.current,
        })
      }
    }
  }, [props.value]) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * On external value change, update the internal,
   * only so onFocus and onBlur does have correct (eventually empty) value.
   */
  useEffect(() => {
    const [countryCode, phoneNumber] = splitValue(props.value)
    const newValue = phoneNumber
      ? joinValue([countryCode, phoneNumber])
      : emptyValue
    if (newValue !== value) {
      updateValue(newValue)
    }
  }, [props.value]) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Update whole contry list when lang changes.
   * Use memo to update refs in sync.
   */
  useMemo(() => {
    if (lang !== langRef.current) {
      dataRef.current = getCountryData({
        lang,
      })
    }
  }, [lang])

  const handleCountryCodeChange = useCallback(
    ({ data }: { data: { selectedKey: string } }) => {
      const countryCode = data?.selectedKey?.trim() ?? emptyValue
      countryCodeRef.current = countryCode

      if (!countryCode && !phoneNumberRef.current) {
        handleChange(emptyValue)
        onCountryCodeChange?.(emptyValue)
        return
      }

      if (countryCode && !phoneNumberRef.current) {
        onCountryCodeChange?.(countryCode)
        return
      }

      handleChange(joinValue([countryCode, phoneNumberRef.current]))
      onCountryCodeChange?.(countryCode)
    },
    [phoneNumberRef, emptyValue, handleChange, onCountryCodeChange]
  )

  const handleNumberChange = useCallback(
    (phoneNumber: string) => {
      phoneNumberRef.current = phoneNumber

      if (!phoneNumber) {
        handleChange(emptyValue)
        onNumberChange?.(emptyValue)
        return
      }

      handleChange(joinValue([countryCodeRef.current, phoneNumber]))
      onNumberChange?.(phoneNumber)
    },
    [countryCodeRef, emptyValue, handleChange, onNumberChange]
  )

  const onFocusHandler = ({ updateData }) => {
    if (dataRef.current.length < 10) {
      dataRef.current = getCountryData({
        lang: sharedContext.locale?.split('-')[0],
      })
      updateData(dataRef.current)
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
          label_direction="vertical"
          label={
            countryCodeLabel ??
            sharedContext?.translation.Forms.countryCodeLabel
          }
          data={dataRef.current}
          value={countryCodeRef.current}
          disabled={disabled}
          on_focus={onFocusHandler}
          on_blur={handleBlur}
          on_change={handleCountryCodeChange}
          independent_width
          search_numbers
          keep_selection
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
          value={phoneNumberRef.current}
          info={info}
          warning={warning}
          error={error}
          disabled={disabled}
          width="stretch"
          help={help}
          required={required}
          validateInitially={validateInitially}
          continuousValidation={continuousValidation}
          validateUnchanged={validateUnchanged}
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

function getCountryData({ lang = 'en', filter = null } = {}) {
  return countries
    .filter(({ cdc }) => !filter || `+${cdc}` === filter)
    .sort(({ i18n: a }, { i18n: b }) => (a[lang] > b[lang] ? 1 : -1))
    .map((country) => makeObject(country, lang))
}

function splitValue(value: string) {
  return (
    typeof value === 'string'
      ? value.match(/^(\+[^ ]+)? ?(.*)$/)
      : [undefined, '', '']
  ).slice(1)
}

function joinValue(array: Array<string>) {
  return array.filter(Boolean).join(' ')
}

PhoneNumber._supportsSpacingProps = true
export default PhoneNumber
