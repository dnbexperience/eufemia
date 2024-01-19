import React from 'react'
import NumberValue, { Props as NumberValueProps } from '../Number'

export type Props = NumberValueProps

function Currency(props: Props) {
  const numberProps: Props = {
    ...props,
    label: props.label,
    thousandSeparator: props.thousandSeparator ?? ' ',
    suffix: props.suffix ?? ' kr',
  }
  return <NumberValue {...numberProps} />
}

Currency._supportsSpacingProps = true
export default Currency
