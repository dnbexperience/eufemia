/**
 * Sidebar with Menu
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Link from '../parts/Link'
import { StaticQuery, graphql } from 'gatsby'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import Context from '@dnb/eufemia/src/shared/Context'
import { SidebarMenuContext } from './SidebarMenuContext'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import { Space, Icon } from '@dnb/eufemia/src/components'
import { MediaQuery } from '@dnb/eufemia/src/shared'
import graphics from './SidebarGraphics'
import keycode from 'keycode'
import {
  setPageFocusElement,
  applyPageFocus,
} from '@dnb/eufemia/src/shared/helpers'
import PortalToolsMenu from './PortalToolsMenu'
import { navStyle } from './SidebarMenu.module.scss'

const showAlwaysMenuItems = [] // like "uilib" something like that

export default class SidebarLayout extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    showAll: PropTypes.bool,
  }
  static defaultProps = {
    showAll: false,
  }
  static contextType = SidebarMenuContext

  constructor(props) {
    super(props)
    this._scrollRef = React.createRef()
    setPageFocusElement('nav ul li.is-active a:nth-of-type(1)', 'sidebar')
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyDown)
    }
  }

  componentDidUpdate() {
    const { isOpen, isClosing } = this.context

    if (isOpen && !isClosing) {
      setTimeout(() => {
        this.scrollToActiveItem()
        applyPageFocus('sidebar')
      }, 300) // after animation is done
    } else if (isClosing) {
      setTimeout(() => {
        applyPageFocus('content')
      }, 300) // after animation is done - to make sure we can get the focus on h1
    }
  }

  scrollToActiveItem() {
    if (this._scrollRef.current) {
      const elem = this._scrollRef.current.querySelector('li.is-active')
      if (!elem) {
        return false
      }
      try {
        const offset = this._scrollRef.current.getBoundingClientRect().top
        const rect = elem.getBoundingClientRect()
        const top = this._scrollRef.current.scrollTop + rect.top - offset
        if (window.scrollTo) {
          window.scrollTo({
            top,
            behavior: 'smooth',
          })
        } else {
          window.scrollTop = top
        }
      } catch (e) {
        console.log('Could not set scrollToActiveItem', e)
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e) => {
    const { isOpen, toggleMenu } = this.context
    switch (keycode(e)) {
      case 'esc':
        if (isOpen) {
          toggleMenu()
        }
        break
    }
  }

  render() {
    const { location, showAll = false } = this.props

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
                    onOffsetTop: (offsetTop) =>
                      (this.offsetTop = offsetTop),
                  }

                  return (
                    <ListItem key={path} {...props}>
                      {menuTitle || title}
                    </ListItem>
                  )
                }
              )

            const { isOpen, isClosing } = this.context

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
                ref={this._scrollRef}
              >
                <MediaQuery when={{ min: 0, max: 'medium' }}>
                  <Space left="large" top="large">
                    <PortalToolsMenu
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
}

class ListItem extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    onOffsetTop: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
    level: PropTypes.number,
    nr: PropTypes.number,
    status: PropTypes.string,
    icon: PropTypes.string,
    active: PropTypes.bool,
    inside: PropTypes.bool,
  }
  static defaultProps = {
    className: null,
    active: false,
    inside: false,
    level: 0,
    nr: null,
    status: null,
    icon: null,
    onOffsetTop: null,
  }

  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  componentDidMount() {
    if (this.props.active && this.ref.current) {
      this.props.onOffsetTop(this.ref.current.offsetTop)
    }
  }

  render() {
    const {
      className,
      active,
      inside,
      to,
      level,
      nr,
      status,
      icon,
      children,
    } = this.props

    const statusTitle =
      status &&
      {
        new: 'New',
        beta: 'Beta',
        wip: 'Work in Progress',
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
        ref={this.ref}
        style={{
          '--delay': `${
            nr !== null && nr < 20 ? nr * 12 : 0 // random(1, 160)
          }ms`,
        }}
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
              className={classnames(
                createSkeletonClass('font', this.context.skeleton)
              )}
            >
              {children}
            </span>
          </span>
          {status && (
            <span
              className={classnames(
                'status-badge',
                createSkeletonClass('font', this.context.skeleton)
              )}
              title={statusTitle}
            >
              {status}
            </span>
          )}
        </Link>
      </li>
    )
  }
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
