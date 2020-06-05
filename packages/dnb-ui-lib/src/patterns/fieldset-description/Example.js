/**
 * UI lib Component Example
 *
 */

import React from 'react'
import FieldsetDescription from './FieldsetDescription'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="example-box">
          <FieldsetDescription text="Some Fieldset Description" />
        </div>
      </React.Fragment>
    )
  }
}

export { Example }
export default Example
