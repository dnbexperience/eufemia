/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from '../space/SpacingHelper'
import Button from '../button/Button'
// import Modal from '../modal/Modal'

export default class HelpButton extends React.PureComponent {
  static tagName = 'dnb-help-button'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    variant: Button.propTypes.variant,
    text: PropTypes.string,
    size: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]),
    icon_position: PropTypes.string,
    class: PropTypes.string
  }

  static defaultProps = {
    id: null,
    variant: 'secondary',
    text: null,
    size: null,
    title: null,
    icon: 'question',
    icon_size: null,
    icon_position: 'left',
    class: null
  }

  static enableWebComponent() {
    registerElement(
      HelpButton.tagName,
      HelpButton,
      HelpButton.defaultProps
    )
  }

  static getContent(props) {
    if (typeof props.render_content === 'function')
      props.render_content(props)

    return typeof props.children === 'function'
      ? props.children(props)
      : props.children
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      HelpButton.defaultProps,
      this.context.formRow
    )

    let {
      text,
      size,
      icon,
      icon_size,
      icon_position,
      on_click,
      innerRef,
      // id: _id, // eslint-disable-line
      className,
      class: _className,

      ...attributes
    } = props

    const params = {
      className: classnames(
        'dnb-help-button',
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes
    }

    if (!text) {
      params[
        'aria-roledescription'
      ] = this.context.translation.HelpButton.aria_role
    }

    if (icon === 'information' && !size) {
      icon_size = 'medium'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const label = props.title || this.context.translation.HelpButton.title

    return (
      <Button
        // id={_id}
        text={text}
        size={size}
        aria-label={label}
        icon={icon}
        icon_size={icon_size}
        icon_position={icon_position}
        on_click={on_click}
        innerRef={innerRef}
        {...params}
      />
    )

    // We now use "aria-roledescription" {showHelpButton && (
    // Rather use aria-roledescription
    // trigger_attributes['aria-describedby'] = `${this._id}-help`
    //   <span id={`${this._id}-help`} hidden>
    //     {this.context.translation.HelpButton.title}
    //   </span>
    // )}
  }
}
