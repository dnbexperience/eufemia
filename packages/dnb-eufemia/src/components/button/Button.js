/**
 * Web Button Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  warn,
  makeUniqueId,
  isTrue,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import IconPrimary from '../icon-primary/IconPrimary'
import FormStatus from '../form-status/FormStatus'
import Anchor from '../../elements/Anchor'
import { launch, launch_medium } from '../../icons'
import Tooltip from '../tooltip/Tooltip'

export const buttonVariantPropType = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'signal']),
}
export const buttonPropTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.string,
  title: PropTypes.node,
  variant: buttonVariantPropType.variant,
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  icon_position: PropTypes.oneOf(['left', 'right', 'top']),
  icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
  ]),
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
  id: PropTypes.string,
  class: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  custom_content: PropTypes.node,
  wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  bounding: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inner_ref: PropTypes.object,

  className: PropTypes.string,
  innerRef: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  element: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node,
  ]),

  ...spacingPropTypes,

  custom_element: PropTypes.object,
  custom_method: PropTypes.func,

  onClick: PropTypes.func,
  on_click: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

/**
 * The button component should be used as the call-to-action in a form, or as a user interaction mechanism. Generally speaking, a button should not be used when a link would do the trick. Exceptions are made at times when it is used as a navigation element in the action-nav element.
 */
export default class Button extends React.PureComponent {
  static tagName = 'dnb-button'
  static contextType = Context

  static propTypes = {
    ...buttonPropTypes,
  }

  static defaultProps = {
    type: null, // set the type because of the anchor/href situation – can be made more smart in future
    text: null,
    variant: null,
    size: null,
    title: null,
    icon: null,
    icon_position: 'right',
    icon_size: null,
    href: null,
    to: null,
    id: null,
    class: null,
    custom_content: null,
    wrap: false,
    bounding: false,
    skeleton: null,
    disabled: null,
    tooltip: null,
    status: null,
    status_state: 'error',
    status_animation: null,
    global_status_id: null,
    inner_ref: null,

    className: null,
    innerRef: null,
    children: null,
    element: null,

    custom_element: null,
    custom_method: null,

    onClick: null,
    on_click: null,
  }

  static enableWebComponent() {
    registerElement(Button.tagName, Button, Button.defaultProps)
  }

  static getContent(props) {
    return processChildren(props)
  }

  constructor(props) {
    super(props)

    this._id =
      props.id || ((props.status || props.tooltip) && makeUniqueId()) // cause we need an id anyway
    this._ref = React.createRef()

    this.state = { afterContent: null }
  }

  componentDidMount() {
    if (this.props.innerRef) {
      this.props.innerRef.current = this._ref.current
    }
    if (this.props.inner_ref) {
      this.props.inner_ref.current = this._ref.current
    }
  }

