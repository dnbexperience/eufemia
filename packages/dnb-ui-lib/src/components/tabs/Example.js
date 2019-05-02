/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../dnb-design-system-portal/src/shared/tags/ComponentBox'
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
  state = { activeTabKey: 'second' }
  openTab = ({ key }) => {
    this.setState({
      activeTabKey: key
    })
  }
  isActive(tabKey) {
    return this.state.activeTabKey === tabKey
  }

  render() {
    const { activeTabKey } = this.state
    const openTab = this.openTab
    return (
      <Fragment>
        <ComponentBox
          caption="Left aligned tabs, using both 'data' property and content object"
          scope={{ exampleContent }}
          data-dnb-test="tabs-tablist"
          useRender
          hideSyntaxButton
        >
          {/* @jsx */ `
const data = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' }
];
render(<Tabs data={data}>
  {exampleContent}
</Tabs>)
          `}
        </ComponentBox>
        <ComponentBox
          caption="Left aligned tabs, using 'data' property only"
          scope={{ exampleContent }}
        >
          {/* @jsx */ `
<Tabs
  data={{
    first2: { title: 'First', content: exampleContent.first },
    second2: { title: 'Second', content: exampleContent.second }
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="eft aligned tabs, using React Components only">
          {/* @jsx */ `
<Tabs section_style="mint-green">
  <Tabs.Content title="First">
    <h2 className="dnb-h2">First</h2>
  </Tabs.Content>
  <Tabs.Content title="Second">
    <h2 className="dnb-h2">Second</h2>
  </Tabs.Content>
</Tabs>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Right aligned tabs"
          scope={{ exampleContent, activeTabKey, openTab, data }}
        >
          {/* @jsx */ `
<Tabs
  selected_key={activeTabKey}
  align="right"
  label="Some Tabs label"
  data={data}
  on_change={openTab}
  render={({ Wrapper, Content, TabsList, Tabs }) => {
    return (
      <Wrapper>
        <TabsList className="dnb-section">
          <small>
            <b>Active:</b> {activeTabKey}
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
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

const exampleContent = {
  first: () => <h2 className="dnb-h2">First</h2>,
  second: () => <Input label="Label:">Focus me with next Tab key</Input>,
  third: () => (
    <p>
      Eros semper blandit tellus mollis primis quisque platea sollicitudin
      ipsum
    </p>
  ),
  fourth: () => <h2 className="dnb-h2">Fourth</h2>
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
