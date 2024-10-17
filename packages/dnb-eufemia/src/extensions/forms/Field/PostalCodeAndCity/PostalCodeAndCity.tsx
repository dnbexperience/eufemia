import React, { useCallback, useMemo } from 'react'
import classnames from 'classnames'
import { Props as FieldBlockProps } from '../../FieldBlock'
import StringField, { Props as StringFieldProps } from '../String'
import CompositionField from '../Composition'
import { FieldHelpProps, Path } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import useDataValue from '../../hooks/useDataValue'
import { COUNTRY as defaultCountry } from '../../../../shared/defaults'

export type Props = FieldHelpProps &
  Omit<FieldBlockProps, 'children'> &
  Partial<Record<'postalCode' | 'city', StringFieldProps>> & {
    /**
     * Defines which country the postal code and city is for.
     * Setting it to anything other than `no` will remove the default norwegian postal code pattern.
     * You can also use the value of another field to define the country, by using a path value i.e. `/myCountryPath`.
     * Default: `NO`
     */
    // Add type for all country codes?
    country?: Path | string
  }

function PostalCodeAndCity(props: Props) {
  const translations = useTranslation()
  const { getSourceValue } = useDataValue()

  const {
    postalCode = {},
    city = {},
    help,
    width = 'large',
    country = defaultCountry,
    ...fieldBlockProps
  } = props

  const countryValue = getSourceValue(country)

  const isNorway = useMemo(
    () => countryValue === defaultCountry,
    [countryValue]
  )

  const {
    pattern: cityPattern,
    className: cityClassName,
    label: cityLabel,
    width: cityWidth,
    errorMessages: cityErrorMessages,
  } = city

  const handleNorwegianDefaults = useCallback(
    (postalCode: StringFieldProps) => {
      const props = { ...postalCode }

      if (isNorway) {
        props.mask = postalCode.mask ?? [/\d/, /\d/, /\d/, /\d/]
        props.pattern = postalCode.pattern ?? '^[0-9]{4}$'
        props.placeholder = postalCode.placeholder ?? '0000'
      }

      return props
    },
    [isNorway]
  )

  const {
    mask: postalCodeMask,
    pattern: postalCodePattern,
    placeholder: postalCodePlaceHolder,
    className: postalCodeClassName,
    label: postalCodeLabel,
    width: postalCodeWidth,
    errorMessages: postalCodeErrorMessages,
  } = handleNorwegianDefaults(postalCode)

  const postalCodeValidationProps = {
    mask: postalCodeMask,
    pattern: postalCodePattern,
    placeholder: postalCodePlaceHolder,
  }

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
        {...postalCodeValidationProps}
        className={classnames(
          'dnb-forms-field-postal-code-and-city__postal-code',
          postalCodeClassName
        )}
        label={postalCodeLabel ?? translations.PostalCode.label}
        errorMessages={{
          required: translations.PostalCode.errorRequired,
          pattern: translations.PostalCode.errorPattern,
          ...postalCodeErrorMessages,
        }}
        width={postalCodeWidth ?? false}
        inputClassName="dnb-forms-field-postal-code-and-city__postal-code-input"
        inputMode="numeric"
        autoComplete="postal-code"
      />
      <StringField
        {...city}
        className={classnames(
          'dnb-forms-field-postal-code-and-city__city',
          cityClassName
        )}
        label={cityLabel ?? translations.City.label}
        errorMessages={{
          required: translations.City.errorRequired,
          pattern: translations.City.errorPattern,
          ...cityErrorMessages,
        }}
        pattern={cityPattern ?? '^[A-Za-zÆØÅæøå -]+$'}
        trim
        width={cityWidth ?? 'stretch'}
        autoComplete="address-level2"
        help={help}
      />
    </CompositionField>
  )
}

PostalCodeAndCity._supportsSpacingProps = true
export default PostalCodeAndCity
