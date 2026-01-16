import type React from 'react'

type RefElement = React.RefObject<HTMLElement> | HTMLElement | null

export default function getRefElement(
  target: React.RefObject<unknown> | HTMLElement | null
): HTMLElement | null {
  if (!target) {
    return null
  }

  const unknownTarget = target as React.RefObject<{
    _ref: React.RefObject<HTMLElement>
  }>
  let element: RefElement = target as RefElement

  // "_ref" is set inside e.g. the Button component (among many others)
  if (unknownTarget?.current?._ref) {
    element = getRefElement(unknownTarget.current._ref)
  }

  if (element && Object.hasOwn(element, 'current')) {
    element = (element as React.RefObject<HTMLElement>).current
  }

  return element as HTMLElement | null
}
