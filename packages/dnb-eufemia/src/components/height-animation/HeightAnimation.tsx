import React from 'react'
import classnames from 'classnames'
import { DynamicElement, ISpacingProps } from '../../shared/interfaces'
import { useHeightAnimation } from './useHeightAnimation'
import Space from '../space/Space'

export type HeightAnimationProps = {
  /**
   * Set to `true` when the view should animate from 0px to auto.
   * Default: false
   */
  open: boolean

  /**
   * Set to `false` to omit the animation.
   * Default: true
   */
  animate?: boolean

  /**
   * Wheter the nested children content should be kept in the DOM or not.
   * Default: false
   */
  keepInDOM?: boolean

  /**
   * Set to `true` ensure the nested children content will be kept in the DOM.
   * Default: 400
   */
  duration?: number

  /**
   * Define a custom HTML Element.
   * Default: div
   */
  element?: DynamicElement

  /**
   * Send along a custom React Ref.
   * Default: null
   */
  innerRef?: React.RefObject<HTMLElement>

  /**
   * Is called when fully opened or closed
   * Default: null
   */
  onOpen?: (isOpen: boolean) => void

  /**
   * Is called when animation is done and the full height has reached
   * Default: null
   */
  onAnimationEnd?: () => void

  className?: React.ReactNode
  children?: React.ReactNode | HTMLElement
}

export default function HeightAnimation({
  open = false,
  animate = true,
  keepInDOM = false,
  element,
  duration,
  className,
  innerRef,
  children,
  onOpen = null,
  onAnimationEnd = null,
  ...props
}: HeightAnimationProps & ISpacingProps) {
  const ref = React.useRef<HTMLElement>()

  const { isInDOM, isVisible, isVisibleParallax, isAnimating } =
    useHeightAnimation(innerRef || ref, {
      open,
      animate,
      children,
      onOpen,
      onAnimationEnd,
    })

  if (!isInDOM && !keepInDOM) {
    return null
  }

  const style: React.CSSProperties = {}
  if (duration) {
    style['--duration'] = `${duration}ms`
  }

  return (
    <Space
      innerRef={innerRef || ref}
      element={element || 'div'}
      className={classnames(
        'dnb-height-animation',
        isInDOM && 'dnb-height-animation--is-in-dom',
        isVisible && 'dnb-height-animation--is-visible',
        isVisibleParallax && 'dnb-height-animation--parallax',
        isAnimating && 'dnb-height-animation--animating',
        className
      )}
      style={style}
      aria-hidden={keepInDOM ? !open : undefined}
      {...props}
    >
      {children}
    </Space>
  )
}
