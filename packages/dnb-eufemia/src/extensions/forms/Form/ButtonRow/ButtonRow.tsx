import type { ReactNode } from 'react'
import clsx from 'clsx'
import { Space } from '../../../../components'
import type { ComponentProps } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

/** Props for the Form.ButtonRow component which provides consistent spacing for form action buttons. */
export type FormButtonRowProps = ComponentProps & {
  children?: ReactNode
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
