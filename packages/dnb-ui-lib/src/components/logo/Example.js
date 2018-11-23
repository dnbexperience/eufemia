/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Logo from './Logo'

class Example extends PureComponent {
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
