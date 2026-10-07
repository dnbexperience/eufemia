import { useEffect, useState } from 'react'

export type Rect = {
  top: number
  left: number
  width: number
  height: number
}

/**
 * Tracks the viewport rectangle of an element while it scrolls or moves.
 * Only re-renders when the rectangle changes.
 */
export default function useTargetRect(
  element: HTMLElement | null
): Rect | null {
  const [rect, setRect] = useState<Rect | null>(null)

  useEffect(() => {
    if (!element) {
      setRect(null)
      return undefined
    }

    let frame = 0
    let previous = ''

    const measure = () => {
      const { top, left, width, height } = element.getBoundingClientRect()
      const key = `${top}:${left}:${width}:${height}`

      if (key !== previous) {
        previous = key
        setRect({ top, left, width, height })
      }

      frame = requestAnimationFrame(measure)
    }

    measure()

    return () => cancelAnimationFrame(frame)
  }, [element])

  return rect
}
