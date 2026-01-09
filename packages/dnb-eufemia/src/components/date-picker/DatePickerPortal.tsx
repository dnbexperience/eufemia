import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import type { DatePickerProps } from './DatePicker'
import PortalRoot from '../PortalRoot'
import { debounce } from '../../shared/helpers'

type DatePickerPortalProps = React.HTMLProps<HTMLDivElement> & {
  skipPortal?: DatePickerProps['skipPortal']
  alignment?: DatePickerProps['alignPicker']
  targetElementRef?: React.RefObject<HTMLElement>
}

export default function DatePickerPortal({
  skipPortal,
  alignment,
  targetElementRef,
  children,
}: DatePickerPortalProps) {
  const [position, setPosition] = useState({})

  useLayoutEffect(() => {
    if (targetElementRef.current) {
      setPosition(getPosition(targetElementRef.current, alignment))
    }
  }, [alignment, targetElementRef])

  const setPositionDebounce = useCallback(() => {
    const debounced = debounce(() => {
      if (targetElementRef.current) {
        setPosition(getPosition(targetElementRef.current, alignment))
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
