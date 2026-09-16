import { createContext, useContext } from 'react'

export type SidebarMenuContextValue = {
  indent: number
  openItems: string[]
  openItemsControlled: boolean
  toggleItem: (id: string, open: boolean) => void
  selectedItem?: string
  selectedItemAncestorIds: string[]
  selectItem: (id: string) => void
  openOnFind: boolean
  animate: boolean
}

export const SidebarMenuContext = createContext<SidebarMenuContextValue>({
  indent: 0,
  openItems: [],
  openItemsControlled: false,
  toggleItem: () => undefined,
  selectedItemAncestorIds: [],
  selectItem: () => undefined,
  openOnFind: true,
  animate: true,
})

export function useSidebarMenuContext() {
  return useContext(SidebarMenuContext)
}
