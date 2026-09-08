/**
 * Sidebar with Menu
 *
 */

import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import { useStaticQuery, graphql } from 'portal-query'
import SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
import '@dnb/eufemia/src/extensions/sidebar-menu/style'
import { ScrollView } from '@dnb/eufemia/src/fragments'
import { browser, mobile } from '@dnb/eufemia/src/icons'
import { setPageFocusElement } from '@dnb/eufemia/src/shared/helpers'
import {
  navStyle,
  desktopNavStyle,
  mobileDrawerStyle,
  mobileDrawerLogoStyle,
  mobileNavStyle,
  scrollContentStyle,
  scrollStyle,
  sidebarLogoStyle,
} from './SidebarMenu.module.scss'
import { defaultTabsValue } from '../tags/defaultValues'
import {
  applySidebarMenuPlacement,
  createUilibSidebarStructure,
  findActiveSidebarItemId,
  getSidebarMenuStorageKey,
  groupComponentsByCategory,
  shouldIncludeSidebarPrefix,
  themeTitles,
  toSidebarMenuData,
  type NavItem,
  type NavItemTabs,
} from './SidebarMenuData'
import { useTheme } from '@dnb/eufemia/src/shared'
import PortalLogo from './graphics/logo'
import { Link } from '../tags/Anchor'

const showAlwaysMenuItems = [] // like "uilib" something like that
type SidebarLayoutProps = {
  location: Location
  showAll?: boolean
}

