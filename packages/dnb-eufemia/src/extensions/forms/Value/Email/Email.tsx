import React, { useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import { Context } from '../../DataContext'

export type Props = StringValueProps

function Email(props: Props) {
  const context = useContext(Context)
  const translations = context.translations.email

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

Email._supportsSpacingProps = true
export default Email
