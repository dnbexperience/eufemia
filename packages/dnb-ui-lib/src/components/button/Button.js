/**
 * Web Button Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icon from '../icon/IconPrimary'
import {
  registerElement,
  validateDOMAttributes,
  processChildren,
  pickRenderProps,
  dispatchCustomElementEvent
} from '../../shared/component-helper'

const renderProps = {
  on_click: null
}

export const propTypes = {
  /** the content of the button. */
  text: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'signal']),
  size: PropTypes.oneOf(['medium', 'default', 'large']),
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
  /** will be called on a click event. */
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
  icon_size: null,
  href: null,
  id: null,
  class: null,
  attributes: null,
  disabled: false,

  // React props
  className: null,
  innerRef: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
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
    if (typeof this.props.on_click === 'function') {
      this.props.on_click({ event })
    }
    dispatchCustomElementEvent(this, 'on_click', { event })
  }
  render() {
    const {
      class: class_name,
      className,
      type,
      title,
      id,
      disabled,
      text,
      icon,
      icon_position,
      href,
      ...props
    } = this.props

    let { variant, size } = props

    // if only has Icon, then resize it and define it as secondary
    if (!text && icon) {
      if (!variant) {
        variant = 'secondary'
      }
      if (!size) {
        size = 'small'
      }
    } else if (text) {
      if (!variant) {
        variant = 'primary'
      }
      if (!size) {
        size = 'default'
      }
    }

    const content = Button.getContent(this.props)

    const classes = classnames(
      'dnb-button',
      `dnb-button--${variant}`,
      size && size !== 'default' ? `dnb-button--size-${size}` : null,
      icon && icon_position
        ? `dnb-button--icon-position-${icon_position}`
        : null,
      text ? 'dnb-button--has-text' : null,
      icon ? 'dnb-button--has-icon' : null,
      id,
      class_name,
      className,
      href ? 'dnb-no-anchor-underline dnb-no-anchor-hover' : null
    )

    const params = {
      ...this.renderProps,
      className: classes,
      type,
      title: title || text,
      id,
      disabled,
      onMouseOut: this.onMouseOutHandler,
      onClick: this.onClickHandler
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return href ? (
      <a href={href} ref={this._ref} {...params}>
        <Content {...this.props} content={content} />
      </a>
    ) : (
      <button ref={this._ref} {...params}>
        <Content {...this.props} content={content} />
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
    icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }
  static defaultProps = {
    text: null,
    title: null,
    content: null,
    icon: null,
    icon_size: null
  }
  render() {
    const { text, title, content, icon, icon_size } = this.props

    const ret = []

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
        <Icon
          key="button-icon"
          className="dnb-button__icon"
          icon={icon}
          size={icon_size}
          alt={alt}
          area_hidden={Boolean(alt)}
        />
      )
    }

    return ret
  }
}
