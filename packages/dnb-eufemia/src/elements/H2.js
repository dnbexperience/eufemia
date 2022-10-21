/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import H from './H'

const H2 = (props) => <H as="h2" {...props} />
H2.tagName = 'dnb-h2'
H2.propTypes = {
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
H2.defaultProps = {
  level: null,
  size: 'large',
  children: null,
}

export default H2
