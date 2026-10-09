import { useState, type CSSProperties } from 'react'
import useIsomorphicLayoutEffect from '@dnb/eufemia/src/shared/helpers/useIsomorphicLayoutEffect'

/**
 * Style for an absolutely positioned marker that covers `target`,
 * following it whenever a new target is given.
 *
 * Returns `undefined` while there is nothing to mark.
 */
export default function useMarkerStyle(target: HTMLElement | null) {
  const [style, setStyle] = useState<CSSProperties>()

  useIsomorphicLayoutEffect(() => {
    if (!target) {
      setStyle(undefined)
      return
    }

    const coverTarget = () => setStyle(styleCovering(target))
    coverTarget()

    const resizeObserver = new ResizeObserver(coverTarget)
    resizeObserver.observe(coordinateSpaceOf(target))

    return () => resizeObserver.disconnect()
  }, [target])

  return style
}

function styleCovering(target: HTMLElement): CSSProperties {
  const spaceRect = coordinateSpaceOf(target).getBoundingClientRect()
  const { left, top, width, height } = target.getBoundingClientRect()

  return {
    left: left - spaceRect.left,
    translate: `0 ${top - spaceRect.top}px`,
    width,
    height,
  }
}

/** The element an absolutely positioned sibling of `target` is placed against. */
function coordinateSpaceOf(target: HTMLElement) {
  return target.offsetParent ?? target
}
