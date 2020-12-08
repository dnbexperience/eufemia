/**
 * Web LineTitle Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
// import './style/dnb-line-title.scss' // no good solution to import the style here

export default class LineTitle extends React.PureComponent {
  static tagName = 'dnb-line-title'

  static propTypes = {
    content: PropTypes.string,
    modifier: PropTypes.string,
    tag: PropTypes.string,
    class: PropTypes.string,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }

  static defaultProps = {
    content: null,
    modifier: null,
    tag: 'h2',
    class: null,

    /** React props */
    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(LineTitle.tagName, LineTitle, LineTitle.defaultProps)
  }

  static getContent(props) {
    if (typeof props.content === 'string') {
      return props.content
    }
    return processChildren(props)
  }

  render() {
    const { tag, modifier, className, class: _className } = this.props

    const content = LineTitle.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-line-title',
        className,
        _className,
        modifier ? `dnb-line-title--${modifier}` : null
      )
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const Tag = `${tag}`
    return (
      <Tag {...params}>
        <span className="dnb-line-title__title dnb-typo-light">
          <span className="dnb-line-title__mask" aria-hidden="true" />
          <span className="dnb-line-title__text">{content}</span>
        </span>
        <span className="dnb-line-title__line" aria-hidden="true" />
      </Tag>
    )
  }
}
