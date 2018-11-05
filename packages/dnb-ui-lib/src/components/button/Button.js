/**
 * Web Button Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icon from '../icon/IconWithAllIcons'
import {
  registerElement,
  validateDOMAttributes,
  processChildren,
  pickRenderProps,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
// import './style/dnb-button.scss' // no good solution to import the style here

const renderProps = {
  on_click: null
}

export const propTypes = {
  /** the content of the button. */
  text: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'signal']),
  size: PropTypes.oneOf(['big']),
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
  variant: 'primary',
  size: null,
  title: null,
  icon: null,
  icon_position: 'right',
  icon_size: null, // we set the size with css, if we set the size explicit, then the css can't reize the icon
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
export default class Button extends Component {
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

  // handleRef = ref => {
  //   if (
  //     this.props.innerRef &&
  //     typeof this.props.innerRef.current !== 'undefined'
  //   ) {
  //     this.props.innerRef.current = ref
  //   }
  //   return (this._ref = ref)
  // }

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
      variant,
      size,
      text,
      icon,
      icon_position
    } = this.props

    const content = Button.getContent(this.props)

    const classes = classnames(
      'dnb-button',
      `dnb-button--${variant}`,
      size ? `dnb-button--size-${size}` : null,
      icon && icon_position
        ? `dnb-button--icon-position-${icon_position}`
        : null,
      text ? 'dnb-button--has-text' : null,
      icon ? 'dnb-button--has-icon' : null,
      id,
      class_name,
      className
    )

    const params = {
      ...this.renderProps,
      className: classes,
      type,
      title: title || text,
      id,
      disabled:
        typeof disabled === 'string'
          ? disabled === 'true'
          : Boolean(disabled),
      onMouseOut: this.onMouseOutHandler,
      onClick: this.onClickHandler
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return this.props.href ? (
      <a href={this.props.href} ref={this._ref} {...params}>
        <Content {...this.props} content={content} />
      </a>
    ) : (
      <button ref={this._ref} {...params}>
        <Content {...this.props} content={content} />
      </button>
    )
  }
}

const Content = props => {
  const ret = []

  // if (props.children) {
  //   if (typeof props.children === 'function') {
  //     ret.push(props.children())
  //   } else if (props.children === PropTypes.node) {
  //     ret.push(props.children)
  //   }
  // }

  if (props.content) {
    ret.push(props.content)
  }

  if (props.text) {
    ret.push(
      <span key="button-text" className="dnb-button__text">
        {props.text}
      </span>
    )
  }

  if (props.icon) {
    const alt = props.title || props.text
    ret.push(
      <span
        key="button-icon"
        className="dnb-button__icon"
        role="presentation"
      >
        <Icon
          icon={props.icon}
          width={props.icon_size}
          height={props.icon_size}
          size={null}
          alt={alt}
          area_hidden={Boolean(alt)}
        />
      </span>
    )
  }

  return ret
}
