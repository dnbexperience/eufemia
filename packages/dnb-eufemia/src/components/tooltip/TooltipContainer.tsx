/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import { isTrue } from '../../shared/component-helper'
import { getOffsetLeft } from '../../shared/helpers'
import classnames from 'classnames'
import { TooltipProps } from './types'

type TooltipContainerProps = {
  targetElement: HTMLElement
  style?: React.CSSProperties
  useHover?: boolean
  internalId?: string
  attributes?: Record<string, unknown>
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
    animatePosition,
    fixedPosition,
    noAnimation,
    useHover,
    children,
  } = props

  const [hover, setHover] = React.useState(false)
  const [wasActive, makeActive] = React.useState(false)
  const [renewStyles, forceRerender] = React.useState(0)

  const elementRef = React.useRef<HTMLSpanElement>(null)
  const offset = React.useRef(16)
  const debounceTimeout = React.useRef<NodeJS.Timeout>()
  const resizeObserver = React.useRef<ResizeObserver>(null)

  const isActive = isTrue(active) || hover

  React.useEffect(() => {
    const addPositionObserver = () => {
      if (resizeObserver.current || typeof document === 'undefined') {
        return // stop here
      }

      try {
        resizeObserver.current = new ResizeObserver((entries) => {
          const run = () => {
            const { width, height } = entries[0].contentRect
            forceRerender(width + height)
          }
          if (!renewStyles) {
            run()
          }
          clearTimeout(debounceTimeout.current)
          debounceTimeout.current = setTimeout(run, 100)
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

  const style = React.useMemo(() => {
    if (typeof window === 'undefined' || !elementRef.current) {
      return {}
    }

    const elementWidth = elementRef.current.offsetWidth
    const elementHeight = elementRef.current.offsetHeight

    let alignOffset = 0

    const { targetElement: target, align, fixedPosition } = props

    const rect = target.getBoundingClientRect()

    const targetSize = {
      width: target.offsetWidth,
      height: target.offsetHeight,
    }

    // fix for svg
    if (!target.offsetHeight) {
      targetSize.width = rect.width
      targetSize.height = rect.height
    }

    const scrollY =
      window.scrollY !== undefined ? window.scrollY : window.pageYOffset
    const scrollX =
      window.scrollX !== undefined ? window.scrollX : window.pageXOffset
    const top = (isTrue(fixedPosition) ? 0 : scrollY) + rect.top

    // Use Mouse position when target is too wide
    const useMouseWhen = targetSize.width > 400
    const mousePos =
      getOffsetLeft(target) +
      rect.left / 2 +
      (elementRef.current ? elementRef.current.offsetWidth : 0)
    const widthBased = scrollX + rect.left
    const left =
      useMouseWhen && mousePos < targetSize.width ? mousePos : widthBased

    const style = { ...props.style }

    if (align === 'left') {
      alignOffset = -targetSize.width / 2
    } else if (align === 'right') {
      alignOffset = targetSize.width / 2
    }

    const topHorizontal = top + targetSize.height / 2 - elementHeight / 2
    const leftVertical =
      left - elementWidth / 2 + targetSize.width / 2 + alignOffset

    const stylesFromPosition = {
      left: () => {
        style.top = topHorizontal
        style.left = left - elementWidth - offset.current
      },
      right: () => {
        style.top = topHorizontal
        style.left = left + targetSize.width + offset.current
      },
      top: () => {
        style.left = leftVertical
        style.top = top - elementHeight - offset.current
      },
      bottom: () => {
        style.left = leftVertical
        style.top = top + targetSize.height + offset.current
      },
    }

    const stylesFromArrow = {
      left: () => {
        style.left =
          left + targetSize.width / 2 - offset.current + alignOffset
      },
      right: () => {
        style.left =
          left -
          elementWidth +
          targetSize.width / 2 +
          offset.current +
          alignOffset
      },
      top: () => {
        style.top = top + targetSize.height / 2 - offset.current
      },
      bottom: () => {
        style.top =
          top + targetSize.height / 2 - elementHeight + offset.current
      },
    }

    if (stylesFromPosition[position]) {
      stylesFromPosition[position]()
    }
    if (stylesFromArrow[arrow]) {
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

    return style

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, hover, children, elementRef, renewStyles])

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

  return (
    <span
      role="tooltip"
      aria-hidden // make sure SR does not find it in the DOM, because we use "aria-describedby" for that
      style={style}
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...attributes}
      className={classnames(
        attributes?.className,
        isTrue(animatePosition) && 'dnb-tooltip--animate_position',
        isTrue(noAnimation) && 'dnb-tooltip--no-animation',
        isTrue(fixedPosition) && 'dnb-tooltip--fixed',
        isActive && 'dnb-tooltip--active',
        !isActive && wasActive && 'dnb-tooltip--hide'
      )}
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
