/**
 * HTML Element
 *
 */
import React from 'react'
import H from './H'
import type { SharedHProps } from './H'

const H1 = ({ size = 'xx-large', ...props }: SharedHProps) => (
  <H as="h1" size={size} {...props} />
)

export default H1
