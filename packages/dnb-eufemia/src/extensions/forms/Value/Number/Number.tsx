import React from 'react'
import classnames from 'classnames'
import ValueBlock from '../../ValueBlock'
import useDataValue, { omitDataValueProps } from '../../hooks/useDataValue'
import { ValueProps } from '../../types'
import {
  omitSpacingProps,
  pickSpacingProps,
} from '../../../../components/flex/utils'
import NumberFormat, {
  NumberFormatProps,
} from '../../../../components/NumberFormat'
import {
  ToCamelCase,
  convertCamelCaseProps,
} from '../../../../shared/helpers/withCamelCaseProps'

export type Props = ValueProps<number> & ToCamelCase<NumberFormatProps>

function NumberValue(props: Props) {
  const { className, label, placeholder, inline, showEmpty, ...rest } =
    useDataValue(props)

  const numberFormatProps = convertCamelCaseProps(
    omitSpacingProps(omitDataValueProps(rest)) as NumberFormatProps
  )

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-number', className)}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      {...pickSpacingProps(rest)}
    >
      {rest.value && <NumberFormat {...numberFormatProps} />}
    </ValueBlock>
  )
}

NumberValue._supportsSpacingProps = true
export default NumberValue
