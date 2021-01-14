/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Blockquote = (p) => (
  <E is="blockquote" skeleton_method="font-only" {...p} />
)
Blockquote.tagName = 'dnb-blockquote'
Blockquote.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node.isRequired
}

export default Blockquote
