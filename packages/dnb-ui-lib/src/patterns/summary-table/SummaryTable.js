/**
 * Web SummaryTable Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
// import './style/dnb-summary-table.scss' // no good solution to import the style here
import Button from '../../components/button/Button'

export default class SummaryTable extends React.PureComponent {
  static tagName = 'dnb-summary-table'

  static propTypes = {
    prev_href: PropTypes.string,
    next_href: PropTypes.string,
    prev_text: PropTypes.string,
    next_text: PropTypes.string,
    prev_title: PropTypes.string,
    next_title: PropTypes.string,
    class: PropTypes.string,
    /** React props */
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    render_left_content: PropTypes.func,
    render_right_content: PropTypes.func
  }

  static defaultProps = {
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

    render_left_content: null,
    render_right_content: null
  }

  static enableWebComponent() {
    registerElement(
      SummaryTable.tagName,
      SummaryTable,
      SummaryTable.defaultProps
    )
  }

  static getLeftContent(props) {
    if (typeof props.render_left_content === 'function') {
      return props.render_left_content(props)
    }
    return null
  }

  static getRightContent(props) {
    if (typeof props.render_right_content === 'function') {
      return props.render_right_content(props)
    }
    return processChildren(props)
  }

  render() {
    const {
      prev_href,
      next_href,
      prev_text,
      next_text,
      prev_title,
      next_title,
      className,
      class: _className
    } = this.props

    const leftContent = SummaryTable.getLeftContent(this.props)
    const rightContent = SummaryTable.getRightContent(this.props)

    const params = {
      className: `dnb-summary-table ${className || _className || ''}`
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params}>
        <div className="dnb-width-limit">
          <div className="dnb-summary-table__inner">
            {(leftContent && (
              <div className="dnb-summary-table__left">{leftContent}</div>
            )) || (
              <div className="dnb-summary-table__left">
                {prev_href && (
                  <div className="dnb-summary-table__item">
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
                  <div className="dnb-summary-table__item">
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
            )}
            {rightContent && (
              <div className="dnb-summary-table__right">
                {rightContent}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
