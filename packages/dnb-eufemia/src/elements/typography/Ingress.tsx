/**
 * HTML Element
 *
 */
import React from 'react'
import P, { PProps } from './P'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

const Ingress = (props: PProps) => <P weight="medium" {...props} />

withComponentMarkers(Ingress, {
  _supportsSpacingProps: true,
})

export default Ingress
