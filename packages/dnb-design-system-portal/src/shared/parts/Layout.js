/**
 * Page Component
 *
 */

import { pageFocus } from 'dnb-ui-lib/src/shared/tools'
import React, { PureComponent } from 'react'
import { Link } from 'gatsby'

import PropTypes from 'prop-types'
import Sidebar from '../menu/SidebarMenu'
import StickyMenuBar from '../menu/StickyMenuBar'
import { markdownStyle } from './Markdown'
import styled from '@emotion/styled'
import classnames from 'classnames'
import { buildVersion } from '../../../package.json'
import { SidebarMenuProvider } from '../menu/SidebarMenuContext'
// import ToggleGrid from '../menu/ToggleGrid'

class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  componentDidMount() {
    pageFocus(this._ref.current)
  }

  render() {
    const { children, location } = this.props

    if (/fullscreen/.test(location.search)) {
      return (
        <div className="is-fullscreen">
          {/* Load the StickyMenuBar to make use of the grid demo */}
          <StickyMenuBar preventBarVisibility={true} />
          <Content
            tabIndex="-1"
            className="fullscreen-page"
            innerRef={this._ref}
          >
            <MaxWidth className="dnb-page-content-inner">
              {children}
            </MaxWidth>
          </Content>
          <Footer />
        </div>
      )
    }

    return (
      <SidebarMenuProvider>
        <StickyMenuBar />
        <Wrapper className="content-wrapper">
          <Sidebar location={location} showAll={false} />
          <Content tabIndex="-1" innerRef={this._ref}>
            <MaxWidth className="dnb-page-content-inner">
              {children}
              <Footer />
            </MaxWidth>
          </Content>
        </Wrapper>
      </SidebarMenuProvider>
    )
  }
}

export default Layout

const Wrapper = styled.div`
  position: relative;
  z-index: 2; /* one less than "is-overlay" */
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 50rem) {
    display: block;
  }
`

const Content = ({ className, children }) => (
  <Main
    className={classnames(
      'dnb-style',
      'dnb-page-content',
      'dnb-no-focus',
      className
    )}
    css={markdownStyle}
  >
    {children}
  </Main>
)
Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
Content.defaultProps = {
  className: null
}

const Main = styled.main`
  position: relative;
  z-index: 2; /* heigher than styled.aside */

  display: flex;
  flex-grow: 1;
  justify-content: center;

  width: 100%;
  min-height: calc(100vh - 4rem); /* height of StickyMenuBar */
  overflow: visible;

  margin-top: 5rem; /* height of StickyMenuBar - 1px border */
  margin-left: 30vw; /* fallback */
  margin-left: var(--aside-width);
  padding: 0;

  .dnb-page-content-inner {
    padding: 2rem 5vw 2rem;
  }

  /* fix overscroll issue on top */
  &::before {
    content: '';
    position: absolute;
    top: -5rem;
    left: -1px;
    height: 5rem;
    width: 100%;
  }

  &,
  &::before {
    background-color: var(--color-black-background);
    border-left: 1px solid var(--color-black-border);
  }

  /* make sure that Sidebar aside "styled.aside" gets the same max-width */
  @media only screen and (max-width: 50rem) {
    margin-left: 0;
    padding-left: 0;
  }

  &.fullscreen-page {
    margin: 0;
    border: none;
  }
`

const MaxWidth = styled.div`
  max-width: 100%;
  width: 50vw;
  padding: 0 2rem;

  @media only screen and (max-width: 120rem) {
    width: 100%;
    position: relative;
  }
`

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 2; /* 1 heigher than aside */

  margin-top: 3rem;
  padding: 1rem 0;

  border-top: 1px solid var(--color-black-border);
  text-align: left;

  .is-fullscreen & {
    padding: 1rem;
    background: var(--color-mint-green-12);
  }

  a {
    margin-left: 1rem;
  }

  .toggle-grid {
    margin-left: 1rem;
  }
`
const Footer = () => (
  <FooterWrapper>
    <small>
      Last Portal update: {buildVersion}
      <Link to="/license" className="dnb-no-anchor-underline">
        Copyright (c) 2018-present DNB.no
      </Link>
    </small>
    {/* <ToggleGrid /> */}
  </FooterWrapper>
)
