/**
 * Card
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
// import Head from 'react-helmet'
import MainMenu from './MainMenu'
import { ToggleMenu } from './MainMenuGraphics'
import { hamburger as hamburgerIcon } from 'dnb-ui-lib/src/icons/secondary_icons'
import { close as closeIcon } from 'dnb-ui-lib/src/icons/primary_icons'
import PortalLogo from './graphics/logo'
import {
  // Logo,
  Icon,
  Button,
  IconPrimary
} from 'dnb-ui-lib/src'
import { SidebarMenuConsumer } from './SidebarMenuContext'
import ToggleGrid from './ToggleGrid'

export default class StickyMenuBar extends PureComponent {
  state = {
    mobileMenuVisible: false,
    showOverlayMenu: false
  }
  static propTypes = {
    onToggleMenu: PropTypes.func,
    hideSiebarToggleButton: PropTypes.bool,
    preventBarVisibility: PropTypes.bool
  }
  static defaultProps = {
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
    const { hideSiebarToggleButton, preventBarVisibility } = this.props
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
                  className="sticky-menu"
                >
                  <div
                    className={`sticky-inner ${
                      this.state.showGrid ? 'dev-grid' : ''
                    }`}
                  >
                    <Button
                      title="Show main sections"
                      className="menu-bar-wrapper dnb-button--reset"
                      on_click={this.toggleMenuHandler}
                    >
                      <Icon icon={ToggleMenu} size={24} aria_hidden />
                      <span className="dnb-button__text">Menu</span>
                      <IconPrimary
                        icon="chevron_down"
                        size="small"
                        aria_hidden
                      />
                    </Button>
                    <span className="menu-bar-wrapper">
                      <Icon icon={PortalLogo} size={48} aria_hidden />
                      {slogan}
                    </span>
                    <span>
                      <SidebarMenuConsumer>
                        {({ toggleMenu, isOpen }) => (
                          <Button
                            icon={isOpen ? closeIcon : hamburgerIcon}
                            on_click={toggleMenu}
                            className="toggle-sidebar-menu"
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

const barStyle = css`
  position: fixed;
  z-index: 200;
  top: 0;
  width: 100%;
  height: 4rem;

  display: flex;
  justify-content: center;

  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-black-border);

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

  .menu-bar-wrapper {
    .dnb-icon:nth-of-type(1) {
      color: var(--color-sea-green);
      margin-right: 0.5rem;
    }
    .dnb-icon.dnb-icon--small {
      margin-left: 0.5rem;
    }
    .dnb-button__text {
      color: var(--color-sea-green);
    }
  }
  .menu-bar-wrapper.dnb-button:hover {
    color: var(--color-black);
    .dnb-button__text,
    .dnb-icon {
      color: inherit;
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
      display: flex;
    }
  }
`

const hideSiebarToggleButtonStyle = css`
  .toggle-sidebar-menu {
    display: none;
  }
`
