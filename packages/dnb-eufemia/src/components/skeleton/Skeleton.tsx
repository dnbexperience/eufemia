/**
 * Web Skeleton Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
import {
  extendPropsWithContextInClassComponent,
  removeUndefinedProps,
  validateDOMAttributes,
} from '../../shared/component-helper'
import { LOCALE } from '../../shared/defaults'
import Space from '../space/Space'
import { createSpacingClasses } from '../space/SpacingHelper'
import Context from '../../shared/Context'
import Provider from '../../shared/Provider'
import type { SpacingProps } from '../space/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type SkeletonShow = boolean

export type SkeletonFigure =
  | string
  | (() => React.ReactNode)
  | React.ReactNode

export type SkeletonChildren =
  | string
  | (() => React.ReactNode)
  | React.ReactNode

export type SkeletonProps = {
  /**
   * Use `true` to enable/show the skeleton for the component used inside. Defaults to `false`.
   */
  show?: boolean
  /**
   * Use `true` to disable the animation.
   */
  noAnimation?: boolean
  /**
   * Define a figure to use, like `article`. The wrapped content will be hidden while the skeleton figure is shown.
   */
  figure?: SkeletonFigure
  /**
   * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
   */
  ariaBusy?: string
  /**
   * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
   */
  ariaReady?: string
  /**
   * Set any HTML element type you have to use. A couple of aria attributes will be set on this element while active. Defaults to `div`.
   */
  element?: React.ReactNode
  /**
   * If set to `true`, a loading skeleton will be shown.
   */
  skeleton?: boolean
  className?: string
  children?: SkeletonChildren
} & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'children'> &
  SpacingProps

const skeletonDefaultProps = {
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

function Skeleton(props: SkeletonProps) {
  const context = React.useContext(Context)
  const [ariaLiveUpdate, setAriaLiveUpdate] = React.useState(null)
  const ariaLiveUpdateTimeoutRef = React.useRef(null)
  const prevShowRef = React.useRef(props.show)

  const getProps = React.useCallback(
    (propsToExtend = props, ctx = context) => {
      return extendPropsWithContextInClassComponent(
        {
          ...skeletonDefaultProps,
          // Strip undefined values so they fall through to defaults,
          // preserving the legacy React defaultProps behavior.
          ...removeUndefinedProps({ ...propsToExtend }),
        },
        skeletonDefaultProps,
        {
          skeleton: ctx.Skeleton || ctx.skeleton,
          noAnimation: (ctx as Record<string, unknown>)
            .skeletonNoAnimation,
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

      if (props.show) {
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
    ariaReady,
    className,
    children,

    ...attributes
  } = extendedProps

  const showSkeleton =
    typeof show === 'boolean' || typeof show === 'string' ? show : skeleton

  const params = {
    className: clsx(
      figure ? 'dnb-skeleton__figure' : 'dnb-skeleton__root',
      showSkeleton && 'dnb-skeleton',
      noAnimation && 'dnb-skeleton--no-animation',
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

export default Skeleton

function Exclude(props) {
  return <Provider {...props} skeleton={false} />
}

Skeleton.Exclude = Exclude

withComponentMarkers(Skeleton, { _supportsSpacingProps: true })
