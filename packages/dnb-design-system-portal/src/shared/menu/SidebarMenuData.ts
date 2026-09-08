import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'
import type { SidebarMenuItemData } from '@dnb/eufemia/src/extensions/sidebar-menu'
import { Link as PortalLink } from '../tags/Anchor'
import {
  categoryOrder,
  getCategoryId,
  type CategoryValue,
} from '../parts/componentCategories'
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
  sidebarMenuPlacement?: string
  sidebarMenuDividerBefore?: boolean
  platform?: string
  sidebarMenu?: SidebarMenuConfig
  category?: CategoryValue
  isMenuGroup?: boolean
  isMenuLink?: boolean
  _sidebarMenuOrder?: number
}

export type SidebarMenuConfig = {
  id?: string
  path?: string
  parent?: string
  title?: string
  icon?: string
  order?: number
  root?: boolean
  includePageAs?: string
  pageParent?: string
  pageIcon?: string
  pageOrder?: number
  static?: boolean
  hideStatus?: boolean
  groups?: SidebarMenuGroupConfig[]
  platform?: string
}

export type SidebarMenuGroupConfig = {
  id: string
  path: string
  title: string
  icon?: string
  order?: number
  static?: boolean
  includePageAs?: string
  pageOrder?: number
}

export type PortalSidebarMenuItemData = SidebarMenuItemData & {
  themes?: ThemeNames[]
  platform?: string
  items?: PortalSidebarMenuItemData[]
}

const unifiedSidebarPrefixes = new Set([
  'uilib',
  'icons',
  'quickguide-designer',
  'contribute',
])

export function shouldIncludeSidebarPrefix(
  activePrefix: string,
  candidatePrefix: string
) {
  return (
    activePrefix === candidatePrefix ||
    (unifiedSidebarPrefixes.has(activePrefix) &&
      unifiedSidebarPrefixes.has(candidatePrefix))
  )
}

export function applySidebarMenuPlacement(items: NavItem[]): NavItem[] {
  const paths = new Set<string>()
  const placements = new Map<string, NavItem[]>()

  visitSidebarItems(items, (item) => paths.add(normalizePath(item.path)))

  const withoutPlacedItems = removePlacedItems(items, paths, placements)

  return insertPlacedItems(withoutPlacedItems, placements)
}

function removePlacedItems(
  items: NavItem[],
  paths: Set<string>,
  placements: Map<string, NavItem[]>
): NavItem[] {
  return items.flatMap((item) => {
    const subheadings = item.subheadings
      ? removePlacedItems(item.subheadings, paths, placements)
      : undefined
    const placement = item.sidebarMenuPlacement
    const target = placement?.startsWith('/')
      ? normalizePath(placement)
      : undefined
    const prepared = { ...item, subheadings }

    if (
      !target ||
      !paths.has(target) ||
      target === normalizePath(item.path)
    ) {
      return [prepared]
    }

    const placedItems = placements.get(target) ?? []
    placements.set(target, [
      ...placedItems,
      { ...prepared, sidebarMenuPlacement: undefined },
    ])

    return []
  })
}

function insertPlacedItems(
  items: NavItem[],
  placements: Map<string, NavItem[]>
): NavItem[] {
  return items.flatMap((item) => {
    const subheadings = item.subheadings
      ? insertPlacedItems(item.subheadings, placements)
      : undefined
    const targetItems = placements.get(normalizePath(item.path)) ?? []

    return [...targetItems, { ...item, subheadings }]
  })
}

function visitSidebarItems(
  items: NavItem[],
  callback: (item: NavItem) => void
) {
  items.forEach((item) => {
    callback(item)
    if (item.subheadings) {
      visitSidebarItems(item.subheadings, callback)
    }
  })
}

function normalizePath(path: string) {
  return `/${path.replace(/^\/+|\/+$/g, '')}`
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
        dividerBefore: item.sidebarMenuDividerBefore,
        text: (item.menuTitle || item.title).replace(/^[A-Z][a-z]*\./, ''),
        to: hasPage ? item.path : undefined,
        element: hasPage
          ? (PortalLink as SidebarMenuItemData['element'])
          : undefined,
        icon: icon || undefined,
        badge: statusTitles[item.status],
        badgeProps: item.status
          ? { status: 'neutral' as const, subtle: true }
          : undefined,
        themes: item.theme,
        platform: item.platform ?? item.sidebarMenu?.platform,
        items: nestedItems,
        type: isGroup ? 'group' : undefined,
        collapsible: nestedItems && !isGroup ? true : undefined,
        onClick: closeMenu,
      }
    })
}

