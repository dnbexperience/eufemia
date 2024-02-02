import React, { useEffect, useMemo, useRef, useState } from 'react'
import HeightAnimationInstance from './HeightAnimationInstance'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type useHeightAnimationOptions = {
  /**
   * Set to `true`, when initially `false` was given, to animate from 0px to auto.
   * Default: true
   */
  open?: boolean

  /**
   * Set to `false` to omit the animation.
   * Default: true
   */
  animate?: boolean

  /**
   * In order to let the Hook know when children has changed
   */
  children?: React.ReactNode | HTMLElement

  /**
   * Is called once before mounting the component (useLayoutEffect)
   */
  onInit?: (instance: HeightAnimationInstance) => void

  /**
   * Is called when fully opened or closed
   */
  onOpen?: (isOpen: boolean) => void

  /**
   * Is called when animation has started.
   */
  onAnimationStart?: (state: HeightAnimationOnStartTypes) => void

  /**
   * Is called when animation is done and the full height is reached.
   */
  onAnimationEnd?: (state: HeightAnimationOnEndTypes) => void
}

export type HeightAnimationOnStartTypes =
  | 'opening'
  | 'closing'
  | 'adjusting'

export type HeightAnimationOnEndTypes = 'opened' | 'closed' | 'adjusted'

export function useHeightAnimation(
  targetRef: React.RefObject<HTMLElement>,
  {
    open = true,
    animate = true,
    children = null,
    onInit = null,
    onOpen = null,
    onAnimationStart = null,
    onAnimationEnd = null,
  }: useHeightAnimationOptions = {}
) {
  const instRef = useRef<HeightAnimationInstance>(null)
  const isInitialRenderRef = useRef(
    typeof globalThis !== 'undefined'
      ? globalThis.readjustTime !== -1
      : true
  )

  const [isOpen, setIsOpen] = useState(open)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisibleParallax, setParallax] = useState(open)

  useLayoutEffect(() => {
    instRef.current = new HeightAnimationInstance()
    onInit?.(instRef.current)
    return () => {
      instRef.current?.remove()
      instRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    instRef.current.setOptions({ animate })

    if (typeof global !== 'undefined' && globalThis.IS_TEST) {
      instRef.current.setOptions({ animate: false })
    }
  }, [animate])

  useLayoutEffect(() => {
    instRef.current.onStart((state: HeightAnimationOnStartTypes) => {
      switch (state) {
        case 'opening':
          setIsVisible(true)
          setParallax(true)
          setIsAnimating(true)
          break

        case 'closing':
          setParallax(false)
          setIsAnimating(true)
          break

        case 'adjusting':
          setIsAnimating(true)
          break
      }

      onAnimationStart?.(state)
    })

    instRef.current.onEnd((state: HeightAnimationOnEndTypes) => {
      switch (state) {
        case 'opened':
          setIsVisible(true)
          setIsOpen(true)
          setIsAnimating(false)
          onOpen?.(true)
          break

        case 'closed':
          setIsVisible(false)
          setIsOpen(false)
          setParallax(false)
          setIsAnimating(false)
          onOpen?.(false)
          break

        case 'adjusted':
          setIsAnimating(false)
          break
      }

      if (!isInitialRenderRef.current) {
        onAnimationEnd?.(state)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useOpenClose({ open, instRef, isInitialRenderRef, targetRef })
  useAdjust({ children, instRef, isInitialRenderRef })

  /**
   * Returns the first paint style, to be used for the initial render,
   * to avoid flickering.
   */
  const firstPaintStyle = ((open &&
    !isVisible &&
    !isAnimating &&
    instRef.current?.firstPaintStyle()) ||
    {}) as React.CSSProperties
  const isInDOM = open || isVisible

  return {
    open,
    isOpen,
    isInDOM,
    isVisible,
    isVisibleParallax,
    isAnimating,
    firstPaintStyle,
  }
}

function useOpenClose({ open, instRef, targetRef, isInitialRenderRef }) {
  useLayoutEffect(() => {
    instRef.current.setElement(targetRef.current)

    if (
      !targetRef.current ||
      (instRef.current.state === 'init' && isInitialRenderRef.current)
    ) {
      if (open) {
        instRef.current.setAsOpen()
      } else {
        instRef.current.setAsClosed()
      }
    }
  }, [open, targetRef, instRef, isInitialRenderRef])

  const isTest =
    typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'test' &&
    typeof globalThis.IS_TEST === 'undefined'

  useLayoutEffect(() => {
    if (!targetRef.current || !isInitialRenderRef.current) {
      if (open) {
        instRef.current.open()
      } else {
        instRef.current.close()
      }

      // For testing purposes, we need to trigger the transitionend event
      if (isTest) {
        const event = new CustomEvent('transitionend')
        targetRef.current?.dispatchEvent(event)
      }
    }
  }, [open, instRef, isInitialRenderRef, targetRef, isTest])

  useEffect(() => {
    const run = () => {
      isInitialRenderRef.current = false
    }
    if (globalThis.bypassTime === -1 || isTest) {
      run()
    } else {
      window.requestAnimationFrame?.(run)
    }
  }, [isInitialRenderRef, isTest])
}

function useAdjust({ children, instRef, isInitialRenderRef }) {
  const fromHeight = useRef(0)

  const [timer] = useState(() => Date.now())

  /**
   * Wait for some criteria and a certain time, before we adjust the height,
   * so it will not run when a open/close animation is running.
   */
  const shouldAdjust = () => {
    switch (instRef.current?.state) {
      case 'opened':
      case 'adjusted':
      case 'adjusting':
        return (
          !isInitialRenderRef.current &&
          Date.now() - timer > (globalThis.readjustTime || 100)
        )
    }

    return false
  }

  useMemo(() => {
    if (shouldAdjust()) {
      fromHeight.current = instRef.current?.getHeight()
    }
  }, [children]) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (shouldAdjust()) {
      /**
       * Ensure we don't have height, while we get the "toHeight" again.
       * We may move this inside of the HeightAnimationInstance class later,
       * but the "GlobalStatus" is currently relying on "getUnknownHeight" inside of adjustTo.
       */
      instRef.current.elem.style.height = ''

      /**
       * Use getHeight instead of getUnknownHeight because of the additional,
       * disturbing DOM manipulation.
       */
      const toHeight = instRef.current.getHeight()

      instRef.current.adjustTo(fromHeight.current, toHeight)
    }
  }, [children]) // eslint-disable-line react-hooks/exhaustive-deps
}
