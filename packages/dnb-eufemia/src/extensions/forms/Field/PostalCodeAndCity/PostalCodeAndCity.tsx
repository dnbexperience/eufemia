import React, { useMemo } from 'react'
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

  const {
    mask: postalCodeMask = isNorway ? [/\d/, /\d/, /\d/, /\d/] : undefined,
    pattern: postalCodePattern = isNorway ? '^[0-9]{4}$' : undefined,
    placeholder: postalCodePlaceHolder = isNorway ? '0000' : undefined,
    className: postalCodeClassName,
    label: postalCodeLabel,
    width: postalCodeWidth,
    errorMessages: postalCodeErrorMessages,
  } = postalCode

  const postalCodeValidationProps = useMemo(() => {
    return {
      mask: postalCodeMask,
      pattern: postalCodePattern,
      placeholder: postalCodePlaceHolder,
    }
  }, [postalCodePattern, postalCodePlaceHolder, postalCodeMask, isNorway])

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
        pattern={postalCodeValidationProps.pattern}
        mask={postalCodeValidationProps.mask}
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
        placeholder={postalCodeValidationProps.placeholder}
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
