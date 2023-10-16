import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps & {
  validate?: boolean
  omitMask?: boolean
}

function OrganizationNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const { validate = true, omitMask } = props

  const stringComponentProps: Props = {
    ...props,
    className: 'dnb-forms-field-organization-number',
    pattern: props.pattern ?? (validate ? '^[0-9]{9}$' : undefined),
    label:
      props.label ??
      sharedContext?.translation.Forms.organizationNumberLabel,
    errorMessages: {
      required:
        sharedContext?.translation.Forms.organizationNumberErrorRequired,
      pattern:
        sharedContext?.translation.Forms.organizationNumberErrorPattern,
      ...props.errorMessages,
    },
    mask: omitMask
      ? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
      : [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
    width: props.width ?? 'medium',
  }

  return <StringComponent {...stringComponentProps} />
}

OrganizationNumber._supportsSpacingProps = true
export default OrganizationNumber
