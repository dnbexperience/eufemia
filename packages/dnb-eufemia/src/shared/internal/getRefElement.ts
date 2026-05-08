import type { RefObject } from 'react'

type RefElement = RefObject<HTMLElement> | HTMLElement | null

export default function getRefElement(
  target: RefObject<unknown> | HTMLElement | null
): HTMLElement | null {
  if (!target) {
    return null
  }

  const unknownTarget = target as RefObject<{
    _ref: RefObject<HTMLElement>
  }>
  let element: RefElement = target as RefElement

  // "_ref" is set inside e.g. the Button component (among many others)
  if (unknownTarget?.current?._ref) {
    element = getRefElement(unknownTarget.current._ref)
  }

  if (element && Object.hasOwn(element, 'current')) {
    element = (element as RefObject<HTMLElement>).current
  }

  return element as HTMLElement | null
}
