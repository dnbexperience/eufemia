import React from 'react'
import classnames from 'classnames'
import ValueBlock from '../../ValueBlock'
import useFieldProps, { omitFieldProps } from '../../hooks/useFieldProps'
import { ValueProps } from '../../types'
import {
  omitSpacingProps,
  pickSpacingProps,
} from '../../../../components/flex/utils'
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
  const {
    className,
    label,
    placeholder,
    inline,
    maxWidth,
    showEmpty,
    ...rest
  } = useFieldProps(props)

  const numberFormatProps = convertCamelCaseProps(
    omitFieldProps(omitSpacingProps(rest))
  )

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-number', className)}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      maxWidth={maxWidth}
      {...pickSpacingProps(rest)}
    >
      {rest.value && <NumberFormat {...numberFormatProps} />}
    </ValueBlock>
  )
}

NumberValue._supportsSpacingProps = true
export default NumberValue
