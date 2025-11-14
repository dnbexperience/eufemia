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
          triangleRef.current,
          alignment
        )
      )
    }
  }, [alignment, targetElementRef])

  const setPositionDebounce = useCallback(() => {
    const debounced = debounce(() => {
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
            triangleRef.current,
            alignment
          )
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
  triangleElement: HTMLElement,
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
  const triangleRect = triangleElement?.getBoundingClientRect()

  // Open the content portal above the child if there is not enough space to the bottom,
  // but if there also isn't enough space at the top, open to the bottom.
  const openAbove =
    parentRect.top + parentRect.height + portalRect.height >
      (window.document.documentElement || window.document.body)
        .clientHeight && parentRect.top - portalRect.height > 0

  const top = openAbove
    ? parentRect.top - portalRect.height + scrollY - parentRect.height
    : parentRect.top + scrollY

  // Open the content portal to the left if there is not enough space at the right,
  // but if there also isn't enough space at the right, open to the left.
  const alignRight =
    parentRect.left + portalRect.width >
      (window.document.documentElement || window.document.body)
        .clientWidth && parentRect.left - portalRect.width > 0

  const left = !alignRight
    ? parentRect.left + scrollX
    : scrollX + parentRect.left - portalRect.width + parentRect.width
  if (openAbove) {
    triangleElement.classList.remove('dnb-date-picker__triangle')
    triangleElement.classList.add('dnb-date-picker__triangle--bottom')
  } else {
    triangleElement.classList.remove('dnb-date-picker__triangle--bottom')
    triangleElement.classList.add('dnb-date-picker__triangle')
  }

  // Set triangle position
  const shellWidth = targetElement
    .querySelector('.dnb-input__shell')
    .getBoundingClientRect().width

  const buttonWidth = targetElement
    .querySelector('.dnb-input__submit-element')
    ?.getBoundingClientRect()?.width

  const showInput = targetElement.querySelector(
    '.dnb-input__submit-button'
  )

  if (alignRight) {
    const distance =
      portalRect.width - buttonWidth / 2 - triangleRect.width / 2

    triangleElement.style.marginRight = '0px'
    triangleElement.style.marginLeft = `${distance / 16}rem`
  } else {
    let distance = buttonWidth / 4
    if (showInput) {
      distance = shellWidth - buttonWidth / 2 - triangleRect.width / 2
    }
    triangleElement.style.marginRight = '0px'
    triangleElement.style.marginLeft = `${distance / 16}rem`
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
}
