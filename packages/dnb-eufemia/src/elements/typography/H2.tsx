/**
 * HTML Element
 *
 */
import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SharedHProps } from './H'
import H from './H'

const H2 = ({ size, ...props }: SharedHProps) => (
  <H element="h2" size={size || 'auto'} {...props} />
)

withComponentMarkers(H2, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})

export default H2
