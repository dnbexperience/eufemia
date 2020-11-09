/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'

const Span = (p) => <E is="span" {...p} />
Span.tagName = 'dnb-span'
Span.propTypes = {
  children: PropTypes.node
}
Span.defaultProps = {
  children: null
}

export default Span
