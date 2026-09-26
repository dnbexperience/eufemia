import { createContext, useContext } from 'react'
import type { RefObject } from 'react'

export type SidebarMenuResponsiveContextValue = {
  close: () => void
  drawerScrollElement: HTMLElement | null
  drawerOpeningRef: RefObject<boolean>
  setDrawerScrollElement: (element: HTMLElement | null) => void
  isHydrated: boolean
  isCompact: boolean
  hasCompact: boolean
  inlineCollapsed: boolean
  isSmallScreen: boolean
  open: boolean
  openRef: RefObject<boolean>
  setOpen: (open: boolean) => void
  toggle: () => void
  collapseInline: () => void
  restoreInline: () => void
  triggerRef: RefObject<HTMLElement | null>
  isSmallScreenRef: RefObject<boolean>
  registerInlineReset: (reset: () => void) => () => void
  scopeId: string
}

export const SidebarMenuResponsiveContext = createContext<
  SidebarMenuResponsiveContextValue | undefined
>(undefined)

export const SidebarMenuResponsiveInlineCompactContext =
  createContext(false)

export function useSidebarMenuResponsiveContext() {
  const context = useContext(SidebarMenuResponsiveContext)
  if (!context) {
    throw new Error(
      'SidebarMenu responsive parts must be inside SidebarMenu.ResponsiveProvider'
    )
  }
  return context
}

export function useOptionalSidebarMenuResponsive() {
  return useContext(SidebarMenuResponsiveContext)
}

export function useSidebarMenuResponsiveInlineCompact() {
  return useContext(SidebarMenuResponsiveInlineCompactContext)
}
