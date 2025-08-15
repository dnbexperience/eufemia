/**
 * Inline Tag
 *
 */

import React from 'react'
import { Button, Tabs } from '@dnb/eufemia/src/components'
import { fullscreen as fullscreenIcon } from '@dnb/eufemia/src/icons'
import AutoLinkHeader from './AutoLinkHeader'
import { tabsWrapperStyle } from './TabBar.module.scss'
import { Link } from './Anchor'
import { navigate } from 'gatsby'

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
    /fullscreen/.test(location.search),
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
          ({ title }) => !hideTabs?.find(({ title: t }) => t === title),
        )
        .map(({ key, ...rest }) => {
          const search = cleanFullscreen(location.search)
          key = [
            rootPath,
            key.replace(rootPath, '').replace(/(\/+)$/, ''),
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
        <AutoLinkHeader className="dnb-no-focus" level={1} skip_correction>
          {title}
        </AutoLinkHeader>
      )}
      <Tabs
        id="tab-bar"
        onOpenTabNavigationFn={navigate}
        tab_element={Link}
        data={preparedTabs}
        selected_key={selectedKey}
        render={({ Wrapper, Content, TabsList, Tabs }) => {
          return (
            <Wrapper className={tabsWrapperStyle}>
              <TabsList>
                <Tabs />
                {wasFullscreen ? (
                  <Button
                    on_click={quitFullscreen}
                    href={quitFullscreenPath}
                    element={Link}
                    variant="secondary"
                    title="Quit Fullscreen"
                    icon="close"
                    className="fullscreen"
                  />
                ) : (
                  <Button
                    on_click={openFullscreen}
                    href={fullscreenPath}
                    element={Link}
                    variant="secondary"
                    title="Fullscreen"
                    icon={fullscreenIcon}
                    className="fullscreen"
                  />
                )}
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
  <Tabs.ContentWrapper id="tab-bar" content_spacing={false} {...props} />
)
