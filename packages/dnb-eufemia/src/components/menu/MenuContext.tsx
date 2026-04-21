import { createContext, useContext } from 'react'
import type { MenuContextValue } from './types'

export const MenuContext = createContext<MenuContextValue | undefined>(
  undefined,
)

export function useMenuContext() {
  return useContext(MenuContext)
}

export type MenuTriggerContextValue = {
  active: boolean
  triggerProps: Record<string, unknown>
  open: () => void
  close: () => void
  toggle: () => void
}

export const MenuTriggerContext = createContext<
  MenuTriggerContextValue | undefined
>(undefined)

export function useMenuTriggerContext() {
  return useContext(MenuTriggerContext)
}
