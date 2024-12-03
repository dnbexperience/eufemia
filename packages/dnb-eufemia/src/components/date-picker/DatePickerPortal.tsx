import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type DatePickerPortalProps = React.HTMLProps<HTMLDivElement> & {
  show?: boolean
  portalRef?: React.RefObject<HTMLDivElement>
  targetElementRef?: React.RefObject<HTMLElement>
}

export default function DatePickerPortal({
  show = false,
  portalRef,
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

  const { top, left } = getPosition(targetElement)

  return show
    ? createPortal(
        <div
          className="dnb-datepicker__portal"
          style={{
            top,
            left,
          }}
          ref={portalRef}
        >
          {children}
        </div>,
        document.body
      )
    : null
}

function getPosition(targetElement: HTMLElement) {
  if (!targetElement) {
    return { top: '0', left: '0' }
  }

  const rect = targetElement?.getBoundingClientRect()

  const scrollY = window.scrollY
  const scrollX = window.scrollX

  const offsetY = rect.height

  return {
    top: `${rect.top + offsetY + scrollY}px`,
    left: `${rect.left + scrollX}px`,
  }
}
function userRef<T>() {
  throw new Error('Function not implemented.')
}
