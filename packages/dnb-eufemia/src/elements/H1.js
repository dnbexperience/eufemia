/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import H from './H'

const H1 = (props) => <H is="h1" {...props} />
H1.tagName = 'dnb-h1'
H1.propTypes = {
  ...spacingPropTypes,
  level: PropTypes.string,
  size: PropTypes.oneOf([
    'xx-large',
    'x-large',
    'large',
    'medium',
    'basis',
    'small',
    'x-small'
  ]),
  children: PropTypes.node
}
H1.defaultProps = {
  level: null,
  size: 'xx-large',
  children: null
}

export default H1
