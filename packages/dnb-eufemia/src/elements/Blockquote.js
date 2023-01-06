/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Blockquote = React.forwardRef((props, ref) => (
  <E
    as="blockquote"
    skeletonMethod="font-only"
    innerRef={ref}
    {...props}
  />
))
Blockquote.tagName = 'dnb-blockquote'
Blockquote.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node,
}
Blockquote.defaultProps = {
  children: null,
}

export default Blockquote
