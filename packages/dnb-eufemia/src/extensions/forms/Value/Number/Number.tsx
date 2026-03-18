import React from 'react'
import clsx from 'clsx'
import ValueBlock from '../../ValueBlock'
import useValueProps from '../../hooks/useValueProps'
import type { ValueProps } from '../../types'
import { omitSpacingProps } from '../../../../components/flex/utils'
import type { NumberFormatProps } from '../../../../components/NumberFormat'
import NumberFormat from '../../../../components/NumberFormat'

import type { SpacingProps } from '../../../../shared/types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type Props = Omit<ValueProps<number>, 'defaultValue'> &
  Omit<
    NumberFormatProps,
    keyof SpacingProps
    // spacing props is handled by ValueBlock
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
    path,
    itemPath,
    inheritLabel,
    ...rest
    // @ts-ignore -- strictFunctionTypes
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
    // @ts-ignore -- strictFunctionTypes
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

withComponentMarkers(NumberValue, {
  _supportsSpacingProps: true,
})

export default NumberValue
