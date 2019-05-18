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
        <ComponentBox>
          {/* @jsx */ `
<Progress
  // label="Primary button with text only"
  data-dnb-test="progress-circular--primary"
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export default Example
