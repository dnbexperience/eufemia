/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Dd = React.forwardRef((props, ref) => (
  <E is="dd" inner_ref={ref} {...props} />
))
Dd.tagName = 'dnb-dd'
Dd.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node
}
Dd.defaultProps = {
  children: null
}

export default Dd
