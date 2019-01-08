/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import LineTitle from './LineTitle'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <LineTitle>This is the default line title component</LineTitle>
          <LineTitle
            content="This is the small version"
            modifier="small"
            tag="h3"
          />
          <p className="example-caption">Large and small examples</p>
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
