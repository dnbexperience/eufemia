/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Code = React.forwardRef((props, ref) => (
  <E is="code" inner_ref={ref} {...props} />
))
Code.tagName = 'dnb-code'
Code.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node,
}
Code.defaultProps = {
  children: null,
}

export default Code
