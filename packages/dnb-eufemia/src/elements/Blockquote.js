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
    is="blockquote"
    skeleton_method="font-only"
    inner_ref={ref}
    {...props}
  />
))
Blockquote.tagName = 'dnb-blockquote'
Blockquote.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node
}
Blockquote.defaultProps = {
  children: null
}

export default Blockquote
