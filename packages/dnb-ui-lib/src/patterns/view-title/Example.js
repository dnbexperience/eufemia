/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ViewTitle from './ViewTitle'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <ViewTitle>This is the default view title component</ViewTitle>
          <ViewTitle text="This is the small version" tag="h3" />
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
