/**
 * Web DrawerList Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import {
  warn,
  getClosestScrollViewElement,
} from '../../shared/component-helper'
import PortalRoot from '../../components/PortalRoot'

export type DrawerListPortalProps = {
  id: string
  children: React.ReactNode
  opened: boolean
  innerRef?: React.ForwardedRef<HTMLSpanElement>
  rootRef: React.RefObject<HTMLSpanElement>
  include_owner_width?: boolean
  independent_width?: boolean
  fixed_position?: boolean
  skipPortal?: boolean
  className?: string
}

function DrawerListPortal({
  innerRef,
  id,
  opened,
  rootRef = { current: undefined },
  include_owner_width,
  independent_width,
  fixed_position,
  skipPortal,
  className,
  children,
}: DrawerListPortalProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [, setForceRerender] = useState<number>()

  const ref: React.LegacyRef<HTMLSpanElement> =
    innerRef || React.createRef()

  const setPosition = useRef<() => void>()
  const positionTimeout = useRef<NodeJS.Timeout>()
  const customElem = useRef<Element | Window>()
  const resizeObserver = useRef<ResizeObserver>()

  const init = useCallback(() => {
    setIsMounted(true)
  }, [])

  const removePositionObserver = useCallback(() => {
    clearTimeout(positionTimeout.current)
    if (typeof window !== 'undefined' && setPosition.current) {
      if (customElem.current) {
        customElem.current.removeEventListener(
          'scroll',
          setPosition.current
        )
      }
      if (resizeObserver.current) {
        resizeObserver.current.disconnect()
        resizeObserver.current = null
      }
      window.removeEventListener('resize', setPosition.current)
    }
    setPosition.current = null
  }, [])

  useEffect(() => {
    if (document.readyState === 'complete') {
      init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', init)
    }
  }, [init])

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', init)
      }

      removePositionObserver()
    }
  }, [init, removePositionObserver])

  const makeStyle = useCallback(() => {
    if (typeof window === 'undefined' || !isMounted) {
      return // stop here
    }

    try {
      const rootElem = rootRef.current
      if (!rootElem) {
        return // stop here
      }
      const ownerElem = rootElem.parentElement

      // min width as a threshold
      let width = 64

      // Handle width
      const ownerWidth = window.getComputedStyle(ownerElem).width

      // fallback for too narrow width - in case there is not width -> e.g. "--is-popup"
      if (independent_width || parseFloat(ownerWidth) < 64) {
        // get min-width from CSS property
        const minWidth =
          parseFloat(
            window
              .getComputedStyle(document.documentElement)
              .getPropertyValue('--drawer-list-width')
          ) || 0
        width = minWidth * 16
      }

      // also check if root "has a custom width"
      const customWidth = rootElem.getBoundingClientRect().width
      if (!independent_width && (customWidth || 0) >= 64) {
        width = customWidth
      }

      // Handle positions
      const rect = rootElem.getBoundingClientRect()
      const scrollY = fixed_position
        ? 0
        : window.scrollY !== undefined
        ? window.scrollY
        : window.pageYOffset
      const scrollX = fixed_position
        ? 0
        : window.scrollX !== undefined
        ? window.scrollX
        : window.pageXOffset

      let top = scrollY + rect.top
      let left =
        scrollX +
        rect.left +
        (include_owner_width ? parseFloat(ownerWidth || '0') : 0)

      if (width > window.innerWidth) {
        width = window.innerWidth
      }
      if (top < 0) {
        top = 0
      }
      if (left < 0) {
        left = 0
      }

      // NB:  before we recalculated the values to REM, but iOS rounds this and we get a wrong total value out of that!
      const style = {
        width,
        '--drawer-list-width': `${width / 16}rem`, // used by the "drawer-list-scale-in" animation
        top,
        left,
      }

      return style
    } catch (e) {
      warn(e)
    }
  }, [
    isMounted,
    rootRef,
    independent_width,
    fixed_position,
    include_owner_width,
  ])

  const addPositionObserver = useCallback(() => {
    if (setPosition.current || typeof window === 'undefined') {
      return // stop here
    }

    // debounce
    setPosition.current = () => {
      clearTimeout(positionTimeout.current)
      positionTimeout.current = setTimeout(() => {
        if (opened) {
          setForceRerender(Date.now())
        }
      }, 200)
    }

    customElem.current =
      getClosestScrollViewElement(rootRef.current) || window
    customElem.current.addEventListener('scroll', setPosition.current)

    try {
      resizeObserver.current = new ResizeObserver(setPosition.current)
      resizeObserver.current.observe(document.body)
    } catch (e) {
      window.addEventListener('resize', setPosition.current)
    }
  }, [opened, rootRef])

  if (skipPortal) {
    return children
  }

  if (typeof window !== 'undefined' && isMounted) {
    if (opened) {
      addPositionObserver()
    }

    const style = (opened ? makeStyle() : {}) as React.CSSProperties

    return (
      <PortalRoot>
        <span className="dnb-drawer-list__portal" id={`${id}-portal`}>
          <span
            className={classnames(
              'dnb-drawer-list__portal__style',
              fixed_position && 'dnb-drawer-list__portal__style--fixed',
              className
            )}
            style={style}
            ref={ref}
          >
            {children}
          </span>
        </span>
      </PortalRoot>
    )
  }

  return null
}

export default React.forwardRef(
  (
    props: Omit<DrawerListPortalProps, 'innerRef'>,
    ref: React.ForwardedRef<HTMLSpanElement>
  ) => {
    return <DrawerListPortal innerRef={ref} {...props} />
  }
)
