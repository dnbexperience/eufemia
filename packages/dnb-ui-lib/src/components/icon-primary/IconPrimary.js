/**
 * Web Icon Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import DefaultIcon, {
  DefaultIconSize,
  prerenderIcon,
  prepareIcon
} from '../icon/Icon'

// NB: The path reflects the rollup.config.js -> external: '../../icons/primary_icons'
import * as primary_icons from '../../icons/primary_icons.js'
import * as primary_icons_medium from '../../icons/primary_icons_medium.js'

const icons = { ...primary_icons, ...primary_icons_medium }

export { DefaultIconSize }

export default class IconPrimary extends React.PureComponent {
  static tagName = 'dnb-icon-primary'
  static contextType = Context

  static propTypes = {
    ...DefaultIcon.propTypes,
    ...{
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.func
      ])
    }
  }
  static defaultProps = { ...DefaultIcon.defaultProps }

  static enableWebComponent() {
    DefaultIcon.enableWebComponent(IconPrimary.tagName, IconPrimary)
  }

  static getIcon(props) {
    return DefaultIcon.getIcon(props)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      IconPrimary.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.formRow
    )

    const { icon, size, wrapperParams, iconParams, alt } = prepareIcon(
      props,
      this.context
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
