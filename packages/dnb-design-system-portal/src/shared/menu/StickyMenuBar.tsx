/**
 * StickyMenuBar
 *
 */

import { useContext } from 'react'
import clsx from 'clsx'
import { hamburger as hamburgerIcon } from '@dnb/eufemia/src/icons'
import { close as closeIcon } from '@dnb/eufemia/src/icons/primary_icons'
import PortalLogo from './graphics/logo'
import { Button } from '@dnb/eufemia/src'
import { SidebarMenuContext } from './SidebarMenuContext'
import PortalToolsMenu from './PortalToolsMenu'
import { SearchBarInput } from './SearchBar'
import type { ButtonProps } from '@dnb/eufemia/src/components/Button'
import {
  headerStyle,
  centerWrapperStyle,
  toolsStyle,
  portalHeaderWrapperStyle,
  hideSidebarToggleButtonStyle,
} from './StickyMenuBar.module.scss'
import { Link } from '../tags/Anchor'
import GithubLogo from '../../docs/contribute/assets/github-logo'
import FigmaLogo from '../../docs/contribute/assets/figma-logo'

export default function StickyMenuBar({
  hideSidebarToggleButton = false,
  preventBarVisibility = false,
} = {}) {
  const { toggleMenu, isOpen } = useContext(SidebarMenuContext)

  if (preventBarVisibility || hideSidebarToggleButton) {
    return null
  }

  return (
    <header
      className={clsx(
        headerStyle,
        hideSidebarToggleButton && hideSidebarToggleButtonStyle,
        'sticky-menu',
        'dev-grid'
      )}
    >
      <div className={portalHeaderWrapperStyle}>
        <HomeButton id="toggle-main-menu" text="Home" />
        <HomeButton id="toggle-main-menu-small-screen" size="default" />

        <Link
          href="/"
          className={centerWrapperStyle}
          title="Go to Eufemia home"
        >
          <PortalLogo />
        </Link>

        <span className={toolsStyle}>
          <SearchBarInput />
          <Button
            icon={isOpen ? closeIcon : hamburgerIcon}
            onClick={toggleMenu}
            id="toggle-sidebar-menu"
            size="default"
            iconSize="default"
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

function HomeButton(props: ButtonProps) {
  return (
    <Button
      variant="primary"
      title="Eufemia main sections"
      href="/"
      icon="chevron_left"
      iconPosition="left"
      // @ts-expect-error -- strictFunctionTypes
      element={Link}
      {...props}
    />
  )
}
