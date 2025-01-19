/**
 * StickyMenuBar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useStaticQuery, graphql } from 'gatsby'
import { hamburger as hamburgerIcon } from '@dnb/eufemia/src/icons'
import { close as closeIcon } from '@dnb/eufemia/src/icons/primary_icons'
import PortalLogo from './graphics/logo'
import { Icon, Button } from '@dnb/eufemia/src'
import { SidebarMenuContext } from './SidebarMenuContext'
import PortalToolsMenu from './PortalToolsMenu'
import { SearchBarInput } from './SearchBar'
import { Context } from '@dnb/eufemia/src/shared'
import { ButtonProps } from '@dnb/eufemia/src/components/Button'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import {
  headerStyle,
  centerWrapperStyle,
  toolsStyle,
  sloganStyle,
  portalHeaderWrapperStyle,
  hideSidebarToggleButtonStyle,
} from './StickyMenuBar.module.scss'
import { Link } from '../tags/Anchor'
import GithubLogo from '../../docs/contribute/assets/github-logo.js'
import type { IconSize } from '@dnb/eufemia/src/components/Icon'

export default function StickyMenuBar({
  hideSidebarToggleButton = false,
  preventBarVisibility = false,
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

  if (preventBarVisibility || hideSidebarToggleButton) {
    return null
  }

  return (
    <header
      className={classnames(
        headerStyle,
        hideSidebarToggleButton && hideSidebarToggleButtonStyle,
        'sticky-menu',
        'dev-grid',
      )}
    >
      <div className={portalHeaderWrapperStyle}>
        <HomeButton id="toggle-main-menu" text="Home" />
        <HomeButton id="toggle-main-menu-small-screen" size="default" />

        <span aria-hidden className={centerWrapperStyle}>
          <Icon
            icon={PortalLogo}
            size={48 as IconSize}
            right="x-small"
            color="var(--color-black-80, #333)"
          />
          <span
            className={classnames(
              sloganStyle,
              createSkeletonClass('font', context.skeleton),
              'dnb-eufemia-logo',
            )}
          >
            {slogan}
          </span>
        </span>

        <span className={toolsStyle}>
          <SearchBarInput />
          <Button
            icon={isOpen ? closeIcon : hamburgerIcon}
            on_click={toggleMenu}
            id="toggle-sidebar-menu"
            size="default"
            icon_size="default"
            aria-haspopup={true}
            aria-controls="portal-sidebar-menu"
            aria-expanded={isOpen}
            aria-label="Section Content Menu"
            title={
              isOpen
                ? 'Hide section content menu'
                : 'Show section content menu'
            }
          />
          <Button
            id="github-button"
            href="https://github.com/dnbexperience/eufemia/"
            size="default"
            icon_size="medium"
            target="_blank"
            icon={GithubLogo}
            title="Navigates to Eufemia's GitHub repository"
            left="x-small"
          />
          <PortalToolsMenu />
        </span>
      </div>
    </header>
  )
}

function HomeButton(props: ButtonProps) {
  return (
    <Button
      variant="primary"
      title="Eufemia main sections"
      href="/"
      icon="chevron_left"
      icon_position="left"
      element={Link}
      {...props}
    />
  )
}

StickyMenuBar.propTypes = {
  hideSidebarToggleButton: PropTypes.bool,
  preventBarVisibility: PropTypes.bool,
}
