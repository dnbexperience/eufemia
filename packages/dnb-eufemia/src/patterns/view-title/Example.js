/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ViewTitle from './ViewTitle'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="example-box">
          <ViewTitle>This is the default view title component</ViewTitle>
          <ViewTitle text="This is the small version" tag="h3" />
        </div>
      </React.Fragment>
    )
  }
}

export { Example }
export default Example
