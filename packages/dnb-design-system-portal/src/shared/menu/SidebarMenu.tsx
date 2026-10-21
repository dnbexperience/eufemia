/**
 * Sidebar with Menu
 *
 */

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { allMdxNodes } from 'virtual:portal-pages'
import * as SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
import '@dnb/eufemia/src/extensions/sidebar-menu/style'
import { setPageFocusElement } from '@dnb/eufemia/src/shared/helpers'
import {
  navStyle,
  mobileDrawerStyle,
  mobileDrawerLogoStyle,
  scrollContentStyle,
  sidebarLogoStyle,
} from './SidebarMenu.module.scss'
import {
  findActiveSidebarItemId,
  themeTitles,
  toSidebarMenuData,
} from './SidebarMenuData'
import {
  createMdxSidebarNavigation,
  type PortalPlatform,
} from './MdxSidebarNavigation'
import graphics from './SidebarGraphics'
import {
  getWebStorage,
  readWebStorageJSON,
} from '@dnb/eufemia/src/shared/helpers/webStorage'
import { useTheme } from '@dnb/eufemia/src/shared'
import PortalLogo from './graphics/logo'
import { Link } from '../tags/Anchor'

type SidebarLayoutProps = {
  location: Location
  onWidthChange?: (width: number) => void
}

export default function SidebarLayout({
  location,
  onWidthChange,
}: SidebarLayoutProps) {
  const { close: closeMenu } = SidebarMenu.useResponsive()

  useEffect(() => {
    setPageFocusElement(
      '#portal-sidebar-menu [aria-current="page"]',
      'sidebar'
    )
  }, [])

  const { shared, sections } = createMdxSidebarNavigation(
    allMdxNodes,
    location.pathname
  )
  const selectedItem = findActiveSidebarItemId(shared)
  const platformSelectedItem = findActiveSidebarItemId(
    sections.flatMap(({ items }) => items)
  )
  const [platform, setPlatform] = useState<PortalPlatform>('web')
  useEffect(() => {
    const stored = readWebStorageJSON('session', 'portal-sidebar-platform')
    if (stored === 'ios' || stored === 'android') {
      setPlatform(stored)
    }
  }, [])
  useEffect(() => {
    const selectedSection = sections.find(({ items }) =>
      findActiveSidebarItemId(items)
    )
    if (selectedSection) {
      setPlatform(selectedSection.id)
      savePlatform(selectedSection.id)
    }
  }, [platformSelectedItem])
  const currentTheme = useTheme()?.name
  const storageKey = 'portal-sidebar-menu-open-items-shared'
  const menu = (withSpace = false) => (
    <SidebarMenu.Data
      aria-label="Section Content Menu"
      className="dev-grid"
      data={[
        ...addThemeBadges(
          toSidebarMenuData(shared, closeMenu),
          currentTheme
        ),
        {
          id: 'portal-platform-navigation',
          type: 'custom',
          className: 'portal-sidebar-menu__platform',
          dividerBefore: true,
          content: (
            <SidebarMenu.Data
              aria-label="Platform Content Menu"
              sectionLabel="Platform"
              sections={sections.map(({ icon, items, ...section }) => ({
                ...section,
                icon: graphics[icon],
                items: addThemeBadges(
                  toSidebarMenuData(items, closeMenu),
                  currentTheme
                ),
              }))}
              activeSection={platform}
              onActiveSectionChange={(id) => {
                if (id !== 'web' && id !== 'ios' && id !== 'android') {
                  return
                }
                setPlatform(id)
                savePlatform(id)
              }}
              selectedItem={platformSelectedItem ?? ''}
              openItemsStorageKey="portal-sidebar-menu-open-items-platform"
              scrollSelectedItemIntoView={false}
            />
          ),
        },
      ]}
      selectedItem={selectedItem ?? platformSelectedItem ?? ''}
      openItemsStorageKey={storageKey}
      scrollPositionStorageKey={`${storageKey}-scroll-position`}
      {...(withSpace && { top: 'medium' })}
    />
  )

  return (
    <>
      <SidebarMenu.ResponsiveDrawer
        id="portal-sidebar-menu-drawer"
        className={mobileDrawerStyle}
        dialogTitle="Menu"
        navContent={
          <Link
            href="/"
            className={clsx(mobileDrawerLogoStyle, 'dnb-tab-focus')}
            title="Go to Eufemia home"
          >
            <PortalLogo />
          </Link>
        }
      >
        {menu()}
      </SidebarMenu.ResponsiveDrawer>

      <SidebarMenu.ResponsiveAside
        id="portal-sidebar-menu"
        className={navStyle}
        expandedWidth="24rem"
        compactWidth="4rem"
        showToggle={false}
        resizable
        resizeHandleProps={{ minWidth: 240, maxWidth: 560 }}
        onWidthChange={onWidthChange}
        scrollViewProps={{
          className: clsx(
            'portal-sidebar-scroll-view',
            'dnb-scrollbar-appearance'
          ),
        }}
        contentProps={{ className: scrollContentStyle }}
      >
        <Link
          href="/"
          className={clsx(sidebarLogoStyle, 'dnb-tab-focus')}
          title="Go to Eufemia home"
        >
          <PortalLogo />
        </Link>
        {menu(true)}
      </SidebarMenu.ResponsiveAside>
      <SidebarMenu.PreHydrationScript />
    </>
  )
}

function savePlatform(platform: PortalPlatform) {
  try {
    getWebStorage('session')?.setItem(
      'portal-sidebar-platform',
      JSON.stringify(platform)
    )
  } catch {
    // Platform switching also works when browser storage is full.
  }
}

function addThemeBadges(
  items: ReturnType<typeof toSidebarMenuData>,
  currentTheme: ReturnType<typeof useTheme>['name']
) {
  return items.map(({ themes, items, ...item }) => ({
    ...item,
    suffix: themes?.includes(currentTheme) ? (
      <ThemeBadge theme={currentTheme} />
    ) : undefined,
    items: items ? addThemeBadges(items, currentTheme) : undefined,
  }))
}

function ThemeBadge({
  theme,
}: {
  theme: ReturnType<typeof useTheme>['name']
}) {
  const themeTitle = themeTitles[theme]

  return (
    <span
      title={`This component is ready for use with the ${themeTitle} theme`}
      className={clsx(
        'portal-sidebar-menu__theme-badge',
        `portal-sidebar-menu__theme-badge--${theme}`
      )}
    />
  )
}
