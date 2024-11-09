import React, { useCallback } from 'react'
import classnames from 'classnames'
import { Props as FieldBlockProps } from '../../FieldBlock'
import StringField, { Props as StringFieldProps } from '../String'
import CompositionField from '../Composition'
import { Path } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import useDataValue from '../../hooks/useDataValue'
import { COUNTRY as defaultCountry } from '../../../../shared/defaults'
import { HelpProps } from '../../../../components/help-button/HelpButtonInline'

export type Props = Omit<FieldBlockProps, 'children'> &
  Partial<Record<'postalCode' | 'city', StringFieldProps>> & {
    /**
     * Defines which country the postal code and city is for.
     * Setting it to anything other than `no` will remove the default norwegian postal code pattern.
     * You can also use the value of another field to define the country, by using a path value i.e. `/myCountryPath`.
     * Default: `NO`
     */
    country?: Path | string
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
    country = defaultCountry,
    ...fieldBlockProps
  } = props

  const {
    pattern: cityPattern,
    className: cityClassName,
    label: cityLabel,
    width: cityWidth,
    errorMessages: cityErrorMessages,
  } = city

  const countryValue = getSourceValue(country)
  const handleDefaults = useCallback(
    (postalCode: StringFieldProps) => {
      const props: StringFieldProps = {}

      switch (countryValue) {
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
    [countryValue]
  )

  const {
    mask: postalCodeMask,
    pattern: postalCodePattern,
    placeholder: postalCodePlaceHolder,
    className: postalCodeClassName,
    label: postalCodeLabel,
    width: postalCodeWidth,
    errorMessages: postalCodeErrorMessages,
  } = handleDefaults(postalCode)

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
          'Field.errorRequired': translations.PostalCode.errorRequired,
          'Field.errorPattern': translations.PostalCode.errorPattern,
          ...postalCodeErrorMessages,
        }}
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
        errorMessages={{
          'Field.errorRequired': translations.City.errorRequired,
          'Field.errorPattern': translations.City.errorPattern,
          ...cityErrorMessages,
        }}
        pattern={cityPattern ?? '^[A-Za-zÆØÅæøå -]+$'}
        trim
        width={cityWidth ?? 'stretch'}
        autoComplete="address-level2"
      />
    </CompositionField>
  )
}

PostalCodeAndCity._supportsSpacingProps = true
export default PostalCodeAndCity
