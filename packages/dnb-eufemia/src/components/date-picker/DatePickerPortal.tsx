import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
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
  const [position, setPosition] = useState({})

  useLayoutEffect(() => {
    if (
      targetElementRef.current &&
      calendarContainerRef.current &&
      calendarContainerRef.current &&
      triangleRef.current
    ) {
      setPosition(
        getPosition(
          targetElementRef.current,
          calendarContainerRef.current,
          alignment
        )
      )
      if (
        targetElementRef.current &&
        calendarContainerRef.current &&
        triangleRef.current
      ) {
        setTriangle(
          targetElementRef.current,
          calendarContainerRef.current,
          triangleRef.current
        )
      }
    }
  }, [alignment, targetElementRef])

  const setPositionDebounce = useCallback(() => {
    const debounced = debounce(() => {
      if (
        targetElementRef.current &&
        calendarContainerRef.current &&
        triangleRef.current
      ) {
        setPosition(
          getPosition(
            targetElementRef.current,
            calendarContainerRef.current,
            alignment
          )
        )
      }
      if (
        targetElementRef.current &&
        calendarContainerRef.current &&
        triangleRef.current
      ) {
        setTriangle(
          targetElementRef.current,
          calendarContainerRef.current,
          triangleRef.current
        )
      }
    }, 200)

    debounced()
  }, [alignment, targetElementRef])

  useEffect(() => {
    if (!skipPortal) {
      window.addEventListener('resize', setPositionDebounce)
      window.addEventListener('scroll', setPositionDebounce)
    }

    return () => {
      if (!skipPortal) {
        window.removeEventListener('resize', setPositionDebounce)
        window.removeEventListener('scroll', setPositionDebounce)
      }
    }
  }, [setPositionDebounce, skipPortal])

  return (
    position &&
    (!skipPortal ? (
      <PortalRoot>
        <div className="dnb-date-picker__portal" style={position}>
          {children}
        </div>
      </PortalRoot>
    ) : (
      children
    ))
  )
}

function getPosition(
  targetElement: HTMLElement,
  portalElement: HTMLElement,
  alignment: DatePickerPortalProps['alignment']
) {
  const parentRect = targetElement?.getBoundingClientRect()
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

  const portalRect = portalElement?.getBoundingClientRect()
  const shellRect = targetElement
    .querySelector('.dnb-input__shell')
    .getBoundingClientRect()

  const openAbove = shouldOpenAbove(parentRect, portalRect)

  const top = openAbove
    ? parentRect.top - portalRect.height + scrollY - parentRect.height
    : parentRect.top + scrollY

  const alignRight = shouldAlignRight(parentRect, portalRect, shellRect)

  const left = !alignRight
    ? parentRect.left + scrollX
    : scrollX + parentRect.left - portalRect.width + parentRect.width

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
}

function setTriangle(
  targetElement: HTMLElement,
  portalElement: HTMLElement,
  triangleElement: HTMLElement
) {
  const parentRect = targetElement?.getBoundingClientRect()
  const portalRect = portalElement?.getBoundingClientRect()
  const triangleRect = triangleElement?.getBoundingClientRect()
  const shellRect = targetElement
    .querySelector('.dnb-input__shell')
    .getBoundingClientRect()
  const buttonRect = targetElement
    .querySelector('.dnb-input__submit-element')
    ?.getBoundingClientRect()

  const showInput = targetElement.querySelector(
    '.dnb-input__submit-button'
  )

  const openAbove = shouldOpenAbove(parentRect, portalRect)
  setTriangleDirection(triangleElement, openAbove)

  const alignRight = shouldAlignRight(parentRect, portalRect, shellRect)
  if (alignRight) {
    setTrianglePosition(
      triangleElement,
      portalRect.width - buttonRect?.width / 2 - triangleRect.width / 2
    )
  } else {
    let distance = buttonRect?.width / 4
    if (showInput) {
      distance =
        shellRect.width - buttonRect?.width / 2 - triangleRect.width / 2
    }
    setTrianglePosition(triangleElement, distance)
  }
}

function setTriangleDirection(
  triangleElement: HTMLElement,
  openAbove: boolean
) {
  if (openAbove) {
    triangleElement.classList.remove('dnb-date-picker__triangle')
    triangleElement.classList.add('dnb-date-picker__triangle--bottom')
  } else {
    triangleElement.classList.remove('dnb-date-picker__triangle--bottom')
    triangleElement.classList.add('dnb-date-picker__triangle')
  }
}

function setTrianglePosition(
  triangleElement: HTMLElement,
  distance: number
) {
  triangleElement.style.marginRight = '0px'
  triangleElement.style.marginLeft = `${distance / 16}rem`
}

function shouldOpenAbove(parentRect: DOMRect, portalRect: DOMRect) {
  // Open the content portal above the child if there is not enough space to the bottom,
  // but if there also isn't enough space at the top, open to the bottom.
  return (
    parentRect.top + parentRect.height + portalRect.height >
      (window.document.documentElement || window.document.body)
        .clientHeight && parentRect.top - portalRect.height > 0
  )
}

function shouldAlignRight(
  parentRect: DOMRect,
  portalRect: DOMRect,
  shellRect: DOMRect
) {
  // Open the content portal to the left if there is not enough space at the right,
  // but if there also isn't enough space at the right, open to the left.
  return (
    shellRect.width > portalRect.width ||
    (parentRect.left + portalRect.width >
      (window.document.documentElement || window.document.body)
        .clientWidth &&
      parentRect.left - portalRect.width > 0)
  )
}
