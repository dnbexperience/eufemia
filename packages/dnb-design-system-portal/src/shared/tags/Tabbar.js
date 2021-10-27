/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { parsePath, navigate } from 'gatsby'
import { Button, Tabs } from '@dnb/eufemia/src/components'
import { fullscreen as fullscreenIcon } from '@dnb/eufemia/src/icons/secondary_icons'
import AutoLinkHeader from './AutoLinkHeader'

export default function Tabbar({
  location,
  title,
  hideTabs,
  usePath,
  tabs,
  defaultTabs,
  children,
}) {
  const path = parsePath(
    cleanPath([location.pathname, location.search, location.hash].join(''))
  )

  const [wasFullscreen, setFullscreen] = React.useState(
    /fullscreen/.test(path.search)
  )
  const fullscreenQuery = () => (wasFullscreen ? '?fullscreen' : '')

  const openFullscreen = () => {
    setFullscreen(true)
    navigate(
      cleanPath(
        [
          path.pathname,
          `?fullscreen&${path.search.replace('?', '')}`,
          path.hash,
        ].join('')
      )
    )
  }

  const quitFullscreen = () => {
    setFullscreen(false)
    navigate(
      cleanPath(
        [
          path.pathname,
          path.search.replace('fullscreen', ''),
          path.hash,
        ].join('')
      )
    )
  }

  const preparedTabs = React.useMemo(() => {
    return (
      (tabs || defaultTabs)
        // remove the tab if it is hidden in frontmatter
        .filter(
          ({ title }) =>
            !(hideTabs && hideTabs.find(({ title: t }) => t === title))
        )
        .map(({ key, ...rest }) => {
          if (key.includes('$1')) {
            key = cleanPath(
              key.replace(/\$1$/, [fullscreenQuery(), path.hash].join(''))
            )
          } else {
            key = cleanPath(
              [usePath, key, fullscreenQuery(), path.hash].join('')
            )
          }

          return { ...rest, key }
        })
    )
  }, [wasFullscreen]) // eslint-disable-line

  const selectedKey = [
    path.pathname.replace(/(\/)$/, ''),
    path.search,
    path.hash,
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
        data={preparedTabs}
        selected_key={selectedKey}
        on_change={({ key }) => navigate(key)}
        on_mouse_enter={({ key }) => {
          // preload pages the tab page
          if (
            typeof window !== 'undefined' &&
            typeof window.___loader !== 'undefined'
          ) {
            const preloadPath = parsePath(key).pathname
            if (preloadPath !== path.pathname) {
              window.___loader.enqueue(preloadPath)
            }
          }
        }}
        render={({ Wrapper, Content, TabsList, Tabs }) => {
          return (
            <Wrapper css={tabsWrapperStyle}>
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
  usePath: PropTypes.string.isRequired,
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
  <Tabs.ContentWrapper id="tabbar" {...props} />
)

const tabsWrapperStyle = css`
  .dnb-tabs__tabs {
    justify-content: space-between;
  }
  .fullscreen-page & {
    top: 0;
    .is-sticky .dnb-tabs__tabs {
      margin: 0 -2rem;
    }
  }
  .dnb-tabs__tabs .dnb-modal__close-button {
    position: relative;
    top: auto; /* to force the button to center */
    right: auto;
  }
  .dnb-tabs__tabs .dnb-button.dnb-modal__close-button,
  .dnb-tabs__tabs .dnb-button.fullscreen {
    margin-left: 1rem;
  }
  .dnb-tabs__tabs .dnb-button--secondary {
    box-shadow: none;
    background-color: transparent;
  }

  @media screen and (max-width: 40em) {
    ${
      '' /* .dnb-tabs__tabs {
      NB: Now this gets handled automatically
      margin: 0 -2rem;
      padding: 0 2rem;
    } */
    }
    .dnb-tabs__tabs .dnb-button.fullscreen {
      display: none;
    }
  }
`

const cleanPath = (p) => p.replace(/(&|\?)$/, '')
