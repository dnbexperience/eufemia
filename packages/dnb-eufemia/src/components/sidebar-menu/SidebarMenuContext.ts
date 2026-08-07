import { createContext, useContext } from 'react'

export type SidebarMenuContextValue = {
  level: number
  openItems: string[]
  openItemsControlled: boolean
  toggleItem: (id: string, open: boolean) => void
  selectedItem?: string
  selectItem: (id: string) => void
}

export const SidebarMenuContext = createContext<SidebarMenuContextValue>({
  level: 0,
  openItems: [],
  openItemsControlled: false,
  toggleItem: () => undefined,
  selectItem: () => undefined,
})

export function useSidebarMenuContext() {
  return useContext(SidebarMenuContext)
}
