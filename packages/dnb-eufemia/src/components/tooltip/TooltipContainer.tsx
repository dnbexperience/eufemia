/**
 * Web Tooltip Component
 *
 */

import React, { useCallback, useContext, useRef, useState } from 'react'
import { isTrue } from '../../shared/component-helper'
import { getOffsetLeft, getOffsetTop } from '../../shared/helpers'
import classnames from 'classnames'
import { TooltipProps } from './types'
import { TooltipContext } from './TooltipContext'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

type TooltipContainerProps = {
  targetElement: HTMLElement
  style?: React.CSSProperties
  internalId?: string
  attributes?: Record<string, unknown> & { style: React.CSSProperties }
}

export default function TooltipContainer(
  props: TooltipProps & TooltipContainerProps
) {
  const {
    internalId,
    active,
    attributes,
    arrow,
    position,
    align,
    hideDelay,
    fixedPosition,
    noAnimation,
    skipPortal,
    children,
    targetElement: target,
  } = props

  const { isControlled } = useContext(TooltipContext)
  const [style, setStyle] = useState(null)
  const [arrowStyle, setArrowStyle] = useState(null)
  const [hover, setHover] = useState(false)
  const isActive = isTrue(active) || hover

  const getBodySize = useCallback(() => {
    if (!isActive || typeof document === 'undefined') {
      return 1 // stop here
    }

    const { width, height } = document.body.getBoundingClientRect()

    return width + height
  }, [isActive])

  const [wasActive, makeActive] = useState(false)
  const [renewStyles, forceRerender] = useState(getBodySize)

  const elementRef = useRef<HTMLSpanElement>(null)
  const offset = useRef(16)
  const debounceTimeout = useRef<NodeJS.Timeout>()
  const resizeObserver = useRef<ResizeObserver>(null)

  const clearTimers = () => {
    clearTimeout(debounceTimeout.current)
  }

  const handleViewportResize = useCallback(() => {
    forceRerender(getBodySize())
  }, [getBodySize])

  const addPositionObserver = useCallback(() => {
    if (resizeObserver.current || typeof document === 'undefined') {
      return // stop here
    }

    try {
      resizeObserver.current = new ResizeObserver(() => {
        clearTimers()
        debounceTimeout.current = setTimeout(
          () => forceRerender(getBodySize()),
          100
        )
      })

      resizeObserver.current.observe(document.body)
    } catch (e) {
      //
    }
  }, [getBodySize])

  useLayoutEffect(() => {
    const removePositionObserver = () => {
      clearTimers()
      resizeObserver.current?.disconnect()
    }

    if (isActive) {
      makeActive(true)
      addPositionObserver()
    } else if (wasActive) {
      removePositionObserver()
    }

    return removePositionObserver
  }, [addPositionObserver, getBodySize, isActive, wasActive])

  const offsetLeft = useRef(0)
  const offsetTop = useRef(0)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.addEventListener('resize', handleViewportResize)
    return () => {
      window.removeEventListener('resize', handleViewportResize)
    }
  }, [handleViewportResize])

  useLayoutEffect(() => {
    if (!isActive && renewStyles) {
      /**
       * This "resets" the position between elements,
       * when not active. Else it will always first show on the older position.
       */
      if (wasActive) {
        clearTimers()
        debounceTimeout.current = setTimeout(() => {
          setStyle(null)
        }, hideDelay + 200)
      }
      return // stop here
    }

    const element = elementRef?.current

    if (
      typeof window === 'undefined' ||
      !element ||
      !target?.getBoundingClientRect
    ) {
      return // stop here
    }

    const elementWidth = element.offsetWidth
    const elementHeight = element.offsetHeight
    const rect = target.getBoundingClientRect()
    // Prefer precise floating client rect sizes; fall back to offset sizes
    const targetBodySize = {
      width: rect.width || target.offsetWidth,
      height: rect.height || target.offsetHeight,
    }

    if (skipPortal && (!offsetLeft.current || !offsetTop.current)) {
      offsetLeft.current = getOffsetLeft(element) - offset.current
      offsetTop.current = getOffsetTop(element) - offset.current
    }

    const scrollY =
      window.scrollY !== undefined ? window.scrollY : window.pageYOffset
    const scrollX =
      window.scrollX !== undefined ? window.scrollX : window.pageXOffset
    const top =
      (isTrue(fixedPosition) ? 0 : scrollY) + rect.top - offsetTop.current

    // Base left on target's left edge; centering happens later via element/target widths
    const widthBased = scrollX + rect.left
    const left = widthBased - offsetLeft.current

    const style: React.CSSProperties = { ...props.style }
    const arrowStyle: React.CSSProperties = { top: null, left: null }

    const centerX = left + targetBodySize.width / 2
    const anchorY = top + targetBodySize.height / 2
    const isVerticalPlacement = position === 'top' || position === 'bottom'
    const alignOffset =
      align === 'left'
        ? -targetBodySize.width / 2
        : align === 'right'
        ? targetBodySize.width / 2
        : 0
    const anchorX = centerX + (isVerticalPlacement ? alignOffset : 0)

    const placements = {
      left: () => ({
        left: left - elementWidth - offset.current,
        top: anchorY - elementHeight / 2,
      }),
      right: () => ({
        left: left + targetBodySize.width + offset.current,
        top: anchorY - elementHeight / 2,
      }),
      top: () => ({
        left: anchorX - elementWidth / 2,
        top: top - elementHeight - offset.current,
      }),
      bottom: () => ({
        left: anchorX - elementWidth / 2,
        top: top + targetBodySize.height + offset.current,
      }),
    }

    const resolvePlacement = placements[position] || placements.top
    let { left: nextLeft, top: nextTop } = resolvePlacement()

    const arrowPositions = {
      left: () => ({
        left: centerX - offset.current + alignOffset,
      }),
      right: () => ({
        left: centerX - elementWidth + offset.current + alignOffset,
      }),
      top: () => ({
        top: anchorY - offset.current,
      }),
      bottom: () => ({
        top: anchorY - elementHeight + offset.current,
      }),
    }

    const arrowOverride =
      arrowPositions[arrow as keyof typeof arrowPositions]
    if (arrowOverride) {
      const overrides = arrowOverride()
      if ('left' in overrides) {
        nextLeft = overrides.left
      }
      if ('top' in overrides) {
        nextTop = overrides.top
      }
    }

    const edgeSpacing = 8 // Keep a little background behind the arrow when hugging edges
    const arrowHugsEdge =
      isVerticalPlacement && (arrow === 'left' || arrow === 'right')
    if (arrowHugsEdge) {
      nextLeft += arrow === 'left' ? -edgeSpacing : edgeSpacing
    }

    const lacksLayout =
      !elementWidth &&
      !elementHeight &&
      !targetBodySize.width &&
      !targetBodySize.height

    if (lacksLayout) {
      // jsdom / SSR environments frequently report zero metrics – keep inline styles stable until we get real measurements
      if (typeof style.left === 'undefined') {
        style.left = 0
      }
      if (typeof style.top === 'undefined') {
        style.top = 0
      }
      setStyle(style)
      setArrowStyle(arrowStyle)
      return
    }

    const computedStyle =
      typeof window !== 'undefined' && element
        ? window.getComputedStyle(element)
        : null
    const marginLeft = computedStyle
      ? parseFloat(computedStyle.marginLeft) || 0
      : 0
    const marginRight = computedStyle
      ? parseFloat(computedStyle.marginRight) || 0
      : 0

    const viewportMargin = 16
    const elementWidthWithMargins = elementWidth + marginRight
    const rightBoundary = window.innerWidth - viewportMargin

    let actualLeft = nextLeft
    const actualRight = actualLeft + elementWidthWithMargins

    if (actualRight > rightBoundary) {
      const allowedLeft = rightBoundary - elementWidthWithMargins
      actualLeft = Math.max(viewportMargin, allowedLeft)
    }

    if (actualLeft < viewportMargin) {
      actualLeft = viewportMargin
    }

    const constrainedLeft = actualLeft - marginLeft

    const constrainedTop = Math.max(0, nextTop)
    if (constrainedTop !== nextTop) {
      arrowStyle.top = 0
    }

    style.left = constrainedLeft
    style.top = constrainedTop

    if (isVerticalPlacement) {
      const arrowWidth = 16 // 1rem
      arrowStyle.left = anchorX - actualLeft - arrowWidth / 2
    }

    setStyle(style)
    setArrowStyle(arrowStyle)
  }, [
    align,
    arrow,
    fixedPosition,
    hideDelay,
    isActive,
    position,
    props.style,
    renewStyles,
    skipPortal,
    target,
    wasActive,
  ])

  const handleMouseEnter = useCallback(() => {
    if (!isControlled) {
      setHover(true)
    }
  }, [isControlled])

  const handleMouseLeave = useCallback(() => {
    if (!isControlled) {
      setHover(false)
    }
  }, [isControlled])

  /**
   * By stopping propagation, we allow the user to select text when Tooltip is used in the Slider component
   */
  const handlePropagation = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <span
      role="tooltip"
      aria-hidden={target ? true : undefined} // make sure SR does not find it in the DOM, because we use "aria-describedby" for that
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handlePropagation}
      onMouseDown={handlePropagation}
      onTouchStart={handlePropagation}
      {...attributes}
      className={classnames(
        attributes?.className,
        isTrue(noAnimation) && 'dnb-tooltip--no-animation',
        isTrue(fixedPosition) && 'dnb-tooltip--fixed',
        isActive && 'dnb-tooltip--active',
        !isActive && wasActive && 'dnb-tooltip--hide'
      )}
      style={{ ...style, ...attributes.style }}
    >
      {arrow && (
        <span
          className={classnames(
            'dnb-tooltip__arrow',
            `dnb-tooltip__arrow__arrow--${arrow}`,
            `dnb-tooltip__arrow__position--${position}`
          )}
          style={{ ...arrowStyle }}
        />
      )}

      <span id={internalId} className="dnb-tooltip__content">
        {children}
      </span>
    </span>
  )
}
