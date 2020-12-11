/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'

const Dl = (p) => <E is="dl" {...p} skeleton={false} />
Dl.tagName = 'dnb-dl'
Dl.propTypes = {
  children: PropTypes.node
}
Dl.defaultProps = {
  children: null
}

export default Dl
