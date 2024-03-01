import React, { useContext } from 'react'
import classnames from 'classnames'
import SharedContext from '../../../../shared/Context'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import StringField, { Props as StringFieldProps } from '../String'
import { FieldHelpProps } from '../../types'

export type Props = FieldHelpProps &
  Omit<FieldBlockProps, 'children'> &
  Record<'postalCode' | 'city', StringFieldProps>

function PostalCodeAndCity(props: Props) {
  const sharedContext = useContext(SharedContext)

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
        label={
          postalCode.label ??
          sharedContext?.translation.Forms.postalCodeLabel
        }
        errorMessages={{
          required:
            sharedContext?.translation.Forms.postalCodeErrorRequired,
          pattern: sharedContext?.translation.Forms.postalCodeErrorPattern,
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
        label={city.label ?? sharedContext?.translation.Forms.cityLabel}
        errorMessages={{
          required: sharedContext?.translation.Forms.cityErrorRequired,
          ...city.errorMessages,
        }}
        width="stretch"
        help={help}
      />
    </FieldBlock>
  )
}

PostalCodeAndCity._supportsSpacingProps = true
export default PostalCodeAndCity
