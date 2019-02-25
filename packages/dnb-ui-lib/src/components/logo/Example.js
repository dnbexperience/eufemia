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
        <ComponentBox caption="DNB Logo with dynamic height">
          {/* @jsx */ `
<div style={{fontSize: '12rem'}}>
  <Logo size="auto" />
</div>
            `}
        </ComponentBox>
        <ComponentBox caption="DNB Logo with dynamic height">
          {/* @jsx */ `
<div style={{height: '12rem'}}>
  <Logo size="inherit" />
</div>
            `}
        </ComponentBox>
        <ComponentBox caption="DNB Logo with fixed height">
          {/* @jsx */ `
<Logo height="192" data-dnb-test="logo-default" />
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
