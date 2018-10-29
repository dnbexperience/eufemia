/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import Tabs from './Tabs'

class Example extends Component {
  static AdditionalCallback = {
    info: ({ CodeRenderer }) => (
      <Fragment>
        <h3>Data Structure</h3>
        <CodeRenderer language="json">{dataBlob}</CodeRenderer>
      </Fragment>
    )
  }
  state = { activeTabKey: null }
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
        <Tabs selected_key="first" data={data} on_change={this.openTab}>
          {{
            first: <h1>First</h1>,
            second: <h1>Second</h1>,
            third: <h1>Third</h1>
          }}
        </Tabs>
      </Fragment>
    )
  }
}

const data = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third' }
]
const dataBlob = JSON.stringify(data, null, 2)

export { Example }
export default () => <Example />
