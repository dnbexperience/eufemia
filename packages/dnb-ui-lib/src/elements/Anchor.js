/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'

const Anchor = p => <E is="a" useClass="dnb-anchor" {...p} />
Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node
}
Anchor.defaultProps = {
  children: null
}
Anchor.tagName = 'dnb-anchor'

export default Anchor
