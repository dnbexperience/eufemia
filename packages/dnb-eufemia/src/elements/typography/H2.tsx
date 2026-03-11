/**
 * HTML Element
 *
 */
import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SharedHProps } from './H'
import H from './H'

const H2 = ({ size, ...props }: SharedHProps) => (
  <H as="h2" size={size || 'auto'} {...props} />
)

export default withComponentMarkers(H2, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})
