/**
 * Sidebar with Menu
 *
 */

import React, { useContext, useEffect, useRef } from 'react'
import classnames from 'classnames'
import Link from '../parts/Link'
import { useStaticQuery, graphql } from 'gatsby'
import Context from '@dnb/eufemia/src/shared/Context'
import { SidebarMenuContext } from './SidebarMenuContext'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import { Space, Icon, Badge } from '@dnb/eufemia/src/components'
import { MediaQuery } from '@dnb/eufemia/src/shared'
import graphics from './SidebarGraphics'
import {
  setPageFocusElement,
  applyPageFocus,
} from '@dnb/eufemia/src/shared/helpers'
import PortalToolsMenu from './PortalToolsMenu'
import { navStyle } from './SidebarMenu.module.scss'

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
              order
              status
              icon
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
      }, 300) // after animation is done
    } else if (isClosing) {
      setTimeout(() => {
        applyPageFocus('content')
      }, 300) // after animation is done - to make sure we can get the focus on h1
    }
  }, [isClosing, isOpen])

  function scrollToActiveItem() {
    if (!scrollRef?.current) return

    const elem = scrollRef.current.querySelector('li.is-active')

    if (!elem) return false

    try {
      /* 
        The scroll to active list item codeblock seems to only be working on smaller screen sizes i.e. tablet/phones, is this intentional?
        As of now it only targets the window scroll, which means its only automatically scrolling on smaller devices, since on desktop
        the menu has its own internal scrollbar inside the <nav /> element
      */
      const offset = scrollRef.current.getBoundingClientRect().top
      const rect = elem.getBoundingClientRect()
      const top = scrollRef.current.scrollTop + rect.top - offset
      if (window.scrollTo) {
        window.scrollTo({
          top,
          behavior: 'smooth',
        })
      } else {
        /* Typo or deprecated/old property that Typescript is not catching up on? */
        /* Property 'scrollTop' does not exist on type 'Window & typeof globalThis'. Did you mean 'scrollTo'? */
        //Code below used to be window.scrollTop = top
        window.scrollY = top
      }
    } catch (e) {
      console.log('Could not set scrollToActiveItem', e)
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') closeMenu()
  }

  /* Creation of menu items starts here */

  const nav = groupNavItems(
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
          title: menuTitle || title,
        }

        return <ListItem key={path} {...props} />
      }
    )

  return (
    <nav
      id="portal-sidebar-menu"
      aria-labelledby="toggle-sidebar-menu"
      className={classnames(
        navStyle,
        'dnb-scrollbar-appearance',
        isOpen && 'show-mobile-menu',
        isClosing && 'hide-mobile-menu'
      )}
      ref={scrollRef}
    >
      <MediaQuery when={{ min: 0, max: 'medium' }}>
        <Space left="large" top="large">
          <PortalToolsMenu
            /* className for PortalToolsMenu is currently required and not optional */
            className=""
            triggerAttributes={{
              text: 'Portal Tools',
              icon: 'chevron_right',
              icon_position: 'right',
            }}
            tooltipPosition="bottom"
          />
        </Space>
      </MediaQuery>
      <ul className="dev-grid">{nav}</ul>
    </nav>
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
  icon?: string
  isActive?: boolean
  isInsideActivePath?: boolean
  isInsideActiveCategory?: boolean
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
  icon,
  title,
  subheadings,
}: ListItemProps) {
  const { closeMenu } = useContext(SidebarMenuContext)
  const { skeleton } = useContext(Context)
  const ref = useRef(null)

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
          status ? `status-${status}` : null,
          className
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
        <Link
          to={path}
          onClick={closeMenu}
          className={classnames(
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
              <Icon icon={graphics[icon]} size="medium" />
            )}
            <span
              className={classnames(createSkeletonClass('font', skeleton))}
            >
              {title}
            </span>
          </span>
          {status && (
            <Badge space={{ right: 'xx-small' }} content={statusTitle} />
          )}
        </Link>
      </li>
      {/* Currently not nesting list items with an <ul/> inside <li/> as it breaks the styling for the time being */}
      {subheadings && (
        <>
          {subheadings.map((item) => (
            <ListItem key={item.path} {...item} />
          ))}
        </>
      )}
    </>
  )
}

