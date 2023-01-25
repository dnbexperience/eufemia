/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import H from './H'

const H4 = (props) => <H as="h4" {...props} />
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
    'x-small',
  ]),
  children: PropTypes.node,
}
H4.defaultProps = {
  level: null,
  size: 'basis',
  children: null,
}

export default H4
