import React, { useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import { Context } from '../../DataContext'

export type Props = StringValueProps

function DateComponent(props: Props) {
  const context = useContext(Context)
  const translations = context.translations.date

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

DateComponent._supportsSpacingProps = true
export default DateComponent
