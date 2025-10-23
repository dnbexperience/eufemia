/**
 * Web Skeleton Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  isTrue,
} from '../../shared/component-helper'
import { LOCALE } from '../../shared/defaults'
import Space from '../space/Space'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'

export default class Skeleton extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    noAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    figure: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    ariaBusy: PropTypes.string,
    ariaReady: PropTypes.string,
    element: PropTypes.node,

    ...spacingPropTypes,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    show: null,
    skeleton: null, // only to make sure we process extendPropsWithContextInClassComponent
    noAnimation: null,
    figure: null,
    ariaBusy: null,
    ariaReady: null,
    element: null,
    className: null,
    children: null,
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
    return extendPropsWithContextInClassComponent(
      props,
      Skeleton.defaultProps,
      {
        skeleton: context.Skeleton || context.skeleton,
        noAnimation: context.skeletonNoAnimation,
      },
      context.getTranslation(props).Skeleton
    )
  }

  setAriaLiveUpdate() {
    // this is only to make a better screen reader ux
    clearTimeout(this._ariaLiveUpdateTimeout)
    this._ariaLiveUpdateTimeout = setTimeout(() => {
      const { ariaBusy, ariaReady } = this.getProps()

      let newString = null

      if (isTrue(this.props.show)) {
        newString = ariaBusy
      } else {
        newString = ariaReady
      }

      if (newString) {
        this.setState({
          ariaLiveUpdate: newString,
        })
        this._ariaLiveUpdateTimeout = setTimeout(() => {
          this.setState({
            ariaLiveUpdate: null,
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
      noAnimation,
      figure,
      skeleton,
      ariaBusy,
      ariaReady, // eslint-disable-line
      className,
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
        isTrue(noAnimation) && 'dnb-skeleton--no-animation',
        createSpacingClasses(props),
        className
      ),
      // role: 'status',// is not needed as for now
      'aria-busy': showSkeleton,
      'aria-label': showSkeleton ? ariaBusy : undefined,
      lang: this.context.locale || LOCALE,
      ...attributes,
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
            skeletonNoAnimation={noAnimation}
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

Skeleton._supportsSpacingProps = true
