import React, { useContext, useMemo } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps & {
  validate?: boolean
  omitMask?: boolean
}

function OrganizationNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const { validate = true, omitMask } = props

  const errorMessages = useMemo(
    () => ({
      required: tr.organizationNumberErrorRequired,
      pattern: tr.organizationNumberErrorPattern,
      ...props.errorMessages,
    }),
    [tr, props.errorMessages]
  )
  const mask = useMemo(
    () =>
      omitMask
        ? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        : [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
    [omitMask]
  )

  const stringComponentProps: Props = {
    ...props,
    className: 'dnb-forms-field-organization-number',
    pattern: props.pattern ?? (validate ? '^[0-9]{9}$' : undefined),
    label:
      props.label ??
      sharedContext?.translation.Forms.organizationNumberLabel,
    errorMessages,
    mask,
    width: props.width ?? 'medium',
  }

  return <StringComponent {...stringComponentProps} />
}

OrganizationNumber._supportsSpacingProps = true
export default OrganizationNumber
