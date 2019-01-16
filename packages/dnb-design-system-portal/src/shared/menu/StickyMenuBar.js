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
import { Logo, Button, IconPrimary } from 'dnb-ui-lib/src'
import { SidebarMenuConsumer } from './SidebarMenuContext'
import ToggleGrid from './ToggleGrid'

export default class StickyMenuBar extends PureComponent {
  state = {
    mobileMenuVisible: false,
    showOverlayMenu: false
  }
  static propTypes = {
    // header: PropTypes.string,/* not used anymore up there */
    onToggleMenu: PropTypes.func,
    hideSiebarToggleButton: PropTypes.bool,
    preventBarVisibility: PropTypes.bool
  }
  static defaultProps = {
    // header: null,/* not used anymore up there */
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
  render() {
    const {
      // header,/* not used anymore up there */
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
                    <span>{/* only for flex spacing layout */}</span>
                    <Button
                      className="menu-bar-logo dnb-button--reset"
                      on_click={this.toggleMenuHandler}
                    >
                      <Logo height={48} />
                      {slogan}
                      <IconPrimary icon="chevron-down" size="small" />
                    </Button>
                    {/* {header && <span className="heading">{header}</span>} not used anymore up there */}

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
                      <ToggleGrid />
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
`

const barStyle = css`
  position: fixed;
  z-index: 200;
  top: 0;
  width: 100%;
  height: 4rem;

  display: flex;
  justify-content: center;

  background-color: var(--color-white);
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

  .menu-bar-logo {
    margin-left: 5vw;
    color: var(--color-sea-green);
    .dnb-logo {
      margin-right: 1rem;
    }
    .dnb-icon {
      margin-left: 3px;
    }
  }
  .menu-bar-logo:hover {
    &,
    & .dnb-logo {
      color: var(--color-black-80);
    }
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

  ${'' /* not used anymore up there .heading {
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
