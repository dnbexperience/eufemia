import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'
import type { SidebarMenuItemData } from '@dnb/eufemia/src/extensions/sidebar-menu'
import { ToggleButton } from '@dnb/eufemia/src/components'
import { createElement } from 'react'
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
  sidebarMenuOpen?: boolean
  sidebarMenuPlacement?: string
  sidebarMenuDividerBefore?: boolean
  category?: CategoryValue
  isMenuGroup?: boolean
  isMenuLink?: boolean
}

export type PortalSidebarMenuItemData = SidebarMenuItemData & {
  themes?: ThemeNames[]
  items?: PortalSidebarMenuItemData[]
}

const unifiedSidebarPrefixes = new Set([
  'uilib',
  'icons',
  'quickguide-designer',
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
        item.isMenuGroup || (nestedItems && level > 1)
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
        items: nestedItems,
        type: isGroup ? 'group' : undefined,
        collapsible: nestedItems && !isGroup ? true : undefined,
        onClick: closeMenu,
      }
    })
}

export function insertWebPlatformToggle(
  items: PortalSidebarMenuItemData[]
): PortalSidebarMenuItemData[] {
  return items.flatMap((item) => {
    if (item.id !== 'uilib-components-overview') {
      return [item]
    }

    return [
      {
        id: 'portal-web-platform',
        type: 'custom',
        dividerBefore: item.dividerBefore,
        content: createElement(ToggleButton, {
          text: 'Web',
          checked: true,
          readOnly: true,
          'aria-label': 'Web platform',
        }),
      },
      { ...item, dividerBefore: false },
    ]
  })
}

export function createUilibSidebarStructure(items: NavItem[]): NavItem[] {
  const root = items.find(({ path }) => normalizePath(path) === '/uilib')
  if (!root) {
    return items
  }

  const find = (path: string) => findSidebarItem(root, path)
  const icons = items.find(({ path }) => normalizePath(path) === '/icons')
  const designerGuide = items.find(
    ({ path }) => normalizePath(path) === '/quickguide-designer'
  )
  const overview = find('/uilib/components/overview')
  const components = find('/uilib/components')
  const forms = find('/uilib/extensions/forms')
  const extensions = find('/uilib/extensions')
  const mediaQuery = find('/uilib/shared/media-query/properties')
  const designTokens = find(
    '/uilib/usage/customisation/theming/design-tokens'
  )
  const ai = find('/uilib/usage/first-steps/tools')
  const separatelyExposedPaths = new Set(
    [designTokens, forms, overview, ai]
      .filter(Boolean)
      .map(({ path }) => normalizePath(path))
  )
  const gettingStarted = find('/uilib/getting-started')
  const usage = find('/uilib/usage')
  const about = find('/uilib/about-the-lib')
  const designLanguageItems = [
    icons,
    find('/uilib/typography'),
    find('/uilib/helpers'),
    find('/uilib/elements'),
    find('/uilib/layout'),
    mediaQuery,
    designTokens,
  ]
    .filter(Boolean)
    .map((item) =>
      item === icons
        ? { ...cloneSidebarItem(item), icon: 'layout_grid' }
        : item === designTokens
          ? {
              ...cloneSidebarItem(item),
              title: 'Design Tokens',
              menuTitle: 'Design Tokens',
            }
          : cloneSidebarItem(item, separatelyExposedPaths)
    )
    .filter(Boolean) as NavItem[]
  const usageItems = [
    ['/uilib/usage/first-steps', 'First steps'],
    ['/uilib/usage/customisation', 'Customization'],
    ['/uilib/usage/accessibility', 'Accessibility'],
    ['/uilib/usage/best-practices', 'Best practices'],
  ].flatMap(([path, title]) => {
    const item = find(path)
    return item
      ? [
          {
            ...cloneSidebarItem(item, separatelyExposedPaths),
            title,
            menuTitle: title,
          },
        ]
      : []
  })
  const aboutItems = [
    find('/uilib/about-the-lib/living-system'),
    find('/uilib/about-the-lib/maintainability'),
  ]
    .filter(Boolean)
    .map((item) => cloneSidebarItem(item, separatelyExposedPaths))
    .filter(Boolean) as NavItem[]
  const releases = find('/uilib/about-the-lib/releases')
  const remainingExtensions = extensions
    ? cloneSidebarItem(extensions, separatelyExposedPaths)
    : undefined
  const createMovedPage = (
    item: NavItem,
    title: string,
    id = `${item.id || item.path}-page`
  ): NavItem => ({
    ...item,
    id,
    title,
    menuTitle: title,
    isMenuLink: true,
    subheadings: undefined,
  })

  return [
    gettingStarted && {
      id: 'uilib-getting-started-menu',
      path: 'uilib/getting-started-menu',
      title: 'Getting Started',
      icon: 'play',
      isMenuLink: false,
      sidebarMenuOpen: true,
      subheadings: [
        ...(designerGuide
          ? [
              {
                ...cloneSidebarItem(designerGuide),
                title: 'Designer Guide',
                menuTitle: 'Designer Guide',
                icon: 'brush',
              },
            ]
          : []),
        {
          ...cloneSidebarItem(gettingStarted, separatelyExposedPaths),
          title: 'Developer Guide',
          menuTitle: 'Developer Guide',
        },
      ],
    },
    designLanguageItems.length && {
      id: 'uilib-design-language-menu',
      path: 'uilib/design-language-menu',
      title: 'Design Language',
      icon: 'lightbulb',
      isMenuLink: false,
      sidebarMenuOpen: true,
      subheadings: designLanguageItems,
    },
    usage && {
      ...cloneSidebarItem(usage, separatelyExposedPaths),
      isActive: false,
      isMenuLink: false,
      sidebarMenuOpen: true,
      subheadings: [
        createMovedPage(usage, 'Overview'),
        ...(ai
          ? [
              {
                ...cloneSidebarItem(ai),
                title: 'AI and Tools',
                menuTitle: 'AI and Tools',
                status: undefined,
              },
            ]
          : []),
        ...usageItems,
      ],
    },
    about && {
      ...cloneSidebarItem(about, separatelyExposedPaths),
      isActive: false,
      isMenuLink: false,
      sidebarMenuOpen: true,
      subheadings: [
        {
          ...createMovedPage(about, 'About Eufemia'),
          icon: undefined,
        },
        ...aboutItems,
        ...(releases
          ? [
              {
                ...cloneSidebarItem(releases, separatelyExposedPaths),
                title: 'Releases and Versions',
                menuTitle: 'Releases and Versions',
              },
            ]
          : []),
        {
          id: 'contribute',
          path: '/contribute',
          title: 'Contribute',
        },
      ],
    },
    overview && cloneSidebarItem(overview),
    components && {
      ...cloneSidebarItem(components, separatelyExposedPaths),
      isActive: false,
      isMenuLink: false,
      sidebarMenuOpen: true,
      subheadings: [
        {
          ...createMovedPage(components, 'Alphabetically'),
          icon: undefined,
        },
        ...(cloneSidebarItem(components, separatelyExposedPaths)
          ?.subheadings ?? []),
      ],
    },
    forms && {
      ...forms,
      title: 'Forms',
      menuTitle: 'Forms',
      icon: 'edit',
      isActive: false,
      isMenuLink: false,
      sidebarMenuOpen: false,
      subheadings: [
        {
          ...createMovedPage(forms, 'Overview'),
          icon: undefined,
        },
        ...(forms.subheadings ?? []),
      ],
    },
    remainingExtensions?.subheadings?.length && {
      ...remainingExtensions,
      title: 'Extensions',
      menuTitle: 'Extensions',
      isActive: false,
      isMenuLink: false,
      sidebarMenuOpen: false,
      subheadings: [
        {
          ...createMovedPage(remainingExtensions, 'Overview'),
          icon: undefined,
        },
        ...remainingExtensions.subheadings,
      ],
    },
  ].filter(Boolean) as NavItem[]
}

