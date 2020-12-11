/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import H from './H'

const H3 = (props) => <H is="h3" {...props} />
H3.tagName = 'dnb-h3'
H3.propTypes = {
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
H3.defaultProps = {
  level: null,
  size: 'medium'
}

export default H3
