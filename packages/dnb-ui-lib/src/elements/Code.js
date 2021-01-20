/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Code = (p) => <E is="code" {...p} />
Code.tagName = 'dnb-code'
Code.propTypes = {
  ...spacingPropTypes,
  children: PropTypes.node
}
Code.defaultProps = {
  children: null
}

export default Code
