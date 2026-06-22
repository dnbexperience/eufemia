/**
 * Sidebar with Menu
 *
 */

import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
} from 'react'
import { clsx } from 'clsx'
import Anchor from '../tags/Anchor'
import { useStaticQuery, graphql } from 'portal-query'
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
import { navStyle, resizeHandleStyle } from './SidebarMenu.module.scss'
import { defaultTabsValue } from '../tags/defaultValues'

const showAlwaysMenuItems = [] // like "uilib" something like that
const sidebarWidthScopeSelector = '.eufemia-scope--portal'

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
  const sidebarResizeHandlers = useSidebarResize(scrollRef)

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeMenu])

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
    location
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
        nr
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
      }
    )

  return (
    <>
      <nav
        id="portal-sidebar-menu"
        aria-labelledby="toggle-sidebar-menu"
        className={clsx(
          navStyle,
          'dnb-scrollbar-appearance',
          isOpen && 'show-mobile-menu',
          isClosing && 'hide-mobile-menu'
        )}
        ref={scrollRef}
      >
        <PortalToolsMenu
          triggerProps={{
            left: 'large',
            top: 'large',
            bottom: 'large',
            text: 'Portal Tools',
            icon: 'chevron_right',
            iconPosition: 'right',
          }}
          tooltipPosition="bottom"
          hideWhenMediaLarge
        />
        <ul className="dev-grid">{navItems}</ul>
      </nav>

      <SidebarResizeHandle {...sidebarResizeHandlers} />
    </>
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
      // the menu has its own internal scrollbar inside the <nav /> element
      const offset = scrollRef.current.getBoundingClientRect().top
      const rect = elem.getBoundingClientRect()
      const top = scrollRef.current.scrollTop + rect.top - offset
      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    } catch (e) {
      // Ignore scroll errors.
    }
  }
}

type SidebarResizeHandleProps = ReturnType<typeof useSidebarResize>

function SidebarResizeHandle({
  handleResizePointerDown,
  handleResizeMouseDown,
  handleResizeKeyDown,
  resetSidebarWidth,
}: SidebarResizeHandleProps) {
  return (
    <button
      type="button"
      className={resizeHandleStyle}
      aria-label="Resize sidebar"
      aria-controls="portal-sidebar-menu"
      onPointerDown={handleResizePointerDown}
      onMouseDown={handleResizeMouseDown}
      onKeyDown={handleResizeKeyDown}
      onDoubleClick={resetSidebarWidth}
    />
  )
}

function useSidebarResize(scrollRef: RefObject<HTMLElement>) {
  const cleanupResizeRef = useRef<() => void>(undefined)

  useEffect(() => {
    return () => {
      cleanupResizeRef.current?.()
    }
  }, [])

  function getSidebarWidth() {
    return scrollRef.current?.getBoundingClientRect().width || 0
  }

  function getSidebarWidthStyleElement() {
    return (
      scrollRef.current?.closest<HTMLElement>(sidebarWidthScopeSelector) ||
      document.querySelector<HTMLElement>(sidebarWidthScopeSelector) ||
      document.documentElement
    )
  }

  function setSidebarWidth(width: number) {
    if (typeof document === 'undefined') {
      return
    }

    const widthWithMin = Math.round(Math.max(width, 1))
    getSidebarWidthStyleElement().style.setProperty(
      '--aside-width',
      `${widthWithMin}px`
    )
  }

  function resetSidebarWidth() {
    if (typeof document === 'undefined') {
      return
    }

    getSidebarWidthStyleElement().style.removeProperty('--aside-width')
    document.documentElement.style.removeProperty('--aside-width')
  }

  function handleResizePointerDown(
    event: ReactPointerEvent<HTMLButtonElement>
  ) {
    if (event.button !== 0) {
      return
    }

    event.preventDefault()
    startSidebarResize(event.clientX, (handleMove, handleEnd) => {
      window.addEventListener('pointermove', handleMove)
      window.addEventListener('pointerup', handleEnd, { once: true })

      return () => {
        window.removeEventListener('pointermove', handleMove)
        window.removeEventListener('pointerup', handleEnd)
      }
    })
  }

  function handleResizeMouseDown(
    event: ReactMouseEvent<HTMLButtonElement>
  ) {
    if (event.button !== 0) {
      return
    }

    event.preventDefault()
    startSidebarResize(event.clientX, (handleMove, handleEnd) => {
      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleEnd, { once: true })

      return () => {
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', handleEnd)
      }
    })
  }

  function startSidebarResize(
    clientX: number,
    addListeners: (
      handleMove: (event: MouseEvent | PointerEvent) => void,
      handleEnd: () => void
    ) => () => void
  ) {
    cleanupResizeRef.current?.()
    document.documentElement.classList.add('portal-sidebar-is-resizing')

    const pointerOffset = clientX - getSidebarWidth()

    const handleMove = (event: MouseEvent | PointerEvent) => {
      setSidebarWidth(event.clientX - pointerOffset)
    }

    let removeListeners = () => null

    const cleanupResize = () => {
      removeListeners()
      document.documentElement.classList.remove(
        'portal-sidebar-is-resizing'
      )
      cleanupResizeRef.current = undefined
    }

    const handleEnd = () => {
      cleanupResize()
    }

    removeListeners = addListeners(handleMove, handleEnd)
    cleanupResizeRef.current = cleanupResize
  }

  function handleResizeKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>
  ) {
    const width = getSidebarWidth()
    const step = event.shiftKey ? 48 : 16

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setSidebarWidth(width - step)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setSidebarWidth(width + step)
    }
  }

  return {
    handleResizePointerDown,
    handleResizeMouseDown,
    handleResizeKeyDown,
    resetSidebarWidth,
  }
}

