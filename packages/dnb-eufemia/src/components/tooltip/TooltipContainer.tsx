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

    let alignOffset = 0

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

    const style = { ...props.style }
    const arrowStyle = { top: null, left: null }

    if (align === 'left') {
      alignOffset = -targetBodySize.width / 2
    } else if (align === 'right') {
      alignOffset = targetBodySize.width / 2
    }

    const topHorizontal =
      top + targetBodySize.height / 2 - elementHeight / 2
    const leftVertical =
      left - elementWidth / 2 + targetBodySize.width / 2 + alignOffset

    const stylesFromPosition = {
      left: () => {
        style.top = topHorizontal
        style.left = left - elementWidth - offset.current
      },
      right: () => {
        style.top = topHorizontal
        style.left = left + targetBodySize.width + offset.current
      },
      top: () => {
        style.left = leftVertical
        style.top = top - elementHeight - offset.current
      },
      bottom: () => {
        style.left = leftVertical
        style.top = top + targetBodySize.height + offset.current
      },
    }

    const stylesFromArrow = {
      left: () => {
        style.left =
          left + targetBodySize.width / 2 - offset.current + alignOffset
      },
      right: () => {
        style.left =
          left -
          elementWidth +
          targetBodySize.width / 2 +
          offset.current +
          alignOffset
      },
      top: () => {
        style.top = top + targetBodySize.height / 2 - offset.current
      },
      bottom: () => {
        style.top =
          top + targetBodySize.height / 2 - elementHeight + offset.current
      },
    }

    stylesFromPosition[position]?.()
    stylesFromArrow[arrow]?.()

    const rightOffset =
      parseFloat(String(style.left)) + elementWidth - window.innerWidth
    if (rightOffset > 0) {
      style.left = window.innerWidth - elementWidth
    }
    if (parseFloat(String(style.left)) < 0) {
      style.left = 0
      if (position === 'top' || position === 'bottom') {
        const arrowWidth = 16 // 1rem
        const arrowStyleBasisWidth = left - arrowWidth / 2
        if (align === 'left') {
          arrowStyle.left = arrowStyleBasisWidth
        } else if (align === 'right') {
          arrowStyle.left = arrowStyleBasisWidth + targetBodySize.width
        } else {
          arrowStyle.left = arrowStyleBasisWidth + targetBodySize.width / 2
        }
      }
    }
    if (parseFloat(String(style.top)) < 0) {
      style.top = 0
      arrowStyle.top = 0
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
