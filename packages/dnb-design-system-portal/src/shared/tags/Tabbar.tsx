/**
 * Inline Tag
 *
 */

import React from 'react'
import { Link, navigate } from 'gatsby'
import { Button, Tabs } from '@dnb/eufemia/src/components'
import { fullscreen as fullscreenIcon } from '@dnb/eufemia/src/icons'
import AutoLinkHeader from './AutoLinkHeader'
import { tabsWrapperStyle } from './Tabbar.module.scss'

export const defaultTabs = [
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

export default function Tabbar({
  location,
  title,
  hideTabs,
  rootPath,
  tabs,
  defaultTabs,
  children,
}: TabbarProps) {
  const [wasFullscreen, setFullscreen] = React.useState(
    /fullscreen/.test(location.search),
  )

  const openFullscreen = () => {
    setFullscreen(true)

    const path = [
      location.pathname,
      location.search ? location.search + '&' : '?',
      'fullscreen',
      location.hash,
    ].join('')

    navigate(path)
  }

  const cleanFullscreen = (s) =>
    s.replace(/\?fullscreen$|&fullscreen|fullscreen|\?$/, '')

  const quitFullscreen = () => {
    setFullscreen(false)

    const path = [
      location.pathname,
      cleanFullscreen(location.search),
      location.hash,
    ].join('')

    navigate(path)
  }

  const preparedTabs = React.useMemo(() => {
    return (
      (tabs || defaultTabs)
        // remove the tab if it is hidden in frontmatter
        .filter(
          ({ title }) => !hideTabs?.find(({ title: t }) => t === title),
        )
        .map(({ key, ...rest }) => {
          console.log('-------------------')
          console.log('key', key)
          const search = cleanFullscreen(location.search)
          key = [
            rootPath,
            key.replace(rootPath, '').replace(/(\/+)$/, ''),
            search,
            wasFullscreen ? (search ? '&' : '?') + 'fullscreen' : '',
            location.hash,
          ].join('')

          // console.log('to', to)
          console.log('rootPath', rootPath)
          console.log('to', key)

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
    <div className="dnb-tabbar">
      {title && (
        <AutoLinkHeader className="dnb-no-focus" level={1} skip_correction>
          {title}
        </AutoLinkHeader>
      )}
      <Tabs
        id="tabbar"
        tab_element={{ ...Link }}
        data={preparedTabs}
        selected_key={selectedKey}
        on_change={({ selected_key }) => {
          navigate(selected_key)
        }}
        render={({ Wrapper, Content, TabsList, Tabs }) => {
          return (
            <Wrapper className={tabsWrapperStyle}>
              <TabsList>
                <Tabs />
                {wasFullscreen ? (
                  <Button
                    on_click={quitFullscreen}
                    variant="secondary"
                    title="Quit Fullscreen"
                    icon="close"
                    className="fullscreen"
                  />
                ) : (
                  <Button
                    on_click={openFullscreen}
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

Tabbar.defaultProps = {
  defaultTabs,
}
Tabbar.ContentWrapper = (props) => (
  <Tabs.ContentWrapper id="tabbar" content_spacing={false} {...props} />
)
