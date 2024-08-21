import React from 'react'
import classnames from 'classnames'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'

export type Props = ValueProps<Array<number | string>>

function ArraySelection(props: Props) {
  const { value, className, ...rest } = useValueProps(props)

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-array-selection', className)}
      {...rest}
    >
      {value !== undefined && value.join(', ')}
    </ValueBlock>
  )
}

ArraySelection._supportsSpacingProps = true
export default ArraySelection
