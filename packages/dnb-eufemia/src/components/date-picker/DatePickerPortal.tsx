import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { DatePickerProps } from './DatePicker'

type DatePickerPortalProps = React.HTMLProps<HTMLDivElement> & {
  skipPortal?: DatePickerProps['skipPortal']
  alignment?: DatePickerProps['alignPicker']
  targetElementRef?: React.RefObject<HTMLElement>
}

export default function DatePickerPortal({
  className,
  skipPortal,
  alignment,
  targetElementRef,
  children,
}: DatePickerPortalProps) {
  const [position, setPosition] = useState({})

  const positionTimeout = useRef<NodeJS.Timeout>()

  useLayoutEffect(() => {
    if (targetElementRef.current) {
      setPosition(getPosition(targetElementRef.current, alignment))
    }
  }, [])

  const setPositionDebounce = useCallback(() => {
    if (targetElementRef.current) {
      setPosition(getPosition(targetElementRef.current, alignment))
    }

    clearTimeout(positionTimeout.current)
    positionTimeout.current = setTimeout(() => {
      if (targetElementRef.current) {
        setPosition(getPosition(targetElementRef.current, alignment))
      }
    }, 200)
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
  }, [])

  return (
    position &&
    (!skipPortal
      ? ReactDOM.createPortal(
          <div
            className={`${'dnb-date-picker__portal'} ${className}`}
            style={position}
          >
            {children}
          </div>,
          document.body
        )
      : children)
  )
}

function getPosition(
  targetElement: HTMLElement,
  alignment: DatePickerPortalProps['alignment']
) {
  const rect = targetElement?.getBoundingClientRect()

  const scrollY = window.scrollY
  const scrollX = window.scrollX

  return {
    top: `${rect.top + scrollY}px`,
    left: `${
      alignment === 'right'
        ? rect.left + rect.width + scrollX
        : rect.left + scrollX
    }px`,
  }
}
