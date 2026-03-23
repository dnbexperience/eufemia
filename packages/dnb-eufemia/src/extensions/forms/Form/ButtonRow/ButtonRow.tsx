import React from 'react'
import clsx from 'clsx'
import { Space } from '../../../../components'
import type { ComponentProps } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type FormButtonRowProps = ComponentProps & {
  children?: React.ReactNode
}

function ButtonRow(props: FormButtonRowProps) {
  const { className, children, ...rest } = props
  return (
    <Space className={clsx('dnb-forms-button-row', className)} {...rest}>
      {children}
    </Space>
  )
}

withComponentMarkers(ButtonRow, {
  _supportsSpacingProps: true,
})

export default ButtonRow
