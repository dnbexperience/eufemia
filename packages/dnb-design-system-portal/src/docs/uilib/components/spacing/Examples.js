/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="Default spacing"
          data-dnb-test="spacing-default"
        >
          {/* @jsx */ `
<FormLabel for_id="alone-1">
  Default horizontal FormLabel:
</FormLabel>
<Checkbox id="alone-1" label="Checkbox" />
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
