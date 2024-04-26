import React from 'react'
import classnames from 'classnames'
import { Props as FieldBlockProps } from '../../FieldBlock'
import StringField, { Props as StringFieldProps } from '../String'
import CompositionField from '../Composition'
import { FieldHelpProps } from '../../types'
import useTranslation from '../../hooks/useTranslation'

export type Props = FieldHelpProps &
  Omit<FieldBlockProps, 'children'> &
  Partial<Record<'postalCode' | 'city', StringFieldProps>>

function PostalCodeAndCity(props: Props) {
  const translations = useTranslation()

  const {
    postalCode = {},
    city = {},
    help,
    width = 'large',
    ...fieldBlockProps
  } = props

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
        pattern={postalCode.pattern ?? '^[0-9]{4}$'}
        mask={[/\d/, /\d/, /\d/, /\d/]}
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
        placeholder={postalCode.placeholder ?? '0000'}
        width={false}
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
