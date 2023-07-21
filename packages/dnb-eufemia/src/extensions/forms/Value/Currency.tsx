import React from 'react'
import NumberComponent, { Props as NumberComponentProps } from './Number'

export type Props = NumberComponentProps

export default function ValueCurrency(props: Props) {
  const numberProps: Props = {
    ...props,
    label: props.label,
    thousandSeparator: props.thousandSeparator ?? ' ',
    suffix: props.suffix ?? ' kr',
  }
  return <NumberComponent {...numberProps} />
}
