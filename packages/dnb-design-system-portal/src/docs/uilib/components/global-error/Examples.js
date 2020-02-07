/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

export default function Example() {
  return (
    <>
      <ComponentBox
        title="To showcase the 404 status component"
        data-dnb-test="global-error-404"
      >
        {/* @jsx */ `
<GlobalError status="404" />
           `}
      </ComponentBox>
      <ComponentBox
        title="To showcase the 500 status component"
        data-dnb-test="global-error-500"
      >
        {/* @jsx */ `
<GlobalError status="500" />
           `}
      </ComponentBox>
    </>
  )
}
