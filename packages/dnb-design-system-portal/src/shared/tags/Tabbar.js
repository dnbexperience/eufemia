/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import { Link, navigate } from 'gatsby'
import { Button, Tabs } from '@dnb/eufemia/src/components'
import { fullscreen as fullscreenIcon } from '@dnb/eufemia/src/icons/secondary_icons'
import AutoLinkHeader from './AutoLinkHeader'

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
    ${'' /* .dnb-tabs__tabs {
      NB: Now this gets handled automatically
      margin: 0 -2rem;
      padding: 0 2rem;
    } */}
    .dnb-tabs__tabs .dnb-button.fullscreen {
      display: none;
    }
  }
`
