/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'

const H4 = ({ size, ...props }: SharedHProps) => (
  <H as="h4" size={size || 'auto'} {...props} />
)

H4._isHeadingElement = true
H._supportsSpacingProps = true

export default H4
