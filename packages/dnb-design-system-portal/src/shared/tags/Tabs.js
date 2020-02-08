/**
 * Inline Tag
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { css } from '@emotion/core'
import { navigate, parsePath } from 'gatsby'
import { CloseButton } from 'dnb-ui-lib/src/components/modal'
import { fullscreen as fullscreenIcon } from 'dnb-ui-lib/src/icons/secondary_icons'
import { Button, Tabs } from 'dnb-ui-lib/src'

const pathPrefix = __PATH_PREFIX__ // eslint-disable-line

const getLocation = () => {
  if (typeof window === 'undefined') {
    return null
  }
  const { pathname, search, hash } = window.location
  return {
    ...parsePath(pathname.replace(new RegExp(pathPrefix || '', 'g'), '')),
    search,
    hash
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

class CustomTabs extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    tabs: PropTypes.array
  }
  static defaultProps = {
    tabs: [
      { title: 'Demos', key: 'tab-demos' },
      { title: 'Properties', key: 'tab-properties' },
      { title: 'Events', key: 'tab-events' }
    ]
  }
  state = {
    activeTabKey: 'tab-demos',
    wasFullscreen: null
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
      activeTabKey: key
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
                  <CloseButton
                    on_click={this.quitFullscreen}
                    title="Quit Fullscreen"
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
