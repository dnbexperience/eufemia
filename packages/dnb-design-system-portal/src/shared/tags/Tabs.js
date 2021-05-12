/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { css } from '@emotion/react'
import { navigate, parsePath } from 'gatsby'
import { fullscreen as fullscreenIcon } from '@dnb/eufemia/src/icons/secondary_icons'
import { Button, Tabs } from '@dnb/eufemia/src'

const pathPrefix = __PATH_PREFIX__ // eslint-disable-line

const getLocation = () => {
  if (typeof window === 'undefined') {
    return null
  }
  const { pathname, search, hash } = window.location
  return {
    ...parsePath(pathname.replace(new RegExp(pathPrefix || '', 'g'), '')),
    search,
    hash,
  }
}

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
`

class CustomTabs extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    tabs: PropTypes.array,
  }
  static defaultProps = {
    tabs: [
      { title: 'Demos', key: 'tab-demos' },
      { title: 'Properties', key: 'tab-properties' },
      { title: 'Events', key: 'tab-events' },
    ],
  }
  state = {
    activeTabKey: 'tab-demos',
    wasFullscreen: null,
  }
  constructor(props) {
    super(props)
    const location = getLocation()
    if (location) {
      this.state.wasFullscreen = /fullscreen/.test(location.search)
    }
  }
  openTab = ({ key }) => {
    this.setState({
      activeTabKey: key,
    })
  }
  isActive(tabKey) {
    return this.state.activeTabKey === tabKey
  }
  openFullscreen = () => {
    const location = getLocation()
    if (location)
      navigate(
        `${location.pathname}?fullscreen#${this.state.activeTabKey}`
      )
  }
  quitFullscreen = () => {
    const location = getLocation()
    if (location) navigate([location.pathname, location.hash].join(''))
  }

  render() {
    const { tabs, children } = this.props
    const data = Tabs.getData({ tabs, children })

    return (
      <Tabs
        use_hash
        data={data}
        on_change={this.openTab}
        render={({ Wrapper, Content, TabsList, Tabs }) => {
          return (
            <Wrapper css={tabsWrapperStyle}>
              <TabsList>
                <Tabs />
                {this.state.wasFullscreen ? (
                  <Button
                    on_click={this.quitFullscreen}
                    variant="secondary"
                    title="Quit Fullscreen"
                    icon="close"
                    className="fullscreen"
                  />
                ) : (
                  <Button
                    on_click={this.openFullscreen}
                    variant="secondary"
                    title="Fullscreen"
                    icon={fullscreenIcon}
                  />
                )}
              </TabsList>
              <Content />
            </Wrapper>
          )
        }}
      />
    )
  }
}

export default CustomTabs

CustomTabs.Content = Tabs.Content
