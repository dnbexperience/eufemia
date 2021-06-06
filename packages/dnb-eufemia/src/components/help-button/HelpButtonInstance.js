/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  convertJsxToString,
  extendPropsWithContext,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import Button, { buttonVariantPropType } from '../button/Button'

export default class HelpButtonInstance extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    ...buttonVariantPropType,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    icon_position: PropTypes.oneOf(['left', 'right']),
    ...spacingPropTypes,
    className: PropTypes.string,
    class: PropTypes.string,
  }

  static defaultProps = {
    id: null,
    variant: 'secondary',
    icon: null,
    icon_position: 'left',
    className: null,
    class: null,
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      HelpButtonInstance.defaultProps,
      this.context.FormRow,
      this.context.HelpButton
    )

    const {
      size,
      icon,
      on_click,
      className,
      class: _className,
      attributes,
      ...rest
    } = props

    let ariaLabel = convertJsxToString(props.title || props.children)
    if (!ariaLabel) {
      ariaLabel = this.context.getTranslation(this.props).HelpButton.title
    }

    const params = {
      className: classnames(
        'dnb-help-button',
        createSpacingClasses(props),
        className,
        _className
      ),
      size,
      icon,
      ...attributes,
      ...rest,
    }

    if (typeof params['aria-roledescription'] === 'undefined') {
      params['aria-roledescription'] = this.context.getTranslation(
        this.props
      ).HelpButton.aria_role
    }

    if (params.text) {
      params.title = ariaLabel
    } else if (!params['aria-label']) {
      params['aria-label'] = ariaLabel
    }

    if (
      (!params.text || params.variant === 'tertiary') &&
      params.icon === null
    ) {
      params.icon = 'question'
    }

    if (icon === 'information' && !size) {
      params.icon_size = 'medium'
    }

    return <Button on_click={on_click} {...params} />
  }
}
