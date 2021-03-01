/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Span = (p) => <E is="span" {...p} />
Span.tagName = 'dnb-span'
Span.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node
}
Span.defaultProps = {
  children: null
}

export default Span
