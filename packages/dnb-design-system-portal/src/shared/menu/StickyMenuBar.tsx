/**
 * StickyMenuBar
 *
 */

import { useContext } from 'react'
import { clsx } from 'clsx'
import { hamburger as hamburgerIcon } from '@dnb/eufemia/src/icons'
import { close as closeIcon } from '@dnb/eufemia/src/icons/primary_icons'
import PortalLogo from './graphics/logo'
import { Button } from '@dnb/eufemia/src'
import { SidebarMenuContext } from './SidebarMenuContext'
import PortalToolsMenu from './PortalToolsMenu'
import { SearchBarInput } from './SearchBar'
import {
  headerStyle,
  leadingStyle,
  mobileLogoStyle,
  searchStyle,
  toolsStyle,
  portalHeaderWrapperStyle,
} from './StickyMenuBar.module.scss'
import { Link } from '../tags/Anchor'
import GithubLogo from '../../docs/contribute/assets/github-logo'
import FigmaLogo from '../../docs/contribute/assets/figma-logo'

export default function StickyMenuBar() {
  const { toggleMenu, isOpen } = useContext(SidebarMenuContext)

  return (
    <header className={clsx(headerStyle, 'sticky-menu', 'dev-grid')}>
      <div className={portalHeaderWrapperStyle}>
        <span className={leadingStyle}>
          <Button
            icon={isOpen ? closeIcon : hamburgerIcon}
            onClick={toggleMenu}
            id="toggle-sidebar-menu"
            variant="tertiary"
            size="default"
            iconSize="default"
            aria-haspopup={true}
            aria-controls="portal-sidebar-menu"
            aria-expanded={isOpen}
            aria-label={
              isOpen
                ? 'Close section content menu'
                : 'Open section content menu'
            }
            title={
              isOpen
                ? 'Hide section content menu'
                : 'Show section content menu'
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
          <span className={searchStyle}>
            <SearchBarInput />
          </span>
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
