/**
 * ComponentItem
 *
 */

import { Button, Tabs } from 'dnb-ui-lib/src'
import Code, { CodeRenderer } from './Code'
import React, { PureComponent, Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'

import { CloseButton } from 'dnb-ui-lib/src/components/modal'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { navigate, parsePath } from 'gatsby'
import { fullscreen as fullscreenIcon } from 'dnb-ui-lib/src/icons/secondary_icons'

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

const DemoWrapper = styled.div`
  padding: 2rem 0 0;
`

const tabsWrapperStyle = css`
  .fullscreen-page & {
    top: 0;
    .is-sticky .dnb-tabs__tabs {
      margin: 0 -2rem;
    }
  }
  .dnb-modal__close-button {
    position: relative;
    top: auto; /* to force the button to center */
    right: auto;
  }
`

class ItemWrapper extends PureComponent {
  static propTypes = {
    ExampleCode: PropTypes.string,
    Description: PropTypes.func.isRequired,
    Details: PropTypes.func.isRequired,
    DemoComponent: PropTypes.func.isRequired,
    CodeComponent: PropTypes.func.isRequired,
    callback: PropTypes.shape({
      demo: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      info: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      code: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
    }),
    hideTabs: PropTypes.bool,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tabs: PropTypes.array
  }
  static defaultProps = {
    ExampleCode: null,
    hideTabs: false,
    callback: null,
    tabs: [
      { title: 'Demo', key: 'demo' },
      { title: 'Details', key: 'info' },
      { title: 'Markup', key: 'code' }
    ]
  }
  state = {
    activeTabKey: 'demo',
    wasFullscreen: null
  }
  constructor(props) {
    super(props)
    this._id = 'item-wrapper'
    const location = getLocation()
    if (location)
      this.state.wasFullscreen = /fullscreen/.test(location.search)
  }
  openTab = ({ key }) => {
    this.setState({
      activeTabKey: key
    })
  }
  isActive(tabKey) {
    return this.state.activeTabKey === tabKey
  }
  componentWillMount() {
    const location = getLocation()
    if (location)
      this.setState({
        wasFullscreen: /fullscreen/.test(location.search)
      })
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
    const {
      title,
      id,
      tabs,
      hideTabs,
      ExampleCode,
      Description,
      Details,
      DemoComponent,
      CodeComponent,
      callback: Additional
    } = this.props

    // Prerender the Details component
    const prerenderedDetailsContent = String(
      (/<div>(.*?)<\/div>/g.exec(
        ReactDOMServer.renderToStaticMarkup(<Details />)
      ) || [])[1] || ''
    ).trim()

    // Prerender the Code component
    const prerenderedCodeContent = String(
      ReactDOMServer.renderToStaticMarkup(<CodeComponent />)
    ).trim()

    const tabsUsed = [tabs[0]]
    const tabsContent = []

    if (this.isActive('demo')) {
      tabsContent.push(
        <Tabs.TabContent key="demo" id={this._id} selection_key="demo">
          {!hideTabs && <Description />}
          <DemoWrapper>
            <DemoComponent />
          </DemoWrapper>
          {Additional && Additional.demo && (
            <Additional.demo CodeRenderer={CodeRenderer} />
          )}
        </Tabs.TabContent>
      )
    }

    if (
      prerenderedDetailsContent ||
      (Additional && Additional.info) ||
      ExampleCode
    ) {
      tabsUsed.push(tabs.find(({ key }) => key === 'info'))
      if (this.isActive('info')) {
        tabsContent.push(
          <Tabs.TabContent key="info" id={this._id} selection_key="info">
            <Details />
            {Additional && Additional.info && (
              <Additional.info CodeRenderer={CodeRenderer} />
            )}
            {ExampleCode && (
              <Fragment>
                <h3>JSX Example</h3>
                <CodeRenderer language="jsx">{ExampleCode}</CodeRenderer>
              </Fragment>
            )}
          </Tabs.TabContent>
        )
      }
    }

    if (prerenderedCodeContent || (Additional && Additional.code)) {
      tabsUsed.push(tabs.find(({ key }) => key === 'code'))
      if (this.isActive('code')) {
        tabsContent.push(
          <Tabs.TabContent key="code" id={this._id} selection_key="code">
            <Code source={CodeComponent} />
            {Additional && Additional.code && (
              <Additional.code CodeRenderer={CodeRenderer} />
            )}
          </Tabs.TabContent>
        )
      }
    }

    return (
      <div className="wrapped-item">
        {!hideTabs ? (
          <h1>{title}</h1>
        ) : (
          <h4>
            <Link to={`/uilib/components/${id}`}>{title}</Link>
          </h4>
        )}
        {!hideTabs && (
          <Tabs
            id={this._id}
            do_set_hash
            data={tabsUsed}
            on_change={this.openTab}
            render={({ Wrapper, TabsList, Tabs }) => {
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
                </Wrapper>
              )
            }}
          />
        )}
        {tabsContent}
      </div>
    )
  }
}

export default ItemWrapper
