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
  status: PropTypes.oneOf(['error', 'info']),
  hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  text_id: PropTypes.string,
  class: PropTypes.string,
  animation: PropTypes.string,

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
  hidden: false,
  text_id: null,
  class: null,
  animation: null, // could be 'fade-in'

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

  static getIcon({ status, icon, icon_size }) {
    if (typeof icon === 'string') {
      let iconToLoad = icon

      switch (status) {
        case 'info':
        case 'information':
          iconToLoad = 'information'
          break
        case 'error':
        default:
          iconToLoad = 'exclamation'
      }

      icon = <IconPrimary aria-hidden icon={iconToLoad} size={icon_size} />
    }

    return icon
  }

  render() {
    const {
      title,
      status,
      hidden,
      className,
      animation,
      class: _className,
      text_id,
      text /* eslint-disable-line */,
      icon /* eslint-disable-line */,
      icon_size /* eslint-disable-line */,
      children /* eslint-disable-line */,
      ...attributes
    } = this.props

    const iconToRender = FormStatus.getIcon(this.props)
    const contentToRender = FormStatus.getContent(this.props)
    const hasStringContent =
      typeof contentToRender === 'string' && contentToRender.length > 0

    const params = {
      hidden,
      className: classnames(
        'dnb-form-status',
        `dnb-form-status--${status}`,
        animation ? `dnb-form-status--${animation}` : null,
        hasStringContent ? 'dnb-form-status--has-content' : null,
        className,
        _className
      ),
      title,

      ...attributes
    }
    const textParams = {
      className: 'dnb-form-status--text',
      id: text_id
    }

    if (hidden) {
      params['aria-hidden'] = hidden
    } else if (hasStringContent) {
      // in case we send in a React component, witchs has its own state, then we dont want to have aria-live all the time active
      params['aria-live'] = 'assertive'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)
    validateDOMAttributes(null, textParams)

    return (
      <span {...params}>
        {iconToRender}
        <span {...textParams}>{contentToRender}</span>
      </span>
    )
  }
}
