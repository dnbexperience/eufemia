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
        <div className="example-box">
          <Logo height="200" />
          <p className="example-caption">SVG logo</p>
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
