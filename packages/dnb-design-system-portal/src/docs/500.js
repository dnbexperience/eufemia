/**
 * Page not found
 *
 */

import React, { PureComponent } from 'react'
import { GlobalError } from 'dnb-ui-lib/src/components'

export default class Error500 extends PureComponent {
  render() {
    return (
      <GlobalError
        status="500"
        title="Sorry, we got a technical issue!"
        text="The service is not working properly at the moment, but try again later"
      />
    )
  }
}
