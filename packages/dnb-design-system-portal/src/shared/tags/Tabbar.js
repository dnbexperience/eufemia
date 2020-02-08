/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import {
  // parsePath,
  navigate
} from 'gatsby'
import { Button, Tabs } from 'dnb-ui-lib/src/components'
import { H1 } from 'dnb-ui-lib/src/elements'
import { fullscreen as fullscreenIcon } from 'dnb-ui-lib/src/icons/secondary_icons'
import { CloseButton } from 'dnb-ui-lib/src/components/modal'

function Tabbar({
  location,
  motherTitle,
  motherTabs,
  motherTabsHide,
  motherPath,
  tabs,
  children
}) {
  // const location = getLocation()
  const [wasFullscreen, setFullscreen] = React.useState(
    location && /fullscreen/.test(location.search)
  )
  const pathQuery = state =>
    (typeof state !== 'undefined'
    ? state
    : wasFullscreen)
      ? '?fullscreen'
      : ''

  const openFullscreen = () => {
    setFullscreen(true)
    // const location = getLocation()
    if (location) {
      navigate(`${location.pathname}${pathQuery(true)}`)
    }
  }
  const quitFullscreen = () => {
    setFullscreen(false)
    // const location = getLocation()
    if (location) {
      navigate([location.pathname, location.hash].join(''))
    }
  }
  const preparedTabs = React.useMemo(() => {
    return motherTabs
      ? motherTabs.map(({ key, ...rest }) => {
          key = key.replace(/\$1$/, pathQuery())
          return { ...rest, key }
        })
      : tabs
          // remove the tab if it is hidden in frontmatter
          .filter(
            ({ title }) =>
              !(
                motherTabsHide &&
                motherTabsHide.find(({ title: t }) => t === title)
              )
          )
          .map(({ key, ...rest }) => {
            key = `${motherPath}${key}${pathQuery()}`
            return { ...rest, key }
          })
  }, [wasFullscreen])

  // const data = Tabs.getData({ tabs: preparedTabs, children })

  return (
    <>
      {motherTitle && <H1>{motherTitle}</H1>}
      <Tabs
        data={preparedTabs}
        selected_key={location && `${location.pathname}${pathQuery()}`}
        on_change={({ key }) => navigate(key)}
        render={({ Wrapper, Content, TabsList, Tabs }) => {
          return (
            <Wrapper css={tabsWrapperStyle}>
              <TabsList
              // className="dnb-section dnb-section--white"
              >
                <Tabs />
                {wasFullscreen ? (
                  <CloseButton
                    on_click={quitFullscreen}
                    title="Quit Fullscreen"
                  />
                ) : (
                  <Button
                    on_click={openFullscreen}
                    variant="secondary"
                    title="Fullscreen"
                    icon={fullscreenIcon}
                  />
                )}
              </TabsList>
              {children}
              <Content />
            </Wrapper>
          )
        }}
      />
    </>
  )
}

Tabbar.propTypes = {
  location: PropTypes.object.isRequired,
  tabs: PropTypes.array,
  motherTitle: PropTypes.string.isRequired,
  motherTabs: PropTypes.array,
  motherTabsHide: PropTypes.array,
  motherPath: PropTypes.string.isRequired,
  children: PropTypes.node
}
Tabbar.defaultProps = {
  tabs: [
    { title: 'Info', key: '/info' },
    { title: 'Demos', key: '/demos' },
    { title: 'Properties', key: '/properties' },
    { title: 'Events', key: '/events' }
  ],
  motherTabs: null,
  motherTabsHide: null,
  children: null
}

// const pathPrefix = __PATH_PREFIX__ // eslint-disable-line
// function getLocation() {
//   if (typeof window === 'undefined') {
//     return null
//   }
//   const { pathname, search, hash } = window.location
//   return {
//     ...parsePath(pathname.replace(new RegExp(pathPrefix || '', 'g'), '')),
//     search,
//     hash
//   }
// }

const tabsWrapperStyle = css`
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
  .dnb-tabs__tabs .dnb-button--secondary {
    box-shadow: none;
    background-color: transparent;
  }

  ${'' /* &::before {
    content: '';
    position: absolute;
    z-index: 1;
    height: 17rem;
    width: 100%;
    top: 0;
    left: 0;
    background: white;
  } */}
`

export default Tabbar
