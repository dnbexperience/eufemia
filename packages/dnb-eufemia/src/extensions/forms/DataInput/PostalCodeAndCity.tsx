import React, { useContext } from 'react'
import classnames from 'classnames'
import SharedContext from '../../../shared/Context'
import FieldGroup, { Props as FieldGroupProps } from '../FieldGroup'
import StringComponent, { Props as StringComponentProps } from './String'

export type Props = Omit<FieldGroupProps, 'children'> &
  Record<'postalCode' | 'city', StringComponentProps> & {
    width?: false | 'medium' | 'large'
  }

export default function DataInputPostalCodeAndCity(props: Props) {
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
        'dnb-forms-data-input-postal-code-and-city',
        props.className
      )}
      data-testid={
        props['data-testid'] ?? 'data-input-postal-code-and-city'
      }
      {...fieldGroupProps}
    >
      <div
        className={classnames(
          'dnb-forms-data-input-postal-code-and-city__fields',
          width !== false &&
            `dnb-forms-data-input-postal-code-and-city--width-${width}`
        )}
      >
        <StringComponent
          {...postalCode}
          pattern={postalCode.pattern ?? '^[0-9]{4}$'}
          className={classnames(
            'dnb-forms-data-input-postal-code-and-city__postal-code',
            postalCode.className
          )}
          label={
            postalCode.label ??
            sharedContext?.translation.Forms.postalCodeLabel
          }
          placeholder={postalCode.placeholder ?? '0000'}
          width={false}
          inputClassName="dnb-forms-data-input-postal-code-and-city__postal-code-input"
        />
        <StringComponent
          {...city}
          className={classnames(
            'dnb-forms-data-input-postal-code-and-city__city',
            city.className
          )}
          label={city.label ?? sharedContext?.translation.Forms.cityLabel}
          width={false}
        />
      </div>
    </FieldGroup>
  )
}