export default function SidebarLayout({
  location,
  showAll,
}: SidebarLayoutProps) {
  const { close: closeMenu, isMobile } = SidebarMenu.useResponsive()
  const scrollRef = useRef<HTMLElement>(null)

  const {
    allMdx,
    site: { pathPrefix },
  } = useStaticQuery(graphql`
    query {
      site {
        pathPrefix
      }
      allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              menuTitle
              hideInMenu
              order
              status
              icon
              showTabs
              tabs {
                key
              }
              theme
              sidebarMenuPlacement
              sidebarMenuDividerBefore
              platform
              sidebarMenu {
                id
                path
                parent
                title
                icon
                order
                root
                includePageAs
                pageParent
                pageIcon
                pageOrder
                static
                hideStatus
                groups {
                  id
                  path
                  title
                  icon
                  order
                  static
                  includePageAs
                  pageOrder
                }
                platform
              }
              category
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    setPageFocusElement(
      '#portal-sidebar-menu [aria-current="page"]',
      'sidebar'
    )
  }, [])

  /* Creation of menu items starts here */

  const groupedNavItems = groupComponentsByCategory(
    createUilibSidebarStructure(
      applySidebarMenuPlacement(
        groupNavItems(
          prepareNav({
            location,
            allMdx,
            showAll,
            pathPrefix,
          }),
          location
        ).filter(({ title, menuTitle }) => title || menuTitle)
      ),
      true
    )
  )
  const navItems = toSidebarMenuData(groupedNavItems, closeMenu)
  const sections = [
    {
      id: 'web',
      text: 'Web',
      icon: browser,
      items: navItems,
    },
    {
      id: 'ios',
      text: 'iOS',
      icon: mobile,
      items: [{ id: 'portal-ios-overview', text: 'iOS overview' }],
    },
    {
      id: 'android',
      text: 'Android',
      icon: mobile,
      items: [{ id: 'portal-android-overview', text: 'Android overview' }],
    },
  ]
  const selectedItem = findActiveSidebarItemId(groupedNavItems)
  const currentTheme = useTheme()?.name
  const storageKey = getSidebarMenuStorageKey(groupedNavItems)
  const menu = (className?: string, withSpace = true) => (
    <aside
      id="portal-sidebar-menu"
      className={clsx(navStyle, className)}
      ref={scrollRef}
    >
      <ScrollView
        className={clsx(
          scrollStyle,
          'portal-sidebar-scroll-view',
          'dnb-scrollbar-appearance'
        )}
        interactive="auto"
        scrollbarGutter={isMobile ? undefined : 'stable'}
      >
        <div className={scrollContentStyle}>
          <Link
            href="/"
            className={clsx(sidebarLogoStyle, 'dnb-tab-focus')}
            title="Go to Eufemia home"
          >
            <PortalLogo />
          </Link>

          <SidebarMenu.Container
            aria-label="Section Content Menu"
            className="dev-grid"
            sections={sections.map(({ items, ...section }) => ({
              ...section,
              items: addThemeBadges(items, currentTheme),
            }))}
            defaultActiveSection="web"
            sectionLabel="Platform"
            selectedItem={selectedItem}
            openItemsStorageKey={storageKey}
            scrollPositionStorageKey={`${storageKey}-scroll-position`}
            {...(withSpace && {
              left: 'medium',
              top: 'medium',
              right: 'small',
            })}
          />
        </div>
      </ScrollView>
    </aside>
  )

  return (
    <>
      <SidebarMenu.ResponsiveDrawer
        id="portal-sidebar-menu-drawer"
        className={mobileDrawerStyle}
        dialogTitle="Menu"
        navContent={
          <Link
            href="/"
            className={clsx(mobileDrawerLogoStyle, 'dnb-tab-focus')}
            title="Go to Eufemia home"
          >
            <PortalLogo />
          </Link>
        }
      >
        {menu(mobileNavStyle, false)}
      </SidebarMenu.ResponsiveDrawer>

      <SidebarMenu.ResponsiveInline>
        {menu(desktopNavStyle)}
      </SidebarMenu.ResponsiveInline>

      {!isMobile && (
        <SidebarMenu.ResizeHandle
          targetRef={scrollRef}
          rootSelector=".eufemia-scope--portal"
          cssProperty="--aside-width"
          aria-controls="portal-sidebar-menu"
        />
      )}
    </>
  )
}

function addThemeBadges(
  items: ReturnType<typeof toSidebarMenuData>,
  currentTheme: ReturnType<typeof useTheme>['name']
) {
  return items.map(({ themes, items, ...item }) => ({
    ...item,
    suffix: themes?.includes(currentTheme) ? (
      <ThemeBadge theme={currentTheme} />
    ) : undefined,
    items: items ? addThemeBadges(items, currentTheme) : undefined,
  }))
}

function ThemeBadge({
  theme,
}: {
  theme: ReturnType<typeof useTheme>['name']
}) {
  const themeTitle = themeTitles[theme]

  return (
    <span
      title={`This component is ready for use with the ${themeTitle} theme`}
      className={clsx(
        'portal-sidebar-menu__theme-badge',
        `portal-sidebar-menu__theme-badge--${theme}`
      )}
    />
  )
}

const prepareNav = ({
  location,
  allMdx,
  showAll,
  pathPrefix,
}): NavItem[] => {
  const pathname = location.pathname.replace(/(\/)$/, '')
  let first = null
  if (showAll === false) {
    const prefix = pathPrefix ? pathPrefix.replace(/^(\/)/, '') : null
    first =
      pathname.split('/').filter((p) => p && p !== prefix)[0] || 'uilib'
  }

  const navItems = allMdx.edges
    .map(
      ({
        node: {
          fields: { slug },
        },
      }) => slug
    )
    .filter((slug) => slug !== '/')
    // preorder
    .sort()
    .reduce(
      (acc, cur) => {
        const prefix = cur.split('/').filter(Boolean)[0]

        if (showAll === false) {
          if (shouldIncludeSidebarPrefix(first, prefix)) {
            return { ...acc, items: [...acc.items, cur] }
          } else {
            return { ...acc, [cur]: [cur] }
          }
        } else {
          if (showAlwaysMenuItems.find((url) => url === cur)) {
            return { ...acc, [cur]: [cur] }
          }

          if (
            prefix &&
            showAlwaysMenuItems.find((url) => url === `/${prefix}`)
          ) {
            return {
              ...acc,
              [`/${prefix}`]: [...acc[`/${prefix}`], cur],
            }
          } else {
            return { ...acc, items: [...acc.items, cur] }
          }
        }
      },
      { items: [] }
    )

  let countLevels = 0
  const orderCache = {},
    childCounts = {}

  const list = showAlwaysMenuItems
    .reduce((acc, cur) => acc.concat(navItems[cur]), []) // put in the sub parts
    .concat(navItems.items) // put inn the main parts
    .map((slugPath) => {
      const {
        node: {
          fields: { slug },
          frontmatter: { title, order, ...rest },
        },
      } = allMdx.edges.find(
        ({
          node: {
            fields: { slug },
          },
        }) => slug === slugPath
      )

      const level = slug.split('/').filter(Boolean).length
      if (level > countLevels) {
        countLevels = level
      }

      return {
        title,
        path: slug,
        level,
        order,
        _order: slug,
        ...rest,
      }
    })
    .filter(
      ({ title, menuTitle, sidebarMenu }) =>
        title || menuTitle || sidebarMenu?.title
    )

    // prepare items, make sure we forward order for sub paths, if needed
    .map((item) => {
      const parts = item.path.split('/').filter(Boolean)

      // Handle ordering when no order field is given
      const parentPath = parts.slice(0, -1).join('/')
      childCounts[parentPath] = childCounts[parentPath] || 0
      const count = childCounts[parentPath]++
      item._order = parts
        .reduce((acc, cur, i) => {
          const mySub = parts.slice(0, i + 1).join('/')
          if (!orderCache[mySub]) {
            orderCache[mySub] = item.order
              ? parseFloat(item.order) >= 0
                ? parseFloat(item.order) + 1000 // push manual ordering to the top
                : parseFloat(item.order) + 3000 // push negative manual ordering to the bottom
              : count + 2000
          }
          acc.push(orderCache[mySub])
          return acc
        }, [])
        .join('/')

      return item
    })

  list
    // reorder regarding potential manually defined order
    .sort(({ _order: oA }, { _order: oB }) =>
      oA < oB ? -1 : oA > oB ? 1 : 0
    )

  return list
}

function groupNavItems(navItems: NavItem[], location: Location) {
  const topLevelHeadings: NavItem[] = []

  // Remove first and last slash from pathname to match path from graphql
  const currentPathName = location.pathname
    .replace(/\/$/g, '')
    .replace(/^\//g, '')

  const itemsByPath = new Map<string, NavItem>()
  navItems.forEach((item) => {
    const { isActive, isInsideActiveCategory, isInsideActivePath } =
      getActiveStatusForItem(currentPathName, item)
    itemsByPath.set(item.path.replace(/^\/+|\/+$/g, ''), {
      ...item,
      id: item.path.replace(/\//g, '-'),
      isActive,
      isInsideActiveCategory,
      isInsideActivePath,
      currentPathName,
    })
  })

  itemsByPath.forEach((item, itemPath) => {
    const pathParts = itemPath.split('/')
    let parent: NavItem | undefined

    while (pathParts.length > 1 && !parent) {
      pathParts.pop()
      parent = itemsByPath.get(pathParts.join('/'))
    }

    if (parent) {
      parent.subheadings = [...(parent.subheadings ?? []), item]
    } else {
      topLevelHeadings.push(item)
    }
  })

  return topLevelHeadings
}

function getActiveStatusForItem(
  currentPath: string,
  { path: itemPath, showTabs, tabs }: NavItem
) {
  const portalSlug = itemPath.split('/').filter(Boolean)[0] ?? ''
  const categorySlug = itemPath.split('/').filter(Boolean)[1] ?? ''
  const startOfCurrentPath = `${portalSlug}/${categorySlug}`

  const isActive = checkIfActiveItem(currentPath, itemPath, showTabs, tabs)

  const isInsideActivePath = checkIfActivePath(
    currentPath,
    itemPath,
    isActive
  )

  const isInsideActiveCategory = checkIfActiveCategory(
    currentPath,
    startOfCurrentPath,
    isInsideActivePath
  )

  return { isActive, isInsideActiveCategory, isInsideActivePath }
}

function checkIfActiveCategory(
  currentPath: string,
  startOfCurrentPath: string,
  isInsideActivePath?: boolean
) {
  return (
    !isInsideActivePath &&
    (currentPath + '/').startsWith(startOfCurrentPath + '/')
  )
}

function checkIfActivePath(
  currentPath: string,
  itemPath: string,
  isActive?: boolean
) {
  return !isActive && (currentPath + '/').startsWith(itemPath + '/')
}

function checkIfActiveItem(
  currentPath: string,
  itemPath: string,
  showTabs?: boolean,
  tabs?: NavItemTabs[]
): boolean {
  if (!showTabs) {
    return itemPath === currentPath
  }

  // There is no need to do the tab slug control if the currentPath and itemPath are matching
  if (itemPath === currentPath) {
    return true
  }

  // If a page exposes tabs, the last slug segment is usually the active tab.
  // Remove it from currentPath to determine the active parent item.
  const slugs = currentPath.split('/').filter(Boolean)
  const lastSlug = slugs[slugs.length - 1]
  const currentPathWithoutTabSlug = currentPath.replace(`/${lastSlug}`, '')

  if (itemPath === currentPathWithoutTabSlug) {
    // In addition, because we show the info.mdx without /info
    // we don't want the "parent" to be marked as active as well.
    // So we get tabs and check for that state as well
    const found = (tabs || defaultTabsValue).some(({ key }) => {
      return '/' + lastSlug === key
    })

    if (found) {
      return true
    }
  }

  return false
}
