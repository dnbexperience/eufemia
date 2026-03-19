import React, { useCallback } from 'react'
import { getClosestScrollViewElement } from '../../../shared/component-helper'
import { useHeightAnimation } from '../../height-animation/useHeightAnimation'
import { TableAccordionContext } from './TableAccordionContext'
import type { TableAccordionContentRowProps } from './TableAccordionContent'

export type UseTableAnimationHandlerProps = {
  /**
   * Ref to <div> inside the <tr> element being expanded/collapsed
   */
  contentRef: React.RefObject<HTMLDivElement>
  /**
   * Ref to the <tr> element being clicked
   */
  trRef: React.RefObject<HTMLTableRowElement>
}

export function useTableAnimationHandler({
  contentRef,
  trRef,
  expanded,
  noAnimation,
}: UseTableAnimationHandlerProps & TableAccordionContentRowProps) {
  const tableAccordionContext = React.useContext(TableAccordionContext)
  const [ariaLive, setAriaLive] = React.useState(null)
  const open = Boolean(expanded || tableAccordionContext?.trIsOpen)

  const scrollViewHandler = useCallback(
    (clip: boolean) => {
      const scrollView = getClosestScrollViewElement(
        trRef.current
      ) as HTMLElement
      if (scrollView instanceof HTMLElement) {
        scrollView.style.overflowY = clip ? 'clip' : ''
      }
    },
    [trRef]
  )

  const onOpen = useCallback((state: boolean | null) => {
    setAriaLive(state ? true : null)
  }, [])

  const onAnimationStart = useCallback(() => {
    scrollViewHandler(true)
  }, [scrollViewHandler])

  const onAnimationEnd = useCallback(
    (state: string) => {
      const event = { target: trRef.current }
      switch (state) {
        case 'opened':
          tableAccordionContext.onOpen?.(event)
          break

        case 'closed':
          tableAccordionContext.onClose?.(event)
          break
      }

      scrollViewHandler(false)
    },
    [scrollViewHandler, tableAccordionContext, trRef]
  )

  const { isInDOM, isAnimating, isVisibleParallax, firstPaintStyle } =
    useHeightAnimation(contentRef, {
      open,
      animate: Boolean(
        !noAnimation && !tableAccordionContext?.noAnimation
      ),
      onOpen,
      onAnimationStart,
      onAnimationEnd,
    })

  return {
    ariaLive,
    isInDOM,
    isAnimating,
    isVisibleParallax,
    firstPaintStyle,
  }
}

export default useTableAnimationHandler