export function createUilibSidebarStructure(
  items: NavItem[],
  includeHome = false
): NavItem[] {
  const sourceItems: NavItem[] = []
  visitSidebarItems(items, (item) => sourceItems.push(item))

  const configuredSources = sourceItems.filter(
    ({ sidebarMenu }) => sidebarMenu?.root || sidebarMenu?.parent
  )
  if (!configuredSources.length) {
    return items
  }

  const excludedPaths = new Set(
    configuredSources.map(({ path }) => normalizePath(path))
  )
  const roots = new Map<string, NavItem>()
  const targets = new Map<string, NavItem>()

  configuredSources
    .filter(({ sidebarMenu }) => sidebarMenu.root)
    .sort(compareSidebarMenuOrder)
    .forEach((source) => {
      const root = createConfiguredRoot(source, excludedPaths)
      roots.set(normalizePath(source.path), root)
      targets.set(normalizePath(root.path), root)
      addConfiguredGroups(root, source.sidebarMenu.groups, targets, source)
    })

  configuredSources
    .filter(
      ({ sidebarMenu }) => sidebarMenu.root && sidebarMenu.pageParent
    )
    .sort(compareSidebarMenuOrder)
    .forEach((source) => {
      const config = source.sidebarMenu
      const target = targets.get(normalizePath(config.pageParent))
      if (!target) {
        throw new Error(
          'Sidebar menu page parent not found: ' + config.pageParent
        )
      }

      target.subheadings.push({
        ...source,
        title: config.includePageAs || source.title,
        menuTitle: config.includePageAs || source.menuTitle,
        icon: config.pageIcon,
        isMenuLink: true,
        sidebarMenuDividerBefore: undefined,
        sidebarMenu: undefined,
        subheadings: undefined,
        _sidebarMenuOrder: config.pageOrder ?? config.order,
      })
    })

  configuredSources
    .filter(({ sidebarMenu }) => sidebarMenu.parent)
    .sort(compareSidebarMenuOrder)
    .forEach((source) => {
      const target = targets.get(normalizePath(source.sidebarMenu.parent))
      if (!target) {
        throw new Error(
          `Sidebar menu parent not found: ${source.sidebarMenu.parent}`
        )
      }
      target.subheadings.push(createConfiguredChild(source, excludedPaths))
    })

  const result = Array.from(roots.values())
  result.forEach(sortConfiguredSidebarItems)

  return includeHome
    ? [
        {
          id: 'portal-home',
          path: '/',
          title: 'Home',
          icon: 'home',
          platform: 'web',
          isActive: sourceItems.some(
            ({ currentPathName }) => currentPathName === ''
          ),
        },
        ...result,
      ]
    : result
}

function createConfiguredRoot(
  item: NavItem,
  excludedPaths: Set<string>
): NavItem {
  const config = item.sidebarMenu
  const rootPath = config.path || item.path
  const isSyntheticRoot =
    normalizePath(rootPath) !== normalizePath(item.path)
  const children =
    isSyntheticRoot && !config.includePageAs
      ? []
      : cloneUnconfiguredChildren(item, excludedPaths)
  const orderedChildren = sortConfiguredSidebarItems(children)
  const pageOwnsChildren =
    Boolean(config.includePageAs) &&
    normalizePath(rootPath) !== normalizePath(item.path)

  return {
    ...item,
    id: config.id || item.id,
    path: rootPath,
    title: config.title || item.title,
    menuTitle:
      config.title && config.title !== item.title
        ? config.title
        : item.menuTitle,
    icon: config.icon || item.icon,
    isActive:
      config.includePageAs ||
      config.groups?.some(({ includePageAs }) => includePageAs)
        ? false
        : item.isActive,
    isMenuLink:
      isSyntheticRoot || config.includePageAs || config.groups?.length
        ? false
        : item.isMenuLink,
    sidebarMenu: undefined,
    platform: config.platform ?? item.platform,
    subheadings: [
      ...(config.includePageAs && !config.pageParent
        ? [
            {
              ...item,
              id: pageOwnsChildren
                ? item.id || item.path
                : `${item.id || item.path}-page`,
              title: config.includePageAs,
              menuTitle: config.includePageAs,
              icon: config.pageIcon,
              isMenuLink: true,
              sidebarMenu: undefined,
              subheadings: pageOwnsChildren ? orderedChildren : undefined,
              _sidebarMenuOrder: config.pageOrder ?? 0,
            },
          ]
        : []),
      ...(pageOwnsChildren ? [] : orderedChildren),
    ],
    _sidebarMenuOrder: config.order,
  }
}

function createConfiguredChild(
  item: NavItem,
  excludedPaths: Set<string>
): NavItem {
  const config = item.sidebarMenu
  return {
    ...item,
    title: config.title || item.title,
    menuTitle:
      config.title && config.title !== item.title
        ? config.title
        : item.menuTitle,
    icon: config.icon || item.icon,
    status: config.hideStatus ? undefined : item.status,
    isMenuGroup: config.static ?? item.isMenuGroup,
    sidebarMenu: undefined,
    platform: config.platform ?? item.platform,
    subheadings: sortConfiguredSidebarItems(
      cloneUnconfiguredChildren(item, excludedPaths)
    ),
    _sidebarMenuOrder: config.order,
  }
}

