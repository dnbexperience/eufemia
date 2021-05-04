/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Lead = React.forwardRef((props, ref) => (
  <E is="p" inner_ref={ref} {...props} />
))
Lead.tagName = 'dnb-lead'
Lead.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node
}
Lead.defaultProps = {
  children: null
}

export default Lead
