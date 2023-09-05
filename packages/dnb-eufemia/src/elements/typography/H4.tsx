/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'

const H4 = ({ size, ...props }: SharedHProps) => {
  return <H as="h4" size={size || 'auto'} {...props} />
}

export default H4
