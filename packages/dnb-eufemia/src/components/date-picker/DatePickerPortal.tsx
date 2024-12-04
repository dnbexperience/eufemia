import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { DatePickerProps } from './DatePicker'

type DatePickerPortalProps = React.HTMLProps<HTMLDivElement> & {
  show?: boolean
  alignment?: DatePickerProps['alignPicker']
  portalRef?: React.RefObject<HTMLDivElement>
  targetElementRef?: React.RefObject<HTMLElement>
}

export default function DatePickerPortal({
  show = false,
  alignment,
  targetElementRef,
  children,
  className,
}: DatePickerPortalProps) {
  // Make sure the portal re-renders when the target element changes
  const [targetElement, setTargetElement] = useState(
    targetElementRef?.current
  )
  const [portal, setPortal] = useState<HTMLDivElement>(undefined)

  // Make sure that the portal has a bounding rect to work with, when setting the position
  useEffect(() => {
    if (targetElementRef?.current !== targetElement) {
      setTargetElement(targetElementRef?.current)
    }
  }, [targetElementRef, targetElement])

  if (show && !portal) {
    const portalRoot = createPortalRoot(className)
    document.body.appendChild(portalRoot)
    const { top, left } = getPosition(targetElement, alignment)
    portalRoot.style.left = left
    portalRoot.style.top = top
    setPortal(portalRoot)
  }

  if (!show && portal) {
    document.body.removeChild(portal)
    setPortal(undefined)
  }

  return portal && createPortal(children, portal)
}

function createPortalRoot(className: string) {
  const root = document.createElement('div')
  root.className = `${'dnb-date-picker__portal'} ${className}`

  return root
}

function getPosition(
  targetElement: HTMLElement,
  alignment: DatePickerPortalProps['alignment']
) {
  if (!targetElement) {
    return { top: '0', left: '0' }
  }

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
