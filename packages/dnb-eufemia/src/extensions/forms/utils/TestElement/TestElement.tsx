import React from 'react'
import clsx from 'clsx'
import { Space } from '../../../../components'

export default function TestElement({ className = null, ...props }) {
  return (
    <Space
      className={clsx('dnb-forms-test-element', className)}
      {...props}
    />
  )
}

TestElement._supportsSpacingProps = true
