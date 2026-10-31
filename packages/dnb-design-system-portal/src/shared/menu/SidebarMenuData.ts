import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'
import type { SidebarMenuItemData } from '@dnb/eufemia/src/extensions/sidebar-menu'
import { Link as PortalLink } from '../tags/Anchor'
import graphics from './SidebarGraphics'

export type NavItem = {
  id: string
  isActive?: boolean
  icon?: string
  menuTitle?: string
  hideInMenu?: boolean
  order?: number
  path: string
  status?: string
  theme?: ThemeNames[]
  title: string
  subheadings?: NavItem[]
  isMenuGroup?: boolean
  isMenuLink?: boolean
  disabled?: boolean
}

export type PortalSidebarMenuItemData = SidebarMenuItemData & {
  themes?: ThemeNames[]
  items?: PortalSidebarMenuItemData[]
}

export const themeTitles: Partial<Record<ThemeNames, string>> = {
  ui: 'DNB',
  sbanken: 'Sbanken',
  eiendom: 'Eiendom',
  carnegie: 'DNB Carnegie',
}

const statusTitles = {
  todo: 'To do',
  new: 'New',
  beta: 'Beta',
  wip: 'WIP',
  cs: 'Coming soon',
  dep: 'Deprecated',
  imp: 'Needs improvement',
}

export function toSidebarMenuData(
  items: NavItem[],
  closeMenu: () => void,
  level = 0
): PortalSidebarMenuItemData[] {
  return items
    .filter(({ hideInMenu }) => !hideInMenu)
    .map((item) => {
      const icon = item.icon && graphics[item.icon]
      const nestedItems = item.subheadings?.some(
        ({ hideInMenu }) => !hideInMenu
      )
        ? toSidebarMenuData(item.subheadings, closeMenu, level + 1)
        : undefined
      const isGroup = Boolean(
        item.isMenuGroup ?? (nestedItems && level > 1)
      )
      const hasPage = !item.isMenuGroup && item.isMenuLink !== false

      return {
        id: item.id || item.path,
        className: item.isActive
          ? 'portal-sidebar-menu__item--active'
          : undefined,
        text: (item.menuTitle || item.title).replace(/^[A-Z][a-z]*\./, ''),
        to: hasPage ? item.path : undefined,
        element: hasPage
          ? (PortalLink as SidebarMenuItemData['element'])
          : undefined,
        icon: icon || undefined,
        disabled: item.disabled,
        badge: statusTitles[item.status],
        badgeProps: item.status
          ? {
              status:
                item.status === 'todo'
                  ? ('warning' as const)
                  : ('neutral' as const),
              subtle: true,
            }
          : undefined,
        themes: item.theme,
        items: nestedItems,
        type: isGroup ? 'group' : undefined,
        collapsible: nestedItems && !isGroup ? true : undefined,
        onClick: closeMenu,
      }
    })
}

export function findActiveSidebarItemId(items: NavItem[]) {
  for (const item of items) {
    if (item.isActive) {
      return item.id || item.path
    }

    const nestedId = item.subheadings
      ? findActiveSidebarItemId(item.subheadings)
      : undefined
    if (nestedId) {
      return nestedId
    }
  }

  return undefined
}
