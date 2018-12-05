/**
 * Card
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css, injectGlobal } from 'react-emotion'
// import Head from 'react-helmet'
import MainMenu from './MainMenu'
import { hamburger_medium as hamburgerIcon } from 'dnb-ui-lib/src/icons/secondary_icons_medium'
import { close_medium as closeIcon } from 'dnb-ui-lib/src/icons/primary_icons_medium'
import gridSvg from '../../../static/assets/images/grid-32x32.svg'
import { FormLabel, Switch, Logo, Button } from 'dnb-ui-lib/src'
import { SidebarMenuConsumer } from './SidebarMenuContext'

export default class StickyMenuBar extends PureComponent {
  state = {
    mobileMenuVisible: false,
    showOverlayMenu: false,
    showGrid: null
  }
  static propTypes = {
    header: PropTypes.string,
    slogan: PropTypes.string,
    onToggleMenu: PropTypes.func,
    preventBarVisibility: PropTypes.bool
  }
  static defaultProps = {
    header: null,
    slogan: 'EUFEMIA', // gatsbyConfig.siteMetadata.title
    onToggleMenu: null,
    preventBarVisibility: false
  }
  // static contextType = Context
  // openMobileMenu = () => {
  //   const mobileMenuVisible = !this.state.mobileMenuVisible
  //   console.log('openMobileMenu', mobileMenuVisible)
  //   this.setState({ mobileMenuVisible })
  //   // console.log('Context.Consumer', Context.Consumer)
  //   // Context.Consumer.isMobileMenuActive = true
  //   // <Context.Provider value={{ isMobileMenuActive: false }}>
  // }
  toggleMenuHandler = (state = null) => {
    const showOverlayMenu =
      state !== null ? state : !this.state.showOverlayMenu
    if (this.props.onToggleMenu) {
      this.props.onToggleMenu(showOverlayMenu)
    }
    this.setState({
      showOverlayMenu
    })
  }
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.state.showGrid = parseFloat(
        window.localStorage.getItem('showGrid')
      )
        ? true
        : false
    }
  }
  toggleGrid = () => {
    this.showGrid(!this.state.showGrid)
    this.setState({ showGrid: !this.state.showGrid })
  }
  showGrid = showGrid => {
    if (typeof document !== 'undefined') {
      const page = document.querySelector('.dnb-page-content')
      if (page) {
        if (showGrid) {
          page.classList.add('dev-grid')
          page.classList.add('grid-not-fixed')
        } else {
          page.classList.remove('dev-grid')
        }
      }
      const body = document.querySelector('body')
      if (body) {
        if (showGrid) {
          body.classList.add('dev-grid')
        } else {
          body.classList.remove('dev-grid')
        }
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('showGrid', showGrid ? 1 : 0)
      }
    }
  }
  componentDidMount() {
    if (this.state.showGrid) {
      this.showGrid(true)
    }
  }
  render() {
    const { header, slogan, preventBarVisibility } = this.props
    if (preventBarVisibility) {
      return (
        <span />
        // <Head>
        //   <title>{header || slogan}</title>
        // </Head>
      )
    }
    return (
      <div css={barStyle}>
        {this.state.showOverlayMenu && (
          <MainMenu
            enableOverlay={true}
            setAsOverlay={true}
            onToggleOverlay={this.toggleMenuHandler}
          />
        )}
        {!this.state.showOverlayMenu && (
          <div
            className={`sticky ${this.state.showGrid ? 'dev-grid' : ''}`}
          >
            <span>
              <Button
                className="dnb-button--reset"
                on_click={this.toggleMenuHandler}
              >
                <Logo height={48} />
                {slogan}
              </Button>
            </span>
            {header && <span className="heading">{header}</span>}

            <span>
              <SidebarMenuConsumer>
                {({ toggleMenu, isOpen }) => (
                  <Button
                    icon={isOpen ? closeIcon : hamburgerIcon}
                    on_click={toggleMenu}
                    className="toggle-sidebar-menu"
                    variant="tertiary"
                    title={isOpen ? 'Hide Menu' : 'Show Menu'}
                  />
                )}
              </SidebarMenuConsumer>
              {process.env.NODE_ENV === 'development' && (
                <span className="toggle-grid">
                  <FormLabel for_id="switch-grid" text="Grid" />
                  <Switch
                    id="switch-grid"
                    checked={this.state.showGrid}
                    on_change={({ checked }) => this.toggleGrid(checked)}
                  />
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    )
  }
}

injectGlobal`
  :root {
    --color-outline-grey: #ebebeb;
  }

  .dev-grid {
    background-repeat: repeat;
    background-attachment: fixed;
    background-color: transparent;
    background-image: url(${gridSvg});

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    small {
      background-color: rgba(255, 255, 122, 0.35);
    }

    code {
      background-color: rgba(0, 200, 200, 0.25);
      margin: 0 0 1rem 0;
      display: block;
    }

    small {
      ${'' /* border-bottom: solid 1rem hotpink; */}
    }
  }

  .grid-not-fixed {
    background-attachment: local;
  }
`

const barStyle = css`
  .sticky {
    position: fixed;
    z-index: 200;
    top: 0;
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    width: 100%;

    /* make sure we are on 64px insted of 65px */
    height: 4rem;
    padding: 0.5rem 2rem;

    align-items: center;

    background-color: var(--color-sea-green-4);
    border-bottom: 1px solid var(--color-outline-grey);

    overflow: hidden;
    white-space: nowrap;
  }

  .dnb-logo {
    margin-right: 1rem;
  }
  .toggle-sidebar-menu {
    display: none;
  }

  /*
    God for a mobile menu insted
    make sure that Content main "styled.main" gets the same max-width
   */
  @media only screen and (max-width: 50em) {
    .toggle-sidebar-menu {
      display: inline;
    }
  }
  &.active .logo-slogan {
    color: #007272;
    text-decoration: underline;
  }
  &.active .logo-slogan:hover {
    color: #111;
  }

  .show-menu:hover {
    opacity: 0.6;
  }

  .toggle-grid label.dnb-form-label {
    padding: 0 1rem;
  }

  .heading {
    font-size: 1.5em;
    font-weight: 200;
    text-align: center;
  }
`
