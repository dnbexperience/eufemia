import React from 'react'
import { formatNumber, forwardSpaceProps } from '../utils'
import Value from '../Value/Value'
import { useValue } from './hooks'
import type { ComponentProps } from '../component-types'
import type { ValueProps } from '../value-types'

export type Props = ComponentProps &
  ValueProps<number> & {
    // Formatting
    thousandSeparator?: string
    decimalSymbol?: string
    decimals?: number
    fixedDecimals?: number
    prefix?: string
    suffix?: string
  }

export default function DataValueNumber(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
    label,
    placeholder,
    value,
    inline,
    showEmpty,
    thousandSeparator,
    decimalSymbol,
    decimals,
    fixedDecimals,
    prefix,
    suffix,
  } = useValue(props)

  return (
    <Value
      className={className}
      data-testid={dataTestId}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      {...forwardSpaceProps(props)}
    >
      {value !== undefined
        ? formatNumber(value, {
            thousandSeparator,
            decimalSymbol,
            decimals,
            fixedDecimals,
            prefix,
            suffix,
          })
        : null}
    </Value>
  )
}
