/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import { isTrue } from '../../shared/component-helper'
import { getOffsetLeft, getOffsetTop } from '../../shared/helpers'
import classnames from 'classnames'
import { TooltipProps } from './types'

type TooltipContainerProps = {
  targetElement: HTMLElement
  style?: React.CSSProperties
  useHover?: boolean
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
    group,
    hideDelay,
    animatePosition,
    fixedPosition,
    noAnimation,
    skipPortal,
    useHover,
    children,
    targetElement: target,
  } = props

  const [style, setStyle] = React.useState(null)
  const [hover, setHover] = React.useState(false)
  const isActive = isTrue(active) || hover
  const [wasActive, makeActive] = React.useState(false)
  const [renewStyles, forceRerender] = React.useState(getBodySize)

  const elementRef = React.useRef<HTMLSpanElement>(null)
  const offset = React.useRef(16)
  const debounceTimeout = React.useRef<NodeJS.Timeout>()
  const resizeObserver = React.useRef<ResizeObserver>(null)

  function getBodySize() {
    if (!isActive || typeof document === 'undefined') {
      return 0 // stop here
    }

    const { width, height } = document.body.getBoundingClientRect()

    return width + height
  }

  React.useLayoutEffect(() => {
    const addPositionObserver = () => {
      if (resizeObserver.current || typeof document === 'undefined') {
        return // stop here
      }

      try {
        resizeObserver.current = new ResizeObserver(() => {
          clearTimeout(debounceTimeout.current)
          debounceTimeout.current = setTimeout(
            () => forceRerender(getBodySize()),
            100
          )
        })

        resizeObserver.current.observe(document.body)
      } catch (e) {
        //
      }
    }
    const removePositionObserver = () => {
      clearTimeout(debounceTimeout.current)
      resizeObserver.current?.disconnect()
    }

    if (isActive) {
      makeActive(true)
      addPositionObserver()
    } else {
      removePositionObserver()
    }

    return removePositionObserver

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  const offsetLeft = React.useRef(0)
  const offsetTop = React.useRef(0)

  React.useLayoutEffect(() => {
    if (!isActive) {
      /**
       * This "resets" the position between elements,
       * when not active. Else it will always first show on the older position.
       */
      if (group && wasActive) {
        clearTimeout(debounceTimeout.current)
        debounceTimeout.current = setTimeout(
          () => setStyle(null),
          hideDelay
        )
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
    const targetBodySize = {
      width: target.offsetWidth,
      height: target.offsetHeight,
    }

    // fix for svg
    if (!target.offsetHeight) {
      targetBodySize.width = rect.width
      targetBodySize.height = rect.height
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

    // Use Mouse position when target is too wide
    const useMouseWhen = targetBodySize.width > 400
    const mousePos =
      getOffsetLeft(target) +
      rect.left / 2 +
      (element ? element.offsetWidth : 0)
    const widthBased = scrollX + rect.left
    const left =
      (useMouseWhen && mousePos < targetBodySize.width
        ? mousePos
        : widthBased) - offsetLeft.current

    const style = { ...props.style }

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

    if (stylesFromPosition[position]) {
      stylesFromPosition[position]()
    } else if (stylesFromArrow[arrow]) {
      stylesFromArrow[arrow]()
    }

    const rightOffset =
      parseFloat(String(style.left)) + elementWidth - window.innerWidth
    if (rightOffset > 0) {
      style.left = window.innerWidth - elementWidth
    }

    if (style.left < 0) {
      style.left = 0
    }
    if (style.top < 0) {
      style.top = 0
    }

    setStyle(style)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, arrow, position, children, renewStyles])

  const handleMouseEnter = () => {
    if (isTrue(active) && useHover !== false) {
      setHover(true)
    }
  }

  const handleMouseLeave = () => {
    if (useHover !== false) {
      setHover(false)
    }
  }

  /**
   * By stopping propagation, we allow the user to select text when Toolip is used in the Slider component
   */
  const handlePropagation = (e: React.SyntheticEvent) =>
    e.stopPropagation()

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
        isTrue(animatePosition) && 'dnb-tooltip--animate_position',
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
        />
      )}

      <span id={internalId} className="dnb-tooltip__content">
        {children}
      </span>
    </span>
  )
}
