import React, { useMemo, useContext, useCallback, useEffect } from 'react'
import { Autocomplete, Flex } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
import classnames from 'classnames'
import countries, { CountryType } from '../../constants/countries'
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
    filterCountries?: (country: CountryType) => boolean

    /**
     * For internal testing purposes
     */
    noAnimation?: boolean
  }

// Important for the default value to be defined here, and not after the useDataValue call, to avoid the UI jumping
// back to +47 once the user empty the field so handleChange send out undefined.
const defaultCountryCode = '+47'
const defaultPlaceholder = '00 00 00 00'
const defaultMask = [
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
    filterCountries,
  } = useDataValue(preparedProps)

  const countryCodeRef = React.useRef(null)
  const phoneNumberRef = React.useRef(null)
  const dataRef = React.useRef(null)
  const langRef = React.useRef(lang)

  /**
   * We do not process the whole country list at the first render.
   * Only when the Autocomplete opens (focus).
   * To achieve this, we use memo instead of effect to update refs in sync.
   *
   * We set or update the data list depending on if the countrycode changes or lang changes.
   * We then update countryCode and phoneNumber when value changes.
   */
  useMemo(() => {
    const [countryCode, phoneNumber] = splitValue(props.value)
    phoneNumberRef.current = phoneNumber

    if (
      !countryCodeRef.current ||
      (countryCode && countryCode !== countryCodeRef.current)
    ) {
      countryCodeRef.current = countryCode || defaultCountryCode

      dataRef.current = getCountryData({
        lang,
        filter: countryCodeRef.current,
      })
    }

    if (lang !== langRef.current) {
      langRef.current = lang
      dataRef.current = getCountryData({
        lang,
        filter: filterCountries,
      })
    }
  }, [props.value, lang, filterCountries])

  /**
   * On external value change, update the internal,
   * only so onFocus and onBlur does have correct (eventually empty) value.
   */
  useEffect(() => {
    const [countryCode, phoneNumber] = splitValue(props.value)
    const newValue = phoneNumber
      ? joinValue([countryCode, phoneNumber])
      : emptyValue
    updateValue(newValue)
  }, [props.value, emptyValue, updateValue])

  const handleCountryCodeChange = useCallback(
    ({ data }: { data: { selectedKey: string } }) => {
      const countryCode = data?.selectedKey?.trim() || emptyValue
      const phoneNumber = phoneNumberRef.current || emptyValue
      countryCodeRef.current = countryCode

      /**
       * To ensure, we actually call onChange every time,
       * even if the value is undefined
       */
      updateValue('invalidate')

      handleChange(
        phoneNumber ? joinValue([countryCode, phoneNumber]) : emptyValue,
        {
          countryCode,
          phoneNumber,
        }
      )

      onCountryCodeChange?.(countryCode)
    },
    [emptyValue, updateValue, handleChange, onCountryCodeChange]
  )

  const handleNumberChange = useCallback(
    (value: string) => {
      const phoneNumber = value || emptyValue
      const countryCode = countryCodeRef.current || emptyValue
      phoneNumberRef.current = phoneNumber || emptyValue

      handleChange(
        phoneNumber ? joinValue([countryCode, phoneNumber]) : emptyValue,
        {
          countryCode,
          phoneNumber,
        }
      )

      onNumberChange?.(phoneNumber)
    },
    [emptyValue, handleChange, onNumberChange]
  )

  const onFocusHandler = useCallback(
    ({ updateData }) => {
      if (dataRef.current.length < 10) {
        dataRef.current = getCountryData({
          lang,
          filter: filterCountries,
        })
        updateData(dataRef.current)
      }
      handleFocus()
    },
    [handleFocus, lang, filterCountries]
  )

  const isNorway = countryCodeRef.current.includes('47')

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-phone-number', className)}
      width={width !== 'stretch' ? width : undefined}
      info={info}
      warning={warning}
      error={error}
      {...pickSpacingProps(props)}
    >
      <Flex.Horizontal align="baseline">
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
          placeholder={
            placeholder ?? (isNorway ? defaultPlaceholder : undefined)
          }
          mask={
            numberMask ?? (isNorway ? defaultMask : Array(12).fill(/\d/))
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

function makeObject(country: CountryType, lang: string) {
  return {
    selectedKey: `+${country.cdc}`,
    selected_value: `${country.iso} (+${country.cdc})`,
    content: `+${country.cdc} ${country.i18n[lang] ?? country.i18n.en}`,
  }
}

type GetCountryData = {
  lang?: string
  filter?: Props['filterCountries']
}
function getCountryData({
  lang = 'en',
  filter = null,
}: GetCountryData = {}) {
  return countries
    .filter((country) => {
      if (typeof filter === 'function') {
        return filter(country)
      }

      return !filter || `+${country.cdc}` === filter
    })
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
