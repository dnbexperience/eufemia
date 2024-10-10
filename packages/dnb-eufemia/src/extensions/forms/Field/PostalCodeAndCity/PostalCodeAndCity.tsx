import React, { useMemo } from 'react'
import classnames from 'classnames'
import { Props as FieldBlockProps } from '../../FieldBlock'
import StringField, { Props as StringFieldProps } from '../String'
import CompositionField from '../Composition'
import { FieldHelpProps, Path } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import useDataValue from '../../hooks/useDataValue'

export type Props = FieldHelpProps &
  Omit<FieldBlockProps, 'children'> &
  Partial<Record<'postalCode' | 'city', StringFieldProps>> & {
    /**
     * Defines which country the postal code and city is for.
     * Setting it to anything other than `no` will remove the default norwegian postal code pattern.
     * You can also use the value of another field to define the country, by using a path value i.e. `/myCountryPath`.
     * Default: `no`
     */
    // Add type for all country codes?
    country?: Path | 'no' | string
  }

function PostalCodeAndCity(props: Props) {
  const translations = useTranslation()
  const { getSourceValue } = useDataValue()

  const {
    postalCode = {},
    city = {},
    help,
    width = 'large',
    country = 'no',
    ...fieldBlockProps
  } = props

  const countryValue = getSourceValue(country)

  const isNorway = useMemo(() => countryValue === 'no', [countryValue])

  const postalCodeValidationProps = useMemo(() => {
    return {
      mask:
        postalCode.mask ?? isNorway
          ? [/\d/, /\d/, /\d/, /\d/]
          : postalCode.mask,
      pattern: postalCode.pattern ?? isNorway ? '^[0-9]{4}$' : '',
      placeholder: postalCode.placeholder ?? isNorway ? '0000' : '',
    }
  }, [
    postalCode.pattern,
    postalCode.placeholder,
    postalCode.mask,
    isNorway,
  ])

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
          postalCode.className
        )}
        label={postalCode.label ?? translations.PostalCode.label}
        errorMessages={{
          required: translations.PostalCode.errorRequired,
          pattern: translations.PostalCode.errorPattern,
          ...postalCode.errorMessages,
        }}
        placeholder={postalCodeValidationProps.placeholder}
        width={postalCode.width ?? false}
        inputClassName="dnb-forms-field-postal-code-and-city__postal-code-input"
        inputMode="numeric"
        autoComplete="postal-code"
      />
      <StringField
        {...city}
        className={classnames(
          'dnb-forms-field-postal-code-and-city__city',
          city.className
        )}
        label={city.label ?? translations.City.label}
        errorMessages={{
          required: translations.City.errorRequired,
          pattern: translations.City.errorPattern,
          ...city.errorMessages,
        }}
        pattern={city.pattern ?? '^[A-Za-zÆØÅæøå -]+$'}
        trim
        width="stretch"
        autoComplete="address-level2"
        help={help}
      />
    </CompositionField>
  )
}

PostalCodeAndCity._supportsSpacingProps = true
export default PostalCodeAndCity