  onClickHandler = (event) => {
    const afterContent = dispatchCustomElementEvent(this, 'on_click', {
      event,
    })
    if (afterContent && React.isValidElement(afterContent)) {
      this.setState({
        afterContent,
      })
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      Button.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.FormRow,
      this.context.Button
    )

    const {
      class: class_name,
      className,
      variant,
      size,
      title,
      custom_content,
      tooltip,
      status,
      status_state,
      status_animation,
      global_status_id,
      id, // eslint-disable-line
      disabled,
      text: _text, // eslint-disable-line
      icon: _icon, // eslint-disable-line
      icon_position,
      icon_size,
      wrap,
      bounding, // eslint-disable-line
      skeleton,
      element,
      inner_ref, // eslint-disable-line
      innerRef, // eslint-disable-line
      ...attributes
    } = props

    const showStatus = getStatusState(status)

    let { text, icon } = props
    let usedVariant = variant
    let usedSize = size
    let iconSize = icon_size
    const content = Button.getContent(this.props)

    if (
      variant === 'tertiary' &&
      (text || content) &&
      !icon &&
      icon !== false
    ) {
      warn(
        `A Tertiary Button requires an icon. Please declare an icon to: ${content}`
      )
    }

    // if only has Icon, then resize it and define it as secondary
    const isIconOnly = Boolean(!text && !content && icon)
    if (isIconOnly) {
      if (!usedVariant) {
        usedVariant = 'secondary'
      }
      if (!iconSize && (usedSize === 'default' || usedSize === 'large')) {
        iconSize = 'medium'
      }
      if (!usedSize) {
        usedSize = 'medium'
      }
    } else if (content) {
      if (!usedVariant) {
        usedVariant = 'primary'
      }
      if (!usedSize) {
        usedSize = 'default'
      }
    }
    if (!iconSize && variant === 'tertiary' && usedSize === 'large') {
      iconSize = 'medium'
    }

    const Element = element
      ? element
      : props.href || props.to
      ? Anchor
      : 'button'
    if (Element === Anchor) {
      attributes.omitClass = true
      if (
        (props.href || props.to) &&
        props.target &&
        props.target.includes('_blank') &&
        !icon
      ) {
        icon = icon_size === 'medium' ? launch_medium : launch
      }
    }

    const classes = classnames(
      'dnb-button',
      `dnb-button--${usedVariant || 'primary'}`,
      usedSize && usedSize !== 'default' && `dnb-button--size-${usedSize}`,
      icon && `dnb-button--icon-position-${icon_position}`,
      icon && iconSize && `dnb-button--icon-size-${iconSize}`,
      (text || content || custom_content) && 'dnb-button--has-text',
      icon && 'dnb-button--has-icon',
      wrap && 'dnb-button--wrap',
      status && `dnb-button__status--${status_state}`,
      createSkeletonClass(
        variant === 'tertiary' ? 'font' : 'shape',
        skeleton,
        this.context
      ),
      createSpacingClasses(props),
      class_name,
      className,
      props.href || props.to ? '' : null // dnb-anchor--no-underline dnb-anchor--no-hover
    )

    const params = {
      className: classes,
      title,
      id: this._id,
      disabled: isTrue(disabled),
      ...attributes,
      onClick: this.onClickHandler,
    }

    if (Element === Anchor && !params.type) {
      params.type = 'button'
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <>
        <Element ref={this._ref} {...params}>
          <Content
            {...this.props}
            icon={icon}
            icon_size={iconSize}
            content={text || content}
            custom_content={custom_content}
            isIconOnly={isIconOnly}
            skeleton={isTrue(skeleton)}
          />
        </Element>
        {this.state.afterContent}
        {showStatus && (
          <FormStatus
            id={this._id + '-form-status'}
            global_status_id={global_status_id}
            label={text}
            text={status}
            status={status_state}
            text_id={this._id + '-status'} // used for "aria-describedby"
            animation={status_animation}
            skeleton={skeleton}
          />
        )}

        {tooltip && this._ref && (
          <Tooltip
            id={this._id + '-tooltip'}
            target_element={this._ref}
            tooltip={tooltip}
          />
        )}
      </>
    )
  }
}

class Content extends React.PureComponent {
  static propTypes = {
    title: PropTypes.node,
    custom_content: PropTypes.node,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node,
    ]),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bounding: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.bool,
    isIconOnly: PropTypes.bool,
  }
  static defaultProps = {
    custom_content: null,
    title: null,
    content: null,
    icon: null,
    icon_size: 'default',
    bounding: false,
    skeleton: null,
    isIconOnly: null,
  }
  render() {
    const {
      title,
      content,
      custom_content,
      icon,
      icon_size,
      bounding,
      skeleton,
      isIconOnly,
    } = this.props

    const ret = []

    if (isTrue(bounding)) {
      ret.push(
        <span key="button-bounding" className="dnb-button__bounding" />
      )
    }

    if (custom_content) {
      ret.push(
        <React.Fragment key="button-custom-content">
          {custom_content}
        </React.Fragment>
      )
    }

    if (content) {
      ret.push(
        <span key="button-text-empty" className="dnb-button__alignment">
          &zwnj;
        </span>,
        <span
          key="button-text"
          className="dnb-button__text dnb-skeleton--show-font"
        >
          {content}
        </span>
      )
    } else if (icon) {
      // on empty text, use a zero-width non-joiner
      // so the icon button gets vertical aligned
      // we need the dnb-button__text for alignment
      ret.push(
        <span key="button-text-empty" className="dnb-button__alignment">
          &zwnj;
        </span>
      )
    }

    if (icon) {
      ret.push(
        React.isValidElement(icon) && /Icon/i.test(String(icon.type)) ? (
          React.cloneElement(icon, {
            key: 'button-icon',
            className: `dnb-button__icon ${icon.props.className || ''}`,
          })
        ) : (
          <IconPrimary
            key="button-icon"
            className="dnb-button__icon"
            icon={icon}
            size={icon_size}
            aria-hidden={isIconOnly && !title ? null : true}
            skeleton={skeleton}
          />
        )
      )
    }

    return ret
  }
}
