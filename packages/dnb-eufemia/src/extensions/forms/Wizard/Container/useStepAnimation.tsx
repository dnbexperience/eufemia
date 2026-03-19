import { useCallback, useEffect, useRef } from 'react'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'

export default function useStepAnimation({
  activeIndexRef,
  stepElementRef,
  executeLayoutAnimationRef,
}: {
  activeIndexRef: React.RefObject<number>
  stepElementRef: React.RefObject<HTMLElement>
  executeLayoutAnimationRef: React.MutableRefObject<
    (() => void) | undefined
  >
}) {
  const activeIndex = activeIndexRef.current
  const indexRef = useRef(activeIndex)

  useEffect(() => {
    indexRef.current = activeIndex
  }, [activeIndex])

  const executeLayoutAnimation = useCallback(() => {
    // Wait until "stepElementRef.current = currentElementRef.current" is set
    // So we actually get the correct elements when useStep is called,
    // as it rerenders the children
    window.requestAnimationFrame(() => {
      try {
        const elements: Array<HTMLElement> = Array.from(
          stepElementRef.current.querySelectorAll(
            '.dnb-forms-step > *, .dnb-forms-button-row > *'
          )
        ) as HTMLElement[]
        elements.forEach((element, i) => {
          element.style.setProperty('--element-index', String(i + 1))
          element.classList.add('appear-fx')
        })
      } catch (error) {
        //
      }
    })
  }, [stepElementRef])
  executeLayoutAnimationRef.current = executeLayoutAnimation

  useLayoutEffect(() => {
    // Use layout effect to compare the active step before we update the cached indexRef
    // This way we don't have an animation on the first render, but only on a step change.
    if (activeIndex === indexRef.current) {
      return // stop here
    }

    executeLayoutAnimation()
  }, [activeIndex, executeLayoutAnimation])
}
