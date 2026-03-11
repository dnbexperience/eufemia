/**
 * HTML Element
 *
 */
import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SharedHProps } from './H'
import H from './H'

const H6 = ({ size, ...props }: SharedHProps) => (
  <H as="h6" size={size || 'auto'} {...props} />
)

export default withComponentMarkers(H6, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})
