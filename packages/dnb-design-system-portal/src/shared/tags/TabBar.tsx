/**
 * Inline Tag
 *
 */

import React from 'react'
import { Button, Tabs } from '@dnb/eufemia/src/components'
import type { TabsTabElement } from '@dnb/eufemia/src/components/tabs/Tabs'
import { fullscreen as fullscreenIcon } from '@dnb/eufemia/src/icons'
import AutoLinkHeader from './AutoLinkHeader'
import { tabsWrapperStyle } from './TabBar.module.scss'
import { Link } from './Anchor'
import { navigate } from 'portal-query'

export const defaultTabsValue = [
  { title: 'Info', key: '/info' },
  { title: 'Demos', key: '/demos' },
  { title: 'Properties', key: '/properties' },
  { title: 'Events', key: '/events' },
]

type TabbarTabs = Array<{ title: string; key: string }>
type TabbarProps = {
  location: Location
  tabs: TabbarTabs
  defaultTabs?: TabbarTabs
  title: string
  hideTabs: Array<{ title: string }>
  rootPath: string
  children?: React.ReactNode
}

export default function TabBar({
  location,
  title,
  hideTabs,
  rootPath,
  tabs,
  defaultTabs = defaultTabsValue,
  children,
}: TabbarProps) {
  const [wasFullscreen, setFullscreen] = React.useState(
    /fullscreen/.test(location.search)
  )

  const cleanFullscreen = (s) =>
    s.replace(/\?fullscreen$|&fullscreen|fullscreen|\?$/, '')

  const openFullscreen = () => {
    setFullscreen(true)
  }

  const quitFullscreen = () => {
    setFullscreen(false)
  }

  const fullscreenPath = [
    location.pathname,
    location.search ? location.search + '&' : '?',
    'fullscreen',
    location.hash,
  ].join('')

  const quitFullscreenPath = [
    location.pathname,
    cleanFullscreen(location.search),
    location.hash,
  ].join('')

  const preparedTabs = React.useMemo(() => {
    return (
      (tabs || defaultTabs)
        // remove the tab if it is hidden in frontmatter
        .filter(
          ({ title }) => !hideTabs?.find(({ title: t }) => t === title)
        )
        .map(({ key, ...rest }, index) => {
          const search = cleanFullscreen(location.search)
          // First tab links to the parent path instead of a sub-page
          const tabPath =
            index === 0
              ? ''
              : key.replace(rootPath, '').replace(/(\/+)$/, '')
          key = [
            rootPath,
            tabPath,
            search,
            wasFullscreen ? (search ? '&' : '?') + 'fullscreen' : '',
            location.hash,
          ].join('')

          return { ...rest, key, to: key }
        })
    )
  }, [
    wasFullscreen,
    rootPath,
    defaultTabs,
    hideTabs,
    tabs,
    location.hash,
    location.search,
  ])

  const selectedKey = [
    location.pathname.replace(/(\/+)$/, ''),
    location.search,
    location.hash,
  ].join('')

  return (
    <div className="dnb-tab-bar dnb-tabs">
      {title && (
        <AutoLinkHeader className="dnb-no-focus" level={1} skipCorrection>
          {title}
        </AutoLinkHeader>
      )}
      <Tabs
        id="tab-bar"
        // @ts-expect-error -- navigate expects string, TabsSelectedKey includes number
        onOpenTabNavigationFn={navigate}
        tabElement={Link as unknown as TabsTabElement}
        data={preparedTabs}
        selectedKey={selectedKey}
        render={({ Wrapper, Content, TabsList, Tabs }) => {
          return (
            <Wrapper className={tabsWrapperStyle}>
              <TabsList>
                <Tabs />
                <Button
                  onClick={wasFullscreen ? quitFullscreen : openFullscreen}
                  href={
                    wasFullscreen ? quitFullscreenPath : fullscreenPath
                  }
                  // @ts-expect-error -- strictFunctionTypes
                  element={Link}
                  variant="tertiary"
                  title={wasFullscreen ? 'Quit Fullscreen' : 'Fullscreen'}
                  aria-label={
                    wasFullscreen ? 'Quit Fullscreen' : 'Fullscreen'
                  }
                  icon={wasFullscreen ? 'close' : fullscreenIcon}
                  className="fullscreen"
                />
              </TabsList>
              {children}
              <Content />
            </Wrapper>
          )
        }}
      />
    </div>
  )
}

TabBar.ContentWrapper = (props) => (
  <Tabs.ContentWrapper id="tab-bar" contentInnerSpace={false} {...props} />
)
