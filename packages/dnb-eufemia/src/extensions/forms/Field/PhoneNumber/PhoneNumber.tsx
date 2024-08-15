import React, { useMemo, useContext, useCallback } from 'react'
import { Autocomplete, Flex } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
import classnames from 'classnames'
import countries, {
  type CountryLang,
  type CountryType,
} from '../../constants/countries'
import StringField, { Props as StringFieldProps } from '../String'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
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
import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'
import { DrawerListDataObject } from '../../../../fragments/DrawerList'

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

// Important for the default value to be defined here, and not after the useFieldProps call, to avoid the UI jumping
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
  const translations = useTranslation()
  const lang = sharedContext.locale?.split('-')[0] as CountryLang

  const countryCodeRef = React.useRef<Props['value']>(props?.emptyValue)
  const numberRef = React.useRef<Props['value']>(props?.emptyValue)
  const dataRef = React.useRef<Array<DrawerListDataObject>>(null)
  const langRef = React.useRef<string>(lang)
  const wasFilled = React.useRef<boolean>(false)

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.PhoneNumber.errorRequired,
    pattern: translations.PhoneNumber.errorRequired,
  })

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
    label = translations.PhoneNumber.label,
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
    setHasFocus,
    handleChange,
    onCountryCodeChange,
    onNumberChange,
    filterCountries = ccFilter !== 'Prioritized'
      ? makeCountryFilterSet(ccFilter)
      : undefined,
  } = useFieldProps(preparedProps)

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
      filter:
        // Make sure the whole cc list is displayed when cc filter is set to specific region
        ccFilter === 'Prioritized' && !wasFilled.current
          ? (country) =>
              `${formatCountryCode(country.cdc)}` ===
              countryCodeRef.current
          : filterCountries,
      sort: ccFilter as Extract<CountryFilterSet, 'Prioritized'>,
      makeObject,
    })
  }, [lang, filterCountries, ccFilter])

  const getEventValues = useCallback(
    ({
      countryCode = countryCodeRef.current || emptyValue,
      phoneNumber = numberRef.current || emptyValue,
    } = {}) => {
      return {
        ...(!omitCountryCodeField ? { countryCode } : {}),
        phoneNumber,
      }
    },
    [omitCountryCodeField, emptyValue]
  )

  const callOnChange = useCallback(
    ({ countryCode = undefined, phoneNumber = undefined }) => {
      const eventValues = getEventValues({ countryCode, phoneNumber })
      handleChange(
        joinValue([eventValues.countryCode, eventValues.phoneNumber]),
        eventValues
      )
    },
    [getEventValues, handleChange]
  )

  const callOnBlurOrFocus = useCallback(
    (hasFocus: boolean) => {
      setHasFocus(hasFocus, undefined, getEventValues())
    },
    [setHasFocus, getEventValues]
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

  const handleOnBlur = useCallback(() => {
    callOnBlurOrFocus(false)
  }, [callOnBlurOrFocus])

  const handleOnFocus = useCallback(() => {
    callOnBlurOrFocus(true)
  }, [callOnBlurOrFocus])

  const handleCountryCodeFocus = useCallback(
    ({ updateData }) => {
      if (!wasFilled.current) {
        wasFilled.current = true
        updateCurrentDataSet()
        updateData(dataRef.current)
      }
      handleOnFocus()
    },
    [handleOnFocus, updateCurrentDataSet]
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
          const countryCode = (countryCodeRef.current = formatCountryCode(
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
              countryCodeLabel ?? translations.PhoneNumber.countryCodeLabel
            }
            data={dataRef.current}
            value={countryCodeRef.current}
            status={hasError ? 'error' : undefined}
            disabled={disabled}
            on_focus={handleCountryCodeFocus}
            on_blur={handleOnBlur}
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
          emptyValue={emptyValue}
          layout="vertical"
          label={label}
          placeholder={
            placeholder ?? (isDefault ? defaultPlaceholder : undefined)
          }
          mask={
            numberMask ?? (isDefault ? defaultMask : Array(12).fill(/\d/))
          }
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
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
    selectedKey: formatCountryCode(country.cdc),
    selected_value: `${country.iso} (${formatCountryCode(country.cdc)})`,
    content: `${formatCountryCode(country.cdc)} ${
      country.i18n[lang] ?? country.i18n.en
    }`,
  }
}

function formatCountryCode(value: string) {
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
