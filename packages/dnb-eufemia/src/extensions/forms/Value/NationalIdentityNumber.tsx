import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps

export default function NationalIdentityNumberValue(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringValueProps: Props = {
    ...props,
    label:
      props.label ??
      sharedContext?.translation.Forms.nationalIdentityNumberLabel,
  }
  return <StringComponent {...stringValueProps} />
}
