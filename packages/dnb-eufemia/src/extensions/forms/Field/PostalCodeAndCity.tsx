import React, { useContext } from 'react'
import classnames from 'classnames'
import SharedContext from '../../../shared/Context'
import FieldGroup, { Props as FieldGroupProps } from '../FieldGroup'
import StringComponent, { Props as StringComponentProps } from './String'

export type Props = Omit<FieldGroupProps, 'children'> &
  Record<'postalCode' | 'city', StringComponentProps> & {
    width?: 'small' | 'medium' | 'large'
  }

function PostalCodeAndCity(props: Props) {
  const sharedContext = useContext(SharedContext)

  const {
    postalCode = {},
    city = {},
    width = 'large',
    ...fieldGroupProps
  } = props

  return (
    <FieldGroup
      className={classnames(
        'dnb-forms-field-postal-code-and-city',
        props.className,
      )}
      {...fieldGroupProps}
    >
      <div
        className={classnames(
          'dnb-forms-field-postal-code-and-city__fields',
          width !== undefined &&
            `dnb-forms-field-postal-code-and-city--width-${width}`,
        )}
      >
        <StringComponent
          {...postalCode}
          pattern={postalCode.pattern ?? '^[0-9]{4}$'}
          className={classnames(
            'dnb-forms-field-postal-code-and-city__postal-code',
            postalCode.className,
          )}
          label={
            postalCode.label ??
            sharedContext?.translation.Forms.postalCodeLabel
          }
          errorMessages={{
            required:
              sharedContext?.translation.Forms.postalCodeErrorRequired,
            pattern:
              sharedContext?.translation.Forms.postalCodeErrorPattern,
            ...postalCode.errorMessages,
          }}
          placeholder={postalCode.placeholder ?? '0000'}
          width={false}
          inputClassName="dnb-forms-field-postal-code-and-city__postal-code-input"
        />
        <StringComponent
          {...city}
          className={classnames(
            'dnb-forms-field-postal-code-and-city__city',
            city.className,
          )}
          label={city.label ?? sharedContext?.translation.Forms.cityLabel}
          errorMessages={{
            required: sharedContext?.translation.Forms.cityErrorRequired,
            ...city.errorMessages,
          }}
          width="stretch"
        />
      </div>
    </FieldGroup>
  )
}

PostalCodeAndCity._supportsEufemiaSpacingProps = true
export default PostalCodeAndCity
