/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Dl = (p) => <E is="dl" {...p} skeleton={false} />
Dl.tagName = 'dnb-dl'
Dl.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node,
}
Dl.defaultProps = {
  children: null,
}

export default Dl
