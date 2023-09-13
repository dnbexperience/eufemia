import React from 'react'
import classnames from 'classnames'
import { Space } from '../../../components'
import type { ComponentProps } from '../types'

export type Props = ComponentProps & {
  children?: React.ReactNode
}

function ButtonRow(props: Props) {
  const { className, children, ...rest } = props
  return (
    <Space
      className={classnames('dnb-forms__button-row', className)}
      {...rest}
    >
      {children}
    </Space>
  )
}

ButtonRow._supportsEufemiaSpacingProps = true
export default ButtonRow
