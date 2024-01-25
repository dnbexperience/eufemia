/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'

const H2 = ({ size, ...props }: SharedHProps) => (
  <H as="h2" size={size || 'auto'} {...props} />
)

H2._isHeadingElement = true
H2._supportsSpacingProps = true

export default H2
