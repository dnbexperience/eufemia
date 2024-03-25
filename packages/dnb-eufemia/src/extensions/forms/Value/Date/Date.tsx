import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useLocale from '../../hooks/useLocale'

export type Props = StringValueProps

function DateComponent(props: Props) {
  const translations = useLocale().Date

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

DateComponent._supportsSpacingProps = true
export default DateComponent
