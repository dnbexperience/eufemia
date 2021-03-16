/**
 * ComponentItem
 *
 */

import { Heading, Button, Tabs } from '@dnb/eufemia/src'
import Code, { CodeRenderer } from './Code'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { navigate, parsePath } from 'gatsby'
import { fullscreen as fullscreenIcon } from '@dnb/eufemia/src/icons/secondary_icons'

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

class ItemWrapper extends React.PureComponent {
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
    defaultTab: PropTypes.string,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    tabs: PropTypes.array
  }
  static defaultProps = {
    ExampleCode: null,
    hideTabs: false,
    defaultTab: 'demo',
    callback: null,
    tabs: [
      { title: 'Demo', key: 'demo' },
      { title: 'Details', key: 'info' },
      { title: 'Markup', key: 'code' }
    ]
  }
  state = {
    wasFullscreen: null
  }
  constructor(props) {
    super(props)
    this._id = 'item-wrapper'
    const location = getLocation()
    if (location) {
      this.state.wasFullscreen = /fullscreen/.test(location.search)
    }
    if (this.props.defaultTab)
      this.state.activeTabKey = this.props.defaultTab
  }
  openTab = ({ key: activeTabKey }) => {
    const isValid = Object.values(this.props.tabs).some(
      ({ key }) => key === activeTabKey
    )
    this.setState({
      activeTabKey: isValid ? activeTabKey : this.props.defaultTab
    })
  }
  isActive(tabKey) {
    return this.state.activeTabKey === tabKey
  }
  componentDidMount() {
    const location = getLocation()
    if (location)
      this.setState({
        wasFullscreen: /fullscreen/.test(location.search)
      })
  }
  // componentWillUnmount() {
  //   Heading.resetLevels(1)
  // }
  openFullscreen = () => {
    const location = getLocation()
    if (location)
      navigate(
        `${location.pathname}?fullscreen#${this.state.activeTabKey}`
      )
  }
  quitFullscreen = () => {
    const location = getLocation()
    if (location) {
      navigate([location.pathname, location.hash].join(''))
    }
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
        <Tabs.ContentWrapper key="demo" selected_key="demo" id={this._id}>
          {!hideTabs && <Description />}
          <DemoWrapper>
            <h2 className="dnb-h--large">Demos</h2>
            <DemoComponent />
          </DemoWrapper>
          {Additional && Additional.demo && (
            <Additional.demo CodeRenderer={CodeRenderer} />
          )}
        </Tabs.ContentWrapper>
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
          <Tabs.ContentWrapper
            key="info"
            selected_key="info"
            id={this._id}
          >
            <Details />
            {Additional && Additional.info && (
              <Additional.info CodeRenderer={CodeRenderer} />
            )}
            {ExampleCode && (
              <React.Fragment>
                <h3>JSX Example</h3>
                <CodeRenderer language="jsx">{ExampleCode}</CodeRenderer>
              </React.Fragment>
            )}
          </Tabs.ContentWrapper>
        )
      }
    }

    if (prerenderedCodeContent || (Additional && Additional.code)) {
      tabsUsed.push(tabs.find(({ key }) => key === 'code'))
      if (this.isActive('code')) {
        tabsContent.push(
          <Tabs.ContentWrapper
            key="code"
            selected_key="code"
            id={this._id}
          >
            <Code source={CodeComponent} />
            {Additional && Additional.code && (
              <Additional.code CodeRenderer={CodeRenderer} />
            )}
          </Tabs.ContentWrapper>
        )
      }
    }

    return (
      <div className="wrapped-item">
        {!hideTabs ? (
          <Heading level={1} skip_correction>
            {title}
          </Heading>
        ) : (
          <Heading size="basis">
            <Link to={`/uilib/components/${id}`} className="dnb-anchor">
              {title}
            </Link>
          </Heading>
        )}
        {!hideTabs && (
          <Tabs
            id={this._id}
            use_hash
            data={tabsUsed}
            on_change={this.openTab}
            render={({ Wrapper, TabsList, Content, Tabs }) => {
              Heading.resetLevels(2)
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
        )}
        {tabsContent}
      </div>
    )
  }
}

export default ItemWrapper
