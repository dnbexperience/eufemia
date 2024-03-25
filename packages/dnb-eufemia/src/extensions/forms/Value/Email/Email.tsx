import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useLocale from '../../hooks/useLocale'

export type Props = StringValueProps

function Email(props: Props) {
  const translations = useLocale().Email

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

Email._supportsSpacingProps = true
export default Email
