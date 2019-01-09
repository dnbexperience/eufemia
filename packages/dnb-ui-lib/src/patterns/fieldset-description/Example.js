/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import FieldsetDescription from './FieldsetDescription'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <FieldsetDescription text="Some Fieldset Description" />
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
