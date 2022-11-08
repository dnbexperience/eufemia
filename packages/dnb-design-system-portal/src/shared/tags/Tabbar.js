/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Link, navigate } from 'gatsby'
import { Button, Tabs } from '@dnb/eufemia/src/components'
import { fullscreen as fullscreenIcon } from '@dnb/eufemia/src/icons/secondary_icons'
import AutoLinkHeader from './AutoLinkHeader'
import { tabsWrapperStyle } from './Tabbar.module.scss'

export default function Tabbar({
  location,
  title,
  hideTabs,
  rootPath,
  tabs,
  defaultTabs,
  children,
}) {
  const [wasFullscreen, setFullscreen] = React.useState(
    /fullscreen/.test(location.search)
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
          ({ title }) => !hideTabs?.find(({ title: t }) => t === title)
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
  }, [wasFullscreen]) // eslint-disable-line

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
        tab_element={Link}
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

Tabbar.propTypes = {
  location: PropTypes.object.isRequired,
  tabs: PropTypes.array,
  defaultTabs: PropTypes.array,
  title: PropTypes.string,
  hideTabs: PropTypes.array,
  rootPath: PropTypes.string.isRequired,
  children: PropTypes.node,
}
Tabbar.defaultProps = {
  tabs: null,
  defaultTabs: [
    { title: 'Info', key: '/info' },
    { title: 'Demos', key: '/demos' },
    { title: 'Properties', key: '/properties' },
    { title: 'Events', key: '/events' },
  ],
  title: null,
  hideTabs: null,
  children: null,
}
Tabbar.ContentWrapper = (props) => (
  <Tabs.ContentWrapper id="tabbar" content_spacing={false} {...props} />
)
