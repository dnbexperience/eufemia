/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'

const H5 = ({ size, ...props }: SharedHProps) => (
  <H as="h5" size={size || 'auto'} {...props} />
)

H5._isHeadingElement = true
H._supportsSpacingProps = true

export default H5
