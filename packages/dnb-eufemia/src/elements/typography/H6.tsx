/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'

const H6 = ({ size, ...props }: SharedHProps) => {
  return <H as="h6" size={size || 'auto'} {...props} />
}

export default H6
