/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Tabs from './Tabs'
import Input from '../input/Input'
import styled from '@emotion/styled'

class Example extends PureComponent {
  static AdditionalCallback = {
    info: ({ CodeRenderer }) => (
      <Fragment>
        <h3>Data Structure</h3>
        <CodeRenderer language="json">{dataBlob}</CodeRenderer>
      </Fragment>
    )
  }
  state = { activeTabKey: 'third' }
  openTab = ({ key }) => {
    this.setState({
      activeTabKey: key
    })
  }
  isActive(tabKey) {
    return this.state.activeTabKey === tabKey
  }

  render() {
    return (
      <Fragment>
        <div className="example-box">
          <Tabs data={data}>{exampleContent}</Tabs>
          <p className="example-caption">
            Left aligned tabs, using both "data" property and content
            object
          </p>
        </div>
        <div className="example-box">
          <Tabs
            data={{
              first2: { title: 'First', content: exampleContent.first },
              second2: { title: 'Second', content: exampleContent.second }
            }}
          />
          <p className="example-caption">
            Left aligned tabs, using "data" property only
          </p>
        </div>
        <div className="example-box">
          <Tabs>
            <Tabs.Content title="First">
              <h2>First</h2>
            </Tabs.Content>
            <Tabs.Content title="Second">
              <h2>Second</h2>
            </Tabs.Content>
          </Tabs>
          <p className="example-caption">
            Left aligned tabs, using React Components only
          </p>
        </div>
        <div className="example-box">
          <Tabs
            selected_key="second"
            align="right"
            label="Some Tabs label"
            data={data}
            on_change={this.openTab}
            render={({ Wrapper, Content, TabsList, Tabs }) => {
              return (
                <Wrapper>
                  <TabsList>
                    <small>
                      <b>Active:</b> {this.state.activeTabKey}
                    </small>
                    <Tabs />
                  </TabsList>
                  <Content />
                </Wrapper>
              )
            }}
          >
            {exampleContent}
          </Tabs>
          <p className="example-caption">Right aligned tabs</p>
        </div>
      </Fragment>
    )
  }
}

const exampleContent = {
  first: () => <h2>First</h2>,
  second: () => <Input>Focus me with next Tab key</Input>,
  third: () => (
    <p>
      Eros semper blandit tellus mollis primis quisque platea sollicitudin
      ipsum
    </p>
  ),
  fourth: () => <h2>Fourth</h2>
}

const data = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' }
]
const dataBlob = JSON.stringify(data, null, 2)

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

const Wrapper = styled.div`
  .dnb-tabs {
    margin-top: 3rem;
  }
`
