/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import Logo from './Logo'

class Example extends Component {
  render() {
    return (
      <Fragment>
        <Logo height="200" />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
