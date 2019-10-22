/**
 * Web Icon Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DefaultIcon, {
  DefaultIconSize,
  prerenderIcon,
  prepareIcon
} from '../icon/Icon'
import * as primary_icons from '../../icons/primary_icons'
import * as primary_icons_medium from '../../icons/primary_icons_medium'

const icons = { ...primary_icons, ...primary_icons_medium }

export { DefaultIconSize }
const propTypes = {
  ...DefaultIcon.propTypes,
  ...{
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }
}

const defaultProps = { ...DefaultIcon.defaultProps }

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
    const { icon, size, wrapperParams, iconParams, alt } = prepareIcon(
      this.props
    )

    const IconContainer = prerenderIcon({
      icon,
      size,
      alt,
      listOfIcons: icons
    })

    if (!IconContainer) return <></>

    return (
      <span {...wrapperParams}>
        <IconContainer {...iconParams} />
      </span>
    )
  }
}
