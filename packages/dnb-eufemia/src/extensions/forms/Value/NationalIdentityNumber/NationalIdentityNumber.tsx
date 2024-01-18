import React, { useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import SharedContext from '../../../../shared/Context'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'

export type Props = StringValueProps

function NationalIdentityNumber(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringValueProps: Props = {
    ...props,
    label:
      props.label ??
      (props.inline
        ? undefined
        : sharedContext?.translation.Forms.nationalIdentityNumberLabel),
    prepare: (value) =>
      format(cleanNumber(value), {
        nin: true,
      }).toString(),
  }
  return <StringValue {...stringValueProps} />
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
