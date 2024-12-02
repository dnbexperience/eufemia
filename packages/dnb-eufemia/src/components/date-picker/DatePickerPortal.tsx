import { set } from 'date-fns'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type DatePickerPortalProps = React.HTMLProps<HTMLDivElement> & {
  show?: boolean
  targetElementRef?: React.RefObject<HTMLElement>
}

export default function DatePickerPortal({
  show = false,
  targetElementRef,
  children,
}: DatePickerPortalProps) {
  // Make sure the portal re-renders when the target element changes
  const [targetElement, setTargetElement] = useState(
    targetElementRef?.current
  )

  // Make sure that the portal has a bounding rect to work with, when setting the position
  useEffect(() => {
    if (targetElementRef?.current !== targetElement) {
      setTargetElement(targetElementRef?.current)
    }
  }, [targetElementRef, targetElement])

  const scrollY = window.scrollY
  const scrollX = window.scrollX

  const rect = targetElement?.getBoundingClientRect()

  return targetElement && show
    ? createPortal(
        <span
          className="dnb-datepicker__portal"
          style={{
            top: `${rect?.top + scrollY}px`,
            left: `${rect?.left + scrollX}px`,
          }}
        >
          {children}
        </span>,
        document.body
      )
    : null
}
