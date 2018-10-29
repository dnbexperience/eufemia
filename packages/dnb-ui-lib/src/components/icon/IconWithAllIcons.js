/**
 * Web Icon Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { ErrorHandler } from '../../shared/error-helper'
import DefaultIcon, { loadSVG } from './Icon'
import icons from '../../icons/allIcons'
// import { bell } from '../../assets/dist/icons/es'
// const icons = { bell }
// const icons = {}

export const propTypes = {
  ...DefaultIcon.propTypes,
  ...{
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }
}

export const defaultProps = { ...DefaultIcon.defaultProps }

export default class IconWithAllIcons extends Component {
  static tagName = 'dnb-icon-with-all-icons'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    DefaultIcon.enableWebComponent(
      IconWithAllIcons.tagName,
      IconWithAllIcons
    )
  }

  static getIcon(props) {
    return DefaultIcon.getIcon(props)
  }

  render() {
    const { icon, wrapperParams, svgParams } = DefaultIcon.prerender(
      this.props
    )

    const Svg = loadSVG(icon, icons)

    if (!Svg) return <span />

    return (
      <span {...wrapperParams}>
        <Svg {...svgParams} />
      </span>
    )
  }
}
