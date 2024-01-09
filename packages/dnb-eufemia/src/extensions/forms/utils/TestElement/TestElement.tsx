import React from 'react'
import classnames from 'classnames'
import { Space } from '../../../../components'

export default function TestElement({ className = null, ...props }) {
  return (
    <Space
      className={classnames('dnb-forms-test-element', className)}
      {...props}
    />
  )
}

TestElement._supportsSpacingProps = true