type NavItem = {
  id: string
  parentId?: string
  active?: boolean
  isInsideActivePath?: boolean
  isInsideActiveCategory?: boolean
  icon?: string
  level?: number
  menuTitle?: string
  order?: number
  _order?: string
  path?: string
  status?: string
  title?: string
  subheadings?: NavItem[]
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
  const levelCache = {},
    subCache = {}

  const list = showAlwaysMenuItems
    .reduce((acc, cur) => acc.concat(navItems[cur]), []) // put in the sub parts
    .concat(navItems.items) // put inn the main parts
    // make items
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
      levelCache[item.level] = levelCache[item.level] || {}

      const parts = item.path.split('/').filter(Boolean)

      // Handle ordering when no order field is given
      const sub = parts.slice(0, -1).join('/')
      subCache[sub] = subCache[sub] || { count: 1000 }
      const count = subCache[sub].count++

      item._order = parts
        .reduce((acc, cur, i) => {
          if (!levelCache[item.level][cur]) {
            levelCache[item.level][cur] = item.order
              ? parseFloat(item.order) + 2000 // push manual ordering to the top
              : count
          }
          if (levelCache[i + 1]) {
            acc.push(levelCache[i + 1][cur])
          }
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
  const topLevelHeadings = []

  //Remove first and last slash from pathname to match path from graphql
  const currentPathName = location.pathname
    .replace(/\/$/g, '')
    .replace(/^\//g, '')

  /* Grouping all navItems correctly with only one loop through the array 
     making use of object reference to add subheadings to correct parent headings
     so it can be done with only one loop through
  */
  navItems.reduce<{ [id: string]: NavItem }>((hashmap, item) => {
    /* Using items url path as ID, it only works in this case, since we can deterimine the items grouping by the url path 
       Its solved this way since the id and parent.id from gatsby nodes does not seem to seem to relate to the structure in the SidebarMenu
       and therefor leads to wrong grouping if used
    */
    const itemId = item.path.replace(/\//g, '-')
    const parentId = item.path
      .replace(/\/[\w-]+$/g, '')
      .replace(/\//g, '-')

    const portalPath =
      location.pathname.split('/').filter(Boolean)[0] ?? ''
    const categoryPath = item.path.split('/').filter(Boolean)[1] ?? ''

    //Determine if item is active or inside active category or path, to add correct highlighting
    const isActive = item.path === currentPathName
    const isInsideActivePath = currentPathName.startsWith(item.path)
    const isInsideActiveCategory = currentPathName.startsWith(
      `${portalPath}/${categoryPath}`
    )

    //Add props for use in <ListItem />
    const hashItem = {
      ...item,
      id: itemId,
      parentId,
      isActive,
      isInsideActiveCategory,
      isInsideActivePath,
    }

    //Initialize parentItem in hashmap
    if (!(parentId in hashmap)) hashmap[parentId] = {} as NavItem

    //Initalizing subheadings property on parentItem if its not yet defined
    if (!hashmap[parentId]?.subheadings) hashmap[parentId].subheadings = []

    //Push item object reference to subheadings array on parentItem reference in hashmap
    hashmap[parentId].subheadings.push(hashItem)

    //Define item object reference in hashmap
    hashmap[itemId] = hashItem

    /* Add all toplevel heading object references to topLevelHeadings array
      so that we wont have to loop through the array a second time to sort out top level headings
    */
    if (item.level === 1) topLevelHeadings.push(hashmap[itemId])

    return hashmap
  }, {})

  return topLevelHeadings
}
