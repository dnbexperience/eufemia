/**
 * HTML Element
 *
 */
import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { SharedHProps } from './H'
import H from './H'

const H5 = ({ size, ...props }: SharedHProps) => (
  <H as="h5" size={size || 'auto'} {...props} />
)

withComponentMarkers(H5, {
  _isHeadingElement: true,
  _supportsSpacingProps: true,
})

export default H5
