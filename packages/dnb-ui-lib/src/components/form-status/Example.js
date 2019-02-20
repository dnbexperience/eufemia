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
        <ComponentBox caption="A form status">
          {/* @jsx */ `
<FormStatus
  title="Input with Status:"
  text="Input value with status"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="A form status, used by the Input Component">
          {/* @jsx */ `
<Input
  label="Input with Status:"
  status="You have to fill in this field"
  value="Input value with status"
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
