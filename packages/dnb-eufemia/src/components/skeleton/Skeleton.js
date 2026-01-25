/**
 * Web Skeleton Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
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

function Skeleton(props) {
  const context = React.useContext(Context)
  const [ariaLiveUpdate, setAriaLiveUpdate] = React.useState(null)
  const ariaLiveUpdateTimeoutRef = React.useRef(null)
  const prevShowRef = React.useRef(props.show)

  const getProps = React.useCallback(
    (propsToExtend = props, ctx = context) => {
      return extendPropsWithContextInClassComponent(
        propsToExtend,
        Skeleton.defaultProps,
        {
          skeleton: ctx.Skeleton || ctx.skeleton,
          noAnimation: ctx.skeletonNoAnimation,
        },
        ctx.getTranslation(propsToExtend).Skeleton
      )
    },
    [props, context]
  )

  const updateAriaLive = React.useCallback(() => {
    // this is only to make a better screen reader ux
    clearTimeout(ariaLiveUpdateTimeoutRef.current)
    ariaLiveUpdateTimeoutRef.current = setTimeout(() => {
      const { ariaBusy, ariaReady } = getProps()

      let newString = null

      if (isTrue(props.show)) {
        newString = ariaBusy
      } else {
        newString = ariaReady
      }

      if (newString) {
        setAriaLiveUpdate(newString)
        ariaLiveUpdateTimeoutRef.current = setTimeout(() => {
          setAriaLiveUpdate(null)
        }, 1e3)
      }
    }, 1e3) // so that the input gets read out first, and then the results
  }, [props.show, getProps])

  React.useEffect(() => {
    if (prevShowRef.current !== props.show) {
      updateAriaLive()
    }
    prevShowRef.current = props.show
  }, [props.show, updateAriaLive])

  React.useEffect(() => {
    return () => {
      clearTimeout(ariaLiveUpdateTimeoutRef.current)
    }
  }, [])

  // consume the skeleton context
  const extendedProps = getProps()

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
  } = extendedProps

  const showSkeleton =
    typeof show === 'boolean' || typeof show === 'string'
      ? isTrue(show)
      : skeleton

  const params = {
    className: clsx(
      figure ? 'dnb-skeleton__figure' : 'dnb-skeleton__root',
      isTrue(showSkeleton) && 'dnb-skeleton',
      isTrue(noAnimation) && 'dnb-skeleton--no-animation',
      createSpacingClasses(extendedProps),
      className
    ),
    // role: 'status',// is not needed as for now
    'aria-busy': showSkeleton,
    'aria-label': showSkeleton ? ariaBusy : undefined,
    lang: context.locale || LOCALE,
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

Skeleton.propTypes = {
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

Skeleton.defaultProps = {
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

export default Skeleton

function Exclude(props) {
  return <Provider {...props} skeleton={false} />
}

Skeleton.Exclude = Exclude

Skeleton._supportsSpacingProps = true
