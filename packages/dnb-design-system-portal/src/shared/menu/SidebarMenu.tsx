/**
 * Sidebar with Menu
 *
 */

import { useCallback, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { allMdxNodes } from 'virtual:portal-data'
import * as SidebarMenu from '@dnb/eufemia/src/extensions/sidebar-menu'
import { createDrawerReveal } from '@dnb/eufemia/src/components/drawer/DrawerReveal'
import '@dnb/eufemia/src/extensions/sidebar-menu/style'
import { setPageFocusElement } from '@dnb/eufemia/src/shared/helpers'
import {
  navStyle,
  scrollContentStyle,
  sidebarLogoStyle,
} from './SidebarMenu.module.scss'
import {
  findActiveSidebarItemId,
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
import { Provider } from '@dnb/eufemia/src/shared'
import PortalLogo from './graphics/logo'
import { Link } from '../tags/Anchor'

const sidebarReveal = createDrawerReveal({
  target: '.portal-reveal-page, .sticky-menu',
})

type SidebarLayoutProps = {
  location: Location
  onWidthChange?: (width: number) => void
}

export default function SidebarLayout({
  location,
  onWidthChange,
}: SidebarLayoutProps) {
  const { close: closeMenu } = SidebarMenu.useResponsive()
  const [hasScrolled, setHasScrolled] = useState(false)
  const updateHasScrolled = useCallback(
    (element: HTMLDivElement | null) => {
      setHasScrolled((element?.scrollTop ?? 0) > 0)
    },
    []
  )

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
  const storageKey = 'portal-sidebar-menu-open-items-shared'
  const menu = (withSpace = false) => (
    <SidebarMenu.Data
      aria-label="Section Content Menu"
      data={[
        ...toSidebarMenuData(shared, closeMenu),
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
                items: toSidebarMenuData(items, closeMenu),
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
    <Provider locale="en-GB">
      <SidebarMenu.ResponsiveDrawer
        renderDriver={sidebarReveal}
        id="portal-sidebar-menu-drawer"
        dialogTitle="Menu"
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
          ref: updateHasScrolled,
          onScroll: (event) => {
            updateHasScrolled(event.currentTarget)
          },
          className: clsx(
            'portal-sidebar-scroll-view',
            'dnb-scrollbar-appearance'
          ),
        }}
        contentProps={{ className: scrollContentStyle }}
      >
        <div
          className={sidebarLogoStyle}
          data-scrolled={hasScrolled || undefined}
        >
          <Link href="/" title="Go to Eufemia home">
            <PortalLogo />
          </Link>
        </div>
        {menu(true)}
      </SidebarMenu.ResponsiveAside>
      <SidebarMenu.PreHydrationScript />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.getElementById('portal-sidebar-scroll-restoration')?.remove()",
        }}
      />
    </Provider>
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
