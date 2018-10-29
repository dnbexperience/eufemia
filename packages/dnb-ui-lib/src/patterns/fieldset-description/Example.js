/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import FieldsetDescription from './FieldsetDescription'

class Example extends Component {
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
