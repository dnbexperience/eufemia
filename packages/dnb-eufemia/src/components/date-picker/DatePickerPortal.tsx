import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, HTMLProps, RefObject } from 'react'
import type { DatePickerProps } from './DatePicker'
import PortalRoot from '../PortalRoot'
import { debounce } from '../../shared/helpers'

type DatePickerPortalProps = HTMLProps<HTMLDivElement> & {
  skipPortal?: DatePickerProps['skipPortal']
  alignment?: DatePickerProps['alignPicker']
  targetElementRef?: RefObject<HTMLElement>
}

export default function DatePickerPortal({
  skipPortal,
  alignment,
  targetElementRef,
  children,
}: DatePickerPortalProps) {
  const [position, setPosition] = useState<CSSProperties | null>(null)

  useLayoutEffect(() => {
    if (targetElementRef?.current) {
      setPosition(getPosition(targetElementRef.current, alignment))
    }
  }, [alignment, targetElementRef])

  const alignmentRef = useRef(alignment)
  alignmentRef.current = alignment

  const setPositionDebounce = useRef(
    debounce(() => {
      if (targetElementRef?.current) {
        setPosition(
          getPosition(targetElementRef.current, alignmentRef.current)
        )
      }
    }, 200)
  )

  useEffect(() => {
    const debouncedFn = setPositionDebounce.current

    if (!skipPortal) {
      window.addEventListener('resize', debouncedFn)
      window.addEventListener('scroll', debouncedFn)
    }

    return () => {
      if (!skipPortal) {
        window.removeEventListener('resize', debouncedFn)
        window.removeEventListener('scroll', debouncedFn)
      }
      debouncedFn.cancel()
    }
  }, [skipPortal])

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
