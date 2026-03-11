/**
 * HTML Element
 *
 */
import React from 'react'
import P, { PProps } from './P'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

const Paragraph = (props: PProps) => <P {...props} />

export default withComponentMarkers(Paragraph, {
  _supportsSpacingProps: true,
})
