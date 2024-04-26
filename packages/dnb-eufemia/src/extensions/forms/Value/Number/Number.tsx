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

export type Props = ValueProps<number> &
  IncludeCamelCase<NumberFormatProps>

function NumberValue(props: Props) {
  const { value, className, ...rest } = useValueProps(props)
  const numberFormatProps = convertCamelCaseProps(omitSpacingProps(rest))

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-number', className)}
      {...rest}
    >
      {value && <NumberFormat value={value} {...numberFormatProps} />}
    </ValueBlock>
  )
}

NumberValue._supportsSpacingProps = true
export default NumberValue
