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
        <ComponentBox caption="SVG logo">
          {/* @jsx */ `
<Logo height="200" data-dnb-test="logo-default" />
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<h1>
  H1 with the DNB Logo <Logo size="auto" />
</h1>
<p>
  Text with the DNB Logo <Logo />
</p>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
