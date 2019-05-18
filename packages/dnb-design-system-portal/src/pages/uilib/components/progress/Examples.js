/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

class Example extends PureComponent {
  clickHandler = () => {
    alert('You clicked a button with a click function attached to it')
  }
  render() {
    return (
      <Fragment>
        <ComponentBox>
          {/* @jsx */ `
<Button
  text="Primary button with text only"
  data-dnb-test="button-primary"
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export default Example
