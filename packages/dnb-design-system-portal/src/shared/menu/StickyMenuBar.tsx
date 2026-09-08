/**
 * StickyMenuBar
 *
 */

import { clsx } from 'clsx'
import PortalLogo from './graphics/logo'
import { Button } from '@dnb/eufemia/src'
import SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
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
import GithubLogo from '../../docs/contribute/assets/github-logo'
import FigmaLogo from '../../docs/contribute/assets/figma-logo'
import { useHasScrolled } from '@dnb/eufemia/src/shared'

export default function StickyMenuBar() {
  const { open } = SidebarMenu.useResponsive()
  const hasScrolled = useHasScrolled()

  return (
    <header
      className={clsx(headerStyle, 'sticky-menu', 'dev-grid')}
      data-scrolled={hasScrolled ? 'true' : undefined}
    >
      <div className={portalHeaderWrapperStyle}>
        <span className={leadingStyle}>
          <SidebarMenu.ResponsiveTrigger
            id="toggle-sidebar-menu"
            size="default"
            iconSize="default"
            controls="portal-sidebar-menu-drawer"
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
          <Button
            id="github-button"
            href="https://github.com/dnbexperience/eufemia/"
            size="default"
            iconSize="medium"
            target="_blank"
            icon={GithubLogo}
            title="Navigates to Eufemia's GitHub repository"
            left="x-small"
          />
          <Button
            id="figma-button"
            href="https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web"
            size="default"
            iconSize="medium"
            target="_blank"
            icon={FigmaLogo}
            title="Navigates to Eufemia's Figma file"
            left="x-small"
          />
          <PortalToolsMenu />
        </span>
      </div>
    </header>
  )
}
