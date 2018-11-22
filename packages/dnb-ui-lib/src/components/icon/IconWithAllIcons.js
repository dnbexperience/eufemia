/**
 * Web Icon Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DefaultIcon, { DefaultIconSize, loadSVG } from './Icon'
import * as icons_default from '../../icons/primary_icons'
import * as icons_medium from '../../icons/primary_icons_medium'

const icons = { ...icons_default, ...icons_medium }

export { DefaultIconSize }
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

export default class IconWithAllIcons extends PureComponent {
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

    if (!Svg) return <></>

    return (
      <span {...wrapperParams}>
        <Svg {...svgParams} />
      </span>
    )
  }
}
