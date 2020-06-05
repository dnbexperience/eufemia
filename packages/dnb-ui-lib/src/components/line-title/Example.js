/**
 * UI lib Component Example
 *
 */

import React from 'react'
import LineTitle from './LineTitle'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="example-box">
          <LineTitle>This is the default line title component</LineTitle>
          <LineTitle
            content="This is the small version"
            modifier="small"
            tag="h3"
          />
          <p className="example-caption">Large and small examples</p>
        </div>
      </React.Fragment>
    )
  }
}

export { Example }
export default Example
