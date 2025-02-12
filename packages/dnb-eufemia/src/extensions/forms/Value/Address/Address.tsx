import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringValueProps

function Address(props: Props) {
  const translations = useTranslation().Address

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

Address._supportsSpacingProps = true
export default Address
