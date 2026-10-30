/**
 * SidebarMenu Provider
 *
 */

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router'
import useMediaQuery from '@dnb/eufemia/src/shared/useMediaQuery'
import { useIsomorphicLayoutEffect } from '@dnb/eufemia/src/shared/helpers/useIsomorphicLayoutEffect'

export const SidebarMenuContext = createContext({
  // just to have some default values (to avoid destructuring error later)
  toggleMenu: null,
  openMenu: null,
  closeMenu: null,
  isOpen: null,
  isClosing: null,
})

type Props = {
  children: ReactNode
}

export function SidebarMenuProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const location = useLocation()
  const [menuLocation, setMenuLocation] = useState(location)
  // Match the Portal's allAbove(medium) CSS, including its range offset.
  const isWide = useMediaQuery({ query: '(min-width: 60.00625em)' })
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>(null)
  const lastScrollPositionRef = useRef<number>(0)
  const isOpenRef = useRef(false)

  const clearTimers = useCallback(() => {
    clearTimeout(timeoutRef.current)
    clearTimeout(scrollTimeoutRef.current)
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  const toggleMenu = useCallback(() => {
    clearTimers()

    // scroll to top on opening the menu, and back again
    if (!isOpenRef.current && typeof window !== 'undefined') {
      try {
        lastScrollPositionRef.current = window.scrollY
      } catch (e) {
        console.error('Could not get scrollY', e)
      }
    }

    timeoutRef.current = setTimeout(
      () => {
        const nextIsOpen = !isOpenRef.current

        isOpenRef.current = nextIsOpen
        setIsOpen(nextIsOpen)
        setIsClosing(false)

        if (!nextIsOpen) {
          scrollTimeoutRef.current = setTimeout(() => {
            try {
              if (typeof window !== 'undefined') {
                const top = lastScrollPositionRef.current
                window.scrollTo({
                  top,
                  behavior: 'smooth',
                })
              }
            } catch (e) {
              console.error('Could not run scrollTo', e)
            }
          }, 100) // after animation is done
        }
      },
      isOpenRef.current ? 260 : 10
    )

    if (isOpenRef.current) {
      setIsClosing(true)
    }
  }, [clearTimers])

  const openMenu = useCallback(() => {
    clearTimers()
    isOpenRef.current = true
    setIsOpen(true)
    setIsClosing(false)
  }, [clearTimers])

  const closeMenu = useCallback(() => {
    clearTimers()
    isOpenRef.current = false
    setIsOpen(false)
    setIsClosing(false)
  }, [clearTimers])

  useIsomorphicLayoutEffect(() => {
    closeMenu()
    setMenuLocation(location)
  }, [location, closeMenu])

  useIsomorphicLayoutEffect(() => {
    if (isWide) {
      closeMenu()
      const frame = requestAnimationFrame(() => {
        const focusedElement = document.activeElement
        if (
          focusedElement instanceof HTMLElement &&
          focusedElement.closest('#portal-sidebar-menu')
        ) {
          focusedElement.scrollIntoView({ block: 'nearest' })
        }
      })
      return () => cancelAnimationFrame(frame)
    }
  }, [isWide, closeMenu])

  // Route focus effects must see visible content on the first new-route render.
  const isCurrentMenuLocation = menuLocation === location
  const contextIsOpen = isCurrentMenuLocation && isOpen
  const contextIsClosing = isCurrentMenuLocation && isClosing
  const contextValue = useMemo(
    () => ({
      toggleMenu,
      openMenu,
      closeMenu,
      isOpen: contextIsOpen,
      isClosing: contextIsClosing,
    }),
    [toggleMenu, openMenu, closeMenu, contextIsOpen, contextIsClosing]
  )

  return (
    <SidebarMenuContext value={contextValue}>
      {children}
    </SidebarMenuContext>
  )
}
