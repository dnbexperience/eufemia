/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Dd = (p = {}) => <E is="dd" {...p} />
Dd.tagName = 'dnb-dd'
Dd.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node
}
Dd.defaultProps = {
  children: null
}

export default Dd
