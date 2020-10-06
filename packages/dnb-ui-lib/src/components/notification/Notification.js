/**
 * Web Notification Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes
  // processChildren
} from '../../shared/component-helper'
// import './style/dnb-notification.scss' // no good solution to import the style here
import Icon from '../../components/icon-primary/IconPrimary'

const renderProps = {
  // render_content: null
}

const propTypes = {
  notification_amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title_text: PropTypes.string,
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  // Web Component props
  // render_content: PropTypes.func
}

const defaultProps = {
  notification_amount: 0,
  title_text: null,
  class: null,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class Notification extends React.PureComponent {
  static tagName = 'dnb-notification'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(Notification.tagName, Notification, defaultProps)
  }

  // static getContent(props) {
  //   if (typeof props.render_content === 'function') {
  //     return props.render_content(props)
  //   }
  //   return processChildren(props)
  // }

  render() {
    const {
      notification_amount,
      title_text,
      className,
      class: _className
    } = this.props

    // const content = Notification.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-notification',
        className,
        _className,
        notification_amount > 0
          ? 'dnb-notification--has-notification'
          : null
      )
    }

    const buttonParams = {
      title: title_text.replace(/{amount}/, notification_amount)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params}>
        <button
          type="button"
          className="dnb-notification__button"
          {...buttonParams}
        >
          <span className="dnb-notification__inner">
            <span className="dnb-notification__icon">
              <Icon className="dnb-notification__icon" icon="bell" />
            </span>
            {notification_amount > 0 && (
              <span className="dnb-notification__amount">
                <span className="dnb-notification__amount__inner">
                  {notification_amount}
                </span>
              </span>
            )}
          </span>
        </button>
      </div>
    )
  }
}
