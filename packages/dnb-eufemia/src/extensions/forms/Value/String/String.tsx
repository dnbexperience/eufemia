import React from 'react'
import classnames from 'classnames'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'

export type Props = ValueProps<string>

function StringComponent(props: Props) {
  const { value, className, ...rest } = useValueProps(props)

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-string', className)}
      {...rest}
    >
      {value}
    </ValueBlock>
  )
}

StringComponent._supportsSpacingProps = true
export default StringComponent
