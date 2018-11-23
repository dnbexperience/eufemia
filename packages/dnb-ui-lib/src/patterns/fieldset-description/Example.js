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
        <FieldsetDescription text="Some Fieldset Description" />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
