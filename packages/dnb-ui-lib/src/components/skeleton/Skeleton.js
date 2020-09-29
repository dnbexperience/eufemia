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
import Space from '../space/Space'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'

export default class Skeleton extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    element: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.bool
    ]),
    show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ])
  }

  static defaultProps = {
    element: null,
    show: null,
    skeleton: null, // only to make sure we process extendPropsWithContext
    style_type: null,
    no_animation: null,
    figure: null,
    class: null,
    className: null,
    children: null
  }

  render() {
    // consume the skeleton context
    const props =
      typeof this.context?.skeleton !== 'undefined'
        ? // use only the props from context, who are available here anyway
          extendPropsWithContext(this.props, Skeleton.defaultProps, {
            skeleton: this.context.skeleton,
            style_type: this.context.skeleton_style_type,
            no_animation: this.context.skeleton_no_animation
          })
        : this.props

    const {
      element,
      show,
      style_type,
      no_animation,
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

    let params = {
      className: classnames(
        figure ? 'dnb-skeleton__figure' : 'dnb-skeleton__root',
        isTrue(showSkeleton) && 'dnb-skeleton--visible',
        showSkeleton && style_type && `dnb-skeleton--${style_type}`,
        isTrue(no_animation) && 'dnb-skeleton--no-animation',
        className,
        _className
      ),
      ...attributes
    }

    validateDOMAttributes(props, params)

    // Avoid using a wrapper, as long as possible
    let Elem = Space
    if (element === false || element === 'false') {
      Elem = React.Fragment
      params = {}
    }

    return (
      <Elem {...params}>
        {figure ? (
          showSkeleton ? (
            figure
          ) : null
        ) : (
          <Provider
            skeleton={showSkeleton}
            skeleton_style_type={style_type}
            skeleton_no_animation={no_animation}
          >
            {children}
          </Provider>
        )}
      </Elem>
    )
  }
}
