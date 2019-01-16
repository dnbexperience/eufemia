/**
 * Sidebar with Menu
 *
 */

import { StaticQuery, graphql } from 'gatsby'

import Link from '../parts/Link'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import React, { PureComponent } from 'react'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import {
  SidebarMenuConsumer,
  SidebarMenuContext
} from './SidebarMenuContext'

const Sidebar = styled.aside`
  position: fixed;

  /* lower than styled.main */
  z-index: 1;

  ul {
    /* has to be the same value as margin-left */
    width: 30vw;
    width: var(--aside-width);

    /* height of StickyMenuBar */
    height: calc(100vh - 4rem);
    margin: 4rem 0 0;

    /* some air we need */
    padding: 2rem 0 1rem;

    /* make the sidebar scrollable */
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  /*
    God for a mobile menu insted
    make sure that Content main "styled.main" gets the same max-width
  */
  @media only screen and (max-width: 50em) {
    &:not(.show-mobile-menu) {
      display: none;
    }
  }

  @media only screen and (max-width: 50em) {
    position: relative;
    ul {
      width: 100vw;
      max-height: none;
      overflow-y: visible;
    }
  }
`

const StyledListItem = styled.li`
  list-style: none;

  a {
    position: relative;
    padding: 0.5125em 0 0.45em; /* 0,0625 */

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span {
      line-height: 1rem;
    }
  }

  --level: 2vw;
  --level-offset: 4vw;

  @media only screen and (max-width: 50em) {
    --level: 1.3em;
  }

  &.l-1 a {
    padding-left: calc(var(--level-offset) + var(--level) * 1);
    font-weight: 700;
    font-size: 1.125em; /* 18 px */
  }
  &.l-2 a {
    padding-left: calc(var(--level-offset) + var(--level) * 2);
    font-weight: 600;
  }
  &.l-3 a {
    padding-left: calc(var(--level-offset) + var(--level) * 3);
    font-weight: 500;
  }
  &.l-4 a {
    padding-left: calc(var(--level-offset) + var(--level) * 4);
    font-weight: 400;
  }
  &.l-5 a {
    padding-left: calc(var(--level-offset) + var(--level) * 5);
    font-weight: 300;
  }
  &.l-6 a {
    padding-left: calc(var(--level-offset) + var(--level) * 6);
  }
  &.l-4 a,
  &.l-5 a,
  &.l-6 a {
    font-size: 0.875em;
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
    font-weight: 100;
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

const showAlwaysMenuItems = [] // like "uilib" som someting like that

export default class SidebarLayout extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    showAll: PropTypes.bool
  }
  static defaultProps = {
    showAll: false
  }
  static contextType = SidebarMenuContext
  state = {
    isOpen: false
  }

  constructor(props) {
    super(props)
    this.ulRef = React.createRef()
  }

  componentDidMount() {
    if (this.ulRef.current && this.offsetTop > 0) {
      if (typeof window !== 'undefined') {
        const sidebarPos = window.localStorage.getItem('sidebarPos')
          ? parseFloat(window.localStorage.getItem('sidebarPos'))
          : this.offsetTop
        this.ulRef.current.scrollTop = sidebarPos
        let delayBuff
        this.ulRef.current.onscroll = () => {
          clearTimeout(delayBuff)
          delayBuff = setTimeout(() => {
            try {
              window.localStorage.setItem(
                'sidebarPos',
                this.ulRef.current.scrollTop
              )
            } catch (e) {
              console.log('SidebarLayout error:', e)
            }
          }, 300)
        }
      }
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
                    # icon
                  }
                }
              }
            }
          }
        `}
        render={({ allMdx, site: { pathPrefix } }) => {
          const pathnameWithoutPrefix = location.pathname
            .replace(/(\/)$/, '')
            .replace(pathPrefix, '')

          const nav = prepareNav({
            location,
            allMdx,
            showAll,
            pathPrefix
          }).map(({ title, menuTitle, status, icon, path, level }, nr) => {
            const active =
              pathnameWithoutPrefix === path ||
              pathnameWithoutPrefix === path.replace(/(\/)$/, '')
            return (
              <ListItem
                key={path}
                level={level}
                nr={nr}
                status={status}
                icon={icon}
                to={`/${path}`}
                active={active}
                onOffsetTop={offsetTop => (this.offsetTop = offsetTop)}
              >
                {menuTitle || title}
              </ListItem>
            )
          })

          return (
            <>
              <Global
                styles={css`
                  :root {
                    --aside-width: calc(25vw + 5rem);
                  }
                `}
              />
              <SidebarMenuConsumer>
                {({ isOpen, isClosing }) => (
                  <Sidebar
                    className={classnames(
                      'dnb-style-selection',
                      isOpen && 'show-mobile-menu',
                      isClosing && 'hide-mobile-menu'
                    )}
                  >
                    <ul ref={this.ulRef}>{nav}</ul>
                  </Sidebar>
                )}
              </SidebarMenuConsumer>
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
    // icon: PropTypes.string,
    active: PropTypes.bool
  }
  static defaultProps = {
    className: null,
    active: false,
    level: 0,
    nr: null,
    status: null,
    // icon: null,
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
      to,
      level,
      nr,
      status,
      // icon,
      children
    } = this.props
    return (
      <StyledListItem
        className={classnames(
          `l-${level}`,
          active && 'dnb-hover-style', // use anchor hover style
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
          className="dnb-no-anchor-underline dnb-no-anchor-hover"
        >
          <span>{children}</span>
          {status && (
            <span
              className="status-badge"
              title={
                ' ' +
                {
                  wip: 'Working in Progress',
                  dep: 'Deprecated',
                  imp: 'Needs improvement'
                }[status]
              }
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
