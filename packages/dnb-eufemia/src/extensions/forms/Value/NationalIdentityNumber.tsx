import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'
import {
  format,
  cleanNumber,
} from '../../../components/number-format/NumberUtils'

export type Props = StringComponentProps

export default function ValueNationalIdentityNumber(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringValueProps: Props = {
    ...props,
    label:
      props.label ??
      (props.inline
        ? undefined
        : sharedContext?.translation.Forms.nationalIdentityNumberLabel),
    value: format(cleanNumber(props.value), {
      nin: true,
    }).toString(),
  }
  return <StringComponent {...stringValueProps} />
}
