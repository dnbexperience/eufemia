import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'
import type { SidebarMenuItemData } from '@dnb/eufemia/src/components/sidebar-menu'
import { Link as PortalLink } from '../tags/Anchor'
import graphics from './SidebarGraphics'

export type NavItemTabs = {
  title: string
  key: string
}

export type NavItem = {
  id: string
  parentId?: string
  isActive?: boolean
  isInsideActivePath?: boolean
  isInsideActiveCategory?: boolean
  icon?: string
  level?: number
  menuTitle?: string
  hideInMenu?: boolean
  order?: number
  _order?: string
  path: string
  status?: string
  theme?: ThemeNames[]
  title: string
  showTabs?: boolean
  tabs?: NavItemTabs[]
  subheadings?: NavItem[]
  currentPathName?: string
  accordion?: boolean
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
  new: 'New',
  beta: 'Beta',
  wip: 'WIP',
  cs: 'Coming soon',
  dep: 'Deprecated',
  imp: 'Needs improvement',
}

const collapsedFormsLandingPages = new Set([
  '/uilib/extensions/forms/Form',
  '/uilib/extensions/forms/Wizard',
  '/uilib/extensions/forms/Iterate',
  '/uilib/extensions/forms/Value',
])

export function toSidebarMenuData(
  items: NavItem[],
  closeMenu: () => void
): PortalSidebarMenuItemData[] {
  return items
    .filter(({ hideInMenu }) => !hideInMenu)
    .map((item) => {
      const icon = item.icon && graphics[item.icon]
      const nestedItems = item.subheadings?.some(
        ({ hideInMenu }) => !hideInMenu
      )
        ? toSidebarMenuData(item.subheadings, closeMenu)
        : undefined

      return {
        id: item.id || item.path,
        className: item.isActive
          ? 'portal-sidebar-menu__item--active'
          : undefined,
        text: (item.menuTitle || item.title).replace(/^[A-Z][a-z]*\./, ''),
        to: item.path,
        element: PortalLink as SidebarMenuItemData['element'],
        icon: icon || undefined,
        badge: statusTitles[item.status],
        badgeProps: item.status
          ? { status: 'neutral' as const, subtle: true }
          : undefined,
        themes: item.theme,
        items: nestedItems,
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

export function getDefaultOpenSidebarItems(
  selectedItem: string | undefined,
  items: NavItem[]
) {
  const selected = findSidebarItem(selectedItem, items)

  if (!selected?.subheadings?.length) {
    return []
  }

  if (collapsedFormsLandingPages.has(selected.path.replace(/\/$/, ''))) {
    return []
  }

  if (selectedItem === 'uilib') {
    return [
      'uilib',
      'uilib-components',
      'uilib-extensions',
      'uilib-extensions-forms',
    ]
  }

  return collectAccordionIds(selected)
}

function findSidebarItem(
  selectedItem: string | undefined,
  items: NavItem[]
): NavItem | undefined {
  for (const item of items) {
    if ((item.id || item.path) === selectedItem) {
      return item
    }

    const selected = item.subheadings
      ? findSidebarItem(selectedItem, item.subheadings)
      : undefined
    if (selected) {
      return selected
    }
  }

  return undefined
}

export function getSidebarMenuStorageKey(items: NavItem[]) {
  const id = items[0]?.id || items[0]?.path || 'default'
  return `portal-sidebar-menu-open-items-${id}`
}

function collectAccordionIds(item: NavItem): string[] {
  return [
    item.id || item.path,
    ...(item.subheadings?.flatMap(collectAccordionIds) ?? []),
  ]
}
