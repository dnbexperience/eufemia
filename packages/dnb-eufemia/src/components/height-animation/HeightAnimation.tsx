import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React, { useRef } from 'react'
import clsx from 'clsx'
import {
  useHeightAnimation,
  useHeightAnimationOptions,
} from './useHeightAnimation'
import Space from '../space/Space'

import type { DynamicElement, SpacingProps } from '../../shared/types'

export type HeightAnimationProps = {
  /**
   * Whether the nested children content should be kept in the DOM or not.
   * Default: false
   */
  keepInDOM?: boolean

  /**
   * Set to `true` to omit the usage of "overflow: hidden;"
   * Default: false
   */
  showOverflow?: boolean

  /**
   * Defines the duration of the animation in milliseconds.
   * Default: 400
   */
  duration?: number

  /**
   * Defines the delay of the animation in milliseconds.
   * Default: 0
   */
  delay?: number

  /**
   * Define a custom HTML Element.
   * Default: div
   */
  element?: DynamicElement

  /**
   * Send along a custom React Ref.
   * Default: null
   */
  ref?: React.RefObject<HTMLElement>
} & useHeightAnimationOptions

export type HeightAnimationAllProps = HeightAnimationProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'onAnimationEnd'>

function HeightAnimation({
  open = true,
  animate = true,
  keepInDOM = false,
  showOverflow = false,
  element,
  duration,
  delay,
  className,
  ref,
  children,
  compensateForGap,
  onInit = null,
  onOpen = null,
  onAnimationStart = null,
  onAnimationEnd = null,
  ...rest
}: HeightAnimationAllProps) {
  const elementRef = useRef<HTMLElement>(undefined)
  const targetRef = ref || elementRef

  const {
    isInDOM,
    isVisible,
    isVisibleParallax,
    isAnimating,
    firstPaintStyle,
  } = useHeightAnimation(targetRef, {
    open,
    animate,
    children,
    compensateForGap,
    onInit,
    onOpen,
    onAnimationStart,
    onAnimationEnd,
  })

  if (!keepInDOM && !isInDOM && !isAnimating) {
    return null
  }

  if (duration) {
    firstPaintStyle['--duration'] = `${duration}ms`
  }
  if (delay) {
    firstPaintStyle['--delay'] = `${delay}ms`
  }

  return (
    <Space
      ref={targetRef}
      element={element || 'div'}
      className={clsx(
        'dnb-height-animation',
        isInDOM && 'dnb-height-animation--is-in-dom',
        isVisible && 'dnb-height-animation--is-visible',
        animate && isVisibleParallax && 'dnb-height-animation--parallax',
        isAnimating && 'dnb-height-animation--animating',
        !isVisible &&
          !isAnimating &&
          !open &&
          'dnb-height-animation--hidden',
        showOverflow && 'dnb-height-animation--show-overflow',
        className
      )}
      style={{ ...firstPaintStyle, ...rest?.style }}
      aria-hidden={keepInDOM ? !open : undefined}
      {...rest}
    >
      {compensateForGap ? (
        <div className="compensateForGap">{children}</div>
      ) : (
        children
      )}
    </Space>
  )
}

withComponentMarkers(HeightAnimation, {
  _supportsSpacingProps: 'children',
})

export default HeightAnimation
