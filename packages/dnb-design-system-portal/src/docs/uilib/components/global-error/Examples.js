/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="To showcase the 404 status component"
          data-dnb-test="global-error-404"
        >
          {/* @jsx */ `
<GlobalError status="404" />
           `}
        </ComponentBox>
        <ComponentBox
          caption="To showcase the 500 status component"
          data-dnb-test="global-error-500"
        >
          {/* @jsx */ `
<GlobalError status="500" />
           `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
