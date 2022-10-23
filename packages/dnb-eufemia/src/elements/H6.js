/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import H from './H'

const H6 = (props) => <H as="h6" {...props} />
H6.tagName = 'dnb-h6'
H6.propTypes = {
  ...spacingPropTypes,
  level: PropTypes.string,
  size: PropTypes.oneOf([
    'xx-large',
    'x-large',
    'large',
    'medium',
    'basis',
    'small',
    'x-small',
  ]),
  children: PropTypes.node,
}
H6.defaultProps = {
  level: null,
  size: 'x-small',
  children: null,
}

export default H6
