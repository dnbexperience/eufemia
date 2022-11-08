/**
 * StickyMenuBar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useStaticQuery, graphql } from 'gatsby'
import { hamburger as hamburgerIcon } from '@dnb/eufemia/src/icons/secondary_icons'
import { close as closeIcon } from '@dnb/eufemia/src/icons/primary_icons'
import PortalLogo from './graphics/logo'
import { Icon, Button } from '@dnb/eufemia/src'
import { SidebarMenuContext } from './SidebarMenuContext'
import PortalToolsMenu from './PortalToolsMenu'
import { SearchBarInput } from './SearchBar'
import { Context } from '@dnb/eufemia/src/shared'
import { createSkeletonClass } from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'
import { MediaQuery } from '@dnb/eufemia/src/shared'
import {
  headerStyle,
  centerWrapperStyle,
  toolsStyle,
  sloganStyle,
  portalHeaderWrapperStyle,
  hideSidebarToggleButtonStyle,
} from './StickyMenuBar.module.scss'

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

  if (preventBarVisibility || hideSidebarToggleButton) {
    return null
  }

  return (
    <header
      className={classnames(
        headerStyle,
        hideSidebarToggleButton && hideSidebarToggleButtonStyle,
        'sticky-menu',
        'dev-grid'
      )}
    >
      <div className={portalHeaderWrapperStyle}>
        <Button
          id="toggle-main-menu"
          variant="primary"
          text="Home"
          title="Eufemia main sections"
          href="/"
          icon="chevron_left"
          icon_position="left"
        />

        <span aria-hidden className={centerWrapperStyle}>
          <Icon
            icon={PortalLogo}
            size={48}
            right="x-small"
            color="var(--color-black-80, #333)"
          />
          <span
            className={classnames(
              sloganStyle,
              createSkeletonClass('font', context.skeleton)
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
          <MediaQuery when={{ min: 'medium' }} matchOnSSR>
            <PortalToolsMenu />
          </MediaQuery>
        </span>
      </div>
    </header>
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
