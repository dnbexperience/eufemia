/**
 * Page Component
 *
 */

import { setPageFocusElement } from 'dnb-ui-lib/src/shared/tools'
import React, { PureComponent } from 'react'
import { Link } from 'gatsby'

import PropTypes from 'prop-types'
import MainMenu from '../menu/MainMenu'
import Sidebar from '../menu/SidebarMenu'
import StickyMenuBar from '../menu/StickyMenuBar'
import { markdownStyle } from './Markdown'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/core'
import classnames from 'classnames'
import { buildVersion } from '../../../package.json'
import { MainMenuProvider } from '../menu/MainMenuContext'
import { SidebarMenuProvider } from '../menu/SidebarMenuContext'

class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired
  }
  componentDidMount() {
    // gets aplyed on "onRouteUpdate"
    setPageFocusElement('.dnb-app-content h1:nth-of-type(1)', 'content')
  }
  render() {
    const { children, location } = this.props

    if (/fullscreen/.test(location.search)) {
      return (
        <div className="is-fullscreen">
          {/* Load the StickyMenuBar to make use of the grid demo */}
          <StickyMenuBar preventBarVisibility={true} />
          <Content className="fullscreen-page">
            <MaxWidth className="dnb-app-content-inner">
              {children}
            </MaxWidth>
          </Content>
          <Footer />
        </div>
      )
    }

    return (
      <MainMenuProvider>
        <SidebarMenuProvider>
          <Global styles={globalStyles} />
          <a className="dnb-skip-link dnb-button" href="#dnb-app-content">
            Skip to content
          </a>
          <MainMenu enableOverlay />
          <StickyMenuBar />
          <Wrapper className="content-wrapper">
            <Sidebar location={location} showAll={false} />
            <Content>
              <MaxWidth className="dnb-app-content-inner">
                {children}
                <Footer />
              </MaxWidth>
            </Content>
          </Wrapper>
        </SidebarMenuProvider>
      </MainMenuProvider>
    )
  }
}

export default Layout

const globalStyles = css`
  @media (max-width: 40em) {
    a.dnb-skip-link {
      display: none;
    }
  }
`

const Wrapper = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  justify-content: space-between; /* pos Footer at the bottom */

  @media (max-width: 50em) {
    display: block;
  }
`

const Content = ({ className, children }) => (
  <Main
    tabIndex="-1"
    id="dnb-app-content"
    className={classnames(
      'dnb-style',
      'dnb-app-content',
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
  overflow: visible;

  margin-left: 30vw; /* fallback */
  margin-left: var(--aside-width);
  padding: 0;

  /* we use padding here, insted of margin,
    because applyPageFocus is else scrolling the page unwanted
    height of StickyMenuBar - 1px border */
  padding-top: 4rem;

  .dnb-app-content-inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: calc(100vh - 4rem); /* height of StickyMenuBar */
    padding: 2rem 5vw 2rem;
  }

  background-color: var(--color-black-background);
  border-left: 1px solid var(--color-black-border);

  /* make sure that Sidebar aside "styled.aside" gets the same max-width */
  @media (max-width: 50em) {
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

  @media (max-width: 120rem) {
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
  </FooterWrapper>
)
