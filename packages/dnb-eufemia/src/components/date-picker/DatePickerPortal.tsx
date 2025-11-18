import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DatePickerProps } from './DatePicker'
import PortalRoot from '../PortalRoot'
import { debounce } from '../../shared/helpers'
import { getClosestScrollViewElement } from '../../shared/component-helper'

type DatePickerPortalProps = React.HTMLProps<HTMLDivElement> & {
  skipPortal?: DatePickerProps['skipPortal']
  alignment?: DatePickerProps['alignPicker']
  targetElementRef?: React.RefObject<HTMLElement>
  calendarContainerRef?: React.RefObject<HTMLElement>
  triangleRef?: React.RefObject<HTMLElement>
}

export default function DatePickerPortal({
  skipPortal,
  alignment,
  targetElementRef,
  calendarContainerRef,
  triangleRef,
  children,
}: DatePickerPortalProps) {
  const [position, setPosition] = useState<React.CSSProperties>({})

  const updatePosition = useCallback(() => {
    if (
      targetElementRef?.current &&
      calendarContainerRef?.current &&
      triangleRef?.current
    ) {
      setPosition(
        calculatePortalPosition(
          targetElementRef.current.querySelector('.dnb-input'),
          calendarContainerRef.current,
          alignment
        )
      )
      if (alignment === 'auto') {
        updateTriangleIndicator(
          targetElementRef.current.querySelector('.dnb-input'),
          calendarContainerRef.current,
          triangleRef.current
        )
      }
    }
  }, [alignment, targetElementRef, calendarContainerRef, triangleRef])

  const setPositionDebounce = useMemo(
    () => debounce(updatePosition, 10),
    [updatePosition]
  )

  useEffect(() => {
    if (!skipPortal) {
      updatePosition()

      const scrollView = getScrollView(targetElementRef.current)
      const view =
        scrollView &&
        !scrollView.classList.contains('dnb-table__scroll-view') &&
        scrollView.clientHeight <=
          window.document.documentElement.clientHeight
          ? scrollView
          : window
      view.addEventListener('resize', setPositionDebounce)
      view.addEventListener('scroll', setPositionDebounce)
    }

    return () => {
      if (!skipPortal) {
        const scrollView = getScrollView(targetElementRef.current)
        const view =
          scrollView &&
          !scrollView.classList.contains('dnb-table__scroll-view') &&
          scrollView.clientHeight <=
            window.document.documentElement.clientHeight
            ? scrollView
            : window
        view.removeEventListener('resize', setPositionDebounce)
        view.removeEventListener('scroll', setPositionDebounce)
      }
    }
  }, [setPositionDebounce, skipPortal, updatePosition])

  if (!position) return null

  return !skipPortal ? (
    <PortalRoot>
      <div className="dnb-date-picker__portal" style={position}>
        {children}
      </div>
    </PortalRoot>
  ) : (
    <>{children}</>
  )
}

function calculatePortalPosition(
  targetElement: HTMLElement,
  portalElement: HTMLElement,
  alignment: DatePickerPortalProps['alignment']
): React.CSSProperties {
  const parentRect = targetElement.getBoundingClientRect()
  const scrollY = window.scrollY
  const scrollX = window.scrollX

  if (alignment !== 'auto') {
    return {
      top: `${parentRect.top + scrollY}px`,
      left: `${
        alignment === 'right'
          ? parentRect.left + parentRect.width + scrollX
          : parentRect.left + scrollX
      }px`,
    }
  }

  const portalRect = portalElement.getBoundingClientRect()
  const shellElement = targetElement.querySelector('.dnb-input__shell')
  if (!shellElement) return {}

  const shellRect = shellElement.getBoundingClientRect()

  const openAbove = shouldOpenAbove(parentRect, portalRect, targetElement)
  const top = openAbove
    ? parentRect.top - portalRect.height + scrollY - parentRect.height
    : parentRect.top + scrollY

  const alignRight = shouldAlignRight(
    parentRect,
    portalRect,
    shellRect,
    targetElement
  )
  const left = alignRight
    ? scrollX + parentRect.left - portalRect.width + parentRect.width
    : parentRect.left + scrollX

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
}

function updateTriangleIndicator(
  targetElement: HTMLElement,
  portalElement: HTMLElement,
  triangleElement: HTMLElement
) {
  const parentRect = targetElement.getBoundingClientRect()
  const portalRect = portalElement.getBoundingClientRect()
  const triangleRect = triangleElement.getBoundingClientRect()

  const shellElement = targetElement.querySelector('.dnb-input__shell')
  const buttonElement = targetElement.querySelector(
    '.dnb-input__submit-element'
  )
  const showInput = targetElement.querySelector(
    '.dnb-input__submit-button'
  )

  if (!shellElement || !buttonElement) return

  const shellRect = shellElement.getBoundingClientRect()
  const buttonRect = buttonElement.getBoundingClientRect()

  const openAbove = shouldOpenAbove(parentRect, portalRect, targetElement)
  applyTriangleDirection(triangleElement, openAbove)

  const alignRight = shouldAlignRight(
    parentRect,
    portalRect,
    shellRect,
    targetElement
  )

  let distance: number
  if (alignRight) {
    distance =
      portalRect.width - buttonRect.width / 2 - triangleRect.width / 2
  } else {
    distance = showInput
      ? shellRect.width - buttonRect.width / 2 - triangleRect.width / 2
      : buttonRect.width / 4
  }

  applyTriangleOffset(triangleElement, distance)
}

