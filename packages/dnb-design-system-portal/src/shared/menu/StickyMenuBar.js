/**
 * Card
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { css, Global } from '@emotion/core'
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
    // header: PropTypes.string,
    onToggleMenu: PropTypes.func,
    hideSiebarToggleButton: PropTypes.bool,
    preventBarVisibility: PropTypes.bool
  }
  static defaultProps = {
    // header: null,
    onToggleMenu: null,
    hideSiebarToggleButton: false,
    preventBarVisibility: false
  }
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
    const {
      // header,
      hideSiebarToggleButton,
      preventBarVisibility
    } = this.props
    if (preventBarVisibility) {
      return <span />
    }
    return (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                name
              }
            }
          }
        `}
        render={({
          site: {
            siteMetadata: { name: slogan }
          }
        }) => {
          return (
            <>
              <Global styles={globalStyle} />
              {this.state.showOverlayMenu && (
                <MainMenu
                  enableOverlay={true}
                  setAsOverlay={true}
                  onToggleOverlay={this.toggleMenuHandler}
                />
              )}
              {!this.state.showOverlayMenu && (
                <div
                  css={[
                    barStyle,
                    hideSiebarToggleButton && hideSiebarToggleButtonStyle
                  ]}
                  className="sticky-menu dnb-style-selection"
                >
                  <div
                    className={`sticky-inner ${
                      this.state.showGrid ? 'dev-grid' : ''
                    }`}
                  >
                    <span> </span>
                    <Button
                      className="logo-slogan dnb-button--reset"
                      on_click={this.toggleMenuHandler}
                    >
                      <Logo height={48} />
                      {slogan}
                    </Button>
                    {/* {header && <span className="heading">{header}</span>} */}

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
                      <span className="toggle-grid">
                        <FormLabel for_id="switch-grid" text="Grid" />
                        <Switch
                          id="switch-grid"
                          checked={this.state.showGrid}
                          on_change={({ checked }) =>
                            this.toggleGrid(checked)
                          }
                        />
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </>
          )
        }}
      />
    )
  }
}

const globalStyle = css`
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
  }

  .grid-not-fixed {
    background-attachment: local;
  }
`

const barStyle = css`
  position: fixed;
  z-index: 200;
  top: 0;
  width: 100%;
  height: 4rem;

  display: flex;
  justify-content: center;

  background-color: var(--color-sea-green-4);
  border-bottom: 1px solid var(--color-outline-grey);

  overflow: hidden;
  white-space: nowrap;

  .sticky-inner {
    display: flex;
    justify-content: space-between;
    vertical-align: middle;

    width: 100%;

    /* make sure we are on 64px insted of 65px */
    padding: 0.5rem 2rem;

    align-items: center;
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

  .show-menu:hover {
    opacity: 0.6;
  }

  .toggle-grid label.dnb-form-label {
    padding: 0 1rem;
  }

  ${'' /* .heading {
    font-size: 1.5em;
    font-weight: 200;
    text-align: center;
  } */}
`

const hideSiebarToggleButtonStyle = css`
  .toggle-sidebar-menu {
    display: none;
  }
`
