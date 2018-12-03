/**
 * Sidebar with Menu
 *
 */

import { StaticQuery, graphql } from 'gatsby'

import Link from '../parts/Link'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import React, { PureComponent } from 'react'
import styled, { injectGlobal, cx } from 'react-emotion'
import {
  SidebarMenuConsumer,
  SidebarMenuContext
} from './SidebarMenuContext'

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
              // ignore throwing error here
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
                    order
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
          }).map(({ title, path, level }, nr) => {
            const active =
              pathnameWithoutPrefix === path ||
              pathnameWithoutPrefix === path.replace(/(\/)$/, '')
            return (
              <ListItem
                key={path}
                nr={nr}
                to={`/${path}`}
                active={active}
                onOffsetTop={offsetTop => (this.offsetTop = offsetTop)}
                className={cx(`l-${level}`, active && 'active')}
              >
                {title}
              </ListItem>
            )
          })

          return (
            <SidebarMenuConsumer>
              {({ isOpen, isClosing }) => (
                <Sidebar
                  className={classnames(
                    isOpen && 'show-mobile-menu',
                    isClosing && 'hide-mobile-menu'
                  )}
                >
                  <ul ref={this.ulRef}>{nav}</ul>
                </Sidebar>
              )}
            </SidebarMenuConsumer>
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
    className: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    nr: PropTypes.number,
    active: PropTypes.bool
  }
  static defaultProps = {
    active: false,
    nr: null,
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
    const { className, to, nr, children } = this.props
    return (
      <StyledListItem
        className={className}
        innerRef={this.ref}
        style={{
          '--delay': `${nr !== null ? nr * 12 : random(1, 160)}ms`
        }}
      >
        <Link to={to} className="no-underline no-underline-hover">
          {children}
        </Link>
      </StyledListItem>
    )
  }
}

const StyledListItem = styled.li`
  list-style: none;

  a {
    position: relative;
    padding: 0.45em 0 0.45em;

    text-decoration: none;

    color: var(--color-sea-green);

    &:active,
    &:hover {
      color: var(--color-ocean-green);
    }
    &:active {
      opacity: 0.7;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;

    &::before {
      /* Change Anker Style */
      bottom: auto;
    }

    /* external link icon */
    svg {
      float: right;
      margin-right: 1em;
    }
  }

  --level: 2vw;
  --level-offset: 4vw;

  @media only screen and (max-width: 50em) {
    --level: 1.3em;
  }

  &.l-1 a {
    font-weight: 700;
    padding-left: calc(var(--level-offset) + var(--level) * 1);
  }
  &.l-2 a {
    font-weight: 600;
    padding-left: calc(var(--level-offset) + var(--level) * 2);
  }
  &.l-3 a {
    font-weight: 500;
    padding-left: calc(var(--level-offset) + var(--level) * 3);
  }
  &.l-4 a {
    font-weight: 400;
    padding-left: calc(var(--level-offset) + var(--level) * 4);
  }
  &.l-5 a {
    font-weight: 300;
    padding-left: calc(var(--level-offset) + var(--level) * 5);
  }
  &.l-6 a {
    padding-left: calc(var(--level-offset) + var(--level) * 6);
  }

  &.active a {
    color: var(--color-ocean-green);

    &::after {
      content: '';
      position: absolute;

      display: flex;

      height: 60%;
      width: 4px;
      max-height: auto;

      /* border-radius: 50%; */
      background: var(--color-ocean-green);
      transform: translate(-0.6em, -2px);

      /* Reset Anker Style */
      left: auto;
      right: auto;
      bottom: auto;
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
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(0, -80vh, 0);
    }
  }

  .show-mobile-menu & {
    opacity: 0;
    animation: show-mobile-menu 600ms cubic-bezier(0.19, 1, 0.22, 1) 1
      var(--delay) forwards;
  }
  .hide-mobile-menu & {
    opacity: 1;
    animation: hide-mobile-menu 280ms cubic-bezier(0.19, 1, 0.22, 1) 1
      calc(var(--delay) / 2) forwards;
  }
`

injectGlobal`
  :root {
    --aside-width: calc(25vw + 5rem);
  }
`

const Sidebar = styled.aside`
  position: fixed;

  /* lower than styled.main */
  z-index: 1;

  /* height of StickyMenuBar */
  margin-top: 4rem;

  ul {
    width: 30vw;
    width: var(
      --aside-width
    ); /* has to be the same value as margin-left */
    overflow-x: hidden;
    overflow-y: auto;

    /* height of header and footer */
    min-height: 20vh;
    max-height: calc(100vmin - 4em - 10px);

    margin: 0;
    padding: 0;
    padding-top: 2em;
    padding-bottom: 1em;
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

  ${'' /* We may make a overlay menu later, and use this approach */}
  ${'' /* &.show-mobile-menu {
    position: absolute;
    z-index: 3;
    top: 40rem;
    height: 100vh;
    background-color: white;
  } */}

  @media only screen and (max-width: 50em) {
    position: relative;
    ul {
      width: 100vw;
      max-height: none;
      overflow-y: visible;
    }
  }
`

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
          fields: { slug, title, order }
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

      return { title, path: slug, level, order, _order: slug }
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
