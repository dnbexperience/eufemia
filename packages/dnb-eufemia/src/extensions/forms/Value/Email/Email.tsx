import React from 'react'
import type { Props as StringValueProps } from '../String';
import StringValue from '../String'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringValueProps

function Email(props: Props) {
  const translations = useTranslation().Email

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

Email._supportsSpacingProps = true
export default Email
