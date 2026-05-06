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

  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const lastScrollPositionRef = useRef<number>(0)
  const isOpenRef = useRef(false)

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const toggleMenu = useCallback(() => {
    clearTimeout(timeoutRef.current)

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

        setTimeout(() => {
          try {
            if (!nextIsOpen && typeof window !== 'undefined') {
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
      },
      isOpenRef.current ? 260 : 10
    )

    if (isOpenRef.current) {
      setIsClosing(true)
    }
  }, [])

  const openMenu = useCallback(() => {
    isOpenRef.current = true
    setIsOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    isOpenRef.current = false
    setIsOpen(false)
  }, [])

  const contextValue = useMemo(
    () => ({
      toggleMenu,
      openMenu,
      closeMenu,
      isOpen,
      isClosing,
    }),
    [toggleMenu, openMenu, closeMenu, isOpen, isClosing]
  )

  return (
    <SidebarMenuContext value={contextValue}>
      {children}
    </SidebarMenuContext>
  )
}
