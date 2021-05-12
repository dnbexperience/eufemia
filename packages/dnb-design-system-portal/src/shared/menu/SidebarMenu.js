/**
 * Sidebar with Menu
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Link from '../parts/Link'
import { StaticQuery, graphql } from 'gatsby'
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import Context from '@dnb/eufemia/src/shared/Context'
import { SidebarMenuContext } from './SidebarMenuContext'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import { Icon } from '@dnb/eufemia/src/components'
import graphics from './SidebarGraphics'
import keycode from 'keycode'
import {
  setPageFocusElement,
  applyPageFocus,
} from '@dnb/eufemia/src/shared/helpers'
import PortalToolsMenu from './PortalToolsMenu'

const PortalToolsMenuMedia = styled(PortalToolsMenu)`
  @media screen and (min-width: 50em) {
    display: none;
  }
`

const StyledListItem = styled.li`
  list-style: none;
  margin: 0;

  .dnb-anchor {
    position: relative;
    padding: 0;
    height: 2.5rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    transform: translateY(1px);
    color: var(--color-emerald-green);
    background-color: inherit;
    font-size: inherit;

    &:hover {
      color: var(--color-black);
      background-color: transparent;
    }
  }

  .show-mobile-menu & {
    opacity: 0.3;
    animation: show-mobile-menu 600ms cubic-bezier(0.19, 1, 0.22, 1) 1
      var(--delay) forwards;
  }
  .hide-mobile-menu & {
    opacity: 1;
    animation: hide-mobile-menu 300ms cubic-bezier(0.19, 1, 0.22, 1) 1
      calc(10ms - var(--delay)) forwards;
  }

  &:first-of-type {
    margin-bottom: 1rem;
    font-size: var(--font-size-large);
    background-color: transparent;
  }

  html:not([dev-grid]) & {
    background-color: var(--color-white);
  }

  &.l-1 .dnb-anchor {
    margin-left: var(--level-icon-adjust);
    padding-left: calc(var(--level-offset) + var(--level) * 2);
    height: 4rem;
    color: var(--color-ocean-green);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-large);
  }
  &.l-2 {
    .dnb-anchor {
      padding-left: calc(var(--level-offset) + var(--level) * 2);
      height: 3.5rem;

      .dnb-icon {
        margin-right: 1rem;
        margin-left: var(--level-icon-adjust);
        color: var(--color-black-80);
      }
    }
    &.is-inside {
      html:not([dev-grid]) & {
        background-color: var(--color-mint-green-12);
      }
      font-weight: var(--font-weight-medium);
    }
  }

  &.l-3 {
    font-size: var(--font-size-small); /* small size */
    .dnb-anchor {
      padding-left: calc(var(--level-offset) + var(--level) * 3);
    }
    &.is-inside {
      html:not([dev-grid]) & {
        background-color: var(--color-sea-green-30);
      }
      font-weight: var(--font-weight-medium);
    }
  }

  &.l-4 .dnb-anchor {
    padding-left: calc(var(--level-offset) + var(--level) * 4);
  }
  &.l-5 .dnb-anchor {
    padding-left: calc(var(--level-offset) + var(--level) * 5);
  }
  &.l-6 .dnb-anchor {
    padding-left: calc(var(--level-offset) + var(--level) * 6);
  }

  &.l-4,
  &.l-5,
  &.l-6 {
    font-size: var(--font-size-small); /* small size */
    &.is-inside {
      html:not([dev-grid]) & {
        background-color: var(--color-mint-green-12);
      }
    }
  }

  &.l-1,
  &.l-2,
  &.l-3,
  &.l-4,
  &.l-5,
  &.l-6 {
    &.is-active {
      html:not([dev-grid]) & {
        background-color: var(--color-mint-green-50);
      }
    }
  }

  .dnb-anchor:focus:not(:active) {
    color: var(--color-white);
    svg {
      color: var(--color-white);
    }
    background-color: var(--color-emerald-green);
  }

  @keyframes show-mobile-menu {
    0% {
      opacity: 0.3;
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
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    60% {
      opacity: 0.5;
      transform: translate3d(0, 0, 0);
    }
    100% {
      opacity: 0.3;
      transform: translate3d(0, -20%, 0);
    }
  }

  .status-badge {
    margin-right: 1rem;

    display: flex;
    justify-content: center;
    align-items: baseline; /* then we can set line-height */

    font-size: 0.4375rem; /* safari handles rem value incorrectly */
    line-height: 1.3125rem; /* same as height + 1px */
    font-weight: var(--font-weight-basis);
    text-align: center;
    text-transform: uppercase;
    color: var(--color-black);

    /* bg */
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 50%;

    background-color: var(--color-mint-green-25);
    &::after {
      content: '';
      position: absolute;
      z-index: 1;
    }
  }
  &.status-dep .status-badge {
    color: var(--color-black-80);
    background-color: var(--color-fire-red-8);
  }
  &.status-new .status-badge {
    color: var(--color-sea-green);
    background-color: transparent;
  }
  &.status-beta .status-badge {
    color: var(--color-fire-red);
    background-color: transparent;
  }
  &.status-imp .status-badge {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`

const Navigation = styled.nav`
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
  -ms-overflow-style: none;

  /* make the sidemenu accessible for screen readers on mobile devices  */
  @media screen and (max-width: 50em) {
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

  /*
    God for a mobile menu instead
    make sure that Content main "styled.main" gets the same max-width
  */
  @media screen and (max-width: 50em) {
    &:not(.show-mobile-menu) {
      display: none;
    }
  }

  @media screen and (max-width: 50em) {
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
    // remember last scroll position
    if (this._scrollRef.current) {
      if (typeof window !== 'undefined') {
        let delayBuff
        this.scrollToLastPosition()

        this._scrollRef.current.onscroll = (e) => {
          if (this.busySettingNewPos) return
          clearTimeout(delayBuff)
          delayBuff = setTimeout(() => {
            try {
              window.localStorage.setItem('sidebarPos', e.target.scrollTop)
            } catch (e) {
              console.log('SidebarLayout error:', e)
            }
          }, 100)
        }
      }
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.handleKeyDown)
    }
  }

  getLastPosition() {
    if (typeof window !== 'undefined') {
      try {
        return window.localStorage.getItem('sidebarPos')
          ? parseFloat(window.localStorage.getItem('sidebarPos'))
          : this.offsetTop
      } catch (e) {
        return 0
      }
    }
  }

  scrollToLastPosition() {
    if (this._scrollRef.current) {
      this.busySettingNewPos = true
      const lastPos = this.getLastPosition()
      if (lastPos > 0) {
        this._scrollRef.current.scrollTop = lastPos
      } else {
        this.scrollToActiveItem()
      }
      setTimeout(() => {
        this.busySettingNewPos = false
      }, 10)
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
    switch (keycode(e)) {
      case 'esc':
        if (this.isOpen) {
          this.toggleMenu()
        }
        break
    }
  }

  render() {
    const { location, showAll = false } = this.props

    return (
      <>
        <Global
          styles={css`
            :root {
              --level-offset: 3vw;
              @media screen and (max-width: 50em) {
                --level-offset: 2rem;
              }

              --delay: 0; /* polyfill fallback */

              /* stylelint-disable */
              --aside-width: 30vw; /* IE fix */
              --aside-width: calc(25vw + 5rem);
              /* stylelint-enable */

              /* 2.5rem - but we don't want it to be responsive */
              --level-icon-adjust: -40px;
              --level: 2vw;

              @media screen and (max-width: 50em) {
                --level: 1.3rem;
              }
            }
          `}
        />
        <StaticQuery
          query={graphql`
            query {
              site {
                pathPrefix
              }
              allMdx(
                # limit: 2
                # sort: { fields: [frontmatter___order], order: ASC }
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
              .filter((i) => i)

            const nav = prepareNav({
              location,
              allMdx,
              showAll,
              pathPrefix,
            })
              .filter(({ title, menuTitle }) => title || menuTitle)

              .map((props) => {
                const path = `/${props.path}`

                // get the active item
                const active =
                  currentPathname === path ||
                  currentPathname === path.replace(/(\/)$/, '')

                // check if a item path is inside another
                const inside = path
                  .split('/')
                  .filter((i) => i)
                  .every((i) => currentPathnameList.includes(i))

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

            const { isOpen, isClosing, toggleMenu } = this.context

            this.isOpen = isOpen
            this.toggleMenu = toggleMenu
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

            return (
              <>
                <Navigation
                  id="portal-sidebar-menu"
                  aria-labelledby="toggle-sidebar-menu"
                  className={classnames(
                    'dnb-scrollbar-appearance',
                    isOpen && 'show-mobile-menu',
                    isClosing && 'hide-mobile-menu'
                  )}
                  ref={this._scrollRef}
                >
                  <PortalToolsMenuMedia
                    trigger_text="Portal Tools"
                    trigger_icon="chevron_right"
                    trigger_icon_position="right"
                    left="large"
                    top="large"
                  />
                  <ul className="dev-grid">{nav}</ul>
                  {isOpen && (
                    <Global
                      styles={css`
                        .dnb-app-content {
                          display: none !important;
                        }
                      `}
                    />
                  )}
                </Navigation>
              </>
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
      <StyledListItem
        className={classnames(
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
        const prefix = cur.split('/').filter((p) => p)[0]

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

      const level = slug.split('/').filter((p) => p).length
      level > countLevels ? (countLevels = level) : countLevels

      return { title, path: slug, level, order, _order: slug, ...rest }
    })

    // prepare items, make sure we forward order for sub paths, if needed
    .map((item) => {
      const parts = item.path.split('/').filter((p) => p)
      const sub = parts.slice(0, parts.length - 1).join('/')

      subCache[sub] = subCache[sub] || {
        count: 1,
      }
      levelCache[item.level] = levelCache[item.level] || {}
      const count = subCache[sub].count++

      item._order = parts
        .reduce((acc, cur, i) => {
          if (!levelCache[item.level][cur]) {
            levelCache[item.level][cur] = item.order
              ? parseFloat(item.order) + 1000 // push manual ordering to the top
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

// const random = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min)
