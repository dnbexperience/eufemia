/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import H from './H'

const H1 = (props) => <H is="h1" {...props} />
H1.tagName = 'dnb-h1'
H1.propTypes = {
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
H1.defaultProps = {
  level: null,
  size: 'xx-large'
}

export default H1
