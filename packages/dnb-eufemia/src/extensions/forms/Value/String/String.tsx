import React from 'react'
import clsx from 'clsx'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type Props = ValueProps<string>

function StringComponent(props: Props) {
  const { value, className, ...rest } = useValueProps(props)

  return (
    // @ts-expect-error -- strictFunctionTypes
    <ValueBlock
      className={clsx('dnb-forms-value-string', className)}
      {...rest}
    >
      {value}
    </ValueBlock>
  )
}

withComponentMarkers(StringComponent, {
  _supportsSpacingProps: true,
})

export default StringComponent
