import React from 'react'
import AnimateHeight from '../../shared/AnimateHeight'

export type useHeightAnimationOptions = {
  /**
   * Set to `true` when the view should animate from 0px to auto.
   * Default: false
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
  onInit?: (instance: AnimateHeight) => void

  /**
   * Is called when fully opened or closed
   */
  onOpen?: (isOpen: boolean) => void

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
    open = null,
    animate = true,
    children = null,
    onInit = null,
    onOpen = null,
    onAnimationEnd = null,
  }: useHeightAnimationOptions = {}
) {
  const animRef = React.useRef<AnimateHeight>(null)
  const [isOpen, setIsOpen] = React.useState(open)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [isVisibleParallax, setParallax] = React.useState(open)
  const [isInitialRender, setIsMounted] = React.useState(true)

  if (typeof global !== 'undefined' && global.IS_TEST) {
    animate = false
  }

  React.useEffect(() => setIsMounted(false), []) // eslint-disable-line

  React.useLayoutEffect(() => {
    animRef.current = new AnimateHeight({ animate })

    if (isInitialRender && onInit) {
      onInit(animRef.current)
    }

    if (isInitialRender && isOpen) {
      onOpen?.(true)
    }

    if (animate) {
      animRef.current.onStart((state: HeightAnimationOnStartTypes) => {
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
      })

      animRef.current.onEnd((state: HeightAnimationOnEndTypes) => {
        switch (state) {
          case 'opened':
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

        onAnimationEnd?.(state)
      })
    }

    return () => animRef.current?.remove()
  }, [animate]) // eslint-disable-line react-hooks/exhaustive-deps

  useOpenClose({ open, animRef, targetRef, isInitialRender })
  useAdjust({ children, animRef, isInitialRender })

  return {
    open,
    isOpen,
    isInDOM: open || isVisible,
    isVisible,
    isVisibleParallax,
    isAnimating,
  }
}

function useOpenClose({ open, animRef, targetRef, isInitialRender }) {
  React.useLayoutEffect(() => {
    if (!targetRef.current) {
      return // stop here
    }

    const anim = animRef.current

    anim.setElement(targetRef.current)

    if (open) {
      anim.open({ animate: !isInitialRender })
    } else if (anim.state === 'init') {
      anim.close({ animate: false })
    } else {
      anim.close()
    }
  }, [open, targetRef, animRef]) // eslint-disable-line
}

function useAdjust({ children, animRef, isInitialRender }) {
  const fromHeight = React.useRef(0)

  const shouldAdjust = () => {
    switch (animRef.current?.state) {
      case 'opened':
      case 'adjusted':
      case 'adjusting':
        return !isInitialRender
    }

    return false
  }

  React.useMemo(() => {
    if (shouldAdjust()) {
      fromHeight.current = animRef.current?.getHeight()
    }
  }, [children]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useLayoutEffect(() => {
    if (shouldAdjust()) {
      /**
       * Ensure we don't have height, while we get the "toHeight" again
       * We may move this inside of the AnimateHeight class later,
       * but the "GlobalStatus" is currently relaying on "getUnknownHeight" inside of adjustTo
       */
      animRef.current.elem.style.height = ''

      animRef.current.adjustTo(
        fromHeight.current,
        animRef.current.getHeight() // use getHeight instead of getUnknownHeight because of the additional, disturbing DOM manipupation
      )
    }
  }, [children]) // eslint-disable-line react-hooks/exhaustive-deps
}
