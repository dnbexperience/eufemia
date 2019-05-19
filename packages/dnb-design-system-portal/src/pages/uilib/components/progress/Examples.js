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
        <ComponentBox caption="Default circular progress">
          {/* @jsx */ `
<Progress />
          `}
        </ComponentBox>
        <ComponentBox
          caption="Shows a large circular progress with a static 50% in progress"
          data-dnb-test="progress-circular--primary"
        >
          {/* @jsx */ `
<Progress
  progress="50"
  size="large"
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export default Example
