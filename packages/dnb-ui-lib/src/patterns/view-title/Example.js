/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import ViewTitle from './ViewTitle'

class Example extends Component {
  render() {
    return (
      <Fragment>
        <ViewTitle>This is the default view title component</ViewTitle>
        <ViewTitle text="This is the small version" tag="h3" />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
