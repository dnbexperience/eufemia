import React, {
  useMemo,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import * as z from 'zod'
import { Autocomplete } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
import classnames from 'classnames'
import {
  CountryISO,
  type CountryLang,
  type CountryType,
} from '../../constants/countries'
import useCountries from '../SelectCountry/useCountries'
import StringField, { Props as StringFieldProps } from '../String'
import CompositionField, {
  Props as CompositionFieldProps,
} from '../Composition'
import { useFieldProps } from '../../hooks'
import { FieldPropsWithExtraValue, Schema } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import SharedContext from '../../../../shared/Context'
import {
  countryFilter,
  CountryFilterSet,
  getCountryData,
} from '../SelectCountry'
import useTranslation from '../../hooks/useTranslation'
import { DrawerListDataArrayItem } from '../../../../fragments/DrawerList'

export type AdditionalArgs = {
  phoneNumber: string
  countryCode: string
  iso?: string
}

export type Props = Omit<
  FieldPropsWithExtraValue<string, AdditionalArgs, undefined | string>,
  'layout' | 'layoutOptions' | 'labelSize'
> & {
  countryCodeFieldClassName?: string
  numberFieldClassName?: string
  countryCodePlaceholder?: string
  countryCodeLabel?: React.ReactNode | false
  numberLabel?: React.ReactNode | false
  numberMask?: InputMaskedProps['mask']
  pattern?: StringFieldProps['pattern']
  width?: 'large' | 'stretch'
  inputRef?: React.RefObject<HTMLInputElement>
  omitCountryCodeField?: boolean
  onCountryCodeChange?: (value: string | undefined) => void
  onNumberChange?: (value: string | undefined) => void

  /**
   * Defines the countries to filter. Can be `Scandinavia`, `Nordic`, `Europe` or `Prioritized`.
   * Defaults to `Prioritized`.
   */
  countries?: CountryFilterSet

  /**
   * Use this prop to filter out certain countries. The function receives the country object and should return a boolean. Returning `false` will omit the country.
   */
  filterCountries?: (country: CountryType) => boolean

  /**
   * For internal testing purposes
   */
  noAnimation?: boolean
} & Pick<StringFieldProps, 'size'>

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

type EventValues = {
  countryCode?: string
  phoneNumber?: string
}

function PhoneNumber(props: Props = {}) {
  const sharedContext = useContext(SharedContext)
  const {
    label: defaultLabel,
    countryCodeLabel: defaultCountryCodeLabel,
    errorRequired,
  } = useTranslation().PhoneNumber
  const lang = sharedContext.locale?.split('-')[0] as CountryLang

  const countryCodeRef = useRef<Props['value']>(props.emptyValue)
  const prevCountryCodeRef = useRef(countryCodeRef.current)
  const numberRef = useRef<Props['value']>(props.emptyValue)
  const dataRef = useRef<Array<DrawerListDataArrayItem>>(null)
  const langRef = useRef<string>(lang)
  const wasFilled = useRef<boolean>(false)
  const currentCountryRef = useRef<CountryType>()

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorRequired,
      ...props.errorMessages,
    }),
    [errorRequired, props.errorMessages]
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

  const fromExternal = useCallback(
    (external: string) => {
      if (typeof external === 'string') {
        const [countryCode, phoneNumber] = splitValue(external)
        if (!countryCode && !phoneNumber && !props.omitCountryCodeField) {
          return countryCodeRef.current
        }
      }
      return external
    },
    [props.omitCountryCodeField]
  )

  const toEvent = useCallback(
    (value: string) => {
      const [, phoneNumber] = splitValue(value)
      if (!phoneNumber) {
        return props.emptyValue
      }
      return value
    },
    [props.emptyValue]
  )

  const customTransformIn = props.transformIn
  const transformIn = useCallback(
    (value: string) => {
      if (customTransformIn) {
        const external = customTransformIn(value)

        if (typeof external === 'string') {
          return external
        }

        if (external?.phoneNumber) {
          return joinValue([external.countryCode, external.phoneNumber])
        }
      }

      return value
    },
    [customTransformIn]
  )

  const provideAdditionalArgs = useCallback(
    (value: string) => {
      const [countryCode, phoneNumber] = splitValue(value)

      return {
        ...(!props.omitCountryCodeField
          ? {
              countryCode:
                countryCode || countryCodeRef.current || undefined,
            }
          : {}),
        phoneNumber: phoneNumber || numberRef.current || undefined,
        iso: currentCountryRef.current?.iso,
      } satisfies AdditionalArgs | Omit<AdditionalArgs, 'countryCode'>
    },
    [props.omitCountryCodeField]
  )

  const schema = useMemo<Schema<string> | undefined>(() => {
    if (props.schema) {
      return props.schema
    }

    if (!props.pattern) return undefined
    // Use Zod internally when only pattern is provided
    return (p: Props) => {
      let s = z.string()
      if (p?.pattern) {
        try {
          s = s.regex(new RegExp(p.pattern, 'u'), 'Field.errorPattern')
        } catch (_e) {
          // Ignore invalid regex patterns
        }
      }
      return s
    }
  }, [props.schema, props.pattern])
  const defaultProps: Partial<Props> = {
    ...(schema ? { schema } : {}),
    errorMessages,
  }
  const ref = useRef<HTMLInputElement>()
  const preparedProps: Props = {
    ...props,
    ...defaultProps,
    validateRequired,
    fromExternal,
    toEvent,
    provideAdditionalArgs,
    transformIn,
    inputRef: props.inputRef ?? ref,
  }

  const {
    id,
    path,
    itemPath,
    value,
    className,
    inputRef,
    countryCodeFieldClassName,
    numberFieldClassName,
    countryCodePlaceholder,
    placeholder,
    countryCodeLabel,
    label,
    labelDescription,
    numberLabel,
    labelSrOnly,
    numberMask,
    countries: ccFilter = 'Prioritized',
    emptyValue,
    info,
    warning,
    size,
    error,
    hasError,
    disabled,
    width,
    help,
    required,
    validateInitially,
    validateContinuously,
    validateUnchanged,
    omitCountryCodeField,
    setHasFocus,
    handleChange,
    setDisplayValue,
    onCountryCodeChange,
    onNumberChange,
    filterCountries,
  } = useFieldProps(preparedProps, {
    executeOnChangeRegardlessOfUnchangedValue: true,
  })

  useEffect(() => {
    if (path || itemPath) {
      const number = inputRef.current?.value
      setDisplayValue(
        number?.length > 0
          ? joinValue([countryCodeRef.current, number])
          : undefined
      )
    }
  }, [inputRef, itemPath, path, setDisplayValue, value])

  const filter = useCallback(
    (country: CountryType) => {
      return countryFilter(country, filterCountries, ccFilter)
    },
    [ccFilter, filterCountries]
  )

  const { countries } = useCountries()

  const updateCurrentDataSet = useCallback(() => {
    dataRef.current = getCountryData({
      countries,
      lang,
      filter:
        // Make sure the whole cc list is displayed when cc filter is set to specific region
        ccFilter === 'Prioritized' && !wasFilled.current
          ? (country) =>
              `${formatCountryCode(country.cdc)}` ===
              countryCodeRef.current
          : filter,
      sort: ccFilter as Extract<CountryFilterSet, 'Prioritized'>,
      makeObject,
    })
  }, [countries, lang, ccFilter, filter])

  const prepareEventValues = useCallback(
    ({
      countryCode = countryCodeRef.current || emptyValue,
      phoneNumber = numberRef.current || emptyValue,
    }: EventValues = {}) => {
      if (!currentCountryRef.current) {
        type Item = DrawerListDataArrayItem & { country: CountryType }

        const cdcVal = countryCode?.replace(/^\+/, '')
        const item = dataRef.current.find((item: Item) => {
          const cdc = item?.country?.cdc
          return cdc === cdcVal
        }) as Item

        currentCountryRef.current = item?.country
      }

      return {
        ...(!omitCountryCodeField ? { countryCode } : {}),
        phoneNumber,
        iso: currentCountryRef.current?.iso as CountryISO,
      }
    },
    [emptyValue, omitCountryCodeField]
  )

  const callOnChange = useCallback(
    (data: EventValues) => {
      const eventValues = prepareEventValues(data)

      handleChange(
        toEvent(
          joinValue([eventValues.countryCode, eventValues.phoneNumber])
        ),
        eventValues
      )
    },
    [prepareEventValues, handleChange]
  )

  const callOnBlurOrFocus = useCallback(
    (hasFocus: boolean) => {
      const eventValues = prepareEventValues()
      setHasFocus(hasFocus, undefined, eventValues)
    },
    [prepareEventValues, setHasFocus]
  )

  /**
   * We do not process the whole country list at the first render.
   * Only when the Autocomplete opens (focus).
   * To achieve this, we use memo instead of effect to update refs in sync.
   *
   * We set or update the data list depending on if the country code changes or lang changes.
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

  const handleCountryCodeChange = useCallback(
    ({
      data,
    }: {
      data: { selectedKey: string; country: CountryType }
    }) => {
      const countryCode = (countryCodeRef.current =
        data?.selectedKey?.trim() || emptyValue)
      currentCountryRef.current = data?.country

      // If the phone number is more than 8 digits, and the country code is the default one (+47),
      // we truncate the phone number to 8 digits.
      // This is to ensure that the phone number does not exceed the maximum length set by the mask.
      // TODO: This is a temporary solution, and should be removed once the mask is updated to handle this case.
      if (
        !numberMask &&
        countryCodeRef.current?.includes(defaultCountryCode) &&
        numberRef.current?.length > 8
      ) {
        const truncatedNumber = numberRef.current.substring(0, 8)
        callOnChange({
          countryCode,
          phoneNumber: truncatedNumber,
        })
        onNumberChange?.(truncatedNumber)
      } else {
        callOnChange({ countryCode })
      }
      onCountryCodeChange?.(countryCode)
    },
    [
      emptyValue,
      numberMask,
      onCountryCodeChange,
      callOnChange,
      onNumberChange,
    ]
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
    [callOnChange, countries, updateCurrentDataSet]
  )

  const isDefault = countryCodeRef.current?.includes(defaultCountryCode)

  const compositionFieldProps: CompositionFieldProps = {
    id,
    className: classnames('dnb-forms-field-phone-number', className),
    width: 'stretch',
    label,
    labelDescription,
    labelSrOnly,
    help: undefined,
    ...pickSpacingProps(props),
  }

  return (
    <CompositionField {...compositionFieldProps}>
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
            countryCodeLabel === false
              ? defaultCountryCodeLabel
              : countryCodeLabel ?? defaultCountryCodeLabel
          }
          label_sr_only={countryCodeLabel === false ? true : undefined}
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
          selectall
          autoComplete="tel-country-code"
          no_animation={props.noAnimation}
          size={size}
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
        label={
          numberLabel === false
            ? defaultLabel
            : numberLabel ?? defaultLabel
        }
        labelSrOnly={numberLabel === false ? true : undefined}
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
        innerRef={inputRef}
        info={info}
        warning={warning}
        error={error}
        disabled={disabled}
        width={
          width === 'stretch'
            ? 'stretch'
            : props.omitCountryCodeField && width === 'large'
            ? 'large'
            : 'medium'
        }
        help={{ ...help, breakout: false, outset: false }}
        required={required}
        errorMessages={errorMessages}
        validateInitially={validateInitially}
        validateContinuously={validateContinuously}
        validateUnchanged={validateUnchanged}
        inputMode="tel"
        size={size}
      />
    </CompositionField>
  )
}

function makeObject(country: CountryType, lang: string) {
  const name = country.i18n[lang] ?? country.i18n.en
  const code = formatCountryCode(country.cdc)
  return {
    selectedKey: code,
    selected_value: `${country.iso} (${code})`,
    search_content: [code, name],
    content: [name, code],
    country,
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

PhoneNumber._supportsSpacingProps = undefined
export default PhoneNumber
