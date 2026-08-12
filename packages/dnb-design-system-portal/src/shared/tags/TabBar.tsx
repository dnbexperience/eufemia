/**
 * Inline Tag
 *
 */

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Button, Tabs } from '@dnb/eufemia/src/components'
import type { TabsTabElement } from '@dnb/eufemia/src/components/tabs/Tabs'
import { fullscreen as fullscreenIcon } from '@dnb/eufemia/src/icons'
import AutoLinkHeader from './AutoLinkHeader'
import { tabsWrapperStyle } from './TabBar.module.scss'
import { Link } from './Anchor'
import { navigate } from 'portal-query'
import { defaultTabsValue } from './defaultValues'

type TabbarTabs = Array<{ title: string; key: string }>
type TabbarProps = {
  location: Location
  tabs: TabbarTabs
  defaultTabs?: TabbarTabs
  title: string
  hideTabs: Array<{ title: string }>
  rootPath: string
  children?: ReactNode
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
  const [wasFullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    setFullscreen(/fullscreen/.test(location.search))
  }, [location.search])

  const cleanFullscreen = (s) =>
    s.replace(/\?fullscreen$|&fullscreen|fullscreen|\?$/, '')

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

  // Use a real <button> (not a link) so both Enter and Space activate it; navigate keeps the URL shareable.
  const toggleFullscreen = () => {
    setFullscreen(!wasFullscreen)
    navigate(wasFullscreen ? quitFullscreenPath : fullscreenPath)
  }

  const preparedTabs = useMemo(() => {
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
          const pathname = [rootPath, tabPath].join('')
          const tabSearch = [
            search,
            wasFullscreen ? (search ? '&' : '?') + 'fullscreen' : '',
          ].join('')

          key = [rootPath, tabPath, tabSearch].join('')

          return {
            ...rest,
            key,
            to: { pathname, search: tabSearch, hash: '' },
          }
        })
    )
  }, [
    wasFullscreen,
    rootPath,
    defaultTabs,
    hideTabs,
    tabs,
    location.search,
  ])

  const selectedKey = [
    location.pathname.replace(/(\/+)$/, ''),
    cleanFullscreen(location.search),
    wasFullscreen
      ? (cleanFullscreen(location.search) ? '&' : '?') + 'fullscreen'
      : '',
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
                  onClick={toggleFullscreen}
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
