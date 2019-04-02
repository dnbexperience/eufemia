/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../dnb-design-system-portal/src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="FormStatus displaying error status"
          data-dnb-test="form-status"
        >
          {/* @jsx */ `
<FormStatus
  text="Failure text"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="FormStatus displaying info status">
          {/* @jsx */ `
<FormStatus
  title="Hover title"
  text="Interdum enim molestie vel dictum cras praesent porta duis mollis"
  status="info"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="A form status, used by the Input Component">
          {/* @jsx */ `
<Input
  label="Input with Status:"
  status="You have to fill in this field"
  value="Input value"
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
