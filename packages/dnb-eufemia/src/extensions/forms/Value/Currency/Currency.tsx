import React from 'react'
import { CURRENCY } from '../../../../shared/defaults'
import NumberValue, { Props as NumberValueProps } from '../Number'

export type Props = NumberValueProps

function Currency(props: Props) {
  const numberProps: Props = {
    ...props,
    currency: props.currency ?? CURRENCY,
  }

  return <NumberValue {...numberProps} />
}

Currency._supportsSpacingProps = true
export default Currency
