/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { spacingPropTypes } from '../components/space/SpacingHelper'
import E from './Element'
import classnames from 'classnames'

const Hr = ({ fullscreen, light, medium, ...props } = {}) => {
  if (fullscreen) {
    props.className = classnames(props.className, 'dnb-hr--fullscreen')
  }
  if (light) {
    props.className = classnames(props.className, 'dnb-hr--light')
  }
  if (medium) {
    props.className = classnames(props.className, 'dnb-hr--medium')
  }

  return <E is="hr" {...props} />
}
Hr.tagName = 'dnb-hr'
Hr.propTypes = {
  ...spacingPropTypes,

  className: PropTypes.string,
  light: PropTypes.bool,
  medium: PropTypes.bool,
  fullscreen: PropTypes.bool,
}
Hr.defaultProps = {
  className: null,
  light: null,
  medium: null,
  fullscreen: null,
}
export default Hr
