import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'

export type Props = StringComponentProps

function PhoneNumber(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringValueProps: Props = {
    ...props,
    label:
      props.label ??
      (props.inline
        ? undefined
        : sharedContext?.translation.Forms.phoneNumberLabel),
    prepare: (value) =>
      format(cleanNumber(value), {
        phone: true,
      }).toString(),
  }
  return <StringComponent {...stringValueProps} />
}

PhoneNumber._supportsSpacingProps = true
export default PhoneNumber
