/**
 * Web Button Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import IconPrimary from '../icon-primary/IconPrimary'
import {
  isTrue,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  processChildren,
  pickRenderProps,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

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
  icon_position: null,
  icon_size: null,
  href: null,
  id: null,
  class: null,
  bounding: false,
  disabled: null,

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
  static contextType = Context

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

  onMouseOutHandler = () => {
    if (this._ref.current) {
      this._ref.current.blur()
    }
  }
  onClickHandler = event => {
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
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

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
      icon_size,
      href,
      bounding, // eslint-disable-line
      innerRef, // eslint-disable-line
      ...attributes
    } = props

    let usedVariant = variant
    let usedSize = size

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
      usedSize && usedSize !== 'default' && `dnb-button--size-${usedSize}`,
      icon && `dnb-button--icon-position-${icon_position || 'right'}`,
      icon && icon_size && `dnb-button--icon-size-${icon_size}`,
      text && 'dnb-button--has-text',
      icon && 'dnb-button--has-icon',
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
      id,
      disabled: isTrue(disabled),
      ...attributes,
      onMouseOut: this.onMouseOutHandler, // for resetting the button to the default state
      // onTouchStart: this.preventPageScrolling,
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
        )}
        {this.state.afterContent}
      </>
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
      ret.push(
        <IconPrimary
          key="button-icon"
          className="dnb-button__icon"
          icon={icon}
          size={icon_size}
          aria-hidden={isIconOnly && !title ? false : true}
        />
      )
    }

    return ret
  }
}
