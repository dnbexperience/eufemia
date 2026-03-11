/**
 * HTML Element
 *
 */
import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SharedHProps } from './H'
import H from './H'

const H3 = ({ size, ...props }: SharedHProps) => (
  <H as="h3" size={size || 'auto'} {...props} />
)

export default withComponentMarkers(H3, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})
