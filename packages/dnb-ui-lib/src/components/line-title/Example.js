/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import LineTitle from './LineTitle'

class Example extends Component {
  render() {
    return (
      <Fragment>
        <LineTitle>This is the default line title component</LineTitle>
        <LineTitle
          content="This is the small version"
          modifier="small"
          tag="h3"
        />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
