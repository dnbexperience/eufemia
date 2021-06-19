/**
 * StickyMenuBar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { hamburger as hamburgerIcon } from '@dnb/eufemia/src/icons/secondary_icons'
import { close as closeIcon } from '@dnb/eufemia/src/icons/primary_icons'
import PortalLogo from './graphics/logo'
import { Icon, Button } from '@dnb/eufemia/src'
import { MainMenuToggleButton } from './ToggleMainMenu'
import { SidebarMenuContext } from './SidebarMenuContext'
import PortalToolsMenu from './PortalToolsMenu'
import { SearchBarInput } from './SearchBar'
import { Context } from '@dnb/eufemia/src/shared'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import { MediaQuery } from '@dnb/eufemia/src/shared'

const Header = styled.header`
  position: fixed;
  z-index: 4000;
  [data-dnb-modal-active='true'] & {
    z-index: 3000;
  }
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;

  display: flex;
  justify-content: center;

  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-black-border);

  white-space: nowrap;

  #toggle-sidebar-menu {
    display: none;
  }

  /*
    God for a mobile menu instead
    make sure that Content main "styled.main" gets the same max-width
   */
  @media screen and (max-width: 50em) {
    #toggle-sidebar-menu {
      display: flex;
    }
  }
  @media screen and (max-width: 40em) {
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

  .portal-header-wrapper {
    display: flex;
    justify-content: space-between;

    width: 100%;

    /* make sure we are on 64px instead of 65px */
    padding: 0.5rem 2rem;

    @media screen and (max-width: 40em) {
      padding: 0.5rem 5vw;
    }

    body[data-dnb-modal-active='true'] & {
      margin-right: var(--scrollbar-width);
    }

    align-items: center;
  }
`

const Tools = styled.span`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`

const Slogan = styled.span`
  @media screen and (max-width: 40em) {
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

  @media screen and (max-width: 30em) {
    display: none;
  }
`

const hideSidebarToggleButtonStyle = css`
  #toggle-sidebar-menu {
    display: none;
  }
`

export default function StickyMenuBar({
  hideSidebarToggleButton,
  preventBarVisibility,
} = {}) {
  const context = React.useContext(Context)
  const { toggleMenu, isOpen } = React.useContext(SidebarMenuContext)
  const {
    site: {
      siteMetadata: { name: slogan },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          name
        }
      }
    }
  `)

  if (
    preventBarVisibility ||
    hideSidebarToggleButton ||
    (typeof window !== 'undefined' &&
      /fullscreen/.test(window.location.search))
  ) {
    return null
  }

  return (
    <Header
      css={[hideSidebarToggleButton && hideSidebarToggleButtonStyle]}
      className={classnames('sticky-menu', 'dev-grid')}
    >
      <div className="portal-header-wrapper ">
        <MainMenuToggleButton />
        <CenterWrapper aria-hidden className="dnb-selection">
          <Icon
            icon={PortalLogo}
            size={48}
            right="x-small"
            color="var(--color-black-80, #333)"
          />
          <Slogan
            className={createSkeletonClass('font', context.skeleton)}
          >
            {slogan}
          </Slogan>
        </CenterWrapper>
        <Tools>
          <SearchBarInput />
          <Button
            icon={isOpen ? closeIcon : hamburgerIcon}
            on_click={toggleMenu}
            id="toggle-sidebar-menu"
            size="default"
            icon_size="default"
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
          <MediaQuery when={{ min: 'medium' }}>
            <PortalToolsMenu />
          </MediaQuery>
        </Tools>
      </div>
    </Header>
  )
}
StickyMenuBar.propTypes = {
  hideSidebarToggleButton: PropTypes.bool,
  preventBarVisibility: PropTypes.bool,
}
StickyMenuBar.defaultProps = {
  hideSidebarToggleButton: false,
  preventBarVisibility: false,
}
