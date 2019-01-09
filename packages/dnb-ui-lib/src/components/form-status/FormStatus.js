/**
 * Web FormStatus Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
import IconPrimary from '../icon-primary/IconPrimary'

const renderProps = {
  render_content: null
}

export const propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  icon_size: PropTypes.string,
  status: PropTypes.string,
  class: PropTypes.string,
  fade_in: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  // Web Component props
  render_content: PropTypes.func
}

export const defaultProps = {
  title: null,
  text: null,
  icon: 'exclamation',
  icon_size: 'medium',
  status: 'error',
  class: null,
  fade_in: true,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class FormStatus extends PureComponent {
  static tagName = 'dnb-form-status'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(FormStatus.tagName, FormStatus, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  render() {
    const {
      title,
      icon,
      icon_size,
      status,
      className,
      fade_in,
      class: _className
    } = this.props

    const contentToRender = FormStatus.getContent(this.props)
    const iconToRender =
      typeof icon === 'string' ? (
        <IconPrimary icon={icon} size={icon_size} />
      ) : (
        // React.isValidElement(icon)
        icon
      )

    const params = {
      className: classnames(
        'dnb-form-status',
        fade_in ? 'dnb-form-status--fade-in' : null,
        `dnb-form-status--${status}`,
        className,
        _className
      ),
      title
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <span {...params}>
        {iconToRender}
        <span className="dnb-form-status--text">{contentToRender}</span>
      </span>
    )
  }
}
