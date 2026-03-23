import React from 'react'
import clsx from 'clsx'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueStringProps = ValueProps<string>

function StringComponent(props: ValueStringProps) {
  const { value, className, ...rest } = useValueProps(props)

  return (
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
