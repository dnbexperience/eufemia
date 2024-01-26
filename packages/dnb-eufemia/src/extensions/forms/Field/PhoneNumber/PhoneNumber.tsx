import React, { useMemo, useContext, useCallback } from 'react'
import { Autocomplete, Flex } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
import classnames from 'classnames'
import countries, { CountryType } from '../../constants/countries'
import StringField, { Props as StringFieldProps } from '../String'
import FieldBlock from '../../FieldBlock'
import { useDataValue } from '../../hooks'
import {
  FieldHelpProps,
  FieldProps,
  AllJSONSchemaVersions,
} from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import SharedContext from '../../../../shared/Context'
import {
  CountryFilterSet,
  getCountryData,
  makeCountryFilterSet,
} from '../SelectCountry'

export type Props = FieldHelpProps &
  FieldProps<string, undefined | string> & {
    countryCodeFieldClassName?: string
    numberFieldClassName?: string
    countryCodePlaceholder?: string
    countryCodeLabel?: string
    numberMask?: InputMaskedProps['mask']
    pattern?: StringFieldProps['pattern']
    width?: 'large' | 'stretch'
    omitCountryCodeField?: boolean
    onCountryCodeChange?: (value: string | undefined) => void
    onNumberChange?: (value: string | undefined) => void
    countries?: CountryFilterSet

    /**
     * For internal use only.
     *
     * @param country
     * @returns boolean
     */
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

  const countryCodeRef = React.useRef(null)
  const numberRef = React.useRef(null)
  const dataRef = React.useRef(null)
  const langRef = React.useRef(lang)
  const wasFilled = React.useRef(false)

  const errorMessages = useMemo(
    () => ({
      required: tr.phoneNumberErrorRequired,
      pattern: tr.phoneNumberErrorRequired,
      ...props?.errorMessages,
    }),
    [tr, props.errorMessages]
  )

  const validateRequired = useCallback(
    (value: string, { required, isChanged, error }) => {
      if (required) {
        const [countryCode, phoneNumber] = splitValue(value)

        if (countryCode !== prevCountryCodeRef.current) {
          if (countryCode) {
            prevCountryCodeRef.current = countryCode
          }
          return undefined
        }

        if (isChanged && !phoneNumber) {
          return error
        }
      }

      return undefined
    },
    []
  )

  const schema = useMemo<AllJSONSchemaVersions>(
    () =>
      props.schema ?? {
        type: 'string',
        pattern: props.pattern,
      },
    [props.schema, props.pattern]
  )
  const defaultProps: Partial<Props> = {
    schema,
    errorMessages,
  }
  const preparedProps: Props = {
    ...props,
    ...defaultProps,
    validateRequired,
    fromExternal,
    toEvent,
  }

  const {
    value,
    className,
    countryCodeFieldClassName,
    numberFieldClassName,
    countryCodePlaceholder,
    placeholder,
    countryCodeLabel,
    label = sharedContext?.translation.Forms.phoneNumberLabel,
    numberMask,
    countries: ccFilter = 'Prioritized',
    emptyValue,
    info,
    warning,
    error,
    hasError,
    disabled,
    width = 'large',
    help,
    required,
    validateInitially,
    continuousValidation,
    validateUnchanged,
    omitCountryCodeField,
    handleFocus,
    handleBlur,
    handleChange,
    onCountryCodeChange,
    onNumberChange,
    filterCountries = ccFilter !== 'Prioritized'
      ? makeCountryFilterSet(ccFilter)
      : undefined,
  } = useDataValue(preparedProps)

  function fromExternal(external: string) {
    const [, phoneNumber] = splitValue(external)
    if (!phoneNumber && !props.omitCountryCodeField) {
      return countryCodeRef.current
    }
    return external
  }

  function toEvent(value: string) {
    const [, phoneNumber] = splitValue(value)
    if (!phoneNumber) {
      return emptyValue
    }
    return value
  }

  const updateCurrentDataSet = useCallback(() => {
    dataRef.current = getCountryData({
      lang,
      filter: !wasFilled.current
        ? (country) =>
            `${formattCountryCode(country.cdc)}` === countryCodeRef.current
        : filterCountries,
      sort: ccFilter as Extract<CountryFilterSet, 'Prioritized'>,
      makeObject,
    })
  }, [lang, filterCountries, ccFilter])

  const callOnChange = useCallback(
    ({
      countryCode = omitCountryCodeField
        ? emptyValue
        : countryCodeRef.current || emptyValue,
      phoneNumber = numberRef.current || emptyValue,
    }) => {
      handleChange(
        joinValue([countryCode, phoneNumber]),
        omitCountryCodeField
          ? { phoneNumber }
          : { countryCode, phoneNumber }
      )
    },
    [omitCountryCodeField, emptyValue, handleChange]
  )

  /**
   * We do not process the whole country list at the first render.
   * Only when the Autocomplete opens (focus).
   * To achieve this, we use memo instead of effect to update refs in sync.
   *
   * We set or update the data list depending on if the countrycode changes or lang changes.
   * We then update countryCode and phoneNumber when value changes.
   */
  useMemo(() => {
    const [countryCode, phoneNumber] = splitValue(props.value || value)
    numberRef.current = phoneNumber

    if (lang !== langRef.current || !wasFilled.current) {
      if (!countryCodeRef.current || countryCode) {
        countryCodeRef.current = countryCode || defaultCountryCode
      }
      langRef.current = lang

      updateCurrentDataSet()
    }
  }, [value, props.value, lang, updateCurrentDataSet])

  const prevCountryCodeRef = React.useRef(countryCodeRef.current)

  const handleCountryCodeChange = useCallback(
    ({ data }: { data: { selectedKey: string } }) => {
      const countryCode = (countryCodeRef.current =
        data?.selectedKey?.trim() || emptyValue)

      callOnChange({ countryCode })
      onCountryCodeChange?.(countryCode)
    },
    [emptyValue, callOnChange, onCountryCodeChange]
  )

  const handleNumberChange = useCallback(
    (value: string) => {
      const phoneNumber = (numberRef.current = value || emptyValue)

      callOnChange({ phoneNumber })
      onNumberChange?.(phoneNumber)
    },
    [emptyValue, callOnChange, onNumberChange]
  )

  const onFocusHandler = useCallback(
    ({ updateData }) => {
      if (!wasFilled.current) {
        wasFilled.current = true
        updateCurrentDataSet()
        updateData(dataRef.current)
      }
      handleFocus()
    },
    [handleFocus, updateCurrentDataSet]
  )

  const onTypeHandler = useCallback(
    ({ value, updateData, revalidateInputValue, event }) => {
      // Handle browser autofill/autocomplete
      if (typeof event?.nativeEvent?.data === 'undefined') {
        const cdcVal = /\+\d{1,3}\s{1}\d+/.test(value)
          ? splitValue(value)[0]
          : value
        const country = countries.find(({ cdc }) => cdc === cdcVal)
        if (country?.cdc) {
          const countryCode = (countryCodeRef.current = formattCountryCode(
            country.cdc
          ))

          updateCurrentDataSet()
          updateData(dataRef.current)
          callOnChange({ countryCode })

          // To ensure correct input value,
          // regardless if there is changed data before or not.
          window.requestAnimationFrame(() => {
            revalidateInputValue()
          })
        }
      }
    },
    [callOnChange, updateCurrentDataSet]
  )

  const isDefault = countryCodeRef.current?.includes(defaultCountryCode)

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-phone-number', className)}
      width={omitCountryCodeField ? undefined : width}
      info={info}
      warning={warning}
      error={error}
      disabled={disabled}
      {...pickSpacingProps(props)}
    >
      <Flex.Horizontal align="flex-end">
        {!omitCountryCodeField && (
          <Autocomplete
            className={classnames(
              'dnb-forms-field-phone-number__country-code',
              countryCodeFieldClassName
            )}
            mode="async"
            placeholder={countryCodePlaceholder}
            label_direction="vertical"
            label={
              countryCodeLabel ??
              sharedContext?.translation.Forms.countryCodeLabel
            }
            data={dataRef.current}
            value={countryCodeRef.current}
            status={hasError ? 'error' : undefined}
            disabled={disabled}
            on_focus={onFocusHandler}
            on_blur={handleBlur}
            on_change={handleCountryCodeChange}
            on_type={onTypeHandler}
            independent_width
            search_numbers
            keep_selection
            autoComplete="tel-country-code"
            no_animation={props.noAnimation}
            stretch={width === 'stretch'}
          />
        )}

        <StringField
          className={classnames(
            'dnb-forms-field-phone-number__number',
            numberFieldClassName
          )}
          type="tel"
          autoComplete="tel-national"
          emptyValue=""
          layout="vertical"
          label={label}
          placeholder={
            placeholder ?? (isDefault ? defaultPlaceholder : undefined)
          }
          mask={
            numberMask ?? (isDefault ? defaultMask : Array(12).fill(/\d/))
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleNumberChange}
          value={numberRef.current}
          info={info}
          warning={warning}
          error={error}
          disabled={disabled}
          width={omitCountryCodeField ? 'medium' : 'stretch'}
          help={help}
          required={required}
          errorMessages={errorMessages}
          validateInitially={validateInitially}
          continuousValidation={continuousValidation}
          validateUnchanged={validateUnchanged}
          inputMode="tel"
        />
      </Flex.Horizontal>
    </FieldBlock>
  )
}

function makeObject(country: CountryType, lang: string) {
  return {
    selectedKey: formattCountryCode(country.cdc),
    selected_value: `${country.iso} (${formattCountryCode(country.cdc)})`,
    content: `${formattCountryCode(country.cdc)} ${
      country.i18n[lang] ?? country.i18n.en
    }`,
  }
}

function formattCountryCode(value: string) {
  return `+${value}`
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
