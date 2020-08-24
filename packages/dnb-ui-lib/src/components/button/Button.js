/**
 * Web Button Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  makeUniqueId,
  isTrue,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  processChildren,
  pickRenderProps,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import IconPrimary from '../icon-primary/IconPrimary'
import FormStatus from '../form-status/FormStatus'
import Tooltip from '../tooltip/Tooltip'

const renderProps = { on_click: null }

const propTypes = {
  /** the content of the button. */
  text: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  /* _(optional)_ defines the kind of button. Possible values are `primary`, `secondary`, `tertiary` and `signal`.  */
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'signal']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  icon_position: PropTypes.oneOf(['left', 'right']),
  icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
  id: PropTypes.string,
  class: PropTypes.string,
  href: PropTypes.string,
  wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  bounding: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // React props
  className: PropTypes.string,
  innerRef: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,

  // Events
  onClick: PropTypes.func,
  on_click: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

const defaultProps = {
  type: 'button',
  text: null,
  variant: null,
  size: null,
  title: null,
  icon: null,
  icon_position: 'right',
  icon_size: null,
  href: null,
  id: null,
  class: null,
  wrap: false,
  bounding: false,
  skeleton: null,
  disabled: null,
  tooltip: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,

  // React props
  className: null,
  innerRef: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,

  // Events
  onClick: null,
  on_click: null
}

/**
 * The button component should be used as the call-to-action in a form, or as a user interaction mechanism. Generally speaking, a button should not be used when a link would do the trick. Exceptions are made at times when it is used as a navigation element in the action-nav element.
 */
