import React, { useCallback } from 'react'
import { getClosestScrollViewElement } from '../../shared/component-helper'
import { useHeightAnimation } from '../height-animation/useHeightAnimation'
import { TableAccordionTrProps } from './TableAccordionTr'
import { TableAccordionContext } from './TableContext'

export type useTableAnimationHandlerProps = {
  /**
   * Ref to <div> inside the <tr> element being exapanded/collapsed
   */
  innerRef: React.MutableRefObject<HTMLDivElement>
  /**
   * Ref to the <tr> element being clicked
   */
  trRef: React.MutableRefObject<HTMLTableRowElement>
}

export function useTableAnimationHandler({
  innerRef,
  trRef,
  expanded,
  noAnimation,
}: useTableAnimationHandlerProps & TableAccordionTrProps) {
  const tableAccordionContext = React.useContext(TableAccordionContext)
  const [ariaLive, setAriaLive] = React.useState(null)
  const open = Boolean(expanded || tableAccordionContext?.trIsOpen)

  const scrollViewHandler = useCallback(
    (clip: boolean) => {
      const scollView = getClosestScrollViewElement(
        trRef.current
      ) as HTMLElement
      if (scollView instanceof HTMLElement) {
        scollView.style.overflow = clip ? 'clip' : ''
      }
    },
    [trRef]
  )

  const onOpen = useCallback((state) => {
    setAriaLive(state ? true : null)
  }, [])

  const onAnimationStart = useCallback(() => {
    scrollViewHandler(true)
  }, [scrollViewHandler])

  const onAnimationEnd = useCallback(
    (state) => {
      const event = { target: trRef.current }
      switch (state) {
        case 'opened':
          tableAccordionContext.onOpened?.(event)
          break

        case 'closed':
          tableAccordionContext.onClosed?.(event)
          break
      }

      scrollViewHandler(false)
    },
    [scrollViewHandler, tableAccordionContext, trRef]
  )

  const { isInDOM, isAnimating, isVisibleParallax, firstPaintStyle } =
    useHeightAnimation(innerRef, {
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
