/**
 * Page Component
 *
 */

// UI Style
import 'dnb-ui-lib/src/style'
import 'dnb-ui-lib/src/patterns/style'
// import 'dnb-ui-lib/src/components/style'
// import 'dnb-ui-lib/src/style/themes/dnb-theme-open-banking.scss'

import { pageFocus } from 'dnb-ui-lib/src/shared/tools'
import React, { Component } from 'react'
import { Link } from 'gatsby'

import PropTypes from 'prop-types'
import Sidebar from '../menu/SidebarMenu'
import StickyMenuBar from '../menu/StickyMenuBar'
import { markdownStyle } from './Markdown'
import styled, { cx } from 'react-emotion'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    header: PropTypes.string
  }
  static defaultProps = {
    header: null
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  componentDidMount() {
    pageFocus(this._ref.current)
  }

  render() {
    const { children, location, header = null } = this.props

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
            <MaxWidth>{children}</MaxWidth>
          </Content>
          <Footer />
        </div>
      )
    }

    return (
      <div>
        <StickyMenuBar header={header} />
        <Wrapper>
          <Sidebar location={location} showAll={false} />
          <Content tabIndex="-1" innerRef={this._ref}>
            <MaxWidth>
              {children}
              <Footer />
            </MaxWidth>
          </Content>
        </Wrapper>
      </div>
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
    className={cx(
      className,
      'dnb-style',
      markdownStyle,
      'page-content',
      'dnb-no-focus'
    )}
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
  background-color: #fff;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  min-height: calc(100vh - 4rem); /* height of StickyMenuBar */
  width: 100%;
  margin-top: calc(
    4rem - 0.0625rem
  ); /* height of StickyMenuBar - 1px border */
  margin-left: 30vw; /* 20rem, width of Sidebar aside */
  margin-left: 24rem; /* try rems instead of viewport? */
  padding-bottom: 2rem;
  overflow: visible;

  border-top: 1px solid var(--color-outline-grey);
  border-left: 1px solid var(--color-outline-grey);

  /* make sure that Sidebar aside "styled.aside" gets the same max-width */
  @media only screen and (max-width: 50rem) {
    margin-left: 0;
  }

  &.fullscreen-page {
    margin: 0;
    border: none;

    /* markdown / mdx empty div */
    ${'' /* div:not([class]):first-child {
    } */};
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
  border-top: 1px solid var(--color-outline-grey);
  padding: 1rem 0;
  margin-top: 3rem;
  text-align: left;

  .is-fullscreen & {
    padding: 1rem;
    background: var(--color-light-grey);
  }

  a {
    font-size: 0.7rem;
    margin-right: 1rem;
  }
`
const Footer = () => (
  <FooterWrapper>
    <Link to="/license" className="no-unerline">
      Copyright (c) 2018-present DNB.no
    </Link>
    <Link to="/log" className="no-unerline">
      Version
    </Link>
  </FooterWrapper>
)
