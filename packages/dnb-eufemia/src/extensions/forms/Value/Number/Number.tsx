import React from 'react'
import classnames from 'classnames'
import ValueBlock from '../../ValueBlock'
import useValueProps from '../../hooks/useValueProps'
import { ValueProps } from '../../types'
import { omitSpacingProps } from '../../../../components/flex/utils'
import NumberFormat, {
  NumberFormatProps,
} from '../../../../components/NumberFormat'
import {
  IncludeCamelCase,
  convertCamelCaseProps,
} from '../../../../shared/helpers/withCamelCaseProps'

export type Props = Omit<ValueProps<number>, 'defaultValue'> &
  IncludeCamelCase<NumberFormatProps> &
  Partial<{
    defaultValue?: number | string
    minimum?: number
    maximum?: number
  }>

function NumberValue(props: Props) {
  const {
    value: valueProp,
    minimum = Number.MIN_SAFE_INTEGER,
    maximum = Number.MAX_SAFE_INTEGER,
    inline,
    showEmpty,
    className,
    ...rest
  } = useValueProps(props)
  const numberFormatProps = convertCamelCaseProps(omitSpacingProps(rest))

  let value = valueProp
  if (value < minimum) {
    value = minimum
  }
  if (value > maximum) {
    value = maximum
  }

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-number', className)}
      inline={inline}
      showEmpty={showEmpty}
      {...rest}
    >
      {typeof value !== 'undefined' || showEmpty ? (
        <NumberFormat value={value} {...numberFormatProps} />
      ) : null}
    </ValueBlock>
  )
}

NumberValue._supportsSpacingProps = true
export default NumberValue
