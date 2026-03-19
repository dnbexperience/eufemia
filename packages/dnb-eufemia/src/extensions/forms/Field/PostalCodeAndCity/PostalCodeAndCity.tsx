import React, { useCallback, useContext } from 'react'
import clsx from 'clsx'
import type { Props as FieldBlockProps } from '../../FieldBlock'
import DataContext from '../../DataContext/Context'
import type { Props as StringFieldProps } from '../String'
import StringField from '../String'
import CompositionField from '../Composition'
import type { CountryCode } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import useErrorMessages from '../../hooks/useErrorMessages'
import useDataValue from '../../hooks/useDataValue'
import { COUNTRY as defaultCountry } from '../../../../shared/defaults'
import type { SpacingProps } from '../../../../shared/types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type Props = Pick<
  FieldBlockProps,
  | 'error'
  | 'warning'
  | 'info'
  | 'width'
  | 'className'
  | 'help'
  | keyof SpacingProps
> &
  Partial<Record<'postalCode' | 'city', StringFieldProps>> & {
    /**
     * Defines which country the postal code and city is for.
     * Setting it to anything other than `no` will remove the default norwegian postal code pattern.
     * You can also use the value of another field to define the countryCode, by using a path value i.e. `/myCountryCodePath`.
     * Default: `NO`
     */
    countryCode?: CountryCode
  } & Pick<StringFieldProps, 'size'>

function PostalCodeAndCity(props: Props) {
  const translations = useTranslation()
  const { getSourceValue } = useDataValue()
  const countryCodeFromProvider = useContext(DataContext)?.countryCode

  const {
    postalCode = {},
    city = {},
    help,
    width = 'large',
    countryCode = countryCodeFromProvider ?? defaultCountry,
    size,
    ...compositionFieldProps
  } = props

  const countryCodeValue = getSourceValue(countryCode)

  const handleCityDefaults = useCallback(
    (city: StringFieldProps) => {
      const props: StringFieldProps = {}

      switch (countryCodeValue) {
        case defaultCountry: {
          props.pattern = '^[A-Za-zÆØÅæøå -]+$'
          break
        }
      }

      return { ...props, ...city }
    },
    [countryCodeValue]
  )

  const {
    pattern: cityPattern,
    className: cityClassName,
    label: cityLabel,
    width: cityWidth,
    errorMessages: cityErrorMessages,
  } = handleCityDefaults(city)

  const handlePostalCodeDefaults = useCallback(
    (postalCode: StringFieldProps) => {
      const props: StringFieldProps = {}

      switch (countryCodeValue) {
        case defaultCountry:
        case 'DK':
        case 'CH': {
          props.mask = [/\d/, /\d/, /\d/, /\d/]
          props.pattern = '^[0-9]{4}$'
          props.placeholder = '0000'
          break
        }
        default:
          props.width = '8rem'
          break
      }

      return { ...props, ...postalCode }
    },
    [countryCodeValue]
  )

  const {
    mask: postalCodeMask,
    pattern: postalCodePattern,
    placeholder: postalCodePlaceHolder,
    className: postalCodeClassName,
    label: postalCodeLabel,
    width: postalCodeWidth,
    errorMessages: postalCodeErrorMessages,
  } = handlePostalCodeDefaults(postalCode)

  const postalCodeMergedErrorMessages = useErrorMessages({
    errorRequired: translations.PostalCode.errorRequired,
    errorPattern: translations.PostalCode.errorPattern,
    propsErrorMessages: postalCodeErrorMessages,
  })

  const cityMergedErrorMessages = useErrorMessages({
    errorRequired: translations.City.errorRequired,
    errorPattern: translations.City.errorPattern,
    propsErrorMessages: cityErrorMessages,
  })

  return (
    <CompositionField
      className={clsx(
        'dnb-forms-field-postal-code-and-city',
        props.className
      )}
      {...compositionFieldProps}
      width={width}
    >
      <StringField
        size={size}
        className={clsx(
          'dnb-forms-field-postal-code-and-city__postal-code',
          postalCodeClassName
        )}
        label={postalCodeLabel ?? translations.PostalCode.label}
        mask={postalCodeMask}
        pattern={postalCodePattern}
        placeholder={postalCodePlaceHolder}
        errorMessages={postalCodeMergedErrorMessages}
        width={postalCodeWidth ?? false}
        inputClassName="dnb-forms-field-postal-code-and-city__postal-code-input"
        inputMode="numeric"
        autoComplete="postal-code"
        data-country-code={countryCode}
        {...postalCode}
      />

      <StringField
        help={help}
        size={size}
        className={clsx(
          'dnb-forms-field-postal-code-and-city__city',
          cityClassName
        )}
        label={cityLabel ?? translations.City.label}
        errorMessages={cityMergedErrorMessages}
        pattern={cityPattern}
        trim
        width={cityWidth ?? 'stretch'}
        inputClassName="dnb-forms-field-postal-code-and-city__city-input"
        autoComplete="address-level2"
        {...city}
      />
    </CompositionField>
  )
}

withComponentMarkers(PostalCodeAndCity, {
  _supportsSpacingProps: undefined,
})

export default PostalCodeAndCity
