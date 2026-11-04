/**
 * StickyMenuBar
 *
 */

import { clsx } from 'clsx'
import PortalLogo from './graphics/logo'
import * as SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
import PortalToolsMenu from './PortalToolsMenu'
import Tooltip from '@dnb/eufemia/src/components/tooltip/Tooltip'
import { SearchBarInput } from './SearchBar'
import {
  headerStyle,
  leadingStyle,
  mobileLogoStyle,
  toolsStyle,
  portalHeaderWrapperStyle,
} from './StickyMenuBar.module.scss'
import { Link } from '../tags/Anchor'
import { useHasScrolled } from '@dnb/eufemia/src/shared'
import { useLocation } from 'react-router'

export default function StickyMenuBar() {
  const { inlineCollapsed, isCompact, open } = SidebarMenu.useResponsive()
  const hasScrolled = useHasScrolled()
  const menuLabel = open
    ? 'Hide section content menu'
    : 'Open section content menu'
  const home = useLocation().pathname === '/'

  return (
    <header
      className={clsx(headerStyle, 'sticky-menu', 'dev-grid')}
      data-scrolled={hasScrolled ? 'true' : undefined}
      data-home={home || undefined}
    >
      <div
        className={portalHeaderWrapperStyle}
        data-inline-collapsed={inlineCollapsed || undefined}
        data-compact={isCompact || undefined}
      >
        <span
          className={leadingStyle}
          data-inline-collapsed={inlineCollapsed || undefined}
          data-compact={isCompact || undefined}
        >
          <SidebarMenu.ResponsiveTrigger
            id="toggle-sidebar-menu"
            size="default"
            iconSize="default"
            controls="portal-sidebar-menu-drawer"
            inlineControls="portal-sidebar-menu"
            aria-label={menuLabel}
            tooltip={
              <Tooltip placement="bottom" fixedPosition>
                {menuLabel}
              </Tooltip>
            }
          />

          <Link
            href="/"
            className={clsx(mobileLogoStyle, 'dnb-tab-focus')}
            title="Go to Eufemia home"
          >
            <PortalLogo />
          </Link>
        </span>

        {!home && (
          <span className={toolsStyle}>
            <SearchBarInput />
            <PortalToolsMenu />
          </span>
        )}
      </div>
    </header>
  )
}
