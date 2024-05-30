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
  }>

function NumberValue(props: Props) {
  const { value, inline, showEmpty, className, ...rest } =
    useValueProps(props)
  const numberFormatProps = convertCamelCaseProps(omitSpacingProps(rest))

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
