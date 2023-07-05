import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps & {
  validate?: boolean
}

export default function NationalIdentityNumberInput(props: Props) {
  const sharedContext = useContext(SharedContext)
  const { validate = true } = props

  const stringInputProps: Props = {
    ...props,
    inputClassName: 'dnb-forms-data-input-national-identity-number',
    pattern: props.pattern ?? (validate ? '^[0-9]{11}$' : undefined),
    label:
      props.label ??
      sharedContext?.translation.Forms.nationalIdentityNumberLabel,
    errorMessages: {
      required:
        sharedContext?.translation.Forms
          .nationalIdentityNumberErrorRequired,
      pattern:
        sharedContext?.translation.Forms
          .nationalIdentityNumberErrorPattern,
      ...props.errorMessages,
    },
  }

  return <StringComponent {...stringInputProps} />
}
