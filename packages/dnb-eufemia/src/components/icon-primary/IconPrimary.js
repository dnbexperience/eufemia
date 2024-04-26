/**
 * Web Icon Component
 *
 * This is a legacy component.
 * For refferencing while developing new features, please use a Functional component.
 */

import React from 'react'
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types' // Is needed because of ts types
import Context from '../../shared/Context'
import { extendPropsWithContextInClassComponent } from '../../shared/component-helper'
import DefaultIcon, {
  iconPropTypes,
  DefaultIconSize,
  prerenderIcon,
  prepareIcon,
} from '../icon/Icon'

// NB: The path reflects the rollup.config.js -> external: '../../icons/dnb/primary_icons'
import * as primary_icons from '../../icons/dnb/primary_icons'
import * as primary_icons_medium from '../../icons/dnb/primary_icons_medium'

const icons = { ...primary_icons, ...primary_icons_medium }

export { DefaultIconSize }

export default class IconPrimary extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    /**
     * Use spread, so generateTypes.js makes a valid copy to create the types
     */
    ...iconPropTypes,
  }
  static defaultProps = { ...DefaultIcon.defaultProps }

  static getIcon(props) {
    return DefaultIcon.getIcon(props)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      IconPrimary.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.Icon,
      this.context.IconPrimary
    )

    const { icon, size, wrapperParams, iconParams, alt } = prepareIcon(
      props,
      this.context
    )

    const IconContainer = prerenderIcon({
      icon,
      size,
      alt,
      listOfIcons: icons,
    })

    if (!IconContainer) return <></>

    return (
      <span {...wrapperParams}>
        <IconContainer {...iconParams} />
      </span>
    )
  }
}

IconPrimary._supportsSpacingProps = true
