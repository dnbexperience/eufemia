/**
 * Web Icon Component
 *
 */

import React from 'react'
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types' // Is needed because of ts types
import Context from '../../shared/Context'
import { extendPropsWithContextInClassComponent } from '../../shared/component-helper'
import { includeValidProps } from '../form-row/FormRowHelpers'
import DefaultIcon, {
  iconPropTypes,
  DefaultIconSize,
  prerenderIcon,
  prepareIcon,
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
    /**
     * Use spread, so generateTypes.js makes a valid copy to create the types
     */
    ...iconPropTypes,
  }
  static defaultProps = { ...DefaultIcon.defaultProps }

  static enableWebComponent() {
    DefaultIcon.enableWebComponent(IconPrimary?.tagName, IconPrimary)
  }

  static getIcon(props) {
    return DefaultIcon.getIcon(props)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      IconPrimary.defaultProps,
      { skeleton: this.context?.skeleton },
      includeValidProps(this.context.FormRow),
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