function applyTriangleDirection(
  triangleElement: HTMLElement,
  openAbove: boolean
) {
  triangleElement.classList.toggle(
    'dnb-date-picker__triangle--bottom',
    openAbove
  )
}

function applyTriangleOffset(
  triangleElement: HTMLElement,
  distance: number
) {
  triangleElement.style.marginRight = '0px'
  triangleElement.style.marginLeft = `${distance / 16}rem`
}

function shouldOpenAbove(
  parentRect: DOMRect,
  portalRect: DOMRect,
  targetElement: HTMLElement
): boolean {
  const scrollView = getScrollView(targetElement)
  const windowHeight = (
    window.document.documentElement || window.document.body
  ).clientHeight
  // If inside scroll view, check if we should use scroll view or window dimensions
  if (scrollView) {
    const scrollViewHeight = scrollView.clientHeight

    // If scroll view is larger than or equal to window, use window dimensions instead
    if (scrollViewHeight >= windowHeight) {
      const spaceAbove = parentRect.top
      const spaceBelow =
        windowHeight - (parentRect.top + parentRect.height)

      // Portal fits below in window
      if (spaceBelow >= portalRect.height) {
        return false
      }

      // Portal fits above in window
      if (spaceAbove >= portalRect.height) {
        return true
      }
      // Choose side with more space in window
      return spaceAbove > spaceBelow
    }

    // Use scroll view dimensions when scroll view is smaller than window
    const spaceBelow =
      scrollViewHeight - (parentRect.top + parentRect.height)
    const spaceAbove = parentRect.top

    // Portal fits below in scroll view
    if (spaceBelow >= portalRect.height) {
      return false
    }

    // Portal fits above in scroll view
    if (spaceAbove >= portalRect.height) {
      return true
    }

    // Portal doesn't fit in scroll view - fallback to window positioning
    const windowSpaceBelow =
      windowHeight - (parentRect.top + parentRect.height)
    const windowSpaceAbove = parentRect.top

    // Portal fits below in window
    if (windowSpaceBelow >= portalRect.height) {
      return false
    }

    // Portal fits above in window
    if (windowSpaceAbove >= portalRect.height) {
      return true
    }

    // Choose side with more space in window
    return windowSpaceAbove > windowSpaceBelow
  }

  // Not in scroll view - use window dimensions
  const clientHeight = (
    window.document.documentElement || window.document.body
  ).clientHeight

  const spaceAbove = parentRect.top
  const spaceBelow = clientHeight - (parentRect.top + parentRect.height)

  // If portal fits below (default), open below
  if (
    parentRect.top + parentRect.height + portalRect.height <=
    clientHeight
  ) {
    return false
  }

  // If portal fits above, open above
  if (parentRect.top - portalRect.height >= 0) {
    return true
  }

  // If portal doesn't fit on either side, choose the side with more space
  return spaceAbove > spaceBelow
}

function shouldAlignRight(
  parentRect: DOMRect,
  portalRect: DOMRect,
  shellRect: DOMRect,
  targetElement: HTMLElement
): boolean {
  // If shell is wider than portal, align right
  if (shellRect.width > portalRect.width) {
    return true
  }

  const scrollView = getScrollView(targetElement)
  const windowWidth = (
    window.document.documentElement || window.document.body
  ).clientWidth

  // If inside scroll view, check if we should use scroll view or window dimensions
  if (scrollView) {
    const scrollViewWidth = scrollView.clientWidth

    // If scroll view is larger than or equal to window, use window dimensions instead
    if (scrollViewWidth >= windowWidth) {
      const spaceOnLeft = parentRect.left
      const spaceOnRight =
        windowWidth - (parentRect.left + parentRect.width)

      // Portal fits on the left in window
      if (parentRect.left + portalRect.width <= windowWidth) {
        return false
      }

      // Portal fits on the right in window
      if (spaceOnLeft >= portalRect.width) {
        return true
      }

      // Choose side with more space in window
      return spaceOnLeft > spaceOnRight
    }

    // Use scroll view dimensions when scroll view is smaller than window
    // Portal fits on the left in scroll view
    if (parentRect.left + portalRect.width <= scrollViewWidth) {
      return false
    }

    const spaceOnLeft = parentRect.left

    // Portal fits on the right in scroll view
    if (spaceOnLeft >= portalRect.width) {
      return true
    }

    // Portal doesn't fit in scroll view - fallback to window positioning
    const windowSpaceOnRight =
      windowWidth - (parentRect.left + parentRect.width)

    // Portal fits on the left in window
    if (parentRect.left + portalRect.width <= windowWidth) {
      return false
    }

    const windowSpaceOnLeft = parentRect.left

    // Portal fits on the right in window
    if (windowSpaceOnLeft >= portalRect.width) {
      return true
    }

    // Choose side with more space in window
    return windowSpaceOnLeft > windowSpaceOnRight
  }

  // Not in scroll view - use window dimensions
  const clientWidth = (
    window.document.documentElement || window.document.body
  ).clientWidth

  // Calculate available space on both sides
  const spaceOnLeft = parentRect.left
  const spaceOnRight = clientWidth - (parentRect.left + parentRect.width)

  // If portal fits on the left (default), use left alignment
  if (parentRect.left + portalRect.width <= clientWidth) {
    return false
  }

  // If portal fits on the right, use right alignment
  if (parentRect.left - portalRect.width >= 0) {
    return true
  }

  // If portal doesn't fit on either side, choose the side with more space
  return spaceOnLeft > spaceOnRight
}

function getScrollView(element: Element): Element | null {
  return getClosestScrollViewElement(element)
}
