import { useCallback, useEffect, useRef } from 'react'
import useStepAnimation from './useStepAnimation'

export default function useHandleLayoutEffect({
  activeIndexRef,
  stepElementRef,
}) {
  const isInteractionRef = useRef(false)

  useEffect(() => {
    // Ensure we delay the mounting before layout effect is handled
    const delay = process.env.NODE_ENV === 'test' ? 8 : 100
    const timeout = setTimeout(() => {
      isInteractionRef.current = true
    }, delay)
    return () => clearTimeout(timeout)
  })

  useStepAnimation({ activeIndexRef, stepElementRef })

  const action = useCallback((fn: () => void) => {
    // Wait for the next render cycle
    window.requestAnimationFrame(() =>
      // Wait for the new stepElementRef to be set
      window.requestAnimationFrame(() => {
        isInteractionRef.current && fn()
      })
    )
  }, [])

  const setFocus = useCallback(() => {
    action(() => {
      stepElementRef.current?.focus?.({
        preventScroll: true,
      })
    })
  }, [action, stepElementRef])

  const scrollToTop = useCallback(() => {
    action(() => {
      stepElementRef.current?.scrollIntoView?.()
    })
  }, [action, stepElementRef])

  return { setFocus, scrollToTop, isInteractionRef }
}