function cloneUnconfiguredChildren(
  item: NavItem,
  excludedPaths: Set<string>
): NavItem[] {
  return (
    (item.subheadings
      ?.map((child) => cloneUnconfiguredItem(child, excludedPaths))
      .filter(Boolean) as NavItem[] | undefined) ?? []
  )
}

function cloneUnconfiguredItem(
  item: NavItem,
  excludedPaths: Set<string>
): NavItem | undefined {
  if (excludedPaths.has(normalizePath(item.path))) {
    return undefined
  }

  const config = item.sidebarMenu ?? {}
  return {
    ...item,
    title: config.title || item.title,
    menuTitle:
      config.title && config.title !== item.title
        ? config.title
        : item.menuTitle,
    icon: config.icon || item.icon,
    status: config.hideStatus ? undefined : item.status,
    isMenuGroup: config.static ?? item.isMenuGroup,
    sidebarMenu: undefined,
    subheadings: cloneUnconfiguredChildren(item, excludedPaths),
    _sidebarMenuOrder: item.sidebarMenu?.order,
  }
}

function addConfiguredGroups(
  parent: NavItem,
  groups: SidebarMenuGroupConfig[] = [],
  targets: Map<string, NavItem>,
  source: NavItem
) {
  groups.forEach((config) => {
    const group: NavItem = {
      id: config.id,
      path: config.path,
      title: config.title,
      icon: config.icon,
      isMenuGroup: config.static ?? true,
      isMenuLink: false,
      subheadings: config.includePageAs
        ? [
            {
              ...source,
              id: `${source.id || source.path}-page`,
              title: config.includePageAs,
              menuTitle: config.includePageAs,
              icon: undefined,
              isMenuLink: true,
              isActive: source.isActive,
              sidebarMenu: undefined,
              subheadings: undefined,
              _sidebarMenuOrder: config.pageOrder ?? 0,
            },
          ]
        : [],
      _sidebarMenuOrder: config.order,
    }
    parent.subheadings.push(group)
    targets.set(normalizePath(config.path), group)
  })
}

function sortConfiguredSidebarItems(items: NavItem[]): NavItem[]
function sortConfiguredSidebarItems(item: NavItem): NavItem
function sortConfiguredSidebarItems(itemOrItems: NavItem | NavItem[]) {
  const items = Array.isArray(itemOrItems)
    ? itemOrItems
    : itemOrItems.subheadings

  items?.sort(
    (a, b) =>
      (a._sidebarMenuOrder ?? Number.MAX_SAFE_INTEGER) -
      (b._sidebarMenuOrder ?? Number.MAX_SAFE_INTEGER)
  )
  items?.forEach(sortConfiguredSidebarItems)

  return itemOrItems
}

function compareSidebarMenuOrder(a: NavItem, b: NavItem) {
  return (a.sidebarMenu?.order ?? 0) - (b.sidebarMenu?.order ?? 0)
}

export function groupComponentsByCategory(items: NavItem[]): NavItem[] {
  return items.map((item) => {
    if (item.path === 'uilib/components') {
      return {
        ...item,
        subheadings: groupComponentItems(item),
      }
    }

    return item.subheadings
      ? {
          ...item,
          subheadings: groupComponentsByCategory(item.subheadings),
        }
      : item
  })
}

function groupComponentItems(components: NavItem): NavItem[] {
  const categorized = new Map<string, NavItem[]>()
  const ungrouped: NavItem[] = []

  components.subheadings?.forEach((item) => {
    if (
      item.path === 'uilib/components/overview' ||
      (item.path === 'uilib/components' &&
        item.title === 'Alphabetically') ||
      item.path === 'uilib/components/fragments' ||
      item.category === false
    ) {
      ungrouped.push(item)
      return
    }

    const category = getCategoryId(item.category)

    if (!category) {
      ungrouped.push(item)
      return
    }

    const categoryItems = categorized.get(category) || []
    categoryItems.push(item)
    categorized.set(category, categoryItems)
  })

  const overview = ungrouped.filter(
    ({ path }) => path === 'uilib/components/overview'
  )
  const alphabetically = ungrouped.filter(
    ({ path, title }) =>
      path === 'uilib/components' && title === 'Alphabetically'
  )
  const remaining = ungrouped.filter(
    ({ path, title }) =>
      path !== 'uilib/components/overview' &&
      !(path === 'uilib/components' && title === 'Alphabetically')
  )
  const groups = categoryOrder.flatMap(({ id, title }) => {
    const subheadings = categorized.get(id)
    if (!subheadings?.length) {
      return []
    }

    return [
      {
        id: `uilib-components-category-${id}`,
        path: `uilib/components/category/${id}`,
        title,
        isMenuGroup: true,
        subheadings,
      },
    ]
  })

  return [...overview, ...alphabetically, ...groups, ...remaining]
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

export function getSidebarMenuStorageKey(items: NavItem[]) {
  const id = items[0]?.id || items[0]?.path || 'default'
  return `portal-sidebar-menu-open-items-${id}`
}
