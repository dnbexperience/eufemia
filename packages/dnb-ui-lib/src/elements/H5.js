/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import H from './H'

const H5 = (props) => <H is="h5" {...props} />
H5.tagName = 'dnb-h5'
H5.propTypes = {
  level: PropTypes.string,
  size: PropTypes.oneOf([
    'xx-large',
    'x-large',
    'large',
    'medium',
    'basis',
    'small',
    'x-small'
  ])
}
H5.defaultProps = {
  level: null,
  size: 'small'
}

export default H5
