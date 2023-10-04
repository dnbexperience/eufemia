import React from 'react'
import NumberComponent, { Props as NumberComponentProps } from '../Number'

export type Props = NumberComponentProps

function Currency(props: Props) {
  const numberProps: Props = {
    ...props,
    label: props.label,
    thousandSeparator: props.thousandSeparator ?? ' ',
    suffix: props.suffix ?? ' kr',
  }
  return <NumberComponent {...numberProps} />
}

Currency._supportsEufemiaSpacingProps = true
export default Currency
