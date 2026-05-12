import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useEffect, useRef } from 'react'
import type { HTMLProps, RefObject } from 'react'
import clsx from 'clsx'
import type { UseHeightAnimationOptions } from './useHeightAnimation'
import { useHeightAnimation } from './useHeightAnimation'
import Space from '../space/Space'

import type { DynamicElement, SpacingProps } from '../../shared/types'

export type HeightAnimationProps = {
  /**
   * Whether the nested children content should be kept in the DOM or not.
   * Default: `false`
   */
  keepInDOM?: boolean

  /**
   * Set to `true` to omit the usage of "overflow: hidden;"
   * Default: `false`
   */
  showOverflow?: boolean

  /**
   * Custom duration of the animation in milliseconds.
   * Default: `400`
   */
  duration?: number

  /**
   * Custom delay of the animation in milliseconds.
   * Default: `0`
   */
  delay?: number

  /**
   * Define a custom HTML Element.
   * Default: `div`
   */
  element?: DynamicElement

  /**
   * Send along a custom React Ref.
   * Default: `null`
   */
  ref?: RefObject<HTMLElement>
} & UseHeightAnimationOptions

export type HeightAnimationAllProps = HeightAnimationProps &
  SpacingProps &
  Omit<
    HTMLProps<HTMLElement>,
    'ref' | 'onAnimationEnd' | 'onAnimationStart'
  >

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

  // Set CSS custom properties via the DOM instead of React's style
  // prop. React's SSR serializes custom properties without spaces
  // (e.g. "--duration:600ms") while the client serializes them with
  // spaces and a trailing semicolon ("--duration: 600ms;"), causing
  // a hydration mismatch.
  useEffect(() => {
    const el = targetRef.current
    if (!el) {
      return
    }
    if (duration) {
      el.style.setProperty('--duration', `${duration}ms`)
    } else {
      el.style.removeProperty('--duration')
    }

    if (delay) {
      el.style.setProperty('--delay', `${delay}ms`)
    } else {
      el.style.removeProperty('--delay')
    }
  }, [duration, delay, targetRef, isInDOM])

  if (!keepInDOM && !isInDOM && !isAnimating) {
    return null
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
        <div className="dnb-height-animation__compensate-for-gap">
          {children}
        </div>
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
