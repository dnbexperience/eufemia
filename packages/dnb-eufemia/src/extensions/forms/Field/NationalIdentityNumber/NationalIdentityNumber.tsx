import React, { useContext, useMemo } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps & {
  omitMask?: boolean
  validate?: boolean
}

function NationalIdentityNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const { validate = true, omitMask } = props

  const errorMessages = useMemo(
    () => ({
      required: tr.nationalIdentityNumberErrorRequired,
      pattern: tr.nationalIdentityNumberErrorPattern,
      ...props.errorMessages,
    }),
    [tr, props.errorMessages]
  )
  const mask = useMemo(
    () =>
      omitMask
        ? [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]
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
    [omitMask]
  )

  const stringComponentProps: Props = {
    ...props,
    pattern: props.pattern ?? (validate ? '^[0-9]{11}$' : undefined),
    label:
      props.label ??
      sharedContext?.translation.Forms.nationalIdentityNumberLabel,
    errorMessages,
    mask,
    width: props.width ?? 'medium',
  }

  return <StringComponent {...stringComponentProps} />
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
