/**
 * HTML Element
 *
 */
import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SharedHProps } from './H'
import H from './H'

const H1 = ({ size, ...props }: SharedHProps) => (
  <H as="h1" size={size || 'auto'} {...props} />
)

export default withComponentMarkers(H1, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})
