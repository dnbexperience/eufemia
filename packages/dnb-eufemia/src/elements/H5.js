/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import H from './H'

const H5 = (props) => <H as="h5" {...props} />
H5.propTypes = {
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
H5.defaultProps = {
  level: null,
  size: 'small',
  children: null,
}

export default H5
