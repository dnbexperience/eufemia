/**
 * HTML Element
 *
 */

import React from 'react'
import E from './Element'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Hr = ({ fullscreen, ...p } = {}) => {
  if (fullscreen) {
    p.className = classnames(p.className, 'dnb-hr--fullscreen')
  }

  return <E is="hr" {...p} />
}
Hr.tagName = 'dnb-hr'
Hr.propTypes = {
  className: PropTypes.string,
  fullscreen: PropTypes.bool
}
Hr.defaultProps = {
  className: null,
  fullscreen: null
}
export default Hr
