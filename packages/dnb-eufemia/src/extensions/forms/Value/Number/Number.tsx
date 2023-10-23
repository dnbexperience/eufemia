import React from 'react'
import { formatNumber } from '../../utils'
import ValueBlock from '../../ValueBlock'
import { useDataValue } from '../../hooks'
import { ValueProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'

export type Props = ValueProps<number> & {
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
  } = useDataValue(props)

  return (
    <ValueBlock
      className={className}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      {...pickSpacingProps(props)}
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

NumberComponent._supportsSpacingProps = true
export default NumberComponent
