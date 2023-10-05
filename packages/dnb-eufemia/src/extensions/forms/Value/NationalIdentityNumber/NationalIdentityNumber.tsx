import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'

export type Props = StringComponentProps

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
  return <StringComponent {...stringValueProps} />
}

NationalIdentityNumber._supportsEufemiaSpacingProps = true
export default NationalIdentityNumber
