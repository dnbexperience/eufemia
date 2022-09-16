import React from 'react'
import AnimateHeight from './AnimateHeight'

type useHeightAnimationOptions = {
  open?: boolean
  animate?: boolean
}

export function useHeightAnimation(
  targetRef: React.RefObject<HTMLElement>,
  { open = null, animate = true }: useHeightAnimationOptions = {}
) {
  const animRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(open)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isVisibleParallax, setParallax] = React.useState(open)
  const [isInitialRender, setIsMounted] = React.useState(true)

  if (typeof global !== 'undefined' && global.IS_TEST) {
    animate = false
  }

  React.useEffect(() => setIsMounted(false), []) // eslint-disable-line

  React.useLayoutEffect(() => {
    animRef.current = new AnimateHeight({ animate })

    if (animate) {
      animRef.current.onStart((state) => {
        switch (state) {
          case 'opening':
            setIsVisible(true)
            setParallax(true)
            break
          case 'closing':
            setParallax(false)
            break
        }
      })

      animRef.current.onEnd((state) => {
        switch (state) {
          case 'opened':
            setIsOpen(true)
            break
          case 'closed':
            setIsVisible(false)
            setIsOpen(false)
            setParallax(false)
            break
        }
      })
    }

    return () => {
      animRef.current?.remove()
    }
  }, [animate])

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

  return {
    open,
    isOpen,
    isInDOM: open || isVisible,
    isVisible,
    isVisibleParallax,
  }
}
