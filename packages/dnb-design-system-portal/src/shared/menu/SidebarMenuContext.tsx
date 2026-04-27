/**
 * SidebarMenu Provider
 *
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'

export const SidebarMenuContext = React.createContext({
  // just to have some default values (to avoid destructuring error later)
  toggleMenu: null,
  openMenu: null,
  closeMenu: null,
  isOpen: null,
  isClosing: null,
})

type Props = {
  children: React.ReactNode
}

export function SidebarMenuProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const lastScrollPositionRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const toggleMenu = useCallback(() => {
    clearTimeout(timeoutRef.current)

    setIsOpen((prevIsOpen) => {
      // scroll to top on opening the menu, and back again
      if (!prevIsOpen && typeof window !== 'undefined') {
        try {
          lastScrollPositionRef.current = window.pageYOffset
        } catch (e) {
          console.error('Could not get scrollY', e)
        }
      }

      timeoutRef.current = setTimeout(
        () => {
          const nextIsOpen = !prevIsOpen

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
        prevIsOpen ? 260 : 10
      )

      if (prevIsOpen) {
        setIsClosing(true)
      }

      return prevIsOpen
    })
  }, [])

  const openMenu = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <SidebarMenuContext
      value={{
        toggleMenu,
        openMenu,
        closeMenu,
        isOpen,
        isClosing,
      }}
    >
      {children}
    </SidebarMenuContext>
  )
}
