import React from 'react'
import { formatNumber, forwardSpaceProps } from '../utils'
import ValueBlock from '../ValueBlock'
import { useValue } from './hooks'
import type { ComponentProps } from '../component-types'
import type { ValueProps } from '../value-types'

export type Props = ComponentProps &
  ValueProps<number> & {
    // Formatting
    thousandSeparator?: string | true
    decimalSymbol?: string
    decimalLimit?: number
    prefix?: string
    suffix?: string
  }

function NumberComponent(props: Props) {
  const {
    className,
    label,
    placeholder,
    value,
    inline,
    showEmpty,
    thousandSeparator,
    decimalSymbol,
    decimalLimit,
    prefix,
    suffix,
  } = useValue(props)

  return (
    <ValueBlock
      className={className}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      {...forwardSpaceProps(props)}
    >
      {value !== undefined
        ? formatNumber(value, {
            thousandSeparator:
              thousandSeparator === true ? ' ' : thousandSeparator,
            decimalSymbol,
            decimalLimit,
            prefix,
            suffix,
          })
        : null}
    </ValueBlock>
  )
}

NumberComponent._supportsEufemiaSpacingProps = true
export default NumberComponent
