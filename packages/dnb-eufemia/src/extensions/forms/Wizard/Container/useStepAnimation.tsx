import React, { useEffect, useRef } from 'react'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export default function useStepAnimation({
  activeIndexRef,
  stepElementRef,
}) {
  const activeIndex = activeIndexRef.current
  const indexRef = useRef(activeIndex)

  useEffect(() => {
    indexRef.current = activeIndex
  }, [activeIndex])

  useLayoutEffect(() => {
    // Use layout effect to compare the active step before we update the cached indexRef
    // This way we don't have an animation on the first render, but only on a step change.
    if (activeIndex === indexRef.current) {
      return // stop here
    }

    // Wait until "stepElementRef.current = currentElementRef.current" is set
    // So we actually get the correct elements when useStep is called,
    // as it rerenders the children
    window.requestAnimationFrame(() => {
      try {
        const elements: Array<HTMLElement> =
          stepElementRef.current.querySelectorAll(
            '.dnb-forms-step > *, .dnb-forms-button-row > *'
          )
        elements.forEach((element, i) => {
          element.style.setProperty('--element-index', String(i + 1))
          element.classList.add('appear-fx')
        })
      } catch (error) {
        //
      }
    })
  }, [activeIndex, stepElementRef])
}
