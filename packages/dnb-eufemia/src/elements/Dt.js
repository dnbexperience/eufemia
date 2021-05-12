/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Dt = React.forwardRef((props, ref) => (
  <E is="dt" inner_ref={ref} {...props} />
))
Dt.tagName = 'dnb-dt'
Dt.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node,
}
Dt.defaultProps = {
  children: null,
}

export default Dt
