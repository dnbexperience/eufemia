/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import H from './H'

const H4 = (props) => <H is="h4" {...props} />
H4.tagName = 'dnb-h4'
H4.propTypes = {
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
  ])
}
H4.defaultProps = {
  level: null,
  size: 'basis'
}

export default H4
