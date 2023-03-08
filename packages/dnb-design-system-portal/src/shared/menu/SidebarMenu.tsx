/**
 * Sidebar with Menu
 *
 */

import React, { useContext, useEffect, useRef, ReactNode } from 'react'
import classnames from 'classnames'
import Link from '../parts/Link'
import { StaticQuery, graphql } from 'gatsby'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
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
  /* Temporary(?) replacement variable for the mystical this.offsetTop property */
  let offsetTop: number

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
      /* Is this codeblock suppose to scroll to the active list item inside the menu? 
         if so then it does not seem to be working, as its targeting the window and not the <SidebarMenu /> component
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
        window.scrollTop = top
      }
    } catch (e) {
      console.log('Could not set scrollToActiveItem', e)
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') closeMenu()
  }

  return (
    <>
      <StaticQuery
        query={graphql`
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
        `}
        render={({ allMdx, site: { pathPrefix } }) => {
          const currentPathname = location.pathname.replace(/(\/)$/, '')
          const currentPathnameList = currentPathname
            .split('/')
            .filter(Boolean)

          const menuItems = prepareNav({
            location,
            allMdx,
            showAll,
            pathPrefix,
          })
            .filter(({ title, menuTitle }) => title || menuTitle)
            .map((props) => {
              const path = `/${props.path.replace(/(\/)$/, '')}`

              // get the active item
              const active = currentPathname === path

              // check if a item path is inside another
              const inside = path
                .split('/')
                .filter(Boolean)
                .every((i) => currentPathnameList.includes(i))

              return { ...props, active, inside }
            })

            // mark also the rest of the same level as inside
            .map((curr, i, arr) => {
              const prev = arr[i - 1] ? arr[i - 1] : null

              // use 4 here, so the logic is the same in the CSS
              if (prev && curr.level >= 4) {
                if (prev.inside && curr.level >= prev.level) {
                  curr.inside = true
                }
              }
              return curr
            })

          let hasActive = menuItems.some(({ active }) => active)
          const currentPathnameOneLevelBack = !hasActive
            ? currentPathname
                .split('/')
                .filter(Boolean)
                .slice(0, -1)
                .join('/')
            : null

          const nav = menuItems
            // in case there was no active item
            // like inside /modal/demos and /modal/properties
            // then we make sure we get the most possible item
            // and set active on it – this way we get the correct color and aria-current
            .map((curr) => {
              if (!hasActive && curr.inside) {
                if (curr.path === currentPathnameOneLevelBack) {
                  curr.active = true
                  hasActive = true
                }
              }
              return curr
            })
            .map(
              (
                {
                  title,
                  menuTitle,
                  status,
                  icon,
                  path,
                  level,
                  active,
                  inside,
                },
                nr
              ) => {
                const props = {
                  level,
                  nr,
                  status,
                  icon,
                  active,
                  inside,
                  to: path,
                  onOffsetTop: (listItemOffsetTop: number) =>
                    /* Not sure if this does anything at the moment, since this.offsetTop is not used anywhere in this component */
                    (offsetTop = listItemOffsetTop),
                }

                return (
                  <ListItem key={path} {...props}>
                    {menuTitle || title}
                  </ListItem>
                )
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
        }}
      />
    </>
  )
}

type ListItemProps = {
  onOffsetTop?: (offsetTop: number) => number
  children: ReactNode | ReactNode[]
  className?: string
  to: string
  level?: number
  nr?: number
  status?: string
  icon?: string
  active?: boolean
  inside?: boolean
}

function ListItem({
  className = null,
  to,
  active = false,
  inside = false,
  level = 0,
  nr,
  status,
  icon,
  onOffsetTop,
  children,
}: ListItemProps) {
  const { skeleton } = useContext(Context)
  const ref = useRef(null)

  useEffect(() => {
    if ((!active && !ref?.current) || !onOffsetTop) return
    onOffsetTop(ref.current.offsetTop)
  }, [])

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

  if (active) {
    params['aria-current'] = true
  }

  return (
    <li
      className={classnames(
        'dnb-sidebar-menu',
        `l-${level}`,
        active && 'is-active', // use anchor hover style
        inside && 'is-inside',
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
        to={to}
        onClick={() => {
          resetLevels(1)
        }}
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
            {children}
          </span>
        </span>
        {status && (
          <Badge space={{ right: 'xx-small' }} content={statusTitle} />
        )}
      </Link>
    </li>
  )
}

const prepareNav = ({ location, allMdx, showAll, pathPrefix }) => {
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

      return { title, path: slug, level, order, _order: slug, ...rest }
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
