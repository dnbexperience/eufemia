import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps

function Email(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringProps: Props = {
    ...props,
    label: props.label ?? sharedContext?.translation.Forms.emailLabel,
  }
  return <StringComponent {...stringProps} />
}

Email._supportsSpacingProps = true
export default Email
