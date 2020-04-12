/**
 * StickyMenuBar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { StaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { hamburger as hamburgerIcon } from 'dnb-ui-lib/src/icons/secondary_icons'
import { close as closeIcon } from 'dnb-ui-lib/src/icons/primary_icons'
import PortalLogo from './graphics/logo'
import { Icon, Button } from 'dnb-ui-lib/src'
import { MainMenuToggleButton } from './ToggleMainMenu'
import { SidebarMenuContext } from './SidebarMenuContext'
import ToggleGrid from './ToggleGrid'
import { SearchBarInput } from './SearchBar'

const Header = styled.header`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;

  display: flex;
  justify-content: center;

  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-black-border);

  ${'' /* overflow: hidden; */}
  white-space: nowrap;

  #toggle-sidebar-menu {
    display: none;
  }

  /*
    God for a mobile menu insted
    make sure that Content main "styled.main" gets the same max-width
   */
  @media (max-width: 50em) {
    #toggle-sidebar-menu {
      display: flex;
    }
  }
  @media (max-width: 40em) {
    /* make the button round */
    button:nth-of-type(1) {
      padding: 0 0.25rem;
      .dnb-button__text {
        display: none;
      }
      .dnb-button__icon {
        transform: translateY(0);
      }
    }
  }
`

const Tools = styled.span`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  /* make sure we are on 64px insted of 65px */
  padding: 0.5rem 2rem;

  @media (max-width: 40em) {
    padding: 0.5rem 5vw;
  }

  align-items: center;
`
const Slogan = styled.span`
  @media (max-width: 40em) {
    display: none;
  }
`
const CenterWrapper = styled.span`
  display: flex;
  align-items: center;

  font-size: var(--font-size-basis);

  .dnb-icon:nth-of-type(1) {
    color: var(--color-sea-green);
  }

  @media (max-width: 30em) {
    display: none;
  }
`

const hideSiebarToggleButtonStyle = css`
  #toggle-sidebar-menu {
    display: none;
  }
`

export default class StickyMenuBar extends React.PureComponent {
  state = {
    mobileMenuVisible: false
  }
  static propTypes = {
    hideSiebarToggleButton: PropTypes.bool,
    preventBarVisibility: PropTypes.bool
  }
  static defaultProps = {
    hideSiebarToggleButton: false,
    preventBarVisibility: false
  }
  render() {
    const { hideSiebarToggleButton, preventBarVisibility } = this.props
    if (preventBarVisibility) {
      return <></>
    }
    return (
      <SidebarMenuContext.Consumer>
        {({ toggleMenu, isOpen }) =>
          !hideSiebarToggleButton &&
          !(
            typeof window !== 'undefined' &&
            /fullscreen/.test(window.location.search)
          ) && (
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
              }) => (
                <Header
                  css={[
                    hideSiebarToggleButton && hideSiebarToggleButtonStyle
                  ]}
                  className={classnames('sticky-menu', 'dev-grid')}
                >
                  <HeaderInner>
                    <MainMenuToggleButton />
                    <CenterWrapper aria-hidden>
                      <Icon
                        icon={PortalLogo}
                        size={48}
                        alt={`${slogan} logo`}
                        right="x-small"
                      />
                      <Slogan>{slogan}</Slogan>
                    </CenterWrapper>
                    <Tools>
                      <SearchBarInput />
                      <Button
                        icon={isOpen ? closeIcon : hamburgerIcon}
                        on_click={toggleMenu}
                        id="toggle-sidebar-menu"
                        size="default"
                        aria-haspopup="true"
                        aria-controls="portal-sidebar-menu"
                        aria-expanded={isOpen}
                        aria-label="Section Content Menu"
                        title={
                          isOpen
                            ? 'Hide section content menu'
                            : 'Show section content menu'
                        }
                      />
                      <ToggleGrid />
                    </Tools>
                  </HeaderInner>
                </Header>
              )}
            />
          )
        }
      </SidebarMenuContext.Consumer>
    )
  }
}
