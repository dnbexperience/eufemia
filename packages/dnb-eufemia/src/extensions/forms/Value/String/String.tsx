import React from 'react'
import clsx from 'clsx'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'

export type Props = ValueProps<string>

function StringComponent(props: Props) {
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

StringComponent._supportsSpacingProps = true
export default StringComponent
