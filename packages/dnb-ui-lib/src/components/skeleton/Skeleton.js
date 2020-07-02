/**
 * Web Skeleton Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  isTrue
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from '../space/SpacingHelper'

const renderProps = {
  render_content: null
}

const propTypes = {
  id: PropTypes.string,
  element: PropTypes.string,
  show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  figure: PropTypes.oneOf(['article']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  class: PropTypes.string,

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

const defaultProps = {
  id: null,
  element: 'span',
  show: null,
  figure: null,
  width: null,
  class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Skeleton extends React.PureComponent {
  static tagName = 'dnb-skeleton'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Skeleton.tagName, Skeleton, defaultProps)
  }

  render() {
    // consume the skeleton context
    const props = this.context?.skeleton
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(
          this.props,
          defaultProps,
          this.context.skeleton,
          { skeleton: this.context.skeleton }
        )
      : this.props

    const {
      element,
      show,
      figure,
      width,
      skeleton,
      className,
      class: _className,
      children,

      ...attributes
    } = props

    const params = {
      className: classnames(
        (isTrue(show) || skeleton) &&
          !figure &&
          'dnb-skeleton dnb-skeleton--block',
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes
    }

    if (width) {
      params.style = { width: `${parseFloat(width)}%` }
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const Element = element

    return (
      <Element {...params}>
        {children}
        {figure && <Figure figure={figure} />}
        {(isTrue(show) || skeleton) && <>&zwnj;</>}
      </Element>
    )
  }
}

function Figure({ figure }) {
  switch (figure) {
    case 'article': {
      const style =
        'dnb-p dnb-space__top--x-small dnb-skeleton dnb-skeleton'
      return (
        <div className="dnb-skeleton__figure">
          <div className={`dnb-h--xx-large ${style}--50`}>&zwnj;</div>
          <div className={`${style}--70`}>&zwnj;</div>
          <div className={`${style}--80`}>&zwnj;</div>
          <div className={`${style}--60`}>&zwnj;</div>
        </div>
      )
    }
  }

  return null
}