const ThemeBadge = ({ theme, ...props }: { theme: ThemeNames }) => {
  const themeTitle =
    theme &&
    {
      ui: 'DNB',
      sbanken: 'Sbanken',
      eiendom: 'Eiendom',
      carnegie: 'DNB Carnegie',
    }[theme]
  const themeTitleTitle =
    theme && `This component is ready for use with the ${themeTitle} theme`
  return (
    <span
      title={themeTitleTitle}
      className={clsx(
        'dnb-sidebar-menu__theme-badge',
        `dnb-sidebar-menu__theme-badge--${theme}`
      )}
      {...props}
    />
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
  theme?: ThemeNames[]
  icon?: string
  isActive?: boolean
  hideInMenu?: boolean
  isInsideActivePath?: boolean
  isInsideActiveCategory?: boolean
  currentPathName?: string
  accordion?: boolean
  scrollRef?: RefObject<HTMLElement>
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
  theme: supportedThemes,
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
    [subheadings]
  )
  const isAccordion = useMemo(
    () => accordion && hasSubheadings,
    [accordion, hasSubheadings]
  )
  const [isExpanded, setIsExpanded] = useState(
    isAccordion ? isInsideActivePath || isActive : true
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

  const expandButtonTitle = isExpanded
    ? `Collapse ${title}`
    : `Expand ${title}`
  const iconSize = icon === 'OverviewIcon' ? 'default' : 'medium'

  return (
    <>
      <li
        className={clsx(
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
          className
        )}
        ref={ref}
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
            className={clsx(
              'dnb-anchor',
              'dnb-anchor--no-underline',
              'dnb-anchor--no-radius',
              'dnb-anchor--no-hover',
              icon && graphics[icon] ? 'has-icon' : null
            )}
            {...params}
          >
            <span>
              {icon && graphics[icon] && (
                <Icon icon={graphics[icon]} size={iconSize} />
              )}
              <span
                className={clsx(createSkeletonClass('font', skeleton))}
              >
                {title.replace(/^[A-Z][a-z]*\./, '')}
              </span>
            </span>
            {supportedThemes?.indexOf(currentTheme) > -1 && (
              <ThemeBadge theme={currentTheme} />
            )}
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
              title={expandButtonTitle}
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
      }) => slug
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

  // Grouping all navItems correctly with only one loop through the array
  // making use of object reference to add subheadings to correct parent headings
  // so it can be done with only one loop through
  navItems.reduce<{ [id: string]: NavItem }>((hashmap, item) => {
    // Using items url path as ID, it only works in this case, since we can determine the items grouping by the url path
    // The source node ids do not reflect the SidebarMenu hierarchy reliably,
    // so we derive parent-child relationships from the URL path instead.
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

  if (showTabs) {
    // If a page exposes tabs, the last slug segment is usually the active tab.
    // Remove it from currentPath to determine the active parent item.
    const slugs = currentPath.split('/').filter(Boolean)
    const lastSlug = slugs[slugs.length - 1]
    const currentPathWithoutTabSlug = currentPath.replace(
      `/${lastSlug}`,
      ''
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
  hasChanged: (current: T, previous: T) => boolean = (a, b) => a !== b
): [boolean, T] {
  const valueRef = useRef(value)
  const previousValue = valueRef.current
  valueRef.current = value

  return [hasChanged(value, previousValue), previousValue]
}

function ensureActiveMenuItemIsInView(parentRef: RefObject<HTMLElement>) {
  const nav = parentRef?.current
  if (nav) {
    const item = nav.querySelector(
      'li.is-active > div.dnb-sidebar-menu__item'
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
