/**
 * Sidebar with Menu
 *
 */

import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import classnames from 'classnames'
import Anchor from '../tags/Anchor'
import { useStaticQuery, graphql } from 'gatsby'
import { SidebarMenuContext } from './SidebarMenuContext'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import {
  Icon,
  Badge,
  Button,
  HeightAnimation,
} from '@dnb/eufemia/src/components'
import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'
import { Context, useTheme } from '@dnb/eufemia/src/shared'
import graphics from './SidebarGraphics'
import {
  setPageFocusElement,
  applyPageFocus,
} from '@dnb/eufemia/src/shared/helpers'
import PortalToolsMenu from './PortalToolsMenu'
import { navStyle } from './SidebarMenu.module.scss'
import { defaultTabsValue } from '../tags/TabBar'

const showAlwaysMenuItems = [] // like "uilib" something like that

type SidebarLayoutProps = {
  location: Location
  showAll?: boolean
}

export default function SidebarLayout({
  location,
  showAll,
}: SidebarLayoutProps) {
  const { isClosing, closeMenu, isOpen } = useContext(SidebarMenuContext)
  const scrollRef = useRef<HTMLElement>(null)

  const {
    allMdx,
    site: { pathPrefix },
  } = useStaticQuery(graphql`
    query {
      site {
        pathPrefix
      }
      allMdx(
        filter: {
          frontmatter: { title: { ne: null }, draft: { ne: true } }
        }
      ) {
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
              accordion
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    setPageFocusElement('nav ul li.is-active a:nth-of-type(1)', 'sidebar')

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen && !isClosing) {
      setTimeout(() => {
        scrollToActiveItem()
        applyPageFocus('sidebar')
      }, 10) // after animation is done
    } else if (isClosing) {
      setTimeout(() => {
        applyPageFocus('content')
      }, 300) // after animation is done - to make sure we can get the focus on h1
    }
  }, [isClosing, isOpen])

  /* Creation of menu items starts here */

  const navItems = groupNavItems(
    prepareNav({
      location,
      allMdx,
      showAll,
      pathPrefix,
    }),
    location,
  )
    .filter(({ title, menuTitle }) => title || menuTitle)
    .map(
      (
        {
          title,
          menuTitle,
          status,
          icon,
          path,
          level,
          isActive,
          isInsideActivePath,
          isInsideActiveCategory,
          subheadings,
          currentPathName,
        },
        nr,
      ) => {
        const props = {
          level,
          nr,
          status,
          icon,
          isActive,
          isInsideActivePath,
          isInsideActiveCategory,
          path,
          subheadings,
          currentPathName,
          title: menuTitle || title,
        }

        return <ListItem key={path} {...props} scrollRef={scrollRef} />
      },
    )

  return (
    <nav
      id="portal-sidebar-menu"
      aria-labelledby="toggle-sidebar-menu"
      className={classnames(
        navStyle,
        'dnb-scrollbar-appearance',
        isOpen && 'show-mobile-menu',
        isClosing && 'hide-mobile-menu',
      )}
      ref={scrollRef}
    >
      <PortalToolsMenu
        triggerAttributes={{
          left: 'large',
          top: 'large',
          text: 'Portal Tools',
          icon: 'chevron_right',
          icon_position: 'right',
        }}
        tooltipPosition="bottom"
        hideWhenMediaLarge
      />
      <ul className="dev-grid">{navItems}</ul>
    </nav>
  )

  function scrollToActiveItem() {
    if (!scrollRef?.current) {
      return
    }

    const elem = scrollRef.current.querySelector('li.is-active')

    if (!elem) {
      return false
    }

    try {
      // The scroll to active list item codeblock seems to only be working on smaller screen sizes i.e. tablet/phones, is this intentional?
      // As of now it only targets the window scroll, which means it's only automatically scrolling on smaller devices, since on desktop
      // the menu has it's own internal scrollbar inside the <nav /> element
      const offset = scrollRef.current.getBoundingClientRect().top
      const rect = elem.getBoundingClientRect()
      const top = scrollRef.current.scrollTop + rect.top - offset
      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    } catch (e) {
      console.log('Could not set scrollToActiveItem', e)
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeMenu()
    }
  }
}

const ThemeBadge = ({ theme, ...props }: { theme: ThemeNames }) => {
  const themeTitle =
    theme &&
    {
      ui: 'DNB',
      sbanken: 'Sbanken',
      eiendom: 'Eiendom',
    }[theme]
  const themeTitleTitle =
    theme && `This component is ready for use with the ${themeTitle} theme`
  return (
    <span
      title={themeTitleTitle}
      className={classnames(
        'dnb-sidebar-menu__theme-badge',
        `dnb-sidebar-menu__theme-badge--${theme}`,
      )}
      {...props}
    >
      <span
        title={themeTitleTitle}
        className={classnames('dnb-sidebar-menu__theme-badge__title')}
      >
        {themeTitle}
      </span>
    </span>
  )
}

type ListItemProps = {
  title: string
  subheadings?: ListItemProps[]
  className?: string
  path: string
  level?: number
  nr?: number
  status?: string
  theme?: ThemeNames
  icon?: string
  isActive?: boolean
  hideInMenu?: boolean
  isInsideActivePath?: boolean
  isInsideActiveCategory?: boolean
  currentPathName?: string
  accordion?: boolean
  scrollRef?: React.MutableRefObject<HTMLElement>
}

function ListItem({
  className = null,
  path,
  level = 0,
  isActive = false,
  isInsideActivePath = false,
  isInsideActiveCategory = false,
  nr,
  status,
  theme,
  icon,
  title,
  subheadings,
  hideInMenu,
  currentPathName,
  accordion = false,
  scrollRef,
}: ListItemProps) {
  const currentTheme = useTheme()?.name
  const { closeMenu } = useContext(SidebarMenuContext)
  const { skeleton } = useContext(Context)
  const ref = useRef(null)
  const [, isInsideActivePathPrevious] = usePrevious(isInsideActivePath)
  const [hasCurrentPathNameChanged] = usePrevious(currentPathName)
  const hasSubheadings = useMemo(
    () => subheadings && subheadings.some((x) => x.hideInMenu !== true),
    [subheadings],
  )
  const isAccordion = useMemo(
    () => accordion && hasSubheadings,
    [accordion, hasSubheadings],
  )
  const [isExpanded, setIsExpanded] = useState(
    isAccordion ? isInsideActivePath || isActive : true,
  )
  const [manualClick, setManualClick] = useState(false)
  if (hideInMenu) {
    return null
  }
  const statusTitle =
    status &&
    {
      new: 'New',
      beta: 'Beta',
      wip: 'WIP',
      cs: 'Coming soon',
      dep: 'Deprecated',
      imp: 'Needs improvement',
    }[status]

  const params = {}

  if (isAccordion) {
    if (!isExpanded) {
      const shouldAutoExpand =
        (isInsideActivePath &&
          (!isInsideActivePathPrevious || hasCurrentPathNameChanged)) ||
        (isActive && hasCurrentPathNameChanged)

      if (shouldAutoExpand) {
        setIsExpanded(true)
      }
    } else {
      const shouldAutoCollapse =
        !isInsideActivePath && !isActive && hasCurrentPathNameChanged

      if (shouldAutoCollapse) {
        setIsExpanded(false)
      }
    }
  }
  if (isActive) {
    params['aria-current'] = true
  }

  return (
    <>
      <li
        className={classnames(
          'dnb-sidebar-menu',
          `l-${level}`,
          isActive && 'is-active', // use anchor hover style
          isInsideActivePath && 'is-inside-active-path',
          isInsideActiveCategory && !isInsideActivePath && 'is-inside',
          status && `status-${status}`,
          isAccordion &&
            `dnb-sidebar-menu--accordion dnb-sidebar-menu--${
              isExpanded ? 'expanded' : 'collapsed'
            }`,
          className,
        )}
        ref={ref}
        style={
          {
            '--delay': `${
              nr && nr < 20 ? nr * 12 : 0 // random(1, 160)
            }ms`,
          } as React.CSSProperties /* Casting to allow css variable in JSX inline styling */
        }
      >
        <div className="dnb-sidebar-menu__item">
          <Anchor
            href={path}
            aria-expanded={isAccordion ? isExpanded : undefined}
            onClick={() => {
              closeMenu()
              if (!isExpanded) {
                setIsExpanded(true)
              }
            }}
            className={classnames(
              'dnb-anchor',
              'dnb-anchor--no-underline',
              'dnb-anchor--no-radius',
              'dnb-anchor--no-hover',
              icon && graphics[icon] ? 'has-icon' : null,
            )}
            {...params}
          >
            <span>
              {icon && graphics[icon] && (
                <Icon icon={graphics[icon]} size="medium" />
              )}
              <span
                className={classnames(
                  createSkeletonClass('font', skeleton),
                )}
              >
                {title}
              </span>
            </span>
            {theme === currentTheme && <ThemeBadge theme={theme} />}
            {status && (
              <Badge space={{ right: 'xx-small' }} content={statusTitle} />
            )}
          </Anchor>

          {isAccordion && (
            <Button
              left="x-small"
              className="dnb-sidebar-menu__expand-button"
              variant="tertiary"
              size="small"
              aria-expanded={isExpanded}
              icon={isExpanded ? 'subtract' : 'add'}
              onClick={() => {
                setIsExpanded(!isExpanded)
                setManualClick(true)
              }}
            />
          )}
        </div>
        {hasSubheadings && (
          <HeightAnimation
            animate={isAccordion === true}
            element="ul"
            open={isExpanded}
            onAnimationEnd={(state) => {
              if (manualClick) {
                setManualClick(false)
              } else if (state === 'closed') {
                ensureActiveMenuItemIsInView(scrollRef)
              }
            }}
          >
            {subheadings.map((item) => (
              <ListItem key={item.path} {...item} scrollRef={scrollRef} />
            ))}
          </HeightAnimation>
        )}
      </li>
    </>
  )
}

type NavItemTabs = {
  title: string
  key: string
}

type NavItem = {
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
  title: string
  showTabs?: boolean
  tabs?: NavItemTabs[]
  subheadings?: NavItem[]
  currentPathName?: string
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
    first = pathname.split('/').filter((p) => p && p !== prefix)[0]
  }

  const navItems = allMdx.edges
    .map(
      ({
        node: {
          fields: { slug },
        },
      }) => slug,
    )
    .filter((slug) => slug !== '/')
    // preorder
    .sort()
    .reduce(
      (acc, cur) => {
        const prefix = cur.split('/').filter(Boolean)[0]

        if (showAll === false) {
          if (prefix === first) {
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
      { items: [] },
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
        }) => slug === slugPath,
      )

      const level = slug.split('/').filter(Boolean).length
      level > countLevels ? (countLevels = level) : countLevels

      return {
        title,
        path: slug,
        level,
        order,
        _order: slug,
        ...rest,
      }
    })

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
      oA < oB ? -1 : oA > oB ? 1 : 0,
    )

  return list
}

function groupNavItems(navItems: NavItem[], location: Location) {
  const topLevelHeadings: NavItem[] = []

  // Remove first and last slash from pathname to match path from graphql
  const currentPathName = location.pathname
    .replace(/\/$/g, '')
    .replace(/^\//g, '')

  // Grouping all navItems correctly with only one loop through the array
  // making use of object reference to add subheadings to correct parent headings
  // so it can be done with only one loop through
  navItems.reduce<{ [id: string]: NavItem }>((hashmap, item) => {
    // Using items url path as ID, it only works in this case, since we can determine the items grouping by the url path
    // It's solved this way since the id and parent.id from gatsby nodes does not seem to seem to relate to the structure in the SidebarMenu
    // and therefor leads to wrong grouping if used
    const itemId = item.path.replace(/\//g, '-')
    const parentId = item.path.replace(/\/[^/]+$/g, '').replace(/\//g, '-')

    const { isActive, isInsideActiveCategory, isInsideActivePath } =
      getActiveStatusForItem(currentPathName, item)

    // Add props for use in <ListItem />
    const hashItem = {
      ...item,
      id: itemId,
      parentId,
      isActive,
      isInsideActiveCategory,
      isInsideActivePath,
      currentPathName,
    }

    // Initialize parentItem in hashmap
    if (!(parentId in hashmap)) {
      hashmap[parentId] = {} as NavItem
    }

    // Initializing subheadings property on parentItem if it's not yet defined
    if (!hashmap[parentId]?.subheadings) {
      hashmap[parentId].subheadings = []
    }

    // Push item object reference to subheadings array on parentItem reference in hashmap
    hashmap[parentId].subheadings.push(hashItem)

    // Define item object reference in hashmap
    hashmap[itemId] = hashItem

    // Add all top level heading object references to topLevelHeadings array
    // so that we wont have to loop through the array a second time to sort out top level headings
    if (item.level === 1) {
      topLevelHeadings.push(hashmap[itemId])
    }

    return hashmap
  }, {})

  return topLevelHeadings
}

function getActiveStatusForItem(
  currentPath: string,
  { path: itemPath, showTabs, tabs }: NavItem,
) {
  const portalSlug = itemPath.split('/').filter(Boolean)[0] ?? ''
  const categorySlug = itemPath.split('/').filter(Boolean)[1] ?? ''
  const startOfCurrentPath = `${portalSlug}/${categorySlug}`

  const isActive = checkIfActiveItem(currentPath, itemPath, showTabs, tabs)

  const isInsideActivePath = checkIfActivePath(
    currentPath,
    itemPath,
    isActive,
  )

  const isInsideActiveCategory = checkIfActiveCategory(
    currentPath,
    startOfCurrentPath,
    isInsideActivePath,
  )

  return { isActive, isInsideActiveCategory, isInsideActivePath }
}

function checkIfActiveCategory(
  currentPath: string,
  startOfCurrentPath: string,
  isInsideActivePath?: boolean,
) {
  return (
    !isInsideActivePath &&
    (currentPath + '/').startsWith(startOfCurrentPath + '/')
  )
}

function checkIfActivePath(
  currentPath: string,
  itemPath: string,
  isActive?: boolean,
) {
  return !isActive && (currentPath + '/').startsWith(itemPath + '/')
}

function checkIfActiveItem(
  currentPath: string,
  itemPath: string,
  showTabs?: boolean,
  tabs?: NavItemTabs[],
): boolean {
  if (!showTabs) {
    return itemPath === currentPath
  }

  // There is no need to do the tab slug control if the currentPath and itemPath are matching
  if (itemPath === currentPath) {
    return true
  }

  if (showTabs) {
    // If gatsby node has showTabs active
    // we can most likely assume that the last part of the slug is the tab path
    // and then remove it from the currentPath to determine if this item is the active item
    const slugs = currentPath.split('/').filter(Boolean)
    const lastSlug = slugs[slugs.length - 1]
    const currentPathWithoutTabSlug = currentPath.replace(
      `/${lastSlug}`,
      '',
    )

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
  }

  return false
}

function usePrevious<T>(
  value: T,
  hasChanged: (current: T, previous: T) => boolean = (a, b) => a !== b,
): [boolean, T] {
  const valueRef = useRef(value)
  const previousValue = valueRef.current
  valueRef.current = value

  return [hasChanged(value, previousValue), previousValue]
}

function ensureActiveMenuItemIsInView(
  parentRef: React.MutableRefObject<HTMLElement>,
) {
  const nav = parentRef?.current
  if (nav) {
    const item = nav.querySelector(
      'li.is-active > div.dnb-sidebar-menu__item',
    ) as HTMLElement

    if (item) {
      const navTop = nav.scrollTop
      const navBottom = navTop + nav.offsetHeight
      const itemTop = item.offsetTop
      const itemBottom = itemTop + item.offsetHeight

      const isInView = navTop <= itemTop && navBottom >= itemBottom

      if (!isInView) {
        nav.scrollTop = itemTop
      } else {
        // stop scrolling if item is in view
        nav.scrollTop = navTop
      }
    }
  }
}
