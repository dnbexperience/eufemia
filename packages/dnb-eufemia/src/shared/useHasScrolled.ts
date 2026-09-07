import { useEffect, useRef, useState } from 'react'

/**
 * Returns whether the window has scrolled beyond the given vertical threshold.
 *
 * @param threshold Threshold in pixels. Defaults to 8.
 */
export default function useHasScrolled(threshold = 8): boolean {
  const [hasScrolled, setHasScrolled] = useState(false)
  const hasScrolledRef = useRef(false)

  useEffect(() => {
    const update = () => {
      const nextHasScrolled = window.scrollY > threshold

      if (nextHasScrolled !== hasScrolledRef.current) {
        hasScrolledRef.current = nextHasScrolled
        setHasScrolled(nextHasScrolled)
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })

    return () => {
      window.removeEventListener('scroll', update)
    }
  }, [threshold])

  return hasScrolled
}
