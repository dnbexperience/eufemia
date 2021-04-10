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
import { LOCALE } from '../../shared/defaults'
import Space from '../space/Space'
import {
  spacingPropTypes,
  createSpacingClasses
} from '../space/SpacingHelper'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'

export default class Skeleton extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    style_type: PropTypes.oneOfType([
      PropTypes.oneOf(['lines']),
      PropTypes.string
    ]),
    figure: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    element: PropTypes.node,

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ])
  }

  static defaultProps = {
    show: null,
    skeleton: null, // only to make sure we process extendPropsWithContext
    style_type: null,
    no_animation: null,
    figure: null,
    aria_busy: null,
    aria_ready: null,
    element: null,
    class: null,
    className: null,
    children: null
  }

  constructor(props) {
    super(props)
    this.state = { ariaLiveUpdate: null }
  }

  componentWillUnmount() {
    clearTimeout(this._ariaLiveUpdateTimeout)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.setAriaLiveUpdate()
    }
  }

  getProps(props = this.props, context = this.context) {
    return extendPropsWithContext(
      props,
      Skeleton.defaultProps,
      {
        skeleton: context.Skeleton || context.skeleton,
        style_type: context.skeleton_style_type,
        no_animation: context.skeleton_no_animation
      },
      context.getTranslation(props).Skeleton
    )
  }

  setAriaLiveUpdate() {
    // this is only to make a better screen reader ux
    clearTimeout(this._ariaLiveUpdateTimeout)
    this._ariaLiveUpdateTimeout = setTimeout(() => {
      const { aria_busy, aria_ready } = this.getProps()

      let newString = null

      if (isTrue(this.props.show)) {
        newString = aria_busy
      } else {
        newString = aria_ready
      }

      if (newString) {
        this.setState({
          ariaLiveUpdate: newString
        })
        this._ariaLiveUpdateTimeout = setTimeout(() => {
          this.setState({
            ariaLiveUpdate: null
          })
        }, 1e3)
      }
    }, 1e3) // so that the input gets read out first, and then the results
  }

  render() {
    // consume the skeleton context
    const props = this.getProps()

    const {
      show,
      style_type,
      no_animation,
      figure,
      skeleton,
      aria_busy,
      aria_ready, // eslint-disable-line
      className,
      class: _className,
      children,

      ...attributes
    } = props

    const { ariaLiveUpdate } = this.state

    const showSkeleton =
      typeof show === 'boolean' || typeof show === 'string'
        ? isTrue(show)
        : skeleton

    const params = {
      className: classnames(
        figure ? 'dnb-skeleton__figure' : 'dnb-skeleton__root',
        isTrue(showSkeleton) && 'dnb-skeleton',
        showSkeleton && style_type && `dnb-skeleton--${style_type}`,
        isTrue(no_animation) && 'dnb-skeleton--no-animation',
        createSpacingClasses(props),
        className,
        _className
      ),
      // role: 'status',// is not needed as for now
      'aria-busy': showSkeleton,
      'aria-label': showSkeleton ? aria_busy : undefined,
      lang: this.context.locale || LOCALE,
      ...attributes
    }

    validateDOMAttributes(props, params)

    return (
      <Space {...params}>
        {figure ? (
          showSkeleton ? (
            typeof figure === 'function' ? (
              figure()
            ) : (
              figure
            )
          ) : (
            children
          )
        ) : (
          <Provider
            skeleton={showSkeleton}
            skeleton_style_type={style_type}
            skeleton_no_animation={no_animation}
          >
            {children}
          </Provider>
        )}
        <span className="dnb-sr-only" aria-live="assertive">
          {ariaLiveUpdate}
        </span>
      </Space>
    )
  }
}

function Exclude(props) {
  return <Provider {...props} skeleton={false} />
}

Skeleton.Exclude = Exclude
