/**
 * Web Icon Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DefaultIcon, { DefaultIconSize, prepareIcon } from '../icon/Icon'
import * as primary_icons from '../../icons/primary_icons'
import * as primary_icons_medium from '../../icons/primary_icons_medium'

const icons = { ...primary_icons, ...primary_icons_medium }

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

export default class IconPrimary extends PureComponent {
  static tagName = 'dnb-icon-primary'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    DefaultIcon.enableWebComponent(IconPrimary.tagName, IconPrimary)
  }

  static getIcon(props) {
    return DefaultIcon.getIcon(props)
  }

  render() {
    const { icon, wrapperParams, svgParams, size } = DefaultIcon.prerender(
      this.props
    )

    const IconContainer = prepareIcon({ icon, size, listOfIcons: icons })

    if (!IconContainer) return <></>

    return (
      <span {...wrapperParams}>
        <IconContainer {...svgParams} />
      </span>
    )
  }
}
