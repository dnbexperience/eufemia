/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import H from './H'

const H3 = (props) => <H as="h3" {...props} />
H3.propTypes = {
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
H3.defaultProps = {
  level: null,
  size: 'medium',
  children: null,
}

export default H3
