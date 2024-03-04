import React from 'react'
import classnames from 'classnames'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import StringField, { Props as StringFieldProps } from '../String'
import { FieldHelpProps } from '../../types'
import { useLocale } from '../../../../shared/useLocale'

export type Props = FieldHelpProps &
  Omit<FieldBlockProps, 'children'> &
  Record<'postalCode' | 'city', StringFieldProps>

function PostalCodeAndCity(props: Props) {
  const translations = useLocale().Forms

  const {
    postalCode = {},
    city = {},
    help,
    width = 'large',
    ...fieldBlockProps
  } = props

  return (
    <FieldBlock
      className={classnames(
        'dnb-forms-field-postal-code-and-city',
        props.className
      )}
      {...fieldBlockProps}
      width={width}
      composition
    >
      <StringField
        {...postalCode}
        pattern={postalCode.pattern ?? '^[0-9]{4}$'}
        mask={[/\d/, /\d/, /\d/, /\d/]}
        className={classnames(
          'dnb-forms-field-postal-code-and-city__postal-code',
          postalCode.className
        )}
        label={postalCode.label ?? translations.postalCode.label}
        errorMessages={{
          required: translations.postalCode.error.required,
          pattern: translations.postalCode.error.pattern,
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
        label={city.label ?? translations.city.label}
        errorMessages={{
          required: translations.city.error.required,
          ...city.errorMessages,
        }}
        width="stretch"
        autoComplete="address-level2"
        help={help}
      />
    </FieldBlock>
  )
}

PostalCodeAndCity._supportsSpacingProps = true
export default PostalCodeAndCity
