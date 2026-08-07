/**
 * SidebarMenu Provider
 *
 */

import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export const SidebarMenuContext = createContext({
  // just to have some default values (to avoid destructuring error later)
  toggleMenu: null,
  closeMenu: null,
  isOpen: null,
})

type Props = {
  children: ReactNode
}

export function SidebarMenuProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsOpen((isOpen) => !isOpen)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const contextValue = useMemo(
    () => ({
      toggleMenu,
      closeMenu,
      isOpen,
    }),
    [toggleMenu, closeMenu, isOpen]
  )

  return (
    <SidebarMenuContext value={contextValue}>
      {children}
    </SidebarMenuContext>
  )
}
