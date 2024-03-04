import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import { useLocale } from '../../../../shared/useLocale'

export type Props = StringValueProps

function DateComponent(props: Props) {
  const translations = useLocale().Forms.date

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

DateComponent._supportsSpacingProps = true
export default DateComponent
