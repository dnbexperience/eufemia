/**
 * Web Skeleton Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  validateDOMAttributes,
  isTrue
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import Space from '../space/Space'

const renderProps = {
  render_content: null
}

const propTypes = {
  id: PropTypes.string,
  element: PropTypes.string,
  show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  style_type: PropTypes.oneOfType([
    PropTypes.oneOf(['lines', 'dots', 'shine']),
    PropTypes.string
  ]),
  figure: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
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
  show: null,
  skeleton: null, // only to make sure we process extendPropsWithContext
  style_type: 'lines',
  figure: null,
  class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Skeleton extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  render() {
    // consume the skeleton context
    const props =
      typeof this.context?.skeleton !== 'undefined'
        ? // use only the props from context, who are available here anyway
          extendPropsWithContext(this.props, defaultProps, {
            skeleton: this.context.skeleton,
            style_type: this.context.skeleton_style_type
          })
        : this.props

    const {
      show,
      style_type,
      figure,
      skeleton,
      className,
      class: _className,
      children,

      ...attributes
    } = props

    const showSkeleton =
      typeof show === 'boolean' || typeof show === 'string'
        ? isTrue(show)
        : skeleton

    const params = {
      className: classnames(
        showSkeleton && style_type && `dnb-skeleton--${style_type}`,
        className,
        _className
      ),
      ...attributes
    }

    validateDOMAttributes(this.props, params)

    return (
      <Space {...params}>
        {figure && showSkeleton ? (
          figure
        ) : (
          <Provider
            skeleton={showSkeleton}
            skeleton_style_type={style_type}
          >
            {children}
          </Provider>
        )}
      </Space>
    )
  }
}
