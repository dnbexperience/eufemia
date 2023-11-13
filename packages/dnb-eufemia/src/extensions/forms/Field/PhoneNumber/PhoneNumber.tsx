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

// Important for the default value to be defined here, and not after the useDataValue call, to avoid the UI jumping
// back to +47 once the user empty the field so handleChange send out undefined.
const defaultCountryCode = '+47'

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
    value: '',
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
    value,
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
    onCountryCodeChange,
    onNumberChange,
  } = useDataValue(preparedProps)

  const initialValues = useMemo(() => splitValue(value), [])
  const countryCodeRef = React.useRef(
    initialValues[1] || defaultCountryCode
  )
  const phoneNumberRef = React.useRef(initialValues[2])

  useEffect(() => {
    countryCodeRef.current =
      splitValue(props.value)[1] || defaultCountryCode
    phoneNumberRef.current = splitValue(props.value)[2]
  }, [props.value])

  const singleCountryCodeData = useMemo(() => {
    return getCountryData({
      lang: sharedContext.locale?.split('-')[0],
      filter: countryCodeRef.current,
    })
  }, [props.value])

  const handleCountryCodeChange = useCallback(
    ({ data }: { data: { selectedKey: string } }) => {
      const countryCode = data?.selectedKey?.trim() ?? emptyValue
      countryCodeRef.current = countryCode

      if (!countryCode && !phoneNumberRef.current) {
        handleChange?.(emptyValue)
        onCountryCodeChange?.(emptyValue)
        return
      }

      if (countryCode && !phoneNumberRef.current) {
        onCountryCodeChange?.(countryCode)
        return
      }

      handleChange?.(
        [countryCode, phoneNumberRef.current]
          .filter(Boolean)
          .join(seperator)
      )
      onCountryCodeChange?.(countryCode)
    },
    [phoneNumberRef, emptyValue, handleChange, onCountryCodeChange]
  )

  const handleNumberChange = useCallback(
    (phoneNumber: string) => {
      phoneNumberRef.current = phoneNumber

      if (!phoneNumber) {
        handleChange?.(
          [emptyValue, emptyValue].filter(Boolean).join(seperator)
        )
        onNumberChange?.(emptyValue)
        return
      }

      handleChange?.(
        [countryCodeRef.current, phoneNumber]
          .filter(Boolean)
          .join(seperator)
      )
      onNumberChange?.(phoneNumber)
    },
    [countryCodeRef, emptyValue, handleChange, onNumberChange]
  )

  const onFocusHandler = ({ dataList, updateData }) => {
    // because there can be more than one country with same cdc
    if (dataList.length < 10) {
      updateData(
        getCountryData({ lang: sharedContext.locale?.split('-')[0] })
      )
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
          data={singleCountryCodeData}
          value={countryCodeRef.current}
          disabled={disabled}
          on_focus={onFocusHandler}
          on_blur={handleBlur}
          on_change={handleCountryCodeChange}
          independent_width
          search_numbers
          keep_value_and_selection
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

const seperator = ' '
function splitValue(value: string) {
  return value !== undefined
    ? value.match(/^(\+[^ ]+)? ?(.*)$/)
    : [undefined, '', '']
}

PhoneNumber._supportsSpacingProps = true
export default PhoneNumber
