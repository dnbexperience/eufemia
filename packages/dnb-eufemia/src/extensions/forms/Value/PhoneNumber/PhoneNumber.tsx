import React, { useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import SharedContext from '../../../../shared/Context'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'

export type Props = StringValueProps

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
  return <StringValue {...stringValueProps} />
}

PhoneNumber._supportsSpacingProps = true
export default PhoneNumber
