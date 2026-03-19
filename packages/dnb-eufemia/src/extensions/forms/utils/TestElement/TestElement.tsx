import React from 'react'
import clsx from 'clsx'
import { Space } from '../../../../components'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export default function TestElement({ className = null, ...props }: { className?: string | null; [key: string]: unknown }) {
  return (
    <Space
      className={clsx('dnb-forms-test-element', className)}
      {...props}
    />
  )
}

withComponentMarkers(TestElement, { _supportsSpacingProps: true })
