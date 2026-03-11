/**
 * HTML Element
 *
 */
import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SharedHProps } from './H'
import H from './H'

const H4 = ({ size, ...props }: SharedHProps) => (
  <H as="h4" size={size || 'auto'} {...props} />
)

export default withComponentMarkers(H4, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})
