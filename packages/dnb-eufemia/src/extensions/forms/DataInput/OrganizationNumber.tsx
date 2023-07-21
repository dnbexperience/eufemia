import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps & {
  validate?: boolean
}

export default function DataInputOrganizationNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const { validate = true } = props

  const stringInputProps: Props = {
    ...props,
    className: 'dnb-forms-data-input-organization-number',
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
    width: props.width ?? 'medium',
  }

  return <StringComponent {...stringInputProps} />
}
