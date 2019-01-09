/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <p>TODO: Make footer Example</p>
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
