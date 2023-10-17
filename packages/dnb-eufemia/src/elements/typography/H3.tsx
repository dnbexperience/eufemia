/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'

const H3 = ({ size, ...props }: SharedHProps) => (
  <H as="h3" size={size || 'auto'} {...props} />
)

H3._isHeadingElement = true
H._supportsSpacingProps = true

export default H3
