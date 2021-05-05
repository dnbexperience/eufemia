/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Div = (p) => <E is="div" skeleton_method="shape" {...p} />
Div.tagName = 'dnb-div'
Div.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node
}
Div.defaultProps = {
  children: null
}

export default Div
