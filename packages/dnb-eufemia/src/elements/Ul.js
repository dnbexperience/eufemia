/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'

const Ul = ({ nested, inside, outside, ...p } = {}) => {
  if (nested) {
    p.className = classnames(p.className, 'dnb-ul--nested')
  }
  if (inside) {
    p.className = classnames(p.className, 'dnb-ul--inside')
  }
  if (outside) {
    p.className = classnames(p.className, 'dnb-ul--outside')
  }

  return <E is="ul" {...p} skeleton={false} />
}
Ul.tagName = 'dnb-ul'
Ul.propTypes = {
  ...spacingPropTypes,
  className: PropTypes.string,
  inside: PropTypes.bool,
  outside: PropTypes.bool,
  nested: PropTypes.bool,
  children: PropTypes.node,
}
Ul.defaultProps = {
  className: null,
  inside: null,
  outside: null,
  nested: null,
  children: null,
}

export default Ul
