import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringValueProps

function DateComponent(props: Props) {
  const translations = useTranslation().Date

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

DateComponent._supportsSpacingProps = true
export default DateComponent
