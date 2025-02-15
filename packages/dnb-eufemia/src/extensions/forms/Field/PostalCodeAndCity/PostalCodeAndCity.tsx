import React, { useCallback, useMemo } from 'react'
import classnames from 'classnames'
import { Props as FieldBlockProps } from '../../FieldBlock'
import StringField, { Props as StringFieldProps } from '../String'
import CompositionField from '../Composition'
import { Path } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import useDataValue from '../../hooks/useDataValue'
import { COUNTRY as defaultCountry } from '../../../../shared/defaults'
import { HelpProps } from '../../../../components/help-button/HelpButtonInline'

export type Props = Pick<
  FieldBlockProps,
  'error' | 'warning' | 'info' | 'width' | 'className'
> &
  Partial<Record<'postalCode' | 'city', StringFieldProps>> & {
    /**
     * Defines which country the postal code and city is for.
     * Setting it to anything other than `no` will remove the default norwegian postal code pattern.
     * You can also use the value of another field to define the country, by using a path value i.e. `/myCountryPath`.
     * Default: `NO`
     */
    /**
     * @deprecated – use countryCode instead. Will be removed in v11.
     */
    country?: Path | string

    /**
     * Defines which country the postal code and city is for.
     * Setting it to anything other than `no` will remove the default norwegian postal code pattern.
     * You can also use the value of another field to define the countryCode, by using a path value i.e. `/myCountryCodePath`.
     * Default: `NO`
     */
    countryCode?: Path | string
    help?: HelpProps
  }

function PostalCodeAndCity(props: Props) {
  const translations = useTranslation()
  const { getSourceValue } = useDataValue()

  const {
    postalCode = {},
    city = {},
    help,
    width = 'large',
    country,
    countryCode = defaultCountry,
    ...fieldBlockProps
  } = props

  const countryCodeValue = getSourceValue(country || countryCode)

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

  return (
    <CompositionField
      className={classnames(
        'dnb-forms-field-postal-code-and-city',
        props.className
      )}
      {...fieldBlockProps}
      width={width}
    >
      <StringField
        {...postalCode}
        className={classnames(
          'dnb-forms-field-postal-code-and-city__postal-code',
          postalCodeClassName
        )}
        label={postalCodeLabel ?? translations.PostalCode.label}
        mask={postalCodeMask}
        pattern={postalCodePattern}
        placeholder={postalCodePlaceHolder}
        errorMessages={useMemo(
          () => ({
            'Field.errorRequired': translations.PostalCode.errorRequired,
            'Field.errorPattern': translations.PostalCode.errorPattern,
            ...postalCodeErrorMessages,
          }),
          [
            postalCodeErrorMessages,
            translations.PostalCode.errorPattern,
            translations.PostalCode.errorRequired,
          ]
        )}
        width={postalCodeWidth ?? false}
        inputClassName="dnb-forms-field-postal-code-and-city__postal-code-input"
        inputMode="numeric"
        autoComplete="postal-code"
      />

      <StringField
        help={help}
        {...city}
        className={classnames(
          'dnb-forms-field-postal-code-and-city__city',
          cityClassName
        )}
        label={cityLabel ?? translations.City.label}
        errorMessages={useMemo(
          () => ({
            'Field.errorRequired': translations.City.errorRequired,
            'Field.errorPattern': translations.City.errorPattern,
            ...cityErrorMessages,
          }),
          [
            cityErrorMessages,
            translations.City.errorPattern,
            translations.City.errorRequired,
          ]
        )}
        pattern={cityPattern}
        trim
        width={cityWidth ?? 'stretch'}
        autoComplete="address-level2"
      />
    </CompositionField>
  )
}

PostalCodeAndCity._supportsSpacingProps = true
export default PostalCodeAndCity
