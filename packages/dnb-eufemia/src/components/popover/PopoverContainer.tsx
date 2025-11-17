/**
 * Web Popover Component
 */

import React, { useCallback, useRef, useState } from 'react'
import classnames from 'classnames'
import { isTrue } from '../../shared/component-helper'
import { getOffsetLeft, getOffsetTop } from '../../shared/helpers'
import type {
  PopoverAlign,
  PopoverArrow,
  PopoverPosition,
} from './types'

const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

type PopoverContainerProps = {
  active?: boolean
  attributes?: React.HTMLAttributes<HTMLElement>
  arrow?: PopoverArrow
  position?: PopoverPosition
  align?: PopoverAlign
  hideDelay?: number
  fixedPosition?: boolean
  noAnimation?: boolean
  skipPortal?: boolean
  omitDescribedBy?: boolean
  contentRef?: React.MutableRefObject<HTMLSpanElement>
  children?: React.ReactNode
  targetElement?: HTMLElement | null
}

function PopoverContainer(props: PopoverContainerProps) {
  const {
    active,
    attributes,
    arrow,
    position = 'bottom',
    align,
    hideDelay = 0,
    fixedPosition,
    noAnimation,
    skipPortal,
    omitDescribedBy,
    contentRef,
    children,
    targetElement,
  } = props

  const [style, setStyle] = useState<React.CSSProperties | null>(null)
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties | null>(
    null
  )
  const [wasActive, setWasActive] = useState(false)
  const isActive = isTrue(active)

  const offset = useRef(16)
  const debounceTimeout = useRef<NodeJS.Timeout>()
  const resizeObserver = useRef<ResizeObserver>(null)
  const tmpRef = useRef<HTMLSpanElement>(null)
  const elementRef =
    contentRef && 'current' in contentRef ? contentRef : tmpRef

  const clearTimers = () => {
    clearTimeout(debounceTimeout.current)
  }

  const getBodySize = useCallback(() => {
    if (!isActive || typeof document === 'undefined') {
      return 1
    }

    const { width, height } = document.body.getBoundingClientRect()
    return width + height
  }, [isActive])

  const [renewStyles, triggerRecalculation] = useState(getBodySize)

  const handleViewportResize = useCallback(() => {
    triggerRecalculation(getBodySize())
  }, [getBodySize])

  const addPositionObserver = useCallback(() => {
    if (resizeObserver.current || typeof document === 'undefined') {
      return
    }

    try {
      resizeObserver.current = new ResizeObserver(() => {
        clearTimers()
        debounceTimeout.current = setTimeout(
          () => triggerRecalculation(getBodySize()),
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
      setWasActive(true)
      addPositionObserver()
    } else if (wasActive) {
      removePositionObserver()
    }

    return removePositionObserver
  }, [addPositionObserver, isActive, wasActive])

  const offsetLeft = useRef(0)
  const offsetTop = useRef(0)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.addEventListener('resize', handleViewportResize)
    return () => window.removeEventListener('resize', handleViewportResize)
  }, [handleViewportResize])

  useLayoutEffect(() => {
    if (!isActive && renewStyles) {
      if (wasActive) {
        clearTimers()
        debounceTimeout.current = setTimeout(() => {
          setStyle(null)
        }, hideDelay + 200)
      }
      return
    }

    const element = elementRef?.current

    if (
      typeof window === 'undefined' ||
      !element ||
      !targetElement?.getBoundingClientRect
    ) {
      return
    }

    const elementWidth = element.offsetWidth
    const elementHeight = element.offsetHeight
    const rect = targetElement.getBoundingClientRect()
    const targetBodySize = {
      width: rect.width || targetElement.offsetWidth,
      height: rect.height || targetElement.offsetHeight,
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
    const widthBased = scrollX + rect.left
    const left = widthBased - offsetLeft.current

    const computedStyle: React.CSSProperties = {}
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

    const resolvePlacement = placements[position] || placements.bottom
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

    const edgeSpacing = 8
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
      if (typeof computedStyle.left === 'undefined') {
        computedStyle.left = 0
      }
      if (typeof computedStyle.top === 'undefined') {
        computedStyle.top = 0
      }
      setStyle(computedStyle)
      setArrowStyle(arrowStyle)
      return
    }

    const computedElementStyle =
      typeof window !== 'undefined' && element
        ? window.getComputedStyle(element)
        : null
    const marginLeft = computedElementStyle
      ? parseFloat(computedElementStyle.marginLeft) || 0
      : 0
    const marginRight = computedElementStyle
      ? parseFloat(computedElementStyle.marginRight) || 0
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

    computedStyle.left = constrainedLeft
    computedStyle.top = constrainedTop

    if (isVerticalPlacement) {
      const arrowWidth = 16
      arrowStyle.left = anchorX - actualLeft - arrowWidth / 2
    }

    setStyle(computedStyle)
    setArrowStyle(arrowStyle)
  }, [
    align,
    arrow,
    elementRef,
    fixedPosition,
    hideDelay,
    isActive,
    position,
    renewStyles,
    skipPortal,
    targetElement,
    wasActive,
  ])

  const handlePropagation = useCallback((event: React.SyntheticEvent) => {
    event.stopPropagation()
  }, [])

  return (
    <span
      role="tooltip"
      aria-hidden={omitDescribedBy ? undefined : targetElement ? true : undefined}
      ref={elementRef}
      {...attributes}
      onMouseMove={handlePropagation}
      onMouseDown={handlePropagation}
      onTouchStart={handlePropagation}
      className={classnames(
        attributes?.className,
        isTrue(noAnimation) && 'dnb-popover--no-animation',
        isTrue(fixedPosition) && 'dnb-popover--fixed',
        isActive && 'dnb-popover--active',
        !isActive && wasActive && 'dnb-popover--hide'
      )}
      style={{ ...style, ...attributes?.style }}
    >
      {arrow && (
        <span
          className={classnames(
            'dnb-popover__arrow',
            `dnb-popover__arrow__arrow--${arrow}`,
            `dnb-popover__arrow__position--${position}`
          )}
          style={{ ...arrowStyle }}
        />
      )}

      {children}
    </span>
  )
}

export default PopoverContainer
