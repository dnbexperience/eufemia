import React from 'react'
import clsx from 'clsx'
import { Space } from '../../../../components'
import type { ComponentProps } from '../../types'

export type Props = ComponentProps & {
  children?: React.ReactNode
}

function ButtonRow(props: Props) {
  const { className, children, ...rest } = props
  return (
    <Space
      className={clsx('dnb-forms-button-row', className)}
      {...rest}
    >
      {children}
    </Space>
  )
}

ButtonRow._supportsSpacingProps = true
export default ButtonRow
