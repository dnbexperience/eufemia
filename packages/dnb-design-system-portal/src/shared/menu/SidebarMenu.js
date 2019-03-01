/**
 * Sidebar with Menu
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Link from '../parts/Link'
import { StaticQuery, graphql } from 'gatsby'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { SidebarMenuContext } from './SidebarMenuContext'
// import { MainMenuToggleButton } from './ToggleMainMenu'
import { Icon } from 'dnb-ui-lib/src'
import graphics from './SidebarGraphics'
import keycode from 'keycode'
import {
  setPageFocusElement,
  applyPageFocus
} from 'dnb-ui-lib/src/shared/helpers'

const StyledListItem = styled.li`
  list-style: none;
  margin: 0;

  a {
    position: relative;
    padding: 0;
    height: 2.5rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    transform: translateY(1px);

    &:hover {
      color: var(--color-black);
      background-color: transparent;
    }
  }
  &:first-of-type {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    background-color: transparent;
  }

  /* 2.5rem - but we dont want it to be responsive */
  --level-icon-adjust: -40px;
  --level: 2vw;

  @media (max-width: 50em) {
    --level: 1.3rem;
  }

  &.l-1 a {
    margin-left: var(--level-icon-adjust);
    padding-left: calc(var(--level-offset) + var(--level) * 2);
    height: 4rem;
    color: var(--color-ocean-green);
    font-weight: var(--font-weight-demi);
    font-size: var(--font-size-medium);
  }
  &.l-2 {
    a {
      padding-left: calc(var(--level-offset) + var(--level) * 2);
      height: 3.5rem;

      .dnb-icon {
        margin-right: 1rem;
        margin-left: var(--level-icon-adjust);
        color: var(--color-black-80);
      }
    }
    &.is-inside {
      background-color: var(--color-mint-green-12);
      font-weight: var(--font-weight-demi);
    }
  }

  &.l-3 {
    font-size: 0.875rem; /* small size */
    a {
      padding-left: calc(var(--level-offset) + var(--level) * 3);
    }
    &.is-inside {
      background-color: var(--color-sea-green-alt-30);
      font-weight: var(--font-weight-demi);
    }
  }

  &.l-4 a {
    padding-left: calc(var(--level-offset) + var(--level) * 4);
  }
  &.l-5 a {
    padding-left: calc(var(--level-offset) + var(--level) * 5);
  }
  &.l-6 a {
    padding-left: calc(var(--level-offset) + var(--level) * 6);
  }

  &.l-4,
  &.l-5,
  &.l-6 {
    font-size: 0.875rem; /* small size */
    &.is-inside {
      background-color: var(--color-mint-green-12);
    }
  }

  &.l-1,
  &.l-2,
  &.l-3,
  &.l-4,
  &.l-5,
  &.l-6 {
    &.is-active {
      background-color: var(--color-mint-green-50);
    }
  }

  @keyframes show-mobile-menu {
    0% {
      opacity: 0;
      transform: translate3d(0, -20%, 0);
    }
    40% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes hide-mobile-menu {
    0% {
      opacity: 100;
      transform: translate3d(0, 0, 0);
    }
    60% {
      opacity: 0.4;
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, -20%, 0);
    }
  }

  .show-mobile-menu & {
    opacity: 0;
    animation: show-mobile-menu 600ms cubic-bezier(0.19, 1, 0.22, 1) 1
      var(--delay) forwards;
  }
  .hide-mobile-menu & {
    opacity: 1;
    animation: hide-mobile-menu 300ms cubic-bezier(0.19, 1, 0.22, 1) 1
      calc(10ms - var(--delay)) forwards;
  }

  .status-badge {
    margin-right: 1rem;

    display: flex;
    justify-content: center;
    align-items: baseline; /* then we can set line-height */

    font-size: 7px; /* safari handles rem value incorrectly */
    line-height: 1.3125rem; /* same as height + 1px */
    font-weight: var(--font-weight-default);
    text-align: center;
    text-transform: uppercase;
    color: var(--color-black);

    /* bg */
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 50%;

    background-color: var(--color-sea-green-alt-30);
    &::after {
      content: '';
      position: absolute;
      z-index: 1;
    }
  }
  &.status-dep .status-badge {
    color: var(--color-cherry-red);
    background-color: var(--color-cherry-red-80);
  }
  &.status-imp .status-badge {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`

const Sidebar = styled.aside`
  position: fixed;

  /* lower than styled.main */
  z-index: 1;

  /* height of StickyMenuBar */
  height: calc(100vh - 4rem);
  margin: 4rem 0 0;

  /* make the sidebar scrollable */
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;

  /* make the sidemenu accsible for screenreaders on mobile devices  */
  @media (max-width: 50em) {
    position: relative;
    height: auto;
    overflow: auto;
  }

  background-color: var(--color-white);

  ul {
    /* some air we need */
    padding: 2rem 0 1rem;

    /* has to be the same value as margin-left */
    width: 30vw;
    width: var(--aside-width);
  }

  --level-offset: 3vw;
  @media (max-width: 50em) {
    --level-offset: 2rem;
  }

  /*
    God for a mobile menu insted
    make sure that Content main "styled.main" gets the same max-width
  */
  @media (max-width: 50em) {
    &:not(.show-mobile-menu) {
      display: none;
    }
  }

  @media (max-width: 50em) {
    position: relative;
    ul {
      width: 100vw;
      max-height: none;
      overflow-y: visible;
    }
  }

  .main-menu-toggle {
    margin-left: var(--level-offset);

    .dnb-icon:nth-of-type(1) {
      color: var(--color-sea-green);
      margin-right: 0.5rem;

      &.dnb-icon--small {
        margin-left: 0.5rem;
      }
    }

    &.dnb-button__text {
      color: var(--color-sea-green);
    }
    &.dnb-button:hover {
      color: var(--color-black);
      .dnb-button__text,
      .dnb-icon {
        color: inherit;
      }
    }

    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`

const showAlwaysMenuItems = [] // like "uilib" som someting like that

export default class SidebarLayout extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    showAll: PropTypes.bool
  }
  static defaultProps = {
    showAll: false
  }

  constructor(props) {
    super(props)
    this._scrollRef = React.createRef()
    setPageFocusElement(
      // '.toggle-sidebar-menu',
      'html[data-whatintent=mouse] aside ul li.is-active a:nth-of-type(1), html[data-whatintent=keyboard] .toggle-sidebar-menu',
      'sidebar'
    )
    setPageFocusElement(
      'aside ul li.is-active a:nth-of-type(1)',
      'sidebar-tab'
    )
  }

  componentDidMount() {
    // remember last scroll position
    if (this._scrollRef.current) {
      if (typeof window !== 'undefined') {
        const sidebarPos = window.localStorage.getItem('sidebarPos')
          ? parseFloat(window.localStorage.getItem('sidebarPos'))
          : this.offsetTop
        let delayBuff
        this._scrollRef.current.scrollTop = sidebarPos
        this._scrollRef.current.onscroll = () => {
          clearTimeout(delayBuff)
          delayBuff = setTimeout(() => {
            try {
              window.localStorage.setItem(
                'sidebarPos',
                this._scrollRef.current.scrollTop
              )
            } catch (e) {
              console.log('SidebarLayout error:', e)
            }
          }, 300)
        }
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyDown)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (!this.isOpen) {
      this.hadFirstTab = false
      return
    }
    switch (keycode(e)) {
      case 'tab':
        // on first tab
        if (!this.hadFirstTab) {
          this.hadFirstTab = true
          applyPageFocus('sidebar-tab')
        }
        break
      case 'esc':
        this.toggleMenu()
        break
    }
  }

  render() {
    const { location, showAll = false } = this.props
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              pathPrefix
            }
            allMdx(
              # limit: 2
              # sort: { fields: [frontmatter___order], order: ASC }
              filter: { frontmatter: { draft: { ne: true } } }
            ) {
              edges {
                node {
                  fields {
                    slug
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
            .filter(i => i)

          const nav = prepareNav({
            location,
            allMdx,
            showAll,
            pathPrefix
          })
            .filter(({ title, menuTitle }) => title || menuTitle)

            .map(props => {
              // get the active item
              const active =
                currentPathname === props.path ||
                currentPathname === props.path.replace(/(\/)$/, '')

              // check if a item path is inside another
              const inside = props.path
                .split('/')
                .filter(i => i)
                .every(i => currentPathnameList.includes(i))

              return { ...props, active, inside }
            })

            // mark also the rest of the same level as inside
            .map((curr, i, arr) => {
              const prev = arr[i - 1] ? arr[i - 1] : null
              if (prev && curr.level >= 4) {
                if (prev.inside && curr.level >= prev.level) {
                  curr.inside = true
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
                  inside
                },
                nr
              ) => {
                const props = {
                  level,
                  nr,
                  status,
                  icon,
                  active,
                  ['aria-selected']: active,
                  inside,
                  to: path,
                  onOffsetTop: offsetTop => (this.offsetTop = offsetTop)
                }

                return (
                  <ListItem key={path} {...props}>
                    {menuTitle || title}
                  </ListItem>
                )
              }
            )

          return (
            <>
              <Global
                styles={css`
                  :root {
                    --aside-width: calc(25vw + 5rem);
                  }
                `}
              />
              <SidebarMenuContext.Consumer>
                {({ isOpen, isClosing, toggleMenu }) => {
                  this.isOpen = isOpen
                  this.toggleMenu = toggleMenu
                  isOpen &&
                    !isClosing &&
                    setTimeout(() => {
                      applyPageFocus('sidebar')
                    }, 100)
                  return (
                    <Sidebar
                      className={classnames(
                        // 'dnb-core-style',
                        isOpen && 'show-mobile-menu',
                        isClosing && 'hide-mobile-menu'
                      )}
                      ref={this._scrollRef}
                    >
                      {/* <MainMenuToggleButton /> */}
                      <nav
                        role="navigation"
                        aria-label="Section Content Menu"
                      >
                        <ul className="dev-grid">{nav}</ul>
                      </nav>
                      {isOpen && (
                        <Global
                          styles={css`
                            .dnb-app-content {
                              display: none !important;
                            }
                          `}
                        />
                      )}
                    </Sidebar>
                  )
                }}
              </SidebarMenuContext.Consumer>
            </>
          )
        }}
      />
    )
  }
}

class ListItem extends PureComponent {
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
    inside: PropTypes.bool
  }
  static defaultProps = {
    className: null,
    active: false,
    inside: false,
    level: 0,
    nr: null,
    status: null,
    icon: null,
    onOffsetTop: null
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
      children
    } = this.props

    const statusTitle =
      status &&
      {
        wip: 'Working in Progress',
        dep: 'Deprecated',
        imp: 'Needs improvement'
      }[status]

    return (
      <StyledListItem
        className={classnames(
          `l-${level}`,
          active && 'is-active', // use anchor hover style
          inside && 'is-inside',
          status ? `status-${status}` : null,
          className
        )}
        innerRef={this.ref}
        style={{
          '--delay': `${nr !== null ? nr * 12 : random(1, 160)}ms`
        }}
      >
        <Link
          to={to}
          className={classnames(
            'dnb-anchor',
            'dnb-anchor-no-underline',
            'dnb-anchor-no-radius',
            'dnb-anchor-no-hover',
            icon && graphics[icon] ? 'has-icon' : null
          )}
        >
          <span>
            {icon && graphics[icon] && (
              <Icon
                icon={graphics[icon]}
                size="medium"
                alt={`${icon} graphic`}
                aria-hidden
              />
            )}
            {children}
          </span>
          {status && (
            <span
              className="status-badge"
              title={statusTitle}
              aria-label={statusTitle}
            >
              {status}
            </span>
          )}
        </Link>
      </StyledListItem>
    )
  }
}

const prepareNav = ({ location, allMdx, showAll, pathPrefix }) => {
  const pathname = location.pathname.replace(/(\/)$/, '')
  let first = null
  if (showAll === false) {
    const prefix = pathPrefix ? pathPrefix.replace(/^(\/)/, '') : null
    first = pathname.split('/').filter(p => p && p !== prefix)[0]
  }

  const navItems = allMdx.edges
    .map(
      ({
        node: {
          fields: { slug }
        }
      }) => slug
    )
    .filter(slug => slug !== '/')
    // preorder
    .sort()
    .reduce(
      (acc, cur) => {
        const prefix = cur.split('/').filter(p => p)[0]

        if (showAll === false) {
          if (prefix === first) {
            return { ...acc, items: [...acc.items, cur] }
          } else {
            return { ...acc, [cur]: [cur] }
          }
        } else {
          if (showAlwaysMenuItems.find(url => url === cur)) {
            return { ...acc, [cur]: [cur] }
          }

          if (
            prefix &&
            showAlwaysMenuItems.find(url => url === `/${prefix}`)
          ) {
            return {
              ...acc,
              [`/${prefix}`]: [...acc[`/${prefix}`], cur]
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
    .map(slugPath => {
      const {
        node: {
          fields: { slug, title, order, ...rest }
        }
      } = allMdx.edges.find(
        ({
          node: {
            fields: { slug }
          }
        }) => slug === slugPath
      )

      const level = slug.split('/').filter(p => p).length
      level > countLevels ? (countLevels = level) : countLevels

      return { title, path: slug, level, order, _order: slug, ...rest }
    })

    // prepare items, make sure we forward order for sub paths, if needed
    .map(item => {
      const parts = item.path.split('/').filter(p => p)
      const sub = parts.slice(0, parts.length - 1).join('/')

      subCache[sub] = subCache[sub] || {
        count: 1
      }
      levelCache[item.level] = levelCache[item.level] || {}
      const count = subCache[sub].count++

      item._order = parts
        .reduce((acc, cur, i) => {
          if (!levelCache[item.level][cur])
            levelCache[item.level][cur] = item.order
              ? parseFloat(item.order) + 1000 // push manual ordering to the top
              : count
          acc.push(levelCache[i + 1][cur])
          return acc
        }, [])
        .join('/')

      return item
    })

  list
    // reorder regarding to potensial manua defined order
    .sort(({ _order: oA }, { _order: oB }) =>
      oA < oB ? -1 : oA > oB ? 1 : 0
    )
  return list
}

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)
