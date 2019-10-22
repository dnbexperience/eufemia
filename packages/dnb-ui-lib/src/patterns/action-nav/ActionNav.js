/**
 * Web ActionNav Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes
} from '../../shared/component-helper'
// import './style/dnb-action-nav.scss' // no good solution to import the style here
import Button from '../../components/button/Button'

const renderProps = {}

const propTypes = {
  prev_href: PropTypes.string,
  next_href: PropTypes.string,
  prev_text: PropTypes.string,
  next_text: PropTypes.string,
  prev_title: PropTypes.string,
  next_title: PropTypes.string,
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
  // Web Component props
  // render_left_content: PropTypes.func,
  // render_right_content: PropTypes.func
}

const defaultProps = {
  prev_href: null,
  next_href: null,
  prev_text: 'Back',
  next_text: 'Next',
  prev_title: 'Go back',
  next_title: 'Go next',
  class: null,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class ActionNav extends PureComponent {
  static tagName = 'dnb-action-nav'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(ActionNav.tagName, ActionNav, defaultProps)
  }

  render() {
    const {
      children,
      prev_href,
      next_href,
      prev_text,
      next_text,
      prev_title,
      next_title,
      className,
      class: _className
    } = this.props

    // const leftContent = ActionNav.getLeftContent(this.props)
    // const rightContent = ActionNav.getRightContent(this.props)

    const params = {
      className: classnames(
        'dnb-action-nav',
        'dnb-belt',
        className,
        _className
      )
    }

    const hasNavAttributes = prev_href && next_href

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params}>
        <div className="dnb-width-limit">
          <div className="dnb-action-nav__inner">
            {(hasNavAttributes && (
              <>
                <div className="dnb-action-nav__left">
                  {prev_href && (
                    <div className="dnb-action-nav__item">
                      <Button
                        type="button"
                        text={prev_text}
                        title={prev_title}
                        variant="secondary"
                        icon_position="left"
                        icon="chevron_left"
                        href={prev_href}
                      />
                    </div>
                  )}
                  {next_href && (
                    <div className="dnb-action-nav__item">
                      <Button
                        text={next_text}
                        title={next_title}
                        variant="primary"
                        icon="chevron_right"
                        href={next_href}
                      />
                    </div>
                  )}
                </div>
                <div className="dnb-action-nav__right">{children}</div>
              </>
            )) ||
              children}
          </div>
        </div>
      </div>
    )
  }
}
