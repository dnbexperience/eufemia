/**
 * Web Popover Component
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { getOffsetLeft, getOffsetTop } from '../../shared/helpers'
import type {
  PopoverAlign,
  PopoverArrow,
  PopoverAutoAlignMode,
  PopoverPlacement,
  PopoverResolvedTargetElement,
  PopoverTargetElementObject,
} from './types'
import { getClosestScrollViewElement } from '../../shared/component-helper'

const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

type PopoverContainerProps = {
  baseClassNames?: string[]
  active?: boolean
  showDelay?: number
  attributes?: React.HTMLAttributes<HTMLElement>
  arrowPosition?: PopoverArrow
  placement?: PopoverPlacement
  alignOnTarget?: PopoverAlign
  horizontalOffset?: number
  arrowPositionSelector?: string
  hideDelay?: number
  fixedPosition?: boolean
  noAnimation?: boolean
  skipPortal?: boolean
  omitDescribedBy?: boolean
  contentRef?: React.MutableRefObject<HTMLSpanElement>
  children?: React.ReactNode
  targetElement?: PopoverResolvedTargetElement
  triggerOffset?: number
  keepInDOM?: boolean
  autoAlignMode?: PopoverAutoAlignMode
  hideArrow?: boolean
}

const isResolvedTargetRefsObject = (
  target?: PopoverResolvedTargetElement
): target is PopoverTargetElementObject =>
  Boolean(target) &&
  typeof target === 'object' &&
  !('getBoundingClientRect' in target) &&
  ('verticalRef' in target || 'horizontalRef' in target)

function PopoverContainer(props: PopoverContainerProps) {
  const {
    baseClassNames = ['dnb-popover'],
    active,
    showDelay = 0,
    attributes,
    arrowPosition,
    placement = 'bottom',
    alignOnTarget,
    horizontalOffset = 0,
    arrowPositionSelector,
    hideDelay = 0,
    fixedPosition,
    keepInDOM: keepInDOMProp,
    noAnimation,
    skipPortal,
    omitDescribedBy,
    contentRef,
    children,
    targetElement,
    triggerOffset: triggerOffsetProp = 0,
    autoAlignMode = 'initial',
    hideArrow = false,
  } = props

  const [style, setStyle] = useState<React.CSSProperties | null>(null)
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties | null>(
    null
  )
  const [resolvedPlacement, setResolvedPlacement] =
    useState<PopoverPlacement>(placement)
  const [wasActive, setWasActive] = useState(active)
  const [delayedActive, setDelayedActive] = useState(false)
  const showDelayTimeout = useRef<NodeJS.Timeout>()
  const isActive = delayedActive

  const [isInDOM, setIsInDOM] = useState(() => keepInDOMProp || active)

  const offset = useRef(triggerOffsetProp)
  const domTimeout = useRef<NodeJS.Timeout>()

  const clearDomTimeout = () => {
    clearTimeout(domTimeout.current)
  }

  useEffect(() => {
    offset.current = triggerOffsetProp
  }, [triggerOffsetProp])

  const debounceTimeout = useRef<NodeJS.Timeout>()
  const resizeObserver = useRef<ResizeObserver>(null)
  const tmpRef = useRef<HTMLSpanElement>(null)
  const elementRef =
    contentRef && 'current' in contentRef ? contentRef : tmpRef
  const scrollViewElementRef = useRef<Element | null>(null)
  const resolvedTargetRef = useRef<Element | null>(null)

  const autoAlignInitialUsedRef = useRef(false)
  const prevIsActiveRef = useRef(false)

  const clearTimers = () => {
    clearTimeout(debounceTimeout.current)
  }

  const clearShowDelay = () => {
    clearTimeout(showDelayTimeout.current)
  }

  useEffect(() => clearShowDelay, [])

  useEffect(() => {
    if (active) {
      const run = () => {
        setDelayedActive(true)
        setWasActive(true)
      }

      if (noAnimation || globalThis.IS_TEST) {
        clearShowDelay()
        run()
        return
      }

      const delay = Math.max(0, parseFloat(String(showDelay)) || 0)
      if (delay === 0) {
        clearShowDelay()
        run()
        return
      }

      clearShowDelay()
      showDelayTimeout.current = setTimeout(run, delay)
      return
    }

    clearShowDelay()
    setDelayedActive(false)
  }, [active, noAnimation, showDelay])

  useEffect(() => {
    clearDomTimeout()

    if (active) {
      setIsInDOM(true)
      return clearDomTimeout
    }

    if (keepInDOMProp) {
      return clearDomTimeout
    }

    if (noAnimation || globalThis.IS_TEST) {
      setIsInDOM(false)
      return clearDomTimeout
    }

    const delay = Math.max(0, parseFloat(String(hideDelay)) || 0)
    domTimeout.current = setTimeout(() => {
      setIsInDOM(false)
    }, delay + 300)

    return clearDomTimeout
  }, [active, hideDelay, keepInDOMProp, noAnimation])

  const getBodySize = useCallback(() => {
    if (!isActive || typeof document === 'undefined') {
      return 1
    }

    const { width, height } = document.body.getBoundingClientRect()
    return width + height
  }, [isActive])

  const [renewStyles, triggerRecalculation] = useState(getBodySize)

  const requestRecalculation = useCallback(() => {
    triggerRecalculation((value) => value + 1)
  }, [triggerRecalculation])

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

    const hasJustActivated = isActive && !prevIsActiveRef.current
    prevIsActiveRef.current = isActive
    if (hasJustActivated) {
      autoAlignInitialUsedRef.current = false
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

  useEffect(() => {
    setResolvedPlacement(placement)
  }, [placement])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.addEventListener('resize', handleViewportResize)
    return () => window.removeEventListener('resize', handleViewportResize)
  }, [handleViewportResize])

  useLayoutEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    if (!isActive) {
      return
    }

    const handleScroll = (event: Event) => {
      const targetNode = event.target
      const scrollViewElement = scrollViewElementRef.current
      const resolvedTarget =
        resolvedTargetRef.current as HTMLElement | null

      if (
        scrollViewElement &&
        resolvedTarget &&
        typeof resolvedTarget.getBoundingClientRect === 'function' &&
        scrollViewElement.contains(targetNode as Node)
      ) {
        const scrollRect = scrollViewElement.getBoundingClientRect()
        const targetRect = resolvedTarget.getBoundingClientRect()
        const isVisible =
          targetRect.bottom >= scrollRect.top &&
          targetRect.top <= scrollRect.bottom

        if (!isVisible) {
          return
        }
      }

      requestRecalculation()
    }

    document.addEventListener('scroll', handleScroll, true)
    return () => {
      document.removeEventListener('scroll', handleScroll, true)
    }
  }, [isActive, requestRecalculation])

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

    if (typeof window === 'undefined' || !element) {
      return
    }

    const resolvedRefs = isResolvedTargetRefsObject(targetElement)
      ? (targetElement as {
          horizontalRef?: HTMLElement | null
          verticalRef?: HTMLElement | null
        })
      : null

    const horizontalTarget =
      resolvedRefs?.horizontalRef ??
      resolvedRefs?.verticalRef ??
      (targetElement as HTMLElement | null)
    const verticalTarget =
      resolvedRefs?.verticalRef ??
      resolvedRefs?.horizontalRef ??
      (targetElement as HTMLElement | null)

    const effectiveHorizontalTarget =
      horizontalTarget ?? verticalTarget ?? null
    const effectiveVerticalTarget =
      verticalTarget ?? horizontalTarget ?? null

    const primaryTarget =
      effectiveHorizontalTarget ?? effectiveVerticalTarget ?? null
    scrollViewElementRef.current = primaryTarget
      ? getClosestScrollViewElement(primaryTarget)
      : null
    resolvedTargetRef.current = primaryTarget

    if (
      !effectiveHorizontalTarget?.getBoundingClientRect ||
      !effectiveVerticalTarget?.getBoundingClientRect
    ) {
      return
    }

    const elementWidth = element.offsetWidth
    const elementHeight = element.offsetHeight
    const horizontalRect =
      effectiveHorizontalTarget.getBoundingClientRect()
    const verticalRect = effectiveVerticalTarget.getBoundingClientRect()
    const scrollViewElement = scrollViewElementRef.current
    const scrollViewRect =
      scrollViewElement &&
      typeof scrollViewElement.getBoundingClientRect === 'function'
        ? scrollViewElement.getBoundingClientRect()
        : null
    const horizontalTargetSize = {
      width: horizontalRect.width || effectiveHorizontalTarget.offsetWidth,
      height:
        horizontalRect.height || effectiveHorizontalTarget.offsetHeight,
    }
    const verticalTargetSize = {
      width: verticalRect.width || effectiveVerticalTarget.offsetWidth,
      height: verticalRect.height || effectiveVerticalTarget.offsetHeight,
    }
    const targetBodySize = {
      width: horizontalTargetSize.width || verticalTargetSize.width,
      height: verticalTargetSize.height || horizontalTargetSize.height,
    }

    if (skipPortal && (!offsetLeft.current || !offsetTop.current)) {
      offsetLeft.current = getOffsetLeft(element) - offset.current
      offsetTop.current = getOffsetTop(element) - offset.current
    }

    const containerRect =
      skipPortal && element.offsetParent instanceof HTMLElement
        ? element.offsetParent.getBoundingClientRect()
        : null

    const relativeVerticalTop = containerRect
      ? verticalRect.top - containerRect.top
      : 0
    const relativeHorizontalLeft = containerRect
      ? horizontalRect.left - containerRect.left
      : 0

    const scrollY =
      window.scrollY !== undefined ? window.scrollY : window.pageYOffset
    const scrollX =
      window.scrollX !== undefined ? window.scrollX : window.pageXOffset
    const scrollYOffset = fixedPosition ? 0 : scrollY
    const top = skipPortal
      ? relativeVerticalTop
      : scrollYOffset + verticalRect.top - offsetTop.current
    const widthBased = skipPortal
      ? relativeHorizontalLeft
      : scrollX + horizontalRect.left
    const left = skipPortal ? widthBased : widthBased - offsetLeft.current

    const computedStyle: React.CSSProperties = {}
    const arrowStyle: React.CSSProperties = { top: null, left: null }
    const viewportMargin = 16
    const shouldReuseResolved =
      autoAlignMode === 'initial' && autoAlignInitialUsedRef.current
    let placementKey: PopoverPlacement = shouldReuseResolved
      ? resolvedPlacement
      : placement

    const centerX = left + targetBodySize.width / 2
    let anchorY = top + targetBodySize.height / 2
    const isInitialVertical =
      placementKey === 'top' || placementKey === 'bottom'
    const alignOffset =
      alignOnTarget === 'left'
        ? -targetBodySize.width / 2
        : alignOnTarget === 'right'
        ? targetBodySize.width / 2
        : 0
    let anchorX = centerX + (isInitialVertical ? alignOffset : 0)

    if (arrowPositionSelector) {
      const matchesSelector = (
        element?: Element | null
      ): element is HTMLElement => {
        if (!element || typeof element.matches !== 'function') {
          return false
        }
        try {
          return element.matches(arrowPositionSelector)
        } catch (_error) {
          return false
        }
      }

      const queryWithin = (
        root?: Element | Document | null
      ): HTMLElement | null => {
        if (!root || typeof root.querySelector !== 'function') {
          return null
        }
        try {
          return root.querySelector(
            arrowPositionSelector
          ) as HTMLElement | null
        } catch (_error) {
          return null
        }
      }

      const alignmentRoot = isInitialVertical
        ? effectiveHorizontalTarget
        : effectiveVerticalTarget

      const ownerDocument =
        alignmentRoot?.ownerDocument ??
        (typeof document !== 'undefined' ? document : null)

      const alignmentElement =
        (matchesSelector(alignmentRoot) ? alignmentRoot : null) ||
        queryWithin(alignmentRoot) ||
        queryWithin(ownerDocument)

      if (alignmentElement?.getBoundingClientRect) {
        const alignmentRect = alignmentElement.getBoundingClientRect()
        if (isInitialVertical) {
          anchorX =
            scrollX +
            alignmentRect.left +
            alignmentRect.width / 2 -
            offsetLeft.current
        } else {
          anchorY =
            scrollYOffset +
            alignmentRect.top +
            alignmentRect.height / 2 -
            offsetTop.current
        }
      }
    }

    const placements = {
      left: () => ({
        left: left - elementWidth - offset.current + horizontalOffset,
        top: anchorY - elementHeight / 2,
      }),
      right: () => ({
        left:
          left + targetBodySize.width + offset.current + horizontalOffset,
        top: anchorY - elementHeight / 2,
      }),
      top: () => ({
        left: anchorX - elementWidth / 2 + horizontalOffset,
        top: top - elementHeight - offset.current,
      }),
      bottom: () => ({
        left: anchorX - elementWidth / 2 + horizontalOffset,
        top: top + targetBodySize.height + offset.current,
      }),
    }

    const getPlacement = (key: PopoverPlacement) => {
      const resolver = placements[key] || placements.bottom
      return resolver()
    }

    const topPlacement = getPlacement('top')
    const bottomPlacement = getPlacement('bottom')
    let { left: nextLeft, top: nextTop } = getPlacement(placementKey)

    const initialAutoAlignAllowed =
      autoAlignMode === 'initial' && !autoAlignInitialUsedRef.current
    const allowAutoAlign =
      autoAlignMode === 'never'
        ? false
        : autoAlignMode === 'initial'
        ? initialAutoAlignAllowed
        : true

    if (initialAutoAlignAllowed) {
      autoAlignInitialUsedRef.current = true
    }

    if (
      typeof window !== 'undefined' &&
      allowAutoAlign &&
      (placementKey === 'top' || placementKey === 'bottom')
    ) {
      const viewportTopEdge = scrollYOffset + viewportMargin
      const viewportBottomEdge =
        scrollYOffset + window.innerHeight - viewportMargin

      const fitsTop = topPlacement.top >= viewportTopEdge
      const fitsBottom =
        bottomPlacement.top + elementHeight <= viewportBottomEdge

      const spaceAbove = topPlacement.top - viewportTopEdge
      const spaceBelow =
        viewportBottomEdge - (bottomPlacement.top + elementHeight)
      const preferTopSide = spaceAbove >= spaceBelow

      if (placementKey === 'bottom' && !fitsBottom) {
        if (fitsTop) {
          placementKey = 'top'
          nextLeft = topPlacement.left
          nextTop = topPlacement.top
        } else if (preferTopSide) {
          placementKey = 'top'
          nextLeft = topPlacement.left
          nextTop = topPlacement.top
        }
      } else if (placementKey === 'top' && !fitsTop) {
        if (fitsBottom) {
          placementKey = 'bottom'
          nextLeft = bottomPlacement.left
          nextTop = bottomPlacement.top
        } else if (!preferTopSide) {
          placementKey = 'bottom'
          nextLeft = bottomPlacement.left
          nextTop = bottomPlacement.top
        }
      }
    }

    const arrowPositions = {
      left: () => ({
        left:
          centerX - offset.current + alignOffset + horizontalOffset - 16,
      }),
      right: () => ({
        left:
          centerX -
          elementWidth +
          offset.current +
          alignOffset +
          horizontalOffset +
          16,
      }),
      top: () => ({
        top: anchorY - offset.current - 16,
      }),
      bottom: () => ({
        top: anchorY - elementHeight + offset.current + 16,
      }),
    }

    const arrowOverride =
      arrowPositions[arrowPosition as keyof typeof arrowPositions]
    if (arrowOverride) {
      const overrides = arrowOverride()
      if ('left' in overrides) {
        nextLeft = overrides.left
      }
      if ('top' in overrides) {
        nextTop = overrides.top
      }
    } else {
      // Apply horizontalOffset if arrow position doesn't override left
      nextLeft += horizontalOffset
    }

    const edgeSpacing = 8
    const isVerticalPlacement =
      placementKey === 'top' || placementKey === 'bottom'
    const arrowHugsEdge =
      isVerticalPlacement &&
      (arrowPosition === 'left' || arrowPosition === 'right')
    if (arrowHugsEdge) {
      nextLeft += arrowPosition === 'left' ? -edgeSpacing : edgeSpacing
    }

    const clampTopWithinScrollView = (value: number) => {
      if (!scrollViewRect) {
        return value
      }
      const minTop = scrollViewRect.top + scrollYOffset
      const maxTop = scrollViewRect.bottom + scrollYOffset - elementHeight
      if (maxTop < minTop) {
        return minTop
      }
      return Math.min(Math.max(value, minTop), maxTop)
    }
    nextTop = clampTopWithinScrollView(nextTop)

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

    let actualLeft = nextLeft

    if (!skipPortal) {
      const elementWidthWithMargins = elementWidth + marginRight
      const rightBoundary = window.innerWidth - viewportMargin
      const actualRight = actualLeft + elementWidthWithMargins

      if (actualRight > rightBoundary) {
        const allowedLeft = rightBoundary - elementWidthWithMargins
        actualLeft = Math.max(viewportMargin, allowedLeft)
      }

      if (actualLeft < viewportMargin) {
        actualLeft = viewportMargin
      }

      computedStyle.left = actualLeft - marginLeft
    } else {
      computedStyle.left = nextLeft - marginLeft
    }
    computedStyle.top = nextTop

    const actualTop = nextTop

    if (isVerticalPlacement) {
      const arrowWidth = 16
      const arrowBoundary = 8
      const maxLeft = Math.max(0, elementWidth - arrowWidth)
      const arrowLeft = anchorX - actualLeft - arrowWidth / 2

      const arrowMin = Math.min(maxLeft, arrowBoundary)
      const arrowMax = Math.max(
        arrowMin,
        Math.max(0, maxLeft - arrowBoundary)
      )

      let arrowClampMin = arrowMin
      let arrowClampMax = arrowMax

      if (scrollViewRect) {
        const scrollMin = scrollViewRect.left + scrollX - actualLeft
        const scrollMax =
          scrollViewRect.right + scrollX - actualLeft - arrowWidth
        arrowClampMin = Math.max(arrowClampMin, scrollMin)
        arrowClampMax = Math.min(arrowClampMax, scrollMax)
      }

      if (arrowClampMax < arrowClampMin) {
        arrowClampMax = arrowClampMin
      }

      let nextArrowLeft = arrowLeft
      if (nextArrowLeft < arrowClampMin) {
        nextArrowLeft = arrowClampMin
      } else if (nextArrowLeft > arrowClampMax) {
        nextArrowLeft = arrowClampMax
      }

      arrowStyle.left = nextArrowLeft
    } else {
      const arrowHeight = 16
      const arrowBoundary = 8
      const maxTop = Math.max(0, elementHeight - arrowHeight)
      const arrowTop = anchorY - actualTop - arrowHeight / 2

      const arrowMin = Math.min(maxTop, arrowBoundary)
      const arrowMax = Math.max(
        arrowMin,
        Math.max(0, maxTop - arrowBoundary)
      )

      let arrowClampMin = arrowMin
      let arrowClampMax = arrowMax

      if (scrollViewRect) {
        const scrollMin = scrollViewRect.top + scrollYOffset - actualTop
        const scrollMax =
          scrollViewRect.bottom + scrollYOffset - actualTop - arrowHeight
        arrowClampMin = Math.max(arrowClampMin, scrollMin)
        arrowClampMax = Math.min(arrowClampMax, scrollMax)
      }

      if (arrowClampMax < arrowClampMin) {
        arrowClampMax = arrowClampMin
      }

      let nextArrowTop = arrowTop
      if (nextArrowTop < arrowClampMin) {
        nextArrowTop = arrowClampMin
      } else if (nextArrowTop > arrowClampMax) {
        nextArrowTop = arrowClampMax
      }

      arrowStyle.top = nextArrowTop
    }

    if (resolvedPlacement !== placementKey) {
      setResolvedPlacement(placementKey)
    }

    setStyle(computedStyle)
    setArrowStyle(arrowStyle)
  }, [
    alignOnTarget,
    autoAlignMode,
    arrowPosition,
    horizontalOffset,
    elementRef,
    fixedPosition,
    hideDelay,
    isActive,
    triggerOffsetProp,
    placement,
    renewStyles,
    skipPortal,
    targetElement,
    wasActive,
    arrowPositionSelector,
    resolvedPlacement,
  ])

  const handlePropagation = useCallback((event: React.SyntheticEvent) => {
    event.stopPropagation()
  }, [])

  const shouldRender = isInDOM || keepInDOMProp

  const resolvedTargetRefs = isResolvedTargetRefsObject(targetElement)
    ? targetElement
    : null
  const hasTargetElement =
    Boolean(targetElement) &&
    (!resolvedTargetRefs ||
      Boolean(
        resolvedTargetRefs.horizontalRef || resolvedTargetRefs.verticalRef
      ))

  if (!shouldRender) {
    return null
  }

  return (
    <span
      role="tooltip"
      aria-hidden={
        skipPortal || omitDescribedBy
          ? undefined
          : hasTargetElement
          ? true
          : undefined
      }
      ref={elementRef}
      {...attributes}
      {...{
        onMouseMove: handlePropagation,
        onMouseDown: handlePropagation,
        onTouchStart: handlePropagation,
      }}
      className={classnames(
        attributes?.className,
        noAnimation &&
          baseClassNames.map((base) => `${base}--no-animation`),
        fixedPosition && baseClassNames.map((base) => `${base}--fixed`),
        isActive && baseClassNames.map((base) => `${base}--active`),
        !isActive &&
          wasActive &&
          baseClassNames.map((base) => `${base}--hide`)
      )}
      style={{ ...style, ...attributes?.style }}
    >
      {arrowPosition && !hideArrow && (
        <span
          className={classnames(
            baseClassNames.map((base) => `${base}__arrow`),
            baseClassNames.map(
              (base) => `${base}__arrow__arrow--${arrowPosition}`
            ),
            baseClassNames.map(
              (base) => `${base}__arrow__placement--${resolvedPlacement}`
            )
          )}
          style={{ ...arrowStyle }}
        />
      )}

      {children}
    </span>
  )
}

export default PopoverContainer
