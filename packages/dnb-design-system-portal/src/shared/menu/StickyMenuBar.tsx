/**
 * StickyMenuBar
 *
 */

import { clsx } from 'clsx'
import PortalLogo from './graphics/logo'
import * as SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
import PortalToolsMenu from './PortalToolsMenu'
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

export default function StickyMenuBar() {
  const { inlineCollapsed, isCompact, open } = SidebarMenu.useResponsive()
  const hasScrolled = useHasScrolled()

  return (
    <header
      className={clsx(headerStyle, 'sticky-menu', 'dev-grid')}
      data-scrolled={hasScrolled ? 'true' : undefined}
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
            title={
              open
                ? 'Hide section content menu'
                : 'Open section content menu'
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

        <span className={toolsStyle}>
          <SearchBarInput />
          <PortalToolsMenu />
        </span>
      </div>
    </header>
  )
}
