import React from 'react'
import clsx from 'clsx'
import ValueBlock from '../../ValueBlock'
import useValueProps from '../../hooks/useValueProps'
import { ValueProps } from '../../types'
import { omitSpacingProps } from '../../../../components/flex/utils'
import NumberFormat, {
  NumberFormatProps,
} from '../../../../components/NumberFormat'
import { IncludeCamelCase } from '../../../../shared/helpers/withCamelCaseProps'
import { SpacingProps } from '../../../../shared/types'

export type Props = Omit<ValueProps<number>, 'defaultValue'> &
  IncludeCamelCase<
    Omit<
      NumberFormatProps,
      keyof SpacingProps
      // spacing props is handled by ValueBlock
    >
  > &
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
    path, // eslint-disable-line
    itemPath, // eslint-disable-line
    inheritLabel, // eslint-disable-line
    ...rest
  } = useValueProps(props)
  const numberFormatProps = omitSpacingProps(rest)

  let value = valueProp
  if (value < minimum) {
    value = minimum
  }
  if (value > maximum) {
    value = maximum
  }

  return (
    <ValueBlock
      className={clsx('dnb-forms-value-number', className)}
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
