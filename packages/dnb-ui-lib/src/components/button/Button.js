/**
 * Web Button Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IconPrimary from '../icon-primary/IconPrimary'
import {
  registerElement,
  validateDOMAttributes,
  processChildren,
  pickRenderProps,
  dispatchCustomElementEvent
} from '../../shared/component-helper'

const renderProps = { on_click: null }

export const propTypes = {
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
  id: PropTypes.string,
  class: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.string,
  bounding: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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

export const defaultProps = {
  type: 'button',
  text: null,
  variant: null,
  size: null,
  title: null,
  icon: null,
  icon_position: 'right',
  icon_size: 'default',
  href: null,
  id: null,
  class: null,
  attributes: null,
  bounding: false,
  disabled: false,

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
export default class Button extends PureComponent {
  static tagName = 'dnb-button'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Button.tagName, Button, defaultProps)
  }

  static getContent(props) {
    return processChildren(props)
  }

  constructor(props) {
    super(props)

    this._ref = React.createRef()

    // pass along all props we wish to have as params
    this.renderProps = pickRenderProps(props, renderProps)
  }

  componentDidMount() {
    if (
      this.props.innerRef &&
      typeof this.props.innerRef.current !== 'undefined'
    ) {
      this.props.innerRef.current = this._ref.current
    }
  }

  onMouseOutHandler = () => {
    if (this._ref.current) {
      this._ref.current.blur()
    }
  }
  onClickHandler = event => {
    // add web component event handler
    if (typeof this.props.onClick === 'function') {
      this.props.onClick({ event })
    }
    dispatchCustomElementEvent(this, 'on_click', { event })
  }
  render() {
    const {
      class: class_name,
      className,
      type,
      variant,
      size,
      title,
      id,
      disabled,
      text,
      icon,
      icon_position,
      href,
      bounding, // eslint-disable-line
      attributes, // eslint-disable-line
      innerRef, // eslint-disable-line
      ...props
    } = this.props

    let usedVariant = variant
    let usedSize = size

    // let {  size } = props

    // if only has Icon, then resize it and define it as secondary
    const isIconOnly = Boolean(!text && icon)
    if (isIconOnly) {
      if (!usedVariant) {
        usedVariant = 'secondary'
      }
      if (!usedSize) {
        usedSize = 'medium'
      }
    } else if (text) {
      if (!usedVariant) {
        usedVariant = 'primary'
      }
      if (!usedSize) {
        usedSize = 'default'
      }
    }

    const content = Button.getContent(this.props)

    const classes = classnames(
      'dnb-button',
      `dnb-button--${usedVariant || 'primary'}`,
      usedSize && usedSize !== 'default'
        ? `dnb-button--size-${usedSize}`
        : null,
      icon && icon_position
        ? `dnb-button--icon-position-${icon_position}`
        : null,
      text ? 'dnb-button--has-text' : null,
      icon ? 'dnb-button--has-icon' : null,
      id,
      class_name,
      className,
      href ? '' : null // dnb-anchor--no-underline dnb-anchor--no-hover
    )

    const params = {
      ...this.renderProps,
      className: classes,
      type,
      title,
      id,
      disabled,
      ...props,
      onMouseOut: this.onMouseOutHandler, // for resetting the button to the default state
      onClick: this.onClickHandler
    }
    if (!params['aria-label'] && !text && title) {
      params['aria-label'] = title
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return href ? (
      <a href={href} ref={this._ref} {...params}>
        <Content
          {...this.props}
          content={content}
          isIconOnly={isIconOnly}
        />
      </a>
    ) : (
      <button ref={this._ref} {...params}>
        <Content
          {...this.props}
          content={content}
          isIconOnly={isIconOnly}
        />
      </button>
    )
  }
}

class Content extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
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
    const {
      text,
      title,
      content,
      icon,
      icon_size,
      bounding,
      isIconOnly
    } = this.props

    const ret = []

    if (bounding) {
      ret.push(
        <span key="button-bounding" className="dnb-button__bounding" />
      )
    }

    if (content) {
      ret.push(content)
    }

    if (text) {
      ret.push(
        <span key="button-text" className="dnb-button__text">
          {text}
        </span>
      )
    }

    if (icon) {
      const alt = title || text
      ret.push(
        <IconPrimary
          key="button-icon"
          className="dnb-button__icon"
          icon={icon}
          size={icon_size}
          alt={alt}
          aria-hidden={isIconOnly ? false : Boolean(alt)}
        />
      )
    }

    return ret
  }
}
