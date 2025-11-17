import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DatePickerProps } from './DatePicker'
import PortalRoot from '../PortalRoot'
import { debounce } from '../../shared/helpers'

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
          targetElementRef.current,
          calendarContainerRef.current,
          alignment
        )
      )
      updateTriangleIndicator(
        targetElementRef.current,
        calendarContainerRef.current,
        triangleRef.current
      )
    }
  }, [alignment, targetElementRef, calendarContainerRef, triangleRef])

  const setPositionDebounce = useMemo(
    () => debounce(updatePosition, 10),
    [updatePosition]
  )

  useEffect(() => {
    if (!skipPortal) {
      updatePosition()

      const scrollView = getLastScrollView()
      const isInScrollView = scrollView?.querySelector('.dnb-date-picker')
      const view = isInScrollView ? scrollView : window
      view.addEventListener('resize', setPositionDebounce)
      view.addEventListener('scroll', setPositionDebounce)
    }

    return () => {
      if (!skipPortal) {
        const scrollView = getLastScrollView()
        const isInScrollView = scrollView?.contains(
          document.querySelector('.dnb-date-picker')
        )
        const view = isInScrollView ? scrollView : window
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

  const openAbove = shouldOpenAbove(parentRect, portalRect)
  const top = openAbove
    ? parentRect.top - portalRect.height + scrollY - parentRect.height
    : parentRect.top + scrollY

  const alignRight = shouldAlignRight(parentRect, portalRect, shellRect)
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

  const openAbove = shouldOpenAbove(parentRect, portalRect)
  applyTriangleDirection(triangleElement, openAbove)

  const alignRight = shouldAlignRight(parentRect, portalRect, shellRect)

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
  portalRect: DOMRect
): boolean {
  const scrollView = getLastScrollView()

  // If inside scroll view, try scroll view dimensions first
  if (scrollView) {
    const scrollViewHeight = scrollView.clientHeight
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
    const windowHeight = window.document.documentElement.clientHeight
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
  shellRect: DOMRect
): boolean {
  // If shell is wider than portal, align right
  if (shellRect.width > portalRect.width) {
    return true
  }

  const scrollView = getLastScrollView()

  // If inside scroll view, try scroll view dimensions first
  if (scrollView) {
    const scrollViewWidth = scrollView.clientWidth

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
    const windowWidth = window.document.documentElement.clientWidth
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

function getLastScrollView(): Element | null {
  // If there are nested scroll views, we use the last one (most likely the one in the viewport)
  const allElements = document.querySelectorAll('.dnb-scroll-view')
  return allElements.length > 0
    ? allElements[allElements.length - 1]
    : null
}
