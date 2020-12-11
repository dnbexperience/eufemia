/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'

const Lead = (p) => <E is="p" {...p} />
Lead.tagName = 'dnb-lead'
Lead.propTypes = {
  children: PropTypes.node
}
Lead.defaultProps = {
  children: null
}

export default Lead
