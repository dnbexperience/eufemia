/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'
import PropTypes from 'prop-types'
import classnames from 'classnames'

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

  return <E is="ul" {...p} />
}
Ul.tagName = 'dnb-ul'
Ul.propTypes = {
  className: PropTypes.string,
  inside: PropTypes.bool,
  outside: PropTypes.bool,
  nested: PropTypes.bool
}
Ul.defaultProps = {
  className: null,
  inside: null,
  outside: null,
  nested: null
}
export default Ul
