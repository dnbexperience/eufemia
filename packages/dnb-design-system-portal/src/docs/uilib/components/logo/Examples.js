/**
 * UI lib Component Example
 *
 */

import React, { PureComponent } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <>
        <ComponentBox
          title="DNB Logo with dynamic height"
          data-dnb-test="logo-auto-size"
        >
          {/* @jsx */ `
<span style={{fontSize: '12rem'}}>
  <Logo size="auto" />
</span>
          `}
        </ComponentBox>
        <ComponentBox
          title="DNB Logo with dynamic height"
          data-dnb-test="logo-inherit-size"
        >
          {/* @jsx */ `
<span style={{height: '12rem'}}>
  <Logo size="inherit" />
</span>
          `}
        </ComponentBox>
        <ComponentBox title="DNB Logo with fixed height">
          {/* @jsx */ `
<Logo height="192" data-dnb-test="logo-default" />
        `}
        </ComponentBox>
      </>
    )
  }
}

export default Example
