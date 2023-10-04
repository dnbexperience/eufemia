import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps & {
  omitMask?: boolean
  validate?: boolean
}

function NationalIdentityNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const { validate = true, omitMask } = props

  const stringComponentProps: Props = {
    ...props,
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
    mask: omitMask
      ? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
      : [
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ],
    width: props.width ?? 'medium',
  }

  return <StringComponent {...stringComponentProps} />
}

NationalIdentityNumber._supportsEufemiaSpacingProps = true
export default NationalIdentityNumber
