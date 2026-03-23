import React from 'react'
import clsx from 'clsx'
import { Space } from '../../../../components'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export default function TestElement({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <Space
      className={clsx('dnb-forms-test-element', className)}
      {...props}
    />
  )
}

withComponentMarkers(TestElement, { _supportsSpacingProps: true })
