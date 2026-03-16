/**
 * HTML Element
 *
 */
import React from 'react'
import P, { type PProps } from './P'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

const Paragraph = (props: PProps) => <P {...props} />

withComponentMarkers(Paragraph, {
  _supportsSpacingProps: true,
})

export default Paragraph
