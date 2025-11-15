import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
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

      const scrollView = document.querySelector('.dnb-scroll-view')
      const isInScrollView = scrollView?.contains(
        document.querySelector('.dnb-date-picker')
      )
      if (isInScrollView) {
        scrollView.addEventListener('resize', setPositionDebounce)
        scrollView.addEventListener('scroll', setPositionDebounce)
      } else {
        window.addEventListener('resize', setPositionDebounce)
        window.addEventListener('scroll', setPositionDebounce)
      }
    }

    return () => {
      if (!skipPortal) {
        const scrollView = document.querySelector('.dnb-scroll-view')
        const isInScrollView = scrollView?.contains(
          document.querySelector('.dnb-date-picker')
        )
        if (isInScrollView) {
          scrollView.removeEventListener('resize', setPositionDebounce)
          scrollView.removeEventListener('scroll', setPositionDebounce)
        } else {
          window.removeEventListener('resize', setPositionDebounce)
          window.removeEventListener('scroll', setPositionDebounce)
        }
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
  triangleElement.classList.toggle('dnb-date-picker__triangle', !openAbove)
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
  const clientHeight = (
    document.querySelector('.dnb-scroll-view') ||
    window.document.documentElement ||
    window.document.body
  ).clientHeight

  return (
    parentRect.top + parentRect.height + portalRect.height >
      clientHeight && parentRect.top - portalRect.height > 0
  )
}

function shouldAlignRight(
  parentRect: DOMRect,
  portalRect: DOMRect,
  shellRect: DOMRect
): boolean {
  const clientWidth = (
    document.querySelector('.dnb-scroll-view') ||
    window.document.documentElement ||
    window.document.body
  ).clientWidth
  return (
    shellRect.width > portalRect.width ||
    (parentRect.left + portalRect.width > clientWidth &&
      parentRect.left - portalRect.width > 0)
  )
}