export default class Button extends React.PureComponent {
  static tagName = 'dnb-button'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Button.tagName, Button, defaultProps)
  }

  static getContent(props) {
    return processChildren(props)
  }

  constructor(props) {
    super(props)

    this._id =
      props.id || ((props.status || props.tooltip) && makeUniqueId()) // cause we need an id anyway
    this._ref = React.createRef()

    // pass along all props we wish to have as params
    this.renderProps = pickRenderProps(props, renderProps)

    this.state = { afterContent: null }
  }

  componentDidMount() {
    if (
      this.props.innerRef &&
      typeof this.props.innerRef.current !== 'undefined'
    ) {
      this.props.innerRef.current = this._ref.current
    }
  }

  onClickHandler = (event) => {
    const afterContent = dispatchCustomElementEvent(this, 'on_click', {
      event
    })
    if (afterContent && React.isValidElement(afterContent)) {
      this.setState({
        afterContent
      })
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.formRow
    )

    const {
      class: class_name,
      className,
      type,
      variant,
      size,
      title,
      tooltip,
      status,
      status_state,
      status_animation,
      global_status_id,
      id, // eslint-disable-line
      disabled,
      text: _text, // eslint-disable-line
      icon: _icon, // eslint-disable-line
      icon_position: _icon_position, // eslint-disable-line
      icon_size,
      href,
      wrap,
      bounding, // eslint-disable-line
      skeleton,
      innerRef, // eslint-disable-line
      ...attributes
    } = props

    const showStatus = status && status !== 'error'

    let { text, icon, icon_position: iconPosition } = props
    let usedVariant = variant
    let usedSize = size
    let content = Button.getContent(this.props) || text

    // NB: Nice API, but will create way too much code to maintain in future
    // therefore we do not use this fro now
    // if (content && React.isValidElement(content)) {
    //   content = [content]
    // }
    // if (Array.isArray(content)) {
    //   const res = content.reduce(
    //     (acc, cur, i) => {
    //       if (
    //         React.isValidElement(cur) &&
    //         /Icon/i.test(String(cur.type))
    //       ) {
    //         acc.icon = cur
    //         if (i === 0) {
    //           acc.iconPosition = 'left'
    //         }
    //       } else {
    //         if (!acc.text) {
    //           acc.text = []
    //         }
    //         acc.text.push(cur)
    //       }
    //       return acc
    //     },
    //     { text: null, icon, iconPosition }
    //   )
    //   if (res.icon) {
    //     text = res.text || text
    //     icon = res.icon
    //     iconPosition = res.iconPosition
    //     content = null
    //   }
    // }

    // if only has Icon, then resize it and define it as secondary
    const isIconOnly = Boolean(!text && !content && icon)
    if (isIconOnly) {
      if (!usedVariant) {
        usedVariant = 'secondary'
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

    // set icon size automatically if button size is changed
    const iconSize =
      usedSize === 'large' && (icon_size === 'default' || !icon_size)
        ? 'medium'
        : icon_size

    const classes = classnames(
      'dnb-button',
      `dnb-button--${usedVariant || 'primary'}`,
      usedSize && usedSize !== 'default' && `dnb-button--size-${usedSize}`,
      icon && `dnb-button--icon-position-${iconPosition}`,
      icon && iconSize && `dnb-button--icon-size-${iconSize}`,
      (text || content) && 'dnb-button--has-text',
      icon && 'dnb-button--has-icon',
      wrap && 'dnb-button--wrap',
      status && `dnb-button__status--${status_state}`,
      isTrue(skeleton) && 'dnb-skeleton',
      createSpacingClasses(props),
      class_name,
      className,
      href ? '' : null // dnb-anchor--no-underline dnb-anchor--no-hover
    )

    const params = {
      ...this.renderProps,
      className: classes,
      type,
      title,
      id: this._id,
      disabled: isTrue(disabled),
      ...attributes,
      onClick: this.onClickHandler
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <>
        {href ? (
          <a href={href} ref={this._ref} {...params}>
            <Content
              {...this.props}
              icon={icon}
              text={text}
              icon_size={iconSize}
              content={content}
              isIconOnly={isIconOnly}
            />
          </a>
        ) : (
          <button ref={this._ref} {...params}>
            <Content
              {...this.props}
              icon={icon}
              text={text}
              icon_size={iconSize}
              content={content}
              isIconOnly={isIconOnly}
            />
          </button>
        )}
        {this.state.afterContent}
        {showStatus && (
          <FormStatus
            id={this._id + '-form-status'}
            global_status_id={global_status_id}
            text={status}
            status={status_state}
            text_id={this._id + '-status'} // used for "aria-describedby"
            animation={status_animation}
          />
        )}

        {tooltip && this._ref && (
          <Tooltip
            id={this._id + '-tooltip'}
            component={this._ref}
            {...(React.isValidElement(tooltip) && tooltip.props
              ? tooltip.props
              : { children: tooltip })}
          />
        )}
      </>
    )
  }
}

class Content extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]),
    icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bounding: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isIconOnly: PropTypes.bool
  }
  static defaultProps = {
    text: null,
    title: null,
    content: null,
    icon: null,
    icon_size: 'default',
    bounding: false,
    isIconOnly: null
  }
  render() {
    let { text } = this.props
    const {
      title,
      content,
      icon,
      icon_size,
      bounding,
      isIconOnly
    } = this.props

    const ret = []

    if (isTrue(bounding)) {
      ret.push(
        <span key="button-bounding" className="dnb-button__bounding" />
      )
    }

    if (
      typeof content === 'string'
      // ||
      // (Array.isArray(content) && typeof content[0] === 'string')
    ) {
      text = content
    } else if (content) {
      ret.push(content)
    }

    if (text) {
      ret.push(
        <span key="button-text-empty" className="dnb-button__alignment">
          &zwnj;
        </span>,
        <span key="button-text" className="dnb-button__text">
          {text}
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
            className: `dnb-button__icon ${icon.props.className || ''}`
          })
        ) : (
          <IconPrimary
            key="button-icon"
            className="dnb-button__icon"
            icon={icon}
            size={icon_size}
            aria-hidden={isIconOnly && !title ? null : true}
          />
        )
      )
    }

    return ret
  }
}
