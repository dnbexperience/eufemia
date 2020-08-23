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
  figure: PropTypes.oneOf(['article', 'circle', 'product']),
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
  skeleton: null, // only to make sure we process extendPropsWithContext
  figure: null,
  width: null,
  class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class SkeletonFigure extends React.PureComponent {
  static tagName = 'dnb-skeleton-figure'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(SkeletonFigure.tagName, SkeletonFigure, defaultProps)
  }

  render() {
    // consume the skeleton context
    const props =
      typeof this.context?.skeleton !== 'undefined'
        ? // use only the props from context, who are available here anyway
          extendPropsWithContext(
            this.props,
            defaultProps,
            // this.context.skeleton,
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
        {figure && (
          <Figure figure={figure} show={isTrue(show) || skeleton} />
        )}
        &zwnj;
      </Element>
    )
  }
}

function Figure({ figure, show }) {
  switch (figure) {
    case 'article': {
      const style = (p) =>
        `dnb-space__top--x-small dnb-skeleton dnb-skeleton--${p}`
      return (
        <div
          className={classnames(
            'dnb-skeleton__figure',
            show && 'dnb-skeleton__figure--show'
          )}
          aria-busy={show ? true : null}
        >
          <div className={`dnb-h--xx-large ${style(50)}`}>&zwnj;</div>
          <div className={`dnb-p ${style(70)} dnb-space__top--large`}>
            &zwnj;
          </div>
          <div className={`dnb-p ${style(80)}`}>&zwnj;</div>
          <div className={`dnb-p ${style(60)}`}>&zwnj;</div>
        </div>
      )
    }

    case 'circle': {
      return (
        <div
          className={classnames(
            'dnb-skeleton',
            'dnb-skeleton__figure',
            'dnb-skeleton__figure--circle',
            show && 'dnb-skeleton__figure--show'
          )}
          aria-busy={show ? true : null}
        >
          &zwnj;
        </div>
      )
    }

    case 'product': {
      const style = (p) =>
        `dnb-space__top--x-small dnb-skeleton dnb-skeleton--${p}`
      return (
        <div
          className={classnames(
            'dnb-skeleton__figure',
            'dnb-skeleton__figure--product',
            show && 'dnb-skeleton__figure--show'
          )}
          aria-busy={show ? true : null}
        >
          <div
            className={classnames(
              'dnb-skeleton',
              'dnb-skeleton__figure',
              'dnb-skeleton__figure--circle',
              'dnb-skeleton__figure--show'
            )}
          >
            &zwnj;
          </div>
          <div>
            <div className={`dnb-p ${style(80)}`}>&zwnj;</div>
            <div className={`dnb-p ${style(60)}`}>&zwnj;</div>
          </div>
        </div>
      )
    }
  }

  return null
}
