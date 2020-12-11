/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import H from './H'

const H6 = (props) => <H is="h6" {...props} />
H6.tagName = 'dnb-h6'
H6.propTypes = {
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
H6.defaultProps = {
  level: null,
  size: 'x-small'
}

export default H6