function findSidebarItem(
  item: NavItem,
  path: string
): NavItem | undefined {
  if (normalizePath(item.path) === normalizePath(path)) {
    return item
  }

  for (const child of item.subheadings ?? []) {
    const match = findSidebarItem(child, path)
    if (match) {
      return match
    }
  }

  return undefined
}

function cloneSidebarItem(
  item: NavItem,
  excludedPaths = new Set<string>()
): NavItem | undefined {
  if (excludedPaths.has(normalizePath(item.path))) {
    return undefined
  }

  return {
    ...item,
    subheadings: item.subheadings
      ?.map((item) => cloneSidebarItem(item, excludedPaths))
      .filter(Boolean) as NavItem[] | undefined,
  }
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

export function getDefaultOpenSidebarItems(
  selectedItem: string | undefined,
  items: NavItem[]
) {
  const selectedTree = items.find((item) =>
    containsSidebarItem(selectedItem, item)
  )

  if (!selectedTree) {
    return []
  }

  return items.flatMap((item) => collectDefaultOpenIds(item))
}

function collectDefaultOpenIds(item: NavItem, level = 0): string[] {
  if (!item.subheadings?.length) {
    return []
  }

  return [
    ...(item.sidebarMenuOpen && level < 2 ? [item.id || item.path] : []),
    ...item.subheadings.flatMap((item) =>
      collectDefaultOpenIds(item, level + 1)
    ),
  ]
}

function containsSidebarItem(
  selectedItem: string | undefined,
  item: NavItem
): boolean {
  if ((item.id || item.path) === selectedItem) {
    return true
  }

  return Boolean(
    item.subheadings?.some((item) =>
      containsSidebarItem(selectedItem, item)
    )
  )
}

export function getSidebarMenuStorageKey(items: NavItem[]) {
  const id = items[0]?.id || items[0]?.path || 'default'
  return `portal-sidebar-menu-open-items-${id}`
}
