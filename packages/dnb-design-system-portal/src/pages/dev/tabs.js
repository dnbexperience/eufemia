/**
 * Main App
 *
 */

import React, { PureComponent, Fragment } from 'react'
import { Input, Tabs } from 'dnb-ui-lib/src'

export default class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Tabs data={data}>{exampleContent}</Tabs>
      </Fragment>
    )
  }
}

const exampleContent = {
  first: <h2>First</h2>,
  second: <Input>Focus me with next Tab key</Input>,
  third: (
    <p>
      Eros semper blandit tellus mollis primis quisque platea sollicitudin
      ipsum
    </p>
  ),
  fourth: <h2>Fourth</h2>
}
const data = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' }
]
