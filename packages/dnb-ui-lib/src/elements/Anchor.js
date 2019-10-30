/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'

const Anchor = React.forwardRef((props, ref) => (
  <E ref={ref} is="a" useClass="dnb-anchor" {...props} />
))
Anchor.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
}
Anchor.defaultProps = {
  href: null,
  children: null
}
Anchor.tagName = 'dnb-anchor'

export default Anchor
